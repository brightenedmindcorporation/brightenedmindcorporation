import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brightened Mind Academy — Cours de langues en ligne",
  description:
    "Apprenez l'anglais, le français, le swahili, l'espagnol, le portugais ou le chinois avec Brightened Mind Academy. Cours en ligne pour particuliers et entreprises, du niveau débutant au niveau professionnel. Inscrivez-vous dès aujourd'hui.",
};

export default function AcademyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex flex-col">{children}</div>;
}