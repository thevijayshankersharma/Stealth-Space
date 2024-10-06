// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      } catch (err) {
        setError(err.message);
        router.push("/login"); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    router.push("/login"); // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Email: {user.email}</p>
      {user.username && <p>Username: {user.username}</p>}

      {/* Render Avatar */}
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full mb-4"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }} // Correct fallback path
        />
      ) : (
        <img
          src="/default-avatar.png"
          alt="Default Avatar"
          className="w-20 h-20 rounded-full mb-4"
        />
      )}

      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
