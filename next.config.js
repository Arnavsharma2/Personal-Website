/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig
