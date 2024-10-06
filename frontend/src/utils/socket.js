// utils/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your backend URL

export default socket;
