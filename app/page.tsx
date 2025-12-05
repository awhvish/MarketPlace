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
    router.push('/product');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
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
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a] z-10"></div>
        <div 
          className="absolute inset-0 bg-[url('/uploads/1734283806715-1666424870_untitled-design-23.jpg')] bg-cover bg-center"
          style={{
            animation: 'kenBurns 20s ease infinite alternate',
          }}
        ></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-floating"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-floating" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          {/* Main Headline */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/20 mb-6 shadow-lg">
              ✨ Premium Digital Marketplace
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 tracking-wider">
            <span className="inline-block gradient-text-animated drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] font-bold">
              Marketplace
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 font-light max-w-4xl mx-auto leading-relaxed">
            <span className="inline-block px-8 py-4 glass glass-hover rounded-2xl text-white shadow-2xl border border-white/20">
              Where creativity meets opportunity - Connect with sellers and discover extraordinary products
            </span>
          </p>
          
          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <button
              onClick={handleBidding}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg rounded-2xl transition-all duration-300 hover-scale shadow-2xl hover:shadow-purple-500/50 overflow-hidden min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                <GavelIcon />
                Start Bidding
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={handleLogin}
              className="group relative px-8 py-4 glass glass-hover text-white text-lg rounded-2xl transition-all duration-300 hover-scale shadow-xl border-2 border-white/20 hover:border-white/40 min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                <ArtIcon />
                Become a Seller
              </span>
            </button>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">10K+</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Active Users</p>
            </div>
            <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">50K+</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Products Sold</p>
            </div>
            <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">$2M+</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Total Sales</p>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-[#0a0a0a] py-32">
        {/* Decorative elements with enhanced effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300 font-medium">
                  🎯 Discover Premium Products
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                Discover Extraordinary <br/>
                <span className="gradient-text-animated text-6xl md:text-7xl font-bold">
                  Treasures
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Immerse yourself in a curated collection of masterpieces. Join our vibrant community of sellers and buyers in a seamless digital marketplace where every transaction tells a story.
              </p>
              
              {/* Feature highlights */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Secure Transactions</h3>
                    <p className="text-sm text-gray-400">Protected bidding with verified sellers and buyers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Real-time Bidding</h3>
                    <p className="text-sm text-gray-400">Experience live auction dynamics instantly</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Premium Quality</h3>
                    <p className="text-sm text-gray-400">Handpicked products from verified sellers</p>
                  </div>
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => router.push('/product')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl transition-all duration-300 hover-scale shadow-lg hover:shadow-purple-500/50"
                >
                  <span className="relative z-10 text-lg text-white font-semibold flex items-center gap-2">
                    Explore Products
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
                
                <button
                  onClick={() => router.push('/product?filter=trending')}
                  className="group relative px-8 py-4 glass glass-hover border-2 border-pink-500/30 hover:border-pink-500/60 rounded-2xl transition-all duration-300 hover-scale"
                >
                  <span className="relative z-10 text-lg text-white font-semibold flex items-center gap-2">
                    Trending Now
                    <span className="text-pink-400">🔥</span>
                  </span>
                </button>
              </div>
            </div>
            
            {/* Image Grid Side */}
            <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-2 gap-3 p-3">
                  {[
                    '1734283600859-visual-arts-image.jpg',
                    '1734283673286-starry-night.jpg',
                    '1734283768396-Voices_Arts_main.jpg',
                    '1734283806715-1666424870_untitled-design-23.jpg'
                  ].map((image, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={`/uploads/${image}`}
                          alt={`Featured artwork ${i + 1}`}
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          priority={i === 0}
                        />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="glass rounded-full p-3">
                          <span className="text-white text-2xl">🎨</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-floating"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-40 animate-floating" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}