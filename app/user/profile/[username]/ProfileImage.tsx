'use client'

import { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface ProfileImageProps {
  image: string | null;
  alt: string;
}

export default function ProfileImage({ image, alt }: ProfileImageProps) {
  const [imageError, setImageError] = useState(false);

  if (!image || imageError) {
    return (
      <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <User className="w-16 h-16 md:w-20 md:h-20 text-white" />
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      className="object-cover rounded-full"
      onError={() => setImageError(true)}
    />
  );
}
