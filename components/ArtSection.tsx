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
      <h3 className="text-lg font-semibold mb-4">Arts to be showcased:</h3>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedImage(post.image)} // Open modal with selected image
            >
              <Image
                src={post.image}
                alt={`Art ${post.id}`}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No art to be displayed yet.</p>
      )}

      {isOwnProfile && (
        <Link
          href={`${profileUser.username}/addpost`}
          className="w-full mt-4 bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 text-center block"
        >
          <PlusSquare className="inline mx-2" />
          Upload Your Art
        </Link>
      )}

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-11/12 max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white text-xl bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
              onClick={() => setSelectedImage(null)} // Close modal
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Enlarged Art"
              layout="responsive"
              width={800}
              height={800}
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
