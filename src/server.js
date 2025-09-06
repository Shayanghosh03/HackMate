

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const ideaRoutes = require('./routes/ideas');

const app = express();

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
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackmate';

// Start the HTTP server first so health checks work even if DB is down
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

// Connect to MongoDB (non-fatal if it fails; health route will reflect status)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
