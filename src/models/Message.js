const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true, index: true },
  text: { type: String, required: true },
  userName: { type: String, default: 'Guest' },
  ts: { type: Date, default: Date.now },
}, { versionKey: false });

MessageSchema.index({ roomId: 1, ts: 1 });

module.exports = mongoose.model('Message', MessageSchema);
