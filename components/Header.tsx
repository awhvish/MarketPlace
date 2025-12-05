"use client";

import { Search, Home, PlusSquare, User, Menu, LogOut, X, Bell } from 'lucide-react';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { PackageSearchIcon } from 'lucide-react';
import { Session } from 'next-auth';


export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const fetchedSession = await getSession();
      if (fetchedSession) setSession(fetchedSession);
    }
    fetchSession();
  }, [])

  const isProductPage = pathname === '/product';
  
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
    router.push(`/product`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { icon: Home, label: 'Home', onClick: () => router.push('/'), path: '/' },
    { icon: PackageSearchIcon, label: 'Browse', onClick: handleArt, path: '/product' },
    { icon: PlusSquare, label: 'Create', onClick: handleAdd, requiresAuth: true },
    { icon: User, label: 'Profile', onClick: handleProf },
  ];

  return (
    <header className="fixed w-full top-0 z-50 glass border-b border-white/10 shadow-2xl backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group relative z-10">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center ring-2 ring-white/20 shadow-lg group-hover:shadow-purple-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-xl font-bold text-white">M</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="gradient-text-animated">Market</span>
                <span className="text-white/90">place</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {/* Search Bar */}
            {isProductPage ? (
              <form onSubmit={handleSearch} className="relative group mr-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 xl:w-80 glass border border-white/20 rounded-full py-2.5 px-5 pr-12 text-sm text-white placeholder:text-white/40 
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:w-96
                  transition-all duration-300 hover:border-white/30"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search 
                    className="text-white/40 group-hover:text-purple-400 transition-colors duration-300" 
                    size={18} 
                  />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 group relative"
                title="Search"
              >
                <Search className="text-white/70 group-hover:text-white transition-colors" size={20} />
              </button>
            )}

            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`relative p-2.5 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon size={20} className="transition-transform group-hover:scale-110" />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  )}
                  {/* Tooltip */}
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 mx-2"></div>

            {/* Notifications */}
            {session?.user && (
              <button
                className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                title="Notifications"
              >
                <Bell size={20} className="text-white/70 group-hover:text-white transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Notifications
                </span>
              </button>
            )}

            {/* User Menu or Auth Buttons */}
            {session?.user ? (
              <div className="flex items-center gap-2 ml-2">
                {/* User Avatar/Profile */}
                <button
                  onClick={handleProf}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                    <span className="text-sm font-bold text-white">
                      {session.user.username?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white/90 hidden xl:block max-w-[100px] truncate">
                    {session.user.username}
                  </span>
                </button>

                {/* Logout */}
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="p-2.5 rounded-xl hover:bg-red-500/10 transition-all duration-300 group relative"
                  title="Logout"
                >
                  <LogOut size={20} className="text-white/70 group-hover:text-red-400 transition-colors" />
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/auth/register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 hover-scale shadow-lg hover:shadow-purple-500/50"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white/80" />}
          </button>
        </div>

        {/* Mobile Search Dropdown */}
        {showSearch && !isProductPage && (
          <div className="lg:hidden pb-4 animate-fade-in-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full glass border border-white/20 rounded-full py-2.5 px-5 pr-12 text-sm text-white placeholder:text-white/40 
                focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="text-white/40" size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 lg:hidden z-40 transition-all duration-500 ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Menu Panel */}
        <nav
          className={`absolute top-0 left-0 w-80 max-w-[85vw] h-full glass border-r border-white/10 flex flex-col transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-3" onClick={() => setMenuOpen(false)}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="text-lg font-bold text-white">Marketplace</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-white/10 transition-all"
            >
              <X size={20} className="text-white/80" />
            </button>
          </div>

          {/* User Info */}
          {session?.user && (
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center ring-2 ring-white/20">
                  <span className="text-lg font-bold text-white">
                    {session.user.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white/60">Logged in as</p>
                  <p className="text-white font-semibold">{session.user.username}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick();
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              {session?.user && (
                <>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <Bell size={20} />
                    <span className="font-medium">Notifications</span>
                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  <div className="my-2 border-t border-white/10"></div>

                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}

              {!session?.user && (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      router.push('/auth/login');
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push('/auth/register');
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
