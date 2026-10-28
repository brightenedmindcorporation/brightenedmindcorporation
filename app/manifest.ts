import type { MetadataRoute } from "next";

// Makes the site installable on a phone (home-screen icon, full screen, no browser bar).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brightened Mind Academia",
    short_name: "BM Academia",
    description: "Cours de langues et de bureautique en ligne : leçons, quiz, audio et certificats.",
    lang: "fr",
    start_url: "/academia/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f3ee",
    theme_color: "#7a1f2b",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Mon tableau de bord", short_name: "Tableau de bord", url: "/academia/dashboard", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Connexion", url: "/login" },
    ],
  };
}
