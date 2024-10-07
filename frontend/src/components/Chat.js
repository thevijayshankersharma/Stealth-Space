// File: Frontend/src/components/Chat.js

import { useState, useEffect, useRef } from 'react';
import { sendPrivateMessage, onNewMessage, onMessageSent } from '../utils/socket';

const Chat = ({ currentUser, recipient, darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const newMessageHandler = (message) => {
      if (message.sender === recipient._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    const messageSentHandler = (message) => {
      if (message.recipient === recipient._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    onNewMessage(newMessageHandler);
    onMessageSent(messageSentHandler);

    return () => {
      // Clean up listeners
    };
  }, [recipient._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/messages/${recipient._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendPrivateMessage(recipient._id, inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                message.sender === currentUser._id
                  ? 'bg-blue-500 text-white'
                  : darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-50">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-2 rounded-md ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-md ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;