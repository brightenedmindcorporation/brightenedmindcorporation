import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BM Communication — Photo, vidéo, design et marketing digital",
  description:
    "Photographie professionnelle, vidéo, design et supports, marketing digital, réseaux sociaux et développement web : BM Communication donne de la visibilité à votre activité à Lubumbashi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
