import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sacred-moonlight-34cc5fdcc7.strapiapp.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;