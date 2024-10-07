// File: Frontend/src/utils/socket.js

import io from 'socket.io-client';

let socket;

export const initializeSocket = (userId) => {
  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
  socket.emit('join', userId);
};

export const sendPrivateMessage = (recipient, content) => {
  if (socket) {
    socket.emit('privateMessage', { recipient, content });
  }
};

export const onNewMessage = (callback) => {
  if (socket) {
    socket.on('newMessage', callback);
  }
};

export const onMessageSent = (callback) => {
  if (socket) {
    socket.on('messageSent', callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};