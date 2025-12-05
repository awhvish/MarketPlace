/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
        },
        {
          protocol: 'https',
          hostname: 'api.dicebear.com',
        },
        {
          protocol: 'https',
          hostname: '*.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
        }
      ],
      unoptimized: true
    },
    output: 'standalone',
    poweredByHeader: false,
};
  

export default nextConfig;
