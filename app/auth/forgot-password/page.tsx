"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link has been sent to your email.');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95">
      <div className="w-full max-w-md p-8 space-y-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Reset Password</h1>
          <p className="text-sm text-zinc-400">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/20 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-zinc-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          {message && (
            <p className={`text-sm text-center ${
              message.includes('error') ? 'text-red-400' : 'text-green-400'
            }`}>
              {message}
            </p>
          )}
        </form>

        <div className="text-center">
          <button
            onClick={() => router.push('/auth/login')}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}