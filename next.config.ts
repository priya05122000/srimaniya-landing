import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.srimaniyainstitute.in',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
};

export default nextConfig;
