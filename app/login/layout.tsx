import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à votre espace Brightened Mind : cours BM Academia, leçons, quiz et certificats.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
