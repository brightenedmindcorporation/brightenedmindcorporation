import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Décrivez votre projet et recevez un devis de Brightened Mind Corporation : communication, services professionnels et formations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
