'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProviders, signIn } from 'next-auth/react';
import { Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthLayout, AuthFormDivider, AuthFormLink } from '@/components/ui/auth-layout';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
        callbackUrl: `/user/profile/${username}`,
      });

      if (result?.error) {
        setError(result.error);
        console.error('Login error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <AuthLayout
        title="Welcome back"
        subtitle="Enter your credentials to continue"
      >
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-500/20 rounded">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-[13px] text-gray-500">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-[13px] text-gray-500">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium rounded h-10 mt-1 transition-colors"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => router.push('/auth/forgot-password')}
            className="text-sm text-gray-500 hover:text-gray-400"
          >
            Forgot your password?
          </Button>
        </div>

        <AuthFormDivider />

        {providers &&
          Object.values(providers).map(
            (provider) =>
              provider.id !== 'credentials' && (
                <Button
                  key={provider.id}
                  onClick={() => handleGoogleSignIn(provider.id)}
                  variant="outline"
                  className="w-full h-10 bg-[#141414] border-zinc-800 text-white hover:bg-zinc-900 text-sm font-medium"
                >
                  {provider.name === 'Google' && <Chrome className="mr-2 h-5 w-5" />}
                  Sign in with {provider.name}
                </Button>
              )
          )}

        <AuthFormLink
          href="/auth/register"
          text="Don't have an account?"
          label="Sign up"
        />
      </AuthLayout>
    </div>
  );
}
