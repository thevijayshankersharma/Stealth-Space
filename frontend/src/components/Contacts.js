import { useState, useEffect } from 'react';
import { onUserStatus } from '../utils/socket';

const Contacts = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();

    // Listen for user status changes
    onUserStatus(({ userId, status }) => {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === userId ? { ...contact, isOnline: status === 'online' } : contact
        )
      );
    });
  }, []);

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
          onClick={() => onSelectContact(contact)}
        >
          <div className={`w-3 h-3 rounded-full ${contact.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span>{contact.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Contacts;