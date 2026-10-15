"use client";

import Link from "next/link";
import { Languages, Laptop, Clapperboard, Receipt, Target, TrendingUp, Smartphone, ArrowRight } from "lucide-react";
import BmLogo from "@/components/BmLogo";
import { availableLanguages } from "@/content/curriculum";

const DEPARTMENTS = [
  {
    icon: Languages,
    title: "Langues",
    description: "Plateforme interactive : leçons, quiz, suivi de progression et cours en direct.",
    href: "#langues",
  },
  {
    icon: Laptop,
    title: "Bureautique",
    description: "Word, Excel, PowerPoint et la gestion de votre environnement Windows.",
    href: "/academia/bureautique",
  },
  {
    icon: Clapperboard,
    title: "Visuel & Audiovisuel",
    description: "Design graphique, montage vidéo professionnel et diffusion en direct.",
    href: "/academia/visuel",
  },
  {
    icon: Receipt,
    title: "Logiciels de Gestion",
    description: "ODOO, SAGE, Dolibarr et les logiciels comptables/douaniers.",
    href: "/academia/logiciels",
  },
];

const LANGUAGE_TAGLINES: Record<string, string> = {
  english: "Master professional English, from everyday conversation to business fluency.",
  french: "Renforcez votre grammaire, votre rédaction et votre aisance à l'oral en français.",
  swahili: "Apprenez le swahili pour les affaires et la vie quotidienne.",
  spanish: "Du vocabulaire de base à la communication professionnelle en espagnol.",
  portuguese: "Expression orale et écrite en portugais, pour le quotidien et le travail.",
  chinese: "Prononciation, caractères et chinois des affaires, étape par étape.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-sunken text-ink flex flex-col font-sans selection:bg-red-600 selection:text-white">

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b border-line">
        {/* Halo rouge tamisé de fond */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

          {/* Badge d'accueil */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-line text-red-400 text-xs font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-ink-soft">Brightened Mind Platform</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-ink tracking-tight leading-[1.15] max-w-4xl">
            Toutes les formations de <br className="hidden sm:inline" />
            <span className="text-red-500">
              Brightened Mind Academia
            </span>
          </h1>

          {/* Description claire et confortable */}
          <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-2xl leading-relaxed">
            Langues, bureautique, visuel & audiovisuel et logiciels de gestion — un seul endroit
            pour découvrir et rejoindre toutes nos formations.
          </p>

          {/* Boutons d'action CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href="/academia/dashboard"
              className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-red-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
            >
              <span>Go to Student Portal</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="bg-surface hover:bg-surface-alt text-ink border border-line font-bold text-base px-8 py-4 rounded-xl transition flex items-center justify-center"
            >
              Student Login
            </Link>
          </div>

          {/* CHIFFRES CLÉS */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            <div className="p-6 rounded-2xl bg-surface border border-line/80 text-center">
              <p className="text-3xl font-black text-red-500">6</p>
              <p className="text-xs font-medium text-ink-soft mt-1 uppercase tracking-wider">
                Languages
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-line/80 text-center">
              <p className="text-3xl font-black text-ink">12+</p>
              <p className="text-xs font-medium text-ink-soft mt-1 uppercase tracking-wider">
                Guided Lessons / Level
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-line/80 text-center">
              <p className="text-3xl font-black text-ink">100%</p>
              <p className="text-xs font-medium text-ink-soft mt-1 uppercase tracking-wider">
                Interactive Quizzes
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-line/80 text-center">
              <p className="text-3xl font-black text-red-500">24/7</p>
              <p className="text-xs font-medium text-ink-soft mt-1 uppercase tracking-wider">
                Online Access
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 PÔLES DE FORMATION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Nos Pôles de Formation
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-ink">
            Quatre domaines, une seule Academia
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.title}
              href={dept.href}
              className="group bg-surface rounded-2xl p-6 border border-line hover:border-red-600/40 flex flex-col shadow-md transition"
            >
              <div className="mb-4 text-red-500"><dept.icon size={30} strokeWidth={1.8} /></div>
              <h4 className="text-lg font-bold text-ink mb-2 group-hover:text-red-500 transition-colors">
                {dept.title}
              </h4>
              <p className="text-ink-soft text-xs leading-relaxed">{dept.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION LANGUES */}
      <section id="langues" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Choose Your Language
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-ink">
            Six Languages, One Platform
          </h3>
          <p className="text-ink-soft text-sm mt-2 max-w-lg mx-auto">
            Each language has 3 levels — Beginner, Intermediate, and Advanced/Professional.
            Access is granted once your enrollment is approved.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableLanguages.map((lang) => (
            <Link
              key={lang.slug}
              href={`/academia/${lang.slug}/level/1`}
              className="group bg-surface rounded-2xl p-8 border border-line hover:border-red-600/40 flex flex-col justify-between shadow-md transition"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-alt border border-line text-red-500 flex items-center justify-center font-black text-lg mb-6">
                  {lang.code}
                </div>
                <h4 className="text-2xl font-bold text-ink mt-1 mb-3 group-hover:text-red-500 transition-colors">
                  {lang.label}
                </h4>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {LANGUAGE_TAGLINES[lang.slug] ?? "Structured lessons, quizzes, and real progress tracking."}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-xs font-semibold text-ink-soft">
                <span className="flex items-center gap-1.5">
                  3 niveaux disponibles
                </span>
                <span className="text-red-500 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION AVANTAGES */}
      <section className="py-20 bg-surface/60 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
              Why Learn With Us
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-ink">
              Designed for Accelerated Progress
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface border border-line">
              <div className="mb-4 text-red-500"><Target size={28} strokeWidth={1.8} /></div>
              <h4 className="text-lg font-bold text-ink mb-2">Interactive Quizzes</h4>
              <p className="text-ink-soft text-sm">
                Test your knowledge at the end of every lesson with instant feedback and score tracking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-line">
              <div className="mb-4 text-red-500"><TrendingUp size={28} strokeWidth={1.8} /></div>
              <h4 className="text-lg font-bold text-ink mb-2">Personal Progress Bar</h4>
              <p className="text-ink-soft text-sm">
                Keep track of your completed modules and pick up exactly where you left off.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-line">
              <div className="mb-4 text-red-500"><Smartphone size={28} strokeWidth={1.8} /></div>
              <h4 className="text-lg font-bold text-ink mb-2">Mobile Friendly</h4>
              <p className="text-ink-soft text-sm">
                Fully responsive design allows you to practice on your phone, tablet, or desktop anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-line bg-surface-sunken py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
              <BmLogo size={32} />
            </div>
            <span className="font-extrabold text-ink text-sm">
              Brightened Mind <span className="text-red-500">Academia</span>
            </span>
          </div>

          <p className="text-xs text-ink-soft font-medium text-center">
            © {new Date().getFullYear()} Brightened Mind Academia. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-ink-soft font-medium">
            <Link href="/academia/dashboard" className="hover:text-ink transition">Dashboard</Link>
            <Link href="/login" className="hover:text-ink transition">Login</Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
