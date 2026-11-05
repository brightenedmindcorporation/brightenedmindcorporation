import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours de portugais en ligne — BM Academia",
  description:
    "Apprenez le portugais en ligne : 3 niveaux, leçons audio et vidéo, exercices, quiz et certificat avec BM Academia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
