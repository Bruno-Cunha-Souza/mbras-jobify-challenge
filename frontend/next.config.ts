/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "remotive.com",
      },
    ],
  },
};

module.exports = nextConfig;
