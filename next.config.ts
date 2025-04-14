import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
      {
        hostname: "*",
        protocol: "http",
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
  },
  /* config options here */
};

export default nextConfig;
