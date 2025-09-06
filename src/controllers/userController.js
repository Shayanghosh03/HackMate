const User = require('../models/User');

exports.listUsers = async (req, res) => {
  try {
    const { skill } = req.query;
    const q = skill ? { skills: { $in: [skill] } } : {};
    const users = await User.find(q).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const allow = ['name', 'email', 'bio', 'skills', 'organization', 'location', 'linkedin', 'github'];
    const updates = {};
    for (const k of allow) {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    }
    // Normalize skills to array of strings
    if (updates.skills && Array.isArray(updates.skills)) {
      updates.skills = updates.skills.map((s) => String(s)).filter(Boolean);
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    Object.assign(user, updates);
    await user.save();
    const safe = user.toObject();
    delete safe.password;
    res.json(safe);
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) return res.status(409).json({ message: 'Email already in use' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
