import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation aux logiciels de gestion — BM Academia",
  description:
    "Maîtrisez les logiciels de gestion avec une formation en ligne en 3 niveaux, exercices pratiques, quiz et certificat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
