

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 4000;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const ideaRoutes = require('./routes/ideas');
const Message = require('./models/Message');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: true, credentials: true },
});

// Middleware
app.use(cors());
// Handle CORS preflight quickly (esp. for custom content-type)
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/ideas', ideaRoutes);

// Direct message history API (1:1 chat)
app.get('/api/dm/history', async (req, res) => {
  try {
    const a = String(req.query.me || '').trim();
    const b = String(req.query.peerId || '').trim();
    const limit = Math.min(parseInt(req.query.limit || '50', 10) || 50, 200);
    if (!a || !b) return res.status(400).json({ message: 'me and peerId required' });
    const [x, y] = [a, b].sort();
    const roomId = `dm:${x}|${y}`;
    const msgs = await Message.find({ roomId }).sort({ ts: -1 }).limit(limit).lean();
    res.json(msgs.reverse());
  } catch (e) {
    res.status(500).json({ message: 'Failed to load history' });
  }
});

// Diagnostic: compute DM room info (roomId and current member count)
app.get('/api/dm/roominfo', (req, res) => {
  try {
    const a = String(req.query.me || '').trim();
    const b = String(req.query.peerId || '').trim();
    if (!a || !b) return res.status(400).json({ message: 'me and peerId required' });
    const [x, y] = [a, b].sort();
    const roomId = `dm:${x}|${y}`;
    const members = io.sockets.adapter.rooms.get(roomId)?.size || 0;
    res.json({ roomId, members });
  } catch (e) {
    res.status(500).json({ message: 'roominfo error' });
  }
});

// Serve static frontend (so opening index.html/profile.html uses the same origin as API)
const staticRoot = path.resolve(__dirname, '..');
app.use(express.static(staticRoot));
// Serve uploaded media
const uploadsDir = path.join(staticRoot, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Explicit HTML routes (helps on some environments/tools where /index.html doesn't resolve via static)
app.get('/', (req, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});
app.get(['/index.html', '/login.html', '/createprofile.html', '/profile.html'], (req, res) => {
  const file = req.path.replace(/^\//, '');
  res.sendFile(path.join(staticRoot, file));
});

// Lightweight upload endpoint: accepts raw body and writes a file in /uploads
// Usage: POST /api/upload?filename=my.png&type=image  (body: binary octet-stream)
// Preflight (optional extra clarity)
app.options('/api/upload', cors());
app.post('/api/upload', express.raw({ type: '*/*', limit: '100mb' }), (req, res) => {
  try {
    const q = req.query || {};
    const orig = String(q.filename || 'file').replace(/[^a-zA-Z0-9_.-]/g, '');
    const type = String(q.type || '').toLowerCase();
    const len = req.headers['content-length'] ? Number(req.headers['content-length']) : (req.body ? req.body.length : 0);
    if (!req.body || !Buffer.isBuffer(req.body)) {
      console.warn('Upload: no buffer body', { orig, type, len });
      return res.status(400).json({ message: 'No file data' });
    }
    const stamp = Date.now();
    const base = orig || (type === 'image' ? 'image' : type === 'video' ? 'video' : 'file');
    // Default extension if missing
    const hasExt = /\.[a-zA-Z0-9]{2,6}$/.test(base);
    const defExt = type === 'image' ? '.png' : type === 'video' ? '.mp4' : '';
    const name = `${stamp}-${hasExt ? base : base + defExt}`;
    const dest = path.join(uploadsDir, name);
    fs.writeFileSync(dest, req.body);
    console.log('Upload saved:', { file: name, bytes: req.body.length, type });
    const url = `/uploads/${name}`;
    res.status(201).json({ url });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Health with DB status
const healthHandler = (req, res) => {
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const db = states[mongoose.connection.readyState] || 'unknown';
  res.json({ status: 'ok', db });
};
app.get('/api/health', healthHandler);
// Common misspelling fallback
app.get('/api/helth', healthHandler);

// DB connect and server start
const PORT = process.env.PORT || 5000;
// Prefer passing no default here; db.js will decide based on env and avoid localhost fallback in prod
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL || '';

// Socket.IO realtime direct messages (1:1)
io.on('connection', (socket) => {
  try { console.log('[dm] client connected', socket.id); } catch {}

  // Join a 1:1 room based on two user IDs (sorted for stable key)
  socket.on('dm:join', ({ me, peerId, userName }, ack) => {
    if (!me || !peerId) return;
    const [x, y] = [String(me), String(peerId)].sort();
    const roomId = `dm:${x}|${y}`;
    socket.join(roomId);
    socket.data.me = String(me);
    socket.data.userName = userName || 'Guest';
    socket.data.currentRoom = roomId;
    try {
      const count = io.sockets.adapter.rooms.get(roomId)?.size || 1;
      if (typeof ack === 'function') ack({ ok: true, roomId, members: count });
      console.log('[dm] join', { sid: socket.id, roomId, me: socket.data.me, as: socket.data.userName, members: count });
    } catch {}
  });

  // Send a DM message to the peer (broadcast within the room including sender)
  socket.on('dm:message', (msg, ack) => {
    try {
      const { peerId, text, userName, ts, me } = msg || {};
      const a = String(me || socket.data.me || '');
      const b = String(peerId || '');
      if (!a || !b || !text) return;
      const [x, y] = [a, b].sort();
      const roomId = `dm:${x}|${y}`;
      const payload = { roomId, text, userName: userName || socket.data.userName || 'Guest', ts: ts || Date.now(), senderSid: socket.id };
      console.log('[dm] msg', { sid: socket.id, roomId, from: payload.userName, text: String(text).slice(0,80) });
  // Broadcast to the room except the sender to avoid client-side echo
  socket.to(roomId).emit('dm:message', payload);
      // Persist
      const doc = new Message({ roomId, text: payload.text, userName: payload.userName, ts: new Date(payload.ts) });
      doc.save()
        .then(() => { if (typeof ack === 'function') ack({ ok: true }); })
        .catch((e) => { if (typeof ack === 'function') ack({ ok: false, error: e && e.message }); });
    } catch (e) {
      try { console.error('[dm] msg error', e && e.message); } catch {}
      if (typeof ack === 'function') ack({ ok: false, error: 'server error' });
    }
  });

  socket.on('disconnect', () => {
    try { console.log('[dm] client disconnected', socket.id); } catch {}
  });
});

// Start the HTTP server first so health checks work even if DB is down
httpServer.listen(PORT, () => console.log(`API listening on port ${PORT}`));

// Connect to MongoDB (non-fatal if it fails; health route will reflect status)
connectDB(MONGO_URI);
