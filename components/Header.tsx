"use client";

import { Search, Home, PlusSquare, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">MarketPlace</h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Navigation Menu */}
        <nav
          className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-full lg:h-auto bg-white lg:bg-transparent flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-6 lg:space-y-0 lg:space-x-4 transition-transform transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } lg:transform-none z-50 lg:z-auto`}
        >
          {/* Close Menu Button for Mobile */}
          <button
            className="lg:hidden absolute top-4 right-4 text-gray-800"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>

          {isProductPage && (
            <div className="relative w-full px-4 lg:px-0">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 rounded-md py-1 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          )}

          <Link href='/'>
            <Home
              className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
              size={24}
            />
          </Link>
          <button
            onClick={handleAdd}
            className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
          >
            <PlusSquare size={24} />
          </button>
          <button onClick={handleArt}>
            <PackageSearchIcon
              className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
              size={24}
            />
          </button>
          {/* TODO: ADD LIKE SECTION FOR USERS
          <button onClick={handleLike}>
            <Heart
              className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-red-500"
              size={24}
            />
          </button>*/}
          <button onClick={handleProf}>
            <User
              className="text-gray-800 cursor-pointer transition-transform duration-200 hover:scale-125"
              size={24}
            />
          </button>
        </nav>
      </div>
    </header>
  );
}
