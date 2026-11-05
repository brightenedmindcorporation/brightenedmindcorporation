import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours de kiswahili en ligne — BM Academia",
  description:
    "Apprenez le kiswahili en ligne : leçons, audio, exercices, quiz et certificat, du niveau débutant au niveau professionnel.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
