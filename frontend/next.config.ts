import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    // Важно за правилно зареждане
    unoptimized: true, // Това ще реши проблема временно
  },
};

export default nextConfig;