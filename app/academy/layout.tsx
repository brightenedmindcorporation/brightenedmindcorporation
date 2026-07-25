import Link from "next/link";
import React from "react";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar de l'Académie */}
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/academy" className="text-xl font-bold text-blue-600">
          BM Academy
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/academy" className="hover:text-blue-600 transition">
            Accueil
          </Link>
          <Link href="/academy/dashboard" className="hover:text-blue-600 transition">
            Tableau de bord
          </Link>
          <Link href="/academy/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Connexion
          </Link>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
    </div>
  );
}