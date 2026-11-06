import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/teacher", "/paiement", "/verify-email", "/academia/dashboard", "/academia/placement"] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
