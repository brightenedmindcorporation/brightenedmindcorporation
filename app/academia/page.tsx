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
    <main className="min-h-screen bg-black text-white font-sans antialiased pt-28 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-neutral-800">
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 text-red-500 font-semibold text-sm mb-4 border border-red-600/30">
            BM CORPORATION
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            BM <span className="text-red-600">Academia</span>
          </h1>
          <p className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Développez vos compétences professionnelles grâce à nos formations certifiantes en langues, bureautique, audiovisuel et logiciels de gestion.
          </p>
          
          {/* NUMÉRO OFFICIEL D'ASSISTANCE */}
          <div className="mb-10 inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-neutral-300 text-sm">
            <IconPhone />
            <span>Support & Info Officiel : <a href={`tel:${phoneOfficial}`} className="text-red-500 font-bold hover:underline">{phoneOfficial}</a></span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formations" className="bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/30">
              Explorer les Formations
            </a>
            <Link href="/devis" className="bg-neutral-900 text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-neutral-800 transition border border-neutral-700">
              S'inscrire / S'informer
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION FORMATIONS */}
      <div id="formations" className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        
        {/* 1. FORMATION LANGUES */}
        <section id="langues" className="bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-neutral-800 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-black rounded-2xl border border-neutral-800">
              <IconLanguages />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Formation Langues</h2>
              <p className="text-neutral-400 text-sm">Maîtrisez les langues les plus parlées au monde et en région.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ANGLAIS - AVEC LIEN INTERACTIF */}
            <div className="relative group bg-neutral-900 p-6 rounded-2xl border border-red-600/50 hover:border-red-600 transition shadow-lg shadow-red-600/10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🇬🇧 / 🇺🇸</span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-red-600 text-white rounded-full">Interactif</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Anglais</h3>
              <p className="text-neutral-400 text-sm mb-6">Accédez à notre plateforme interactive d'apprentissage pour progresser rapidement.</p>
              <Link 
                href="/academy" 
                className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-red-400 text-sm transition"
              >
                Ouvrir la plateforme d'Anglais →
              </Link>
            </div>

            {/* FRANÇAIS */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition">
              <span className="text-2xl mb-4 block">🇫🇷</span>
              <h3 className="text-xl font-bold text-white mb-2">Français</h3>
              <p className="text-neutral-400 text-sm">Renforcement de la grammaire, rédaction professionnelle et expression orale.</p>
              <Link 
                href="academia/francais" 
                className="inline-flex items-center gap-2 text-red-500 font-bold hover:text-red-400 text-sm transition"
              >
                Ouvrir la plateforme de Français →
              </Link>
            </div>

            {/* SWAHILI */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition">
              <span className="text-2xl mb-4 block">🇨🇩</span>
              <h3 className="text-xl font-bold text-white mb-2">Swahili</h3>
              <p className="text-neutral-400 text-sm">Apprentissage complet de la langue parlée et écrite pour les affaires et le quotidien.</p>
            </div>

            {/* ESPAGNOL */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition">
              <span className="text-2xl mb-4 block">🇪🇸</span>
              <h3 className="text-xl font-bold text-white mb-2">Espagnol</h3>
              <p className="text-neutral-400 text-sm">Bases solides de communication et vocabulaire professionnel.</p>
            </div>

            {/* PORTUGAIS */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition">
              <span className="text-2xl mb-4 block">🇵🇹</span>
              <h3 className="text-xl font-bold text-white mb-2">Portugais</h3>
              <p className="text-neutral-400 text-sm">Expression orale et écrite adaptées aux échanges régionaux et internationaux.</p>
            </div>

            {/* CHINOIS */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition">
              <span className="text-2xl mb-4 block">🇨🇳</span>
              <h3 className="text-xl font-bold text-white mb-2">Chinois (Mandarin)</h3>
              <p className="text-neutral-400 text-sm">Initiation à la prononciation, aux caractères de base et au vocabulaire commercial.</p>
            </div>
          </div>
        </section>

        {/* 2. FORMATION BUREAUTIQUE */}
        <section id="bureautique" className="bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-neutral-800 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-black rounded-2xl border border-neutral-800">
              <IconDesktop />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Formation Bureautique</h2>
              <p className="text-neutral-400 text-sm">Maîtrisez les outils incontournables du travail sur ordinateur.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-3">MS Office</h3>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-white">Word :</strong> Traitement de texte et mise en page de documents.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-white">Excel :</strong> Tableaux, formules, gestion de données et calculs.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-white">PowerPoint :</strong> Création de présentations visuelles percutantes.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <strong className="text-white">Publisher :</strong> Conception de supports imprimés professionnels.
                </li>
              </ul>
            </div>

            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-3">Windows & Systèmes</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Prise en main du système d'exploitation Windows, organisation des fichiers, sécurité informatique de base et gestion efficace de l'environnement de travail informatique.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FORMATION VISUEL & AUDIOVISUEL */}
        <section id="visuel" className="bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-neutral-800 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-black rounded-2xl border border-neutral-800">
              <IconVisual />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Formation Visuel & Audiovisuel</h2>
              <p className="text-neutral-400 text-sm">Apprenez le design, la production vidéo et le streaming direct.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DESIGN */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">Design Graphique</span>
              <h3 className="text-xl font-bold text-white mb-3">Photoshop & Illustrator</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Création de visuels publicitaires, affiches, retouche photo avancée et création de logos vectoriels.
              </p>
            </div>

            {/* MONTAGE VIDEO */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">Montage Vidéo</span>
              <h3 className="text-xl font-bold text-white mb-3">DaVinci Resolve, Premiere Pro & CapCut</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Montage professionnel, étalonnage des couleurs, effets visuels et découpe dynamique pour tous formats.
              </p>
            </div>

            {/* DIFFUSION DIRECT */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
              <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">Diffusion Direct</span>
              <h3 className="text-xl font-bold text-white mb-3">OBS Studio & vMix</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Gestion de régie vidéo en direct, captation multi-caméras et retransmission en live (Concerts, Cultes, Événements).
              </p>
            </div>
          </div>
        </section>

        {/* 4. FORMATION LOGICIEL DE GESTION */}
        <section id="logiciels" className="bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-neutral-800 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-black rounded-2xl border border-neutral-800">
              <IconSoftware />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Formation Logiciels de Gestion</h2>
              <p className="text-neutral-400 text-sm">Logiciels comptables, de gestion commerciale, douanière et d'audit.</p>
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
              <div key={i} className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 text-center hover:border-red-600/40 transition">
                <h3 className="text-lg font-bold text-white mb-1">{soft.name}</h3>
                <p className="text-neutral-400 text-xs">{soft.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* CALL TO ACTION */}
      <section className="bg-neutral-950 py-20 px-6 border-t border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Prêt à suivre une formation ?
          </h2>
          <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Contactez l'équipe de BM Academia au <span className="text-white font-bold">{phoneOfficial}</span> pour réserver votre session de formation individuelle ou en groupe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/devis" className="bg-red-600 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-red-700 transition hover:scale-105 shadow-xl shadow-red-600/30">
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