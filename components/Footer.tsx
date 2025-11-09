'use client'

import Link from 'next/link'
import { Github, ShoppingBag, User, Plus, LogIn } from 'lucide-react'
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
    <footer className="bg-black text-gray-400 border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/user/profile/${username}/addpost`} className="flex items-center hover:text-[#6D28D9] transition-colors duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Link>
              </li>
              <li>
                <Link href={`/user/profile/${username}`} className="flex items-center hover:text-[#6D28D9] transition-colors duration-200">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/products" className="flex items-center hover:text-[#6D28D9] transition-colors duration-200">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Products
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <Link href="https://github.com/AmanSingh-tech/MarketPlace" className="flex items-center hover:text-[#6D28D9] transition-colors duration-200">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About MarketPlace</h3>
            <p className="text-sm">
              MarketPlace is an innovative online platform connecting artists with art enthusiasts.
              It empowers sellers to showcase their products and connect with buyers through an innovative bidding system.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/login" className="flex items-center hover:text-[#6D28D9] transition-colors duration-200">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="flex items-center hover:text-[#6D28D9] transition-colors duration-200">
                  <User className="w-4 h-4 mr-2" />
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Made with ❤️. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

