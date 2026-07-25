import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brightened Mind Academy — Cours d'anglais en ligne",
  description:
    "Apprenez l'anglais professionnellement avec Brightened Mind Academy. Cours en ligne pour particuliers et entreprises, du niveau débutant à business English. Inscrivez-vous dès aujourd'hui.",
};

export default function AcademyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-full flex flex-col">{children}</div>;
}