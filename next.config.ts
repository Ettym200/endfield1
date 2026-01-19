import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações de imagens e assets
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
