import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

// The public pages only (never the student, teacher or admin areas).
const PAGES: [string, number][] = [
  ["/", 1],
  ["/academia", 0.9],
  ["/academia/francais", 0.8],
  ["/academia/chinois", 0.8],
  ["/academia/espagnol", 0.8],
  ["/academia/kiswahili", 0.8],
  ["/academia/portugais", 0.8],
  ["/academia/bureautique", 0.8],
  ["/academia/logiciels", 0.8],
  ["/academia/visuel", 0.8],
  ["/domestica", 0.8],
  ["/communication", 0.8],
  ["/a-propos", 0.6],
  ["/register", 0.7],
  ["/devis", 0.6],
  ["/suivi", 0.5],
  ["/login", 0.4],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map(([path, priority]) => ({ url: `${SITE}${path === "/" ? "" : path}`, lastModified: now, priority }));
}
