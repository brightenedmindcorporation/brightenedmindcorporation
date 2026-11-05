import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours d'espagnol en ligne — BM Academia",
  description:
    "Apprenez l'espagnol en ligne : 3 niveaux, leçons audio et vidéo, exercices d'écriture, quiz et certificat avec BM Academia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
