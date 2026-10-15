import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → the main domain (one canonical address for the site).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bmcorporation-cd.com" }],
        destination: "https://bmcorporation-cd.com/:path*",
        permanent: true,
      },
      // The Swahili presentation page moved so that /academia/swahili/... can
      // be the learning portal (same slug as the course).
      { source: "/academia/swahili", destination: "/academia/kiswahili", permanent: true },
      // Legacy flat English URLs → the multi-language routes.
      { source: "/academy/level1", destination: "/academia/english/level/1", permanent: true },
      { source: "/academy/level2", destination: "/academia/english/level/2", permanent: true },
      { source: "/academy/level3", destination: "/academia/english/level/3", permanent: true },
      { source: "/academy/level1/lesson:n", destination: "/academia/english/level/1/lesson/:n", permanent: true },
      { source: "/academy/level1/quiz:n", destination: "/academia/english/level/1/quiz/:n", permanent: true },
      { source: "/academy/level1/final-quiz", destination: "/academia/english/level/1/final-quiz", permanent: true },
      { source: "/academy/level1/request-certificate", destination: "/academia/english/level/1/certificate", permanent: true },
      // Very old paths.
      { source: "/academy/app/:path*", destination: "/academia/:path*", permanent: true },
      { source: "/academy/login", destination: "/login", permanent: true },
      { source: "/academy/register", destination: "/register", permanent: true },
      // The admin panel lives at /admin.
      { source: "/academy/admin", destination: "/admin", permanent: true },
      // bmlearning was removed; its content is part of the learning portal.
      { source: "/bmlearning", destination: "/academia", permanent: true },
      // The portal now lives under /academia (the public name of the department).
      { source: "/academy", destination: "/academia", permanent: true },
      { source: "/academy/:path*", destination: "/academia/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
