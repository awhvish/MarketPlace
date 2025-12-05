'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusSquare } from 'lucide-react';

interface ArtSectionProps {
  posts: { id: number; image: string }[];
  isOwnProfile: boolean;
  profileUser: { username: string };
}

export default function ArtSection({ posts, isOwnProfile, profileUser }: ArtSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (postId: number) => {
    setImageErrors(prev => new Set(prev).add(postId));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold gradient-text">
          Products Showcase
        </h3>
        {isOwnProfile && (
          <Link
            href={`${profileUser.username}/addpost`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover-scale shadow-lg hover:shadow-purple-500/50"
          >
            <PlusSquare className="w-5 h-5" />
            Add Product
          </Link>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="group relative aspect-square glass rounded-2xl overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 hover-scale hover:border-purple-500/50 shadow-lg hover:shadow-2xl animate-fade-in-up"
              style={{animationDelay: `${index * 0.05}s`}}
              onClick={() => setSelectedImage(post.image)}
            >
              {!imageErrors.has(post.id) && post.image ? (
                <Image
                  src={post.image}
                  alt={`Product ${post.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                  onError={() => handleImageError(post.id)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                  <span className="text-8xl">🎨</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-center">View Details</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 border border-white/10 text-center animate-fade-in-up">
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-6xl">📦</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">No products yet</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {isOwnProfile 
                ? "Start showcasing your products by adding your first item!" 
                : "This user hasn't added any products yet."}
            </p>
            {isOwnProfile && (
              <Link
                href={`${profileUser.username}/addpost`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover-scale"
              >
                <PlusSquare className="w-5 h-5" />
                Add Your First Product
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="relative w-full max-w-5xl">
            <button
              className="absolute -top-14 right-0 text-white/80 hover:text-white text-lg bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center font-bold border border-white/20 hover:border-white/40"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="glass rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={selectedImage}
                alt="Enlarged Product"
                layout="responsive"
                width={1000}
                height={1000}
                objectFit="contain"
                className="bg-black/60"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
