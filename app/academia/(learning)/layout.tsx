import type { Metadata } from "next";
import FloatingTools from "@/components/academy/FloatingTools";

export const metadata: Metadata = {
  title: "Brightened Mind Academia — Cours de langues en ligne",
  description:
    "Apprenez l'anglais, le français, le swahili, l'espagnol, le portugais ou le chinois avec Brightened Mind Academia. Cours en ligne pour particuliers et entreprises, du niveau débutant au niveau professionnel. Inscrivez-vous dès aujourd'hui.",
};

export default function AcademyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      {/* The public ClientLayout header (and its ThemeToggle) is hidden on
          every /academia/* route in favor of AcademyHeader/admin's own top
          bars — none of which always carry a theme control (AcademyHeader
          hides it on mobile, and some pages like admin, lesson, quiz, live
          have no header at all). One floating toggle here covers all of
          them uniformly instead of patching each page individually. */}
      <FloatingTools />
      {children}
    </div>
  );
}