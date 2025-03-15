import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lookee.nwhco.ir'
      },
    ],
  },
};

export default nextConfig;
