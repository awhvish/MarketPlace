"use client";

import { Search, Home, PlusSquare, User, Menu, LogOut } from 'lucide-react';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { PackageSearchIcon } from 'lucide-react';
import { Session } from 'next-auth';


export default function Header() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProductPage, setIsProductPage] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const fetchedSession = await getSession();
      if (fetchedSession) setSession(fetchedSession);
    }
    fetchSession();
  }, [])


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsProductPage(window.location.pathname === '/products');
    }
  }, []);
  
  const handleAdd = () => {
    if (session?.user) {
      const username = session.user.username; 
      router.push(`/user/profile/${username}/addpost`);
    } else {
      router.push("/auth/login"); 
    }
  };

  const handleProf = () => {
    if (session?.user) {
      router.push(`/user/profile/${session.user.username}`);
    } else {
      router.push('/auth/login');
    }
  };

  const handleArt = () => {
    router.push(`/products`);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
          <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center ring-2 ring-white/10 shadow-lg">
            <span className="text-xl font-serif text-white font-medium">M</span>
          </div>
          <h1 className="text-2xl font-serif tracking-wider text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 animate-textShimmer">
              Market
            </span>
            <span className="text-white/90">place</span>
          </h1>
        </div>        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Navigation Menu */}
          <nav
            className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-full lg:h-auto bg-black/95 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-6 lg:space-y-0 lg:space-x-8 transition-all duration-300 transform ${
              menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } lg:transform-none z-50 lg:z-auto`}
          >
            {/* Close Menu Button for Mobile */}
            <button
              className="lg:hidden absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Menu size={24} />
            </button>

          {isProductPage && (
            <div className="relative w-full max-w-md px-4 lg:px-0 group">
              <input
                type="text"
                placeholder="Search artwork..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-5 pr-12 text-sm text-white/90 placeholder:text-white/40 
                focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 
                transition-all duration-300 group-hover:bg-white/8"
              />
              <Search 
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/40 
                group-hover:text-white/60 transition-colors duration-300" 
                size={18} 
              />
            </div>
          )}

          <div className="flex items-center space-x-8">
            <Link href='/' className="group">
              <Home
                className="text-white/70 group-hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110"
                size={24}
              />
            </Link>
            <button
              onClick={handleAdd}
              className="group"
            >
              <PlusSquare 
                className="text-white/70 group-hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110"
                size={24} 
              />
            </button>
            <button onClick={handleArt} className="group">
              <PackageSearchIcon
                className="text-white/70 group-hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110"
                size={24}
              />
            </button>
            <button onClick={handleProf} className="group">
              <User
                className="text-white/70 group-hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110"
                size={24}
              />
            </button>
            {session?.user && (
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="group"
                title="Logout"
              >
                <LogOut
                  className="text-white/70 group-hover:text-white cursor-pointer transition-all duration-300 group-hover:scale-110"
                  size={24}
                />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
