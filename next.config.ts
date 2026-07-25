import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Redirige tout lien contenant /academy/app/... vers /academy/...
        source: "/academy/app/:path*",
        destination: "/academy/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;