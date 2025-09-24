/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel-optimized configuration
  experimental: {
    // Enable memory optimization for Vercel
    memoryBasedWorkersCount: true,
  },
  // Optimize for production
  swcMinify: true,
  // Reduce memory usage
  compress: true,
  // Optimize images for Vercel
  images: {
    unoptimized: false,
    domains: ['localhost'],
  },
  // Font optimization
  optimizeFonts: true,
  // Vercel-specific optimizations
  output: 'standalone',
  // Memory management for Vercel
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable telemetry for Vercel (moved to environment variable)
}

module.exports = nextConfig
