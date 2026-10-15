import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Smaller files first, for slow connections.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
};

export default nextConfig;
