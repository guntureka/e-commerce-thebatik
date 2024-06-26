/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "img.icons8.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
