import * as React from 'react';
import Link from 'next/link';

interface NavigationProps {
  isLoggedIn: boolean;
  handleLogin: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;
}

export default function Navigation({ isLoggedIn, handleLogin, handleRegister }: NavigationProps) {
  return (
    <nav className="bg-black/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            MarketPlace
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/products" 
              className="text-gray-300 hover:text-white transition"
            >
              Browse Art
            </Link>
            
            {isLoggedIn ? (
              <Link 
                href="/signout"
                className="text-gray-300 hover:text-white transition"
              >
                Sign Out
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLogin}
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleRegister}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-800 to-purple-600 text-white rounded-md hover:from-pink-500 hover:to-orange-500 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}