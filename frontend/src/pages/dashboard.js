import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Mail, User, Shield, Edit, MessageSquare, Bell, Settings, Moon, Sun, Users, Calendar, Activity } from 'lucide-react';
import Chat from '../components/Chat';
import Contacts from '../components/Contacts';
import { initializeSocket, onNewMessage } from '../utils/socket';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        initializeSocket(data.id);

        onNewMessage((message) => {
          if (message.sender !== selectedContact?.id) {
            setNotifications(prev => [...prev, message]);
          }
        });
      } catch (err) {
        setError(err.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, selectedContact]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Stealth Space</title>
        <meta name="description" content="Your Stealth Space Dashboard" />
      </Head>
      <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Stealth Space</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className={`flex items-center space-x-2 p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Users className="h-5 w-5" />
                  <span>Contacts</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center space-x-2 p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Calendar className="h-5 w-5" />
                  <span>Schedule</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center space-x-2 p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Activity className="h-5 w-5" />
                  <span>Activity</span>
                </a>
              </li>
            </ul>
          </nav>
          <Contacts 
            onSelectContact={(contact) => {
              setSelectedContact(contact);
              setShowChat(true);
              setNotifications(prev => prev.filter(n => n.sender !== contact.id));
            }} 
            darkMode={darkMode}
          />
        </aside>
        <main className="flex-1 flex flex-col">
          <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 flex justify-between items-center`}>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {notifications.map((notification, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}
                          role="menuitem"
                        >
                          {notification.content}
                        </a>
                      ))}
                      {notifications.length === 0 && (
                        <p className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          No new notifications
                        </p>
                      )}
                      {notifications.length > 0 && (
                        <button
                          onClick={clearNotifications}
                          className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-gray-100'}`}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => router.push('/profile')}
                className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Edit className="h-5 w-5 mr-1" />
                Edit Profile
              </button>
              <button
                onClick={toggleDarkMode}
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            <AnimatePresence mode="wait">
              {showChat && selectedContact ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Chat recipient={selectedContact} darkMode={darkMode} />
                </motion.div>
              ) : (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className={`max-w-4xl w-full mx-auto space-y-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-xl shadow-2xl`}
                >
                  <div className="text-center">
                    <h2 className={`mt-6 text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome to Your Dashboard, {user.username || 'User'}
                    </h2>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Here's your account information and activity summary
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <motion.img
                          src={user.avatar || "/default-avatar.png"}
                          alt={user.avatar ? "User Avatar" : "Default Avatar"}
                          className="w-32 h-32 rounded-full border-4 border-blue-500"
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      </div>

                      <div className="space-y-4">
                        <motion.div 
                          className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          whileHover={{ x: 5 }}
                        >
                          <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span>{user.email}</span>
                        </motion.div>
                        {user.username && (
                          <motion.div 
                            className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            whileHover={{ x: 5 }}
                          >
                            <User className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span>{user.username}</span>
                          </motion.div>
                        )}
                        <motion.div 
                          className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          whileHover={{ x: 5 }}
                        >
                          <Shield className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span>Account secured with end-to-end encryption</span>
                        </motion.div>
                      </div>
                    </div>

                    <div className={`space-y-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Activity Summary</h3>
                      <div className="space-y-4">
                        <motion.div 
                          className={`flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          whileHover={{ x: 5 }}
                        >
                          <span>Messages Sent</span>
                          <span className="font-semibold">152</span>
                        </motion.div>
                        <motion.div 
                          className={`flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          whileHover={{ x: 5 }}
                        >
                          <span>Active Chats</span>
                          <span className="font-semibold">7</span>
                        </motion.div>
                        <motion.div 
                          className={`flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          whileHover={{ x: 5 }}
                        >
                          <span>Last Login</span>
                          <span className="font-semibold">2 hours ago</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <button className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'} transition duration-200 ease-in-out`}>
                        <MessageSquare className="h-6 w-6 mx-auto mb-2" />
                        <span>New Chat</span>
                      </button>
                      <button className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'} transition duration-200 ease-in-out`}>
                        <Users className="h-6 w-6 mx-auto mb-2" />
                        <span>Add Contact</span>
                      </button>
                      <button className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'} transition duration-200 ease-in-out`}>
                        <Settings className="h-6 w-6 mx-auto mb-2" />
                        <span>Settings</span>
                      </button>
                      <button className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'} transition duration-200 ease-in-out`}>
                        <Activity className="h-6 w-6 mx-auto mb-2" />
                        <span>View Activity</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;