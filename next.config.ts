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
      {
        // Academia (page vitrine) et Espace Apprentissage (portail
        // interactif) ont fusionné en un seul onglet pour ne plus
        // dérouter les visiteurs. Seule la page d'accueil /academia est
        // redirigée : ses sous-pages (langues, bureautique, visuel,
        // logiciels) restent des destinations valides, liées depuis le
        // nouveau hub /academy.
        source: "/academia",
        destination: "/academy",
        permanent: true,
      },
      // Anciennes URLs anglaises "à plat" -> nouvelles routes dynamiques
      // multi-langues (voir app/academy/[lang]/level/[level]/...).
      {
        source: "/academy/level1",
        destination: "/academy/english/level/1",
        permanent: true,
      },
      {
        source: "/academy/level2",
        destination: "/academy/english/level/2",
        permanent: true,
      },
      {
        source: "/academy/level3",
        destination: "/academy/english/level/3",
        permanent: true,
      },
      {
        source: "/academy/level1/lesson:n",
        destination: "/academy/english/level/1/lesson/:n",
        permanent: true,
      },
      {
        source: "/academy/level1/quiz:n",
        destination: "/academy/english/level/1/quiz/:n",
        permanent: true,
      },
      {
        source: "/academy/level1/final-quiz",
        destination: "/academy/english/level/1/final-quiz",
        permanent: true,
      },
      {
        source: "/academy/level1/request-certificate",
        destination: "/academy/english/level/1/certificate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;