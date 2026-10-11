"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import BmLogo from "@/components/BmLogo";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/academy", label: "Academia" },
  { href: "/communication", label: "Communication" },
  { href: "/domestica", label: "Domestica" },
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
              : "bg-page/80 backdrop-blur-md border-line py-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-ink">
              <BmLogo size={40} />
              BM <span className="text-gradient-red">Corporation</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft font-sans">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-red-500 transition">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle className="hidden sm:inline-flex" />

              <Link
                href="/devis"
                className="hidden sm:inline-block glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
              >
                Devis / Inscription
              </Link>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden text-ink"
                aria-label="Menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="md:hidden bg-page border-t border-line px-6 py-6 flex flex-col gap-5 text-ink-soft font-sans">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-red-500 transition">
                  {link.label}
                </Link>
              ))}
              <Link
                href="/devis"
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-5 py-2.5 rounded-xl text-center transition"
              >
                Devis / Inscription
              </Link>
              <div className="pt-2 border-t border-line">
                <ThemeToggle />
              </div>
            </nav>
          )}
        </header>
      )}

      <div className="flex-grow">{children}</div>

      {!hideLayoutElements && (
        <footer className="bg-surface-sunken border-t border-line py-12 px-6 text-ink-soft text-sm font-sans">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-ink font-bold text-base mb-3">BM Corporation</h3>
              <p className="text-ink-faint text-xs leading-relaxed mb-4">
                Solutions professionnelles, technologies, assistance et formations certifiantes.
              </p>
              <p className="text-xs text-ink-soft">
                Support Officiel : <span className="text-red-500 font-semibold">{phoneOfficial}</span>
              </p>
            </div>

            <div>
              <h4 className="text-ink font-semibold mb-3">Pôles Academia</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/academy" className="hover:text-red-500 transition">Langues (Français, Anglais...)</Link></li>
                <li><Link href="/academia/bureautique" className="hover:text-red-500 transition">Bureautique & MS Office</Link></li>
                <li><Link href="/academia/visuel" className="hover:text-red-500 transition">Visuel & Audiovisuel</Link></li>
                <li><Link href="/academia/logiciels" className="hover:text-red-500 transition">Logiciels de Gestion</Link></li>
                <li><Link href="/domestica" className="hover:text-red-500 transition">Domestica</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ink font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="hover:text-red-500 transition">Accueil</Link></li>
                <li><Link href="/academy" className="hover:text-red-500 transition">Formations / Academia</Link></li>
                <li><Link href="/devis" className="hover:text-red-500 transition">Demander un Devis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ink font-semibold mb-3">Contact Rapide</h4>
              <p className="text-xs text-ink-faint mb-4">Besoin d'aide pour vous inscrire ? Contactez notre secrétariat direct.</p>
              <a
                href="https://wa.me/243988830799"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-surface hover:bg-surface-alt hover:border-red-700/40 text-ink text-xs font-bold px-4 py-2.5 rounded-lg border border-line transition"
              >
                WhatsApp Direct ↗
              </a>
            </div>
          </div>

          <div className="divider-red max-w-7xl mx-auto" />

          <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-ink-faint">
            <p>© 2026 BM Corporation. Tous droits réservés.</p>
            <p className="mt-2 sm:mt-0">Propulsé par BM Corporation</p>
          </div>
        </footer>
      )}
    </>
  );
}
