const User = require('./models/User');

const handleSocketConnection = (socket, io) => {
  console.log('New client connected');

  socket.on('login', async (userId) => {
    try {
      await User.findByIdAndUpdate(userId, { isOnline: true });
      socket.userId = userId;
      io.emit('userStatus', { userId, status: 'online' });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  });

  socket.on('disconnect', async () => {
    console.log('Client disconnected');
    if (socket.userId) {
      try {
        await User.findByIdAndUpdate(socket.userId, { isOnline: false });
        io.emit('userStatus', { userId: socket.userId, status: 'offline' });
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
  });

  socket.on('sendMessage', (data) => {
    io.to(data.recipient).emit('newMessage', data);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  });
};

module.exports = handleSocketConnection;