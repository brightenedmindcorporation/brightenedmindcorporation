import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours de chinois en ligne — BM Academia",
  description:
    "Apprenez le chinois (mandarin) en ligne : caractères, pinyin, dictées, quiz et certificat, du niveau débutant au niveau professionnel.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
