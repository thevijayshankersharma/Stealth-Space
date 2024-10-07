const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { verifyToken } = require('../middleware/auth');
const { encrypt, decrypt } = require('../utils/encryption');

// Send a message
router.post('/', verifyToken, async (req, res) => {
  try {
    const { recipient, content } = req.body;
    const encryptedContent = encrypt(content);
    const message = new Message({
      sender: req.user.id,
      recipient,
      content: encryptedContent
    });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Get messages for a conversation
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    }).sort('timestamp');

    const decryptedMessages = messages.map(msg => ({
      ...msg._doc,
      content: decrypt(msg.content)
    }));

    res.json(decryptedMessages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' });
  }
});

module.exports = router;