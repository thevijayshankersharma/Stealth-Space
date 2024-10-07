// File: backend/socketEvents.js

const Message = require('./models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('privateMessage', async ({ sender, recipient, content }) => {
      try {
        const message = new Message({ sender, recipient, content });
        await message.save();
        io.to(recipient).emit('newMessage', message);
        io.to(sender).emit('messageSent', message);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};