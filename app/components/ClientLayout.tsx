"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ScrollButtons from "@/components/ScrollButtons";
import BackButton from "@/components/BackButton";
import VisitTracker from "@/components/VisitTracker";
import PwaRegister from "@/components/PwaRegister";
import InstallButton from "@/components/InstallButton";
import BmLogo from "@/components/BmLogo";
import WhatsappFloat from "@/components/WhatsappFloat";
import { availableLanguages } from "@/content/curriculum";
import { TRACKING_ENABLED } from "@/lib/features";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/academia", label: "Academia" },
  { href: "/communication", label: "Communication" },
  { href: "/domestica", label: "Domestica" },
  ...(TRACKING_ENABLED ? [{ href: "/suivi", label: "Suivi colis" }] : []),
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Le département apprentissage a sa propre coquille (AcademyHeader /
  // future LearningShell) : le header/footer public ne s'y affiche pas.
  // Le panneau admin (/admin) garde le header public — sa page réserve
  // l'espace en haut (pt-28) pour que son propre en-tête reste visible.
  const LEARNING_PREFIXES = ["/academia/dashboard", "/academia/program", ...availableLanguages.map((l) => `/academia/${l.slug}`)];
  // L'éditeur de sites et les sites des clients (/s/…) occupent tout l'écran.
  const BUILDER_PREFIXES = ["/dev/sites", "/sites/editeur", "/s/", "/espace"];
  const hideLayoutElements =
    pathname === "/academia" || LEARNING_PREFIXES.some((p) => pathname?.startsWith(p)) || BUILDER_PREFIXES.some((p) => pathname?.startsWith(p)) || false;
  const isHome = pathname === "/";
  const phoneOfficial = "+243988830799";
  // Le bouton WhatsApp flottant suit le visiteur sur toutes les pages publiques (pas dans les espaces de travail).
  const showWhatsapp = !hideLayoutElements && !/^\/(admin|teacher|chauffeur|paiement|verify-email|annonces\/[^/]+)/.test(pathname || "");

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
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      {!hideLayoutElements && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            transparent
              ? "bg-transparent border-transparent py-2"
              : "bg-page/80 backdrop-blur-md border-line py-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-base min-[400px]:text-xl font-extrabold tracking-tight text-ink whitespace-nowrap">
              <BmLogo size={40} />
              BM <span className="text-gradient-red">Corporation</span>
            </Link>

            <nav aria-label="Menu principal" className="hidden xl:flex items-center gap-8 text-sm font-medium text-ink-soft font-sans">
              {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center min-h-[44px] hover:text-red-500 transition whitespace-nowrap">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSwitcher className="hidden xl:block" />
              <div className="hidden xl:block"><ThemeToggle /></div>

              <InstallButton className="hidden xl:inline-flex border border-line hover:border-red-600/60 text-ink text-sm font-bold px-4 py-2.5 rounded-xl transition" />
              <Link
                href="/devis"
                className="hidden sm:inline-flex items-center min-h-[44px] border border-line hover:border-red-600/60 text-ink text-sm font-bold px-4 rounded-xl transition"
              >
                Devis
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center min-h-[44px] glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-5 rounded-xl transition"
              >
                Inscription
              </Link>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="xl:hidden text-ink inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mr-2 rounded-xl"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav id="menu-mobile" aria-label="Menu mobile" className="xl:hidden bg-page border-t border-line px-6 py-4 flex flex-col text-ink font-sans max-h-[calc(100dvh-5rem)] overflow-y-auto">
              {/* Le logo ramène déjà à l'accueil : le menu garde seulement les grandes entrées. */}
              {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
                <Link key={link.href} href={link.href} className="min-h-[52px] flex items-center justify-between border-b border-line text-lg font-semibold hover:text-red-500 transition">
                  {link.label}
                  <span aria-hidden="true" className="text-ink-faint">›</span>
                </Link>
              ))}
              <div className="mt-5 grid gap-3">
                <Link
                  href="/register"
                  className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold min-h-[52px] flex items-center justify-center rounded-xl text-center transition"
                >
                  S&apos;inscrire
                </Link>
                <Link
                  href="/devis"
                  className="border border-line hover:border-red-600/60 text-ink font-bold min-h-[48px] flex items-center justify-center rounded-xl text-center transition"
                >
                  Demander un devis
                </Link>
                <InstallButton label="Télécharger l'application" className="flex items-center justify-center min-h-[48px] border border-line hover:border-red-600/60 text-ink font-bold px-5 rounded-xl transition" />
              </div>
              <div className="mt-5 pt-4 border-t border-line flex items-center gap-3 flex-wrap">
                <ThemeToggle large />
                <LanguageSwitcher />
              </div>
            </nav>
          )}
        </header>
      )}

      <div id="contenu" className="flex-grow">{children}</div>
      {showWhatsapp && <WhatsappFloat />}
      <ScrollButtons />
      <BackButton />
      <VisitTracker />
      <PwaRegister />

      {!hideLayoutElements && (
        <footer className="bg-surface-sunken border-t border-line py-12 px-6 text-ink-soft text-sm font-sans">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-ink font-bold text-base mb-3">BM Corporation</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-4">
                Solutions professionnelles, technologies, assistance et formations certifiantes.
              </p>
              <address className="not-italic text-sm text-ink-soft leading-relaxed space-y-1">
                <p>
                  <span className="text-ink font-semibold">Adresse :</span> Kasumbalesa, route Lubumbashi, bâtiment Guy Ceta
                </p>
                <p>
                  <span className="text-ink font-semibold">Téléphone :</span>{" "}
                  <a href={`tel:${phoneOfficial}`} className="text-red-600 font-semibold hover:underline">{phoneOfficial}</a>
                </p>
                <p>
                  <span className="text-ink font-semibold">E-mail :</span>{" "}
                  <a href="mailto:info@bmcorporation-cd.com" className="text-red-600 font-semibold hover:underline break-all">info@bmcorporation-cd.com</a>
                </p>
              </address>
            </div>

            <div>
              <h4 className="text-ink font-semibold mb-3">Pôles Academia</h4>
              <ul className="text-sm">
                <li><Link href="/academia" className="tap !justify-start hover:text-red-500 transition">Langues (Français, Anglais...)</Link></li>
                <li><Link href="/academia/bureautique" className="tap !justify-start hover:text-red-500 transition">Bureautique & MS Office</Link></li>
                <li><Link href="/academia/visuel" className="tap !justify-start hover:text-red-500 transition">Visuel & Audiovisuel</Link></li>
                <li><Link href="/academia/logiciels" className="tap !justify-start hover:text-red-500 transition">Logiciels de Gestion</Link></li>
                <li><Link href="/domestica" className="tap !justify-start hover:text-red-500 transition">Domestica</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ink font-semibold mb-3">Navigation</h4>
              <ul className="text-sm">
                <li><Link href="/" className="tap !justify-start hover:text-red-500 transition">Accueil</Link></li>
                <li><Link href="/academia" className="tap !justify-start hover:text-red-500 transition">Formations / Academia</Link></li>
                <li><Link href="/communication" className="tap !justify-start hover:text-red-500 transition">Communication</Link></li>
                <li><Link href="/devis" className="tap !justify-start hover:text-red-500 transition">Demander un devis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ink font-semibold mb-3">Contact rapide</h4>
              <p className="text-sm text-ink-soft mb-4">Besoin d&apos;aide pour vous inscrire ? Écrivez à notre secrétariat : réponse en général dans la journée.</p>
              <a
                href="https://wa.me/243988830799"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 rounded-xl transition"
              >
                Écrire sur WhatsApp ↗
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
