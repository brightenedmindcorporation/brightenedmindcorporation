"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/academia", label: "Academia" },
  { href: "/academy", label: "Espace Apprentissage" },
  { href: "/communication", label: "Communication" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Le département apprentissage a sa propre coquille (AcademyHeader /
  // future LearningShell) : le header/footer public ne s'y affiche pas.
  const hideLayoutElements = pathname?.startsWith("/academy") ?? false;
  const isHome = pathname === "/";
  const phoneOfficial = "+243988830799";

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Sur la page d'accueil, le header démarre transparent par-dessus le
  // hero puis devient opaque au scroll ; partout ailleurs il est opaque
  // d'emblée (pas de hero plein écran sous lui).
  const transparent = isHome && !scrolled;

  return (
    <>
      {!hideLayoutElements && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            transparent
              ? "bg-transparent border-transparent py-2"
              : "bg-black/80 backdrop-blur-md border-neutral-900 py-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white font-display">
              <Image src="/logo-bm.png" alt="BM Logo" width={40} height={40} style={{ width: "auto", height: "40px" }} priority />
              BM <span className="text-gradient-gold">Corporation</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300 font-sans">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-gold-300 transition">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/devis"
                className="hidden sm:inline-block glow-accent bg-gradient-to-br from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
              >
                Devis / Inscription
              </Link>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden text-white text-2xl leading-none"
                aria-label="Menu"
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="md:hidden bg-black border-t border-neutral-900 px-6 py-6 flex flex-col gap-5 text-neutral-300 font-sans">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-gold-300 transition">
                  {link.label}
                </Link>
              ))}
              <Link href="/devis" className="text-gold-400 font-semibold hover:text-gold-300 transition">
                Devis / Inscription
              </Link>
            </nav>
          )}
        </header>
      )}

      <div className="flex-grow">{children}</div>

      {!hideLayoutElements && (
        <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-6 text-neutral-400 text-sm font-sans">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-base mb-3 font-display">BM Corporation</h3>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                Solutions professionnelles, technologies, assistance et formations certifiantes.
              </p>
              <p className="text-xs text-neutral-400">
                Support Officiel : <span className="text-gold-400 font-semibold">{phoneOfficial}</span>
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Pôles Academia</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/academia#langues" className="hover:text-gold-300 transition">Langues (Français, Anglais...)</Link></li>
                <li><Link href="/academia#bureautique" className="hover:text-gold-300 transition">Bureautique & MS Office</Link></li>
                <li><Link href="/academia#visuel" className="hover:text-gold-300 transition">Visuel & Audiovisuel</Link></li>
                <li><Link href="/academia#logiciels" className="hover:text-gold-300 transition">Logiciels de Gestion</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="hover:text-gold-300 transition">Accueil</Link></li>
                <li><Link href="/academia" className="hover:text-gold-300 transition">Formations</Link></li>
                <li><Link href="/academy" className="hover:text-gold-300 transition">Portail Interactif</Link></li>
                <li><Link href="/devis" className="hover:text-gold-300 transition">Demander un Devis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Contact Rapide</h4>
              <p className="text-xs text-neutral-500 mb-4">Besoin d'aide pour vous inscrire ? Contactez notre secrétariat direct.</p>
              <a
                href="https://wa.me/243988830799"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-neutral-900 hover:bg-neutral-800 hover:border-gold-700/40 text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-neutral-800 transition"
              >
                WhatsApp Direct ↗
              </a>
            </div>
          </div>

          <div className="divider-gold max-w-7xl mx-auto" />

          <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600">
            <p>© 2026 BM Corporation. Tous droits réservés.</p>
            <p className="mt-2 sm:mt-0">Propulsé par BM Academia</p>
          </div>
        </footer>
      )}
    </>
  );
}
