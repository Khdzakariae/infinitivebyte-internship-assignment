import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@clerk/nextjs', '@prisma/client'],
    // Optimiser le bundle CSS
    optimizeCss: true,
  },
  
  // Turbopack configuration (Next.js 16+)
  // Configuration vide pour activer Turbopack sans erreur
  turbopack: {},
};

export default nextConfig;
