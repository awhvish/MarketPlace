'use client';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import Link from 'next/link';
import { getProviders, signIn } from 'next-auth/react';
import { ChromeIcon as Google } from 'lucide-react';
import { login } from '@/actions/login';
=======
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProviders, signIn } from 'next-auth/react';
import { ChromeIcon as Google } from 'lucide-react';
>>>>>>> 2a2ccd0f384a41650db6e07cd99c943aecaad690

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD

  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);
  const [error, setError] = useState('');
=======
  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);
  const router = useRouter();
>>>>>>> 2a2ccd0f384a41650db6e07cd99c943aecaad690

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD

    const result = await login({ username, password });

    if (result.success) {
      const signin = await signIn('credentials', { redirect: true, username, password, callbackUrl: `/user/profile/${username}` });
      if (signin?.error) setError(signin?.error);
    }
    else {
      if (result?.error) setError(result?.error);
    }

  };

  const handleGoogleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' }); // TODO
=======
    const providerId = 'credentials'; // Assuming 'credentials' is configured in your NextAuth backend
    const result = await signIn(providerId, {
      redirect: false,
      username,
      password,
    });

    if (result?.ok) {
      router.push(`/user/profile/${username}`);
    } else {
      console.error('Failed to log in');
    }
  };

  const handleGoogleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' });
>>>>>>> 2a2ccd0f384a41650db6e07cd99c943aecaad690
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Sign In
          </button>
        </form>
<<<<<<< HEAD
        <div className='text-red-500'>
          {error}
        </div>
=======
>>>>>>> 2a2ccd0f384a41650db6e07cd99c943aecaad690
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="border-t border-gray-200 flex-grow"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>
        {providers &&
          Object.values(providers).map(
            (provider) =>
              provider.id !== 'credentials' && (
                <button
                  key={provider.id}
                  onClick={() => handleGoogleSignIn(provider.id)}
                  className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
                >
                  {provider.name === 'Google' && <Google className="mr-2 h-5 w-5" />}
                  Sign in with {provider.name}
                </button>
              )
          )}
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don&apos;t have an account?{' '}
          <Link href="register" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
