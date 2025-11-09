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

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-serif tracking-wide mb-6 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
          Products Showcase
        </span>
      </h3>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30"
              onClick={() => setSelectedImage(post.image)}
            >
              <Image
                src={post.image}
                alt={`Product ${post.id}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/70 italic text-center text-lg">No products to display yet.</p>
      )}

      {isOwnProfile && (
        <div className="mt-8 text-center">
          <Link
            href={`${profileUser.username}/addpost`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200"
          >
            <PlusSquare className="mr-2" />
            Add New Product
          </Link>
        </div>
      )}

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="relative w-11/12 max-w-4xl">
            <button
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-xl bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={selectedImage}
                alt="Enlarged Product"
                layout="responsive"
                width={800}
                height={800}
                objectFit="contain"
                className="bg-black/40 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
