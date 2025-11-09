'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

const GavelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.527.7.844 1.576.844 2.523 0 1.641-.835 3.105-2.117 3.979a4.482 4.482 0 0 1-2.646.834 4.505 4.505 0 0 1-4.451-3.714.75.75 0 0 1 .688-.869 13.67 13.67 0 0 0 3.362-.442l-3.197-3.197a.75.75 0 0 1 .348-1.248A5.25 5.25 0 0 1 12 6.75ZM4.375 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
  </svg>
);

const ArtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2c5.522 0 10 4.478 10 10s-4.478 10-10 10S2 17.522 2 12 6.478 2 12 2zm-1 5v10h2V7h-2z" />
  </svg>
);

export default function MarketplacePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getSession().then((sessionData) => {
      setSession(sessionData);
      setIsLoggedIn(!!sessionData?.user);
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggedIn && session?.user?.username) {
      router.push(`/user/profile/${session.user.username}`);
    } else {
      router.push('/auth/login');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/auth/register');
  };

  const handleBidding = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/products');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {isLoggedIn ? (
        <Header />
      ) : (
        <Navigation 
          isLoggedIn={isLoggedIn} 
          handleLogin={handleLogin} 
          handleRegister={handleRegister} 
        />
      )}

      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-10"></div>
        <div 
          className="absolute inset-0 bg-[url('/uploads/1734283806715-1666424870_untitled-design-23.jpg')] bg-cover bg-center animate-ken-burns"
          style={{
            animation: 'kenBurns 20s ease infinite alternate',
          }}
        ></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-wider animate-fade-in">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Marketplace
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            <span className="inline-block px-6 py-2 bg-black/40 backdrop-blur-sm rounded-lg text-white/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10">
              Where sellers and buyers connect to discover unique products and opportunities
            </span>
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleBidding}
              className="flex items-center px-6 py-3 mr-4 bg-gradient-to-r from-indigo-800 from-25% to-purple-600 hover:from-pink-500 hover:to-orange-500 text-white text-lg rounded-md transition"
            >
              <GavelIcon /> <span className="ml-2">Start Bidding</span>
            </button>
            <button
              onClick={handleLogin}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-800 from-25% to-purple-600 hover:from-pink-500 hover:to-orange-500 text-white text-lg rounded-md transition"
            >
              <ArtIcon /> <span className="ml-2">Become a Seller</span>
            </button>
          </div>
        </div>
      </header>

      <section className="relative bg-black py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Discover Extraordinary <br/>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text animate-text-shimmer">
                  Artistic Treasures
                </span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Immerse yourself in a curated collection of masterpieces. Join our vibrant community of artists and collectors in a seamless digital marketplace.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push('/products')}
                  className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-purple-500/30 hover:border-purple-500/60 rounded-md transition-all duration-300"
                >
                  <span className="relative z-10 text-lg text-white group-hover:text-purple-300 transition-colors">
                    Explore Products
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={() => router.push('/products?filter=trending')}
                  className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-pink-500/30 hover:border-pink-500/60 rounded-md transition-all duration-300"
                >
                  <span className="relative z-10 text-lg text-white group-hover:text-pink-300 transition-colors">
                    Trending Products
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {[
                    '1734283600859-visual-arts-image.jpg',
                    '1734283673286-starry-night.jpg',
                    '1734283768396-Voices_Arts_main.jpg',
                    '1734283806715-1666424870_untitled-design-23.jpg'
                  ].map((image, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-md group">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={`/uploads/${image}`}
                          alt={`Featured artwork ${i + 1}`}
                          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 animate-floating"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}