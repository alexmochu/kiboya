import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    // Allow local /uploads/ paths
    unoptimized: false,
  },
  // Required for Passenger / shared hosting
  output: 'standalone',
}

export default nextConfig
