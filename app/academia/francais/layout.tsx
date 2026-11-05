import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours de français en ligne — BM Academia",
  description:
    "Apprenez le français en ligne : 3 niveaux, 12 leçons par niveau, audio, vidéo, quiz et certificat avec BM Academia.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
