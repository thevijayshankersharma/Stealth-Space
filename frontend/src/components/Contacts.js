// File: Frontend/src/components/Contacts.js

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Contacts = ({ onSelectContact, darkMode }) => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/contacts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/search?query=${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers();
  };

  return (
    <div className={`p-4 space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-xl font-bold">Contacts</h2>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className={`flex-1 p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
        />
        <button type="submit" className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
          <Search className="h-5 w-5" />
        </button>
      </form>
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className={`flex items-center space-x-2 p-2 cursor-pointer rounded-md ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <span>{contact.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;