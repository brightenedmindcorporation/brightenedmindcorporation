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
      {
        source: "/academy/login",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/academy/register",
        destination: "/register",
        permanent: true,
      },
      {
        // bmlearning a été retiré ; son contenu est absorbé par la refonte
        // du département d'apprentissage (/academy).
        source: "/bmlearning",
        destination: "/academy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;