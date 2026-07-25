// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/academy/app/:path*",
        destination: "/academy/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;