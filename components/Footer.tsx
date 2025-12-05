'use client'

import Link from 'next/link'
import { Github, ShoppingBag, User, Plus, LogIn, Heart, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

export function Footer() {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    async function fetchSession() {
      const fetchedSession = await getSession();
      if (fetchedSession) setSession(fetchedSession);
    }
    fetchSession();
  }, [])

  let username;
  if (session?.user) {
    username = session.user?.username;
  }

  return (
    <footer className="relative bg-[#0a0a0a] text-gray-400 border-t border-white/10 py-16">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <h3 className="text-xl font-bold text-white">Marketplace</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              An innovative platform connecting creative sellers with enthusiastic buyers. Join our thriving community and discover extraordinary products through our seamless bidding experience.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-400 font-medium">Premium Marketplace</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/user/profile/${username}/addpost`} className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-200 group">
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Add Product</span>
                </Link>
              </li>
              <li>
                <Link href={`/user/profile/${username}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-200 group">
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/product" className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-200 group">
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Browse Products</span>
                </Link>
              </li>
              <li>
                <Link href={`/user/liked/${username}`} className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-200 group">
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Favorites</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></span>
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="https://github.com/AmanSingh-tech/MarketPlace" target="_blank" className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-200 group">
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-200">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></span>
              Get Started
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/login" className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200 group">
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-200 group">
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Register</span>
                </Link>
              </li>
            </ul>
            
            {/* Newsletter signup placeholder */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Stay updated with latest products</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover-scale">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Marketplace. Made with <Heart className="w-4 h-4 inline text-red-500" /> by passionate developers.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

