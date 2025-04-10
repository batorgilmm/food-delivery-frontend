import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  /* config options here */
};

export default nextConfig;
