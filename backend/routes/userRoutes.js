// File: backend/routes/userRoutes.js

const express = require('express');
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');
const Message = require('../models/Message');

const router = express.Router();

// Get user profile
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Get all users (contacts) except the current user
router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select('username email');
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Search users
router.get('/search', verifyToken, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      _id: { $ne: req.user.id },
      username: { $regex: query, $options: 'i' }
    }).select('username email');
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

// Get messages between two users
router.get('/messages/:userId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    }).sort('createdAt');
    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

module.exports = router;