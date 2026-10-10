"use client";

import React from 'react';
import Link from 'next/link';

// Icônes SVG intégrées
const IconLanguages = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>
);

const IconDesktop = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconVisual = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconSoftware = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function AcademiaPage() {
  const phoneOfficial = "+243988830799";
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Academia, je souhaite me renseigner sur vos formations.")}`;

  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased pt-28 pb-20">

      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-line overflow-hidden">
        <div className="absolute inset-0 radial-fade pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/5 text-gold-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4 border border-gold-700/40">
            BM CORPORATION
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            BM <span className="text-gradient-gold">Academia</span>
          </h1>
          <p className="text-xl text-ink-soft mb-8 leading-relaxed max-w-2xl mx-auto">
            Développez vos compétences professionnelles grâce à nos formations certifiantes en langues, bureautique, audiovisuel et logiciels de gestion.
          </p>

          {/* NUMÉRO OFFICIEL D'ASSISTANCE */}
          <div className="mb-10 inline-flex items-center gap-2 bg-surface border border-line px-4 py-2 rounded-xl text-ink-soft text-sm">
            <IconPhone />
            <span>Support & Info Officiel : <a href={`tel:${phoneOfficial}`} className="text-gold-400 font-bold hover:underline">{phoneOfficial}</a></span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formations" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-all">
              Explorer les Formations
            </a>
            <Link href="/devis" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt hover:border-gold-700/40 transition border border-line">
              S'inscrire / S'informer
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION FORMATIONS */}
      <div id="formations" className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        
        {/* 1. FORMATION LANGUES */}
        <section id="langues" className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-surface-alt rounded-2xl border border-line">
              <IconLanguages />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-ink">Formation Langues</h2>
              <p className="text-ink-soft text-sm">Maîtrisez les langues les plus parlées au monde et en région.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ANGLAIS - AVEC LIEN INTERACTIF */}
            <div className="relative group bg-surface p-6 rounded-2xl border border-gold-600/40 hover:border-gold-500/70 transition shadow-lg shadow-black/20">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🇬🇧 / 🇺🇸</span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-gold-500/15 text-gold-300 border border-gold-600/40 rounded-full">Interactif</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Anglais</h3>
              <p className="text-ink-soft text-sm mb-6">Accédez à notre plateforme interactive d'apprentissage pour progresser rapidement.</p>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 text-sm transition"
              >
                Ouvrir la plateforme d'Anglais →
              </Link>
            </div>

            {/* FRANÇAIS */}
            <div className="bg-surface p-6 rounded-2xl border border-line hover:border-gold-700/40 transition">
              <span className="text-2xl mb-4 block">🇫🇷</span>
              <h3 className="text-xl font-bold text-ink mb-2">Français</h3>
              <p className="text-ink-soft text-sm">Renforcement de la grammaire, rédaction professionnelle et expression orale.</p>
              <Link 
                href="/academia/francais"
                className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 text-sm transition"
              >
                Ouvrir la plateforme de Français →
              </Link>
            </div>

            {/* SWAHILI */}
            <div className="bg-surface p-6 rounded-2xl border border-line hover:border-gold-700/40 transition">
              <span className="text-2xl mb-4 block">🇨🇩</span>
              <h3 className="text-xl font-bold text-ink mb-2">Swahili</h3>
              <p className="text-ink-soft text-sm mb-6">Apprentissage complet de la langue parlée et écrite pour les affaires et le quotidien.</p>
              <Link
                href="/academia/swahili"
                className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 text-sm transition"
              >
                Ouvrir la plateforme de Swahili →
              </Link>
            </div>

            {/* ESPAGNOL */}
            <div className="bg-surface p-6 rounded-2xl border border-line hover:border-gold-700/40 transition">
              <span className="text-2xl mb-4 block">🇪🇸</span>
              <h3 className="text-xl font-bold text-ink mb-2">Espagnol</h3>
              <p className="text-ink-soft text-sm mb-6">Bases solides de communication et vocabulaire professionnel.</p>
              <Link
                href="/academia/espagnol"
                className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 text-sm transition"
              >
                Ouvrir la plateforme d'Espagnol →
              </Link>
            </div>

            {/* PORTUGAIS */}
            <div className="bg-surface p-6 rounded-2xl border border-line hover:border-gold-700/40 transition">
              <span className="text-2xl mb-4 block">🇵🇹</span>
              <h3 className="text-xl font-bold text-ink mb-2">Portugais</h3>
              <p className="text-ink-soft text-sm mb-6">Expression orale et écrite adaptées aux échanges régionaux et internationaux.</p>
              <Link
                href="/academia/portugais"
                className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 text-sm transition"
              >
                Ouvrir la plateforme de Portugais →
              </Link>
            </div>

            {/* CHINOIS */}
            <div className="bg-surface p-6 rounded-2xl border border-line hover:border-gold-700/40 transition">
              <span className="text-2xl mb-4 block">🇨🇳</span>
              <h3 className="text-xl font-bold text-ink mb-2">Chinois (Mandarin)</h3>
              <p className="text-ink-soft text-sm mb-6">Initiation à la prononciation, aux caractères de base et au vocabulaire commercial.</p>
              <Link
                href="/academia/chinois"
                className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 text-sm transition"
              >
                Ouvrir la plateforme de Chinois →
              </Link>
            </div>
          </div>
        </section>

        {/* 2. FORMATION BUREAUTIQUE */}
        <section id="bureautique" className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-surface-alt rounded-2xl border border-line">
              <IconDesktop />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-ink">Formation Bureautique</h2>
              <p className="text-ink-soft text-sm">Maîtrisez les outils incontournables du travail sur ordinateur.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface p-6 rounded-2xl border border-line">
              <h3 className="text-xl font-bold text-ink mb-3">MS Office</h3>
              <ul className="space-y-2 text-ink-soft text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-ink">Word :</strong> Traitement de texte et mise en page de documents.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-ink">Excel :</strong> Tableaux, formules, gestion de données et calculs.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-ink">PowerPoint :</strong> Création de présentations visuelles percutantes.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-ink">Publisher :</strong> Conception de supports imprimés professionnels.
                </li>
              </ul>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-line">
              <h3 className="text-xl font-bold text-ink mb-3">Windows & Systèmes</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-4">
                Prise en main du système d'exploitation Windows, organisation des fichiers, sécurité informatique de base et gestion efficace de l'environnement de travail informatique.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FORMATION VISUEL & AUDIOVISUEL */}
        <section id="visuel" className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-surface-alt rounded-2xl border border-line">
              <IconVisual />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-ink">Formation Visuel & Audiovisuel</h2>
              <p className="text-ink-soft text-sm">Apprenez le design, la production vidéo et le streaming direct.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DESIGN */}
            <div className="bg-surface p-6 rounded-2xl border border-line">
              <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">Design Graphique</span>
              <h3 className="text-xl font-bold text-ink mb-3">Photoshop & Illustrator</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                Création de visuels publicitaires, affiches, retouche photo avancée et création de logos vectoriels.
              </p>
            </div>

            {/* MONTAGE VIDEO */}
            <div className="bg-surface p-6 rounded-2xl border border-line">
              <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">Montage Vidéo</span>
              <h3 className="text-xl font-bold text-ink mb-3">DaVinci Resolve, Premiere Pro & CapCut</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                Montage professionnel, étalonnage des couleurs, effets visuels et découpe dynamique pour tous formats.
              </p>
            </div>

            {/* DIFFUSION DIRECT */}
            <div className="bg-surface p-6 rounded-2xl border border-line">
              <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">Diffusion Direct</span>
              <h3 className="text-xl font-bold text-ink mb-3">OBS Studio & vMix</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                Gestion de régie vidéo en direct, captation multi-caméras et retransmission en live (Concerts, Cultes, Événements).
              </p>
            </div>
          </div>
        </section>

        {/* 4. FORMATION LOGICIEL DE GESTION */}
        <section id="logiciels" className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-surface-alt rounded-2xl border border-line">
              <IconSoftware />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-ink">Formation Logiciels de Gestion</h2>
              <p className="text-ink-soft text-sm">Logiciels comptables, de gestion commerciale, douanière et d'audit.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "SAGE", desc: "Comptabilité & Gestion Commerciale" },
              { name: "ODOO", desc: "ERP Tout-en-un d'entreprise" },
              { name: "AuditSoft", desc: "Audit et contrôle de gestion" },
              { name: "AUDOCompt", desc: "Gestion comptable spécialisée" },
              { name: "Dolibarr", desc: "Gestion de stocks, facturation & CRM" },
              { name: "Sydonia", desc: "Gestion des opérations douanières" },
              { name: "SEGUB", desc: "Guichet unique des opérations" },
            ].map((soft, i) => (
              <div key={i} className="bg-surface p-5 rounded-2xl border border-line text-center hover:border-red-600/40 transition">
                <h3 className="text-lg font-bold text-ink mb-1">{soft.name}</h3>
                <p className="text-ink-soft text-xs">{soft.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* CALL TO ACTION */}
      <section className="bg-surface-sunken py-20 px-6 border-t border-line text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-ink mb-6">
            Prêt à suivre une formation ?
          </h2>
          <p className="text-xl text-ink-soft mb-8 max-w-2xl mx-auto">
            Contactez l'équipe de BM Academia au <span className="text-ink font-bold">{phoneOfficial}</span> pour réserver votre session de formation individuelle ou en groupe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/devis" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
              S'inscrire à une formation
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-full text-lg transition hover:scale-105 shadow-xl shadow-emerald-600/20">
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}