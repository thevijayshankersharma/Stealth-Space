// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Post a new message
router.post('/', async (req, res) => {
    const { text, sender } = req.body;
    if (text && sender) {
        const newMessage = new Message({ text, sender });
        try {
            await newMessage.save(); // Save the message to the database
            res.status(201).json({ message: 'Message received' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save message' });
        }
    } else {
        res.status(400).json({ error: 'Message and sender are required' });
    }
});

module.exports = router;
