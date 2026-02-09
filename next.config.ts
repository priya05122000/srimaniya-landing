import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [100],
    domains: [
      "cdn.prod.website-files.com",
      "p645224.mittwaldserver.info",
      "images.unsplash.com",
      "api.srimaniyainstitute.in",
      "localhost",
      "127.0.0.1",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.srimaniyainstitute.in",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
