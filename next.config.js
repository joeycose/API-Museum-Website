/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
