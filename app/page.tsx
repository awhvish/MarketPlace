'use client'

import React, { useState, useEffect } from 'react'
import { Footer } from '@/components/Footer'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

// SVG Icons
const ArtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gray-800">
    <path d="M11.25 4.533a9.707 9.707 0 0 0-5.932 4.562 5.706 5.706 0 0 1 5.932-4.562ZM8.25 7.5c0-.676.398-1.247.957-1.5a9.554 9.554 0 0 0-1.74 2.404A1.5 1.5 0 0 1 8.25 7.5Zm10.5 4.759a9.706 9.706 0 0 1-5.932 4.562A5.707 5.707 0 0 0 18.75 12c0-.676-.398-1.247-.957-1.5a9.554 9.554 0 0 1 1.74 2.404 1.5 1.5 0 0 0 .457-2.405Zm-7.5 6.791a9.706 9.706 0 0 0 5.932-4.562 5.706 5.706 0 0 1-5.932 4.562Zm.75-5.291a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
  </svg>
)

const GavelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.527.7.844 1.576.844 2.523 0 1.641-.835 3.105-2.117 3.979a4.482 4.482 0 0 1-2.646.834 4.505 4.505 0 0 1-4.451-3.714.75.75 0 0 1 .688-.869 13.67 13.67 0 0 0 3.362-.442l-3.197-3.197a.75.75 0 0 1 .348-1.248A5.25 5.25 0 0 1 12 6.75ZM4.375 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
    <path d="m10.175 10.78-3.626 3.99 1.353 1.284 3.247-3.833a3.005 3.005 0 0 1-1.132-1.441H10.5a9.395 9.395 0 0 1-2.07-.624l-.51.666.726.614a9.262 9.262 0 0 1-.513 2.786l1.48 1.272a12.45 12.45 0 0 1-.445-3.74l.444-.444h-.884a10.557 10.557 0 0 1-.926-1.464l-.807.851a10.803 10.803 0 0 1-.369-3.65H9.5l.116-1.028a11.521 11.521 0 0 1-1.889-2.05L4.46 11.994a1.125 1.125 0 1 0 1.59 1.59l1.237-1.237.85 1.022Z" />
  </svg>
)

export default function MarketplacePage() {

  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the session data
    getSession().then(sessionData => {
      setSession(sessionData);
      // Set login state based on session data
      if (sessionData?.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);


  const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if(isLoggedIn) {
      if (session && session.user && session.user.username) {
        router.push(`/user/profile/${(session && session.user) ? session.user.username : ""}`);
      }
    }
    else router.push('/auth/login')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/auth/register')
  }
  const handleBidding = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/products');
  }


  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navigation */}
        {isLoggedIn ? (
          <Header />
        ) : (
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex items-center">
                <ArtIcon />
                <span className="text-2xl font-bold text-gray-800">MarketPlace</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Register
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Hero Section */}
        <header className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Unleash the Value of Your Art
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A marketplace where artists connect with collectors through competitive bidding
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleBidding} className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                <GavelIcon /> <span className="ml-2">Start Bidding</span>
              </button>
              <button onClick={handleLogin} className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                <ArtIcon /> <span className="ml-2">Become a Seller</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="bg-gray-50 py-16 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-200 p-8 rounded-lg flex items-center justify-between space-x-8">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                  Explore All Bids: Current and Closed
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Stay on top of the bidding action by viewing both ongoing and completed bids.
                  Whether you&apos;re looking to place a bid or review past auctions, we have all the information you need.
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/products')}
                  className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  View Current Bids
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );

}
