// socketEvents.js
const handleSocketConnection = (socket, io) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        io.emit('message', message); // Emit the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};

module.exports = handleSocketConnection;
