"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const phoneOfficial = "+243988830799";

  return (
    <>
      {/* BARRE DE NAVIGATION (Masquée sur la page d'accueil "/") */}
      {!isHomePage && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full"></span>
              BM <span className="text-red-600">Corporation</span>
            </Link>

            {/* Liens de navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
              <Link href="/" className="hover:text-white transition">Accueil</Link>
              <Link href="/academia" className="hover:text-white transition">Academia</Link>
              <Link href="/academy" className="hover:text-white transition">Espace Élève</Link>
              <Link href="/communication" className="hover:text-white transition">Communication</Link>
            </nav>

            {/* Bouton Devise / Inscription */}
            <div className="flex items-center gap-4">
              <Link 
                href="/devis" 
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-600/20"
              >
                Devis / Inscription
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* CONTENU PRINCIPAL DE LA PAGE */}
      <div className="flex-grow">
        {children}
      </div>

      {/* PIED DE PAGE (Masqué sur la page d'accueil "/") */}
      {!isHomePage && (
        <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-6 text-neutral-400 text-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-base mb-3">BM Corporation</h3>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                Solutions professionnelles, technologies, assistance et formations certifiantes.
              </p>
              <p className="text-xs text-neutral-400">
                Support Officiel : <span className="text-red-500 font-semibold">{phoneOfficial}</span>
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Pôles Academia</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/academia#langues" className="hover:text-white transition">Langues (Français, Anglais...)</Link></li>
                <li><Link href="/academia#bureautique" className="hover:text-white transition">Bureautique & MS Office</Link></li>
                <li><Link href="/academia#visuel" className="hover:text-white transition">Visuel & Audiovisuel</Link></li>
                <li><Link href="/academia#logiciels" className="hover:text-white transition">Logiciels de Gestion</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link href="/academia" className="hover:text-white transition">Formations</Link></li>
                <li><Link href="/academy" className="hover:text-white transition">Portail Interactif</Link></li>
                <li><Link href="/devis" className="hover:text-white transition">Demander un Devis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Contact Rapide</h4>
              <p className="text-xs text-neutral-500 mb-4">Besoin d'aide pour vous inscrire ? Contactez notre secrétariat direct.</p>
              <a 
                href="https://wa.me/243988830799" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-neutral-800 transition"
              >
                WhatsApp Direct ↗
              </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600">
            <p>© 2026 BM Corporation. Tous droits réservés.</p>
            <p className="mt-2 sm:mt-0">Propulsé par BM Academia</p>
          </div>
        </footer>
      )}
    </>
  );
}