import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Package } from 'lucide-react';

interface NavigationProps {
  isLoggedIn: boolean;
  handleLogin: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;
}

export default function Navigation({ isLoggedIn, handleLogin, handleRegister }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Background with blur */}
      <div className="absolute inset-0 glass border-b border-white/10 shadow-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center ring-2 ring-white/20 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="gradient-text-animated">Market</span>
                <span className="text-white/90">place</span>
              </h1>
              <p className="text-xs text-gray-400 -mt-0.5">Digital Marketplace</p>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/product" 
              className="group relative flex items-center gap-2 px-4 py-2.5 glass-hover rounded-xl text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium border border-white/10 hover:border-purple-500/30"
            >
              <Package className="w-4 h-4" />
              <span>Browse Products</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>
            </Link>
            
            {isLoggedIn ? (
              <Link 
                href="/signout"
                className="px-6 py-2.5 glass glass-hover rounded-xl text-gray-300 hover:text-white transition-all duration-300 text-sm font-semibold border border-white/20 hover:border-red-500/40"
              >
                Sign Out
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleLogin}
                  className="px-5 py-2.5 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105"
                >
                  Login
                </button>
                <button 
                  onClick={handleRegister}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 text-sm font-semibold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </nav>
  );
}