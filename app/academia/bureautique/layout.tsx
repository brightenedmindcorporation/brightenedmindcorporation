import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation en bureautique (MS Office) — BM Academia",
  description:
    "Word, Excel, PowerPoint : une formation en bureautique en ligne en 3 niveaux, avec exercices, quiz et certificat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
