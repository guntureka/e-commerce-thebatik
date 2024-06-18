/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.icons8.com",
        protocol: "https",
      },
      {
        hostname: "nefugoazkvksizyotlwa.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
