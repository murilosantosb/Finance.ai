import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    quietDeps: true,
  },
  images: {
    remotePatterns: [{hostname: "lh3.googleusercontent.com"}]
  }
};

export default nextConfig;
