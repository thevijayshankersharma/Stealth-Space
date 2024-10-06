const express = require('express');
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from user data
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

module.exports = router;
