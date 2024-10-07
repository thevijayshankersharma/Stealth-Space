import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001');

export const initializeSocket = (userId) => {
  socket.emit('login', userId);
};

export const sendMessage = (message) => {
  socket.emit('sendMessage', message);
};

export const onNewMessage = (callback) => {
  socket.on('newMessage', callback);
};

export const onUserStatus = (callback) => {
  socket.on('userStatus', callback);
};

export default socket;