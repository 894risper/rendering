import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  source: "/uploads/:path*",
        destination: "/public/uploads/:path*",
};

export default nextConfig;
