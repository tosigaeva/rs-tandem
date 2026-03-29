import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // turbopack: {
  //   root: process.cwd(),
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
