import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Spotify CDN
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      // Unsplash CDN
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
