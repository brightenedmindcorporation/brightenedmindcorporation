import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirige automatiquement les anciens chemins /academy/app/... vers /academy/...
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