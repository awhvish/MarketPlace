'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/project.jpg')] bg-cover">
      <div className="w-full max-w-md p-8 bg-black/[0.75] rounded-2xl shadow-md">
        <form className="space-y-6" >
          <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
