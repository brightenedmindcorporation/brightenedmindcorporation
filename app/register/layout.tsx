import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription — BM Academia",
  description:
    "Inscrivez-vous à BM Academia : anglais, français, swahili, espagnol, portugais, chinois, bureautique, logiciels et visuel. Trois niveaux, du débutant au professionnel.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
