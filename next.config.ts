/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pollinations.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
