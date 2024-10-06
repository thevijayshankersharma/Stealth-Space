// pages/index.js
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Welcome to Stealth Space</h1>
      <div className="space-x-4">
        <Link href="/login">
          <button className="bg-blue-500 text-white p-2 rounded">Login</button>
        </Link>
        <Link href="/register">
          <button className="bg-green-500 text-white p-2 rounded">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
