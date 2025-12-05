"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [validToken, setValidToken] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Verify token validity
    const verifyToken = async () => {
      if (!token) {
        setMessage('Invalid or missing reset token');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-reset-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setValidToken(true);
        } else {
          setMessage('Invalid or expired reset token');
        }
      } catch {
        setMessage('An error occurred while verifying the token');
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been reset successfully');
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setMessage(data.error || 'Failed to reset password');
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/95">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
          <p className="text-red-400 text-center">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95">
      <div className="w-full max-w-md p-8 space-y-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Reset Your Password</h1>
          <p className="text-sm text-zinc-400">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-zinc-200">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/20 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-zinc-500"
              required
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-200">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/20 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-zinc-500"
              required
              minLength={8}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>

          {message && (
            <p className={`text-sm text-center ${
              message.includes('successfully') ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}