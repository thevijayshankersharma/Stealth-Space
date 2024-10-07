import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { User, ArrowLeft, Camera, Save } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setUsername(data.username || '');
      } catch (err) {
        setError(err.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    const formData = new FormData();
    formData.append('username', username);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await fetch("/api/auth/profile", {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setUser(data.user);
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
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

  return (
    <>
      <Head>
        <title>Update Profile - Stealth Space</title>
        <meta name="description" content="Update your Stealth Space profile" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Your Profile
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={user.avatar || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-center text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}

            <div>
              <button
                type="submit"
                disabled={updating}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {updating ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <Save className="mr-2" size={18} />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;