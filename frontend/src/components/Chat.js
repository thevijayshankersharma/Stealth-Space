import { useState, useEffect, useRef } from 'react';
import { sendMessage, onNewMessage } from '../utils/socket';

const Chat = ({ recipient }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${recipient.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages
    onNewMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [recipient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        content: inputMessage,
        sender: 'me',
        recipient: recipient.id,
        timestamp: new Date().toISOString(),
      };
      sendMessage(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-50">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;