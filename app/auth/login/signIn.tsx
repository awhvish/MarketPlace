'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProviders, signIn } from 'next-auth/react';
import { Chrome, User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      } else if (result?.ok) {
        // Login successful, redirect to profile
        router.push(`/user/profile/${username}`);
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
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Art Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-floating" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative w-full h-full flex flex-col items-center justify-center p-12 text-center z-10">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mb-6 animate-floating">
              <span className="text-4xl font-bold text-white">M</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 gradient-text-animated">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-md leading-relaxed">
            Continue your journey in discovering and collecting unique products from talented sellers worldwide.
          </p>
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-white/10">
              <h3 className="text-3xl font-bold mb-2 gradient-text">10K+</h3>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
            <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-white/10">
              <h3 className="text-3xl font-bold mb-2 gradient-text">50K+</h3>
              <p className="text-sm text-gray-400">Products Sold</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        {/* Background gradient for mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent lg:hidden"></div>
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block px-4 py-2 glass rounded-full mb-4 border border-white/20">
              <span className="text-sm text-purple-400 font-medium">🔐 Secure Login</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-3">Welcome Back!</h2>
            <p className="text-gray-400 text-lg">Let&apos;s get you back into your account</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            {error && (
              <div className="p-4 text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-xl backdrop-blur-sm animate-fade-in-up flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div className="relative group">
                <User className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-14 pl-12 glass border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-300 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 pl-12 glass border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-300 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-purple-600" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <Button
                variant="link"
                onClick={() => router.push('/auth/forgot-password')}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors p-0"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl h-14 transition-all duration-300 hover-scale shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {providers &&
              Object.values(providers).map(
                (provider) =>
                  provider.id !== 'credentials' && (
                    <Button
                      key={provider.id}
                      onClick={() => handleGoogleSignIn(provider.id)}
                      variant="outline"
                      className="w-full h-14 glass border-white/20 hover:border-white/40 text-white hover:bg-white/5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      {provider.name === 'Google' && <Chrome className="h-5 w-5" />}
                      Continue with {provider.name}
                    </Button>
                  )
              )}
          </div>

          <p className="text-center text-sm text-gray-400 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            Don&apos;t have an account?{' '}
            <Button
              variant="link"
              onClick={() => router.push('/auth/register')}
              className="text-purple-400 hover:text-purple-300 font-semibold p-0"
            >
              Create one now
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
