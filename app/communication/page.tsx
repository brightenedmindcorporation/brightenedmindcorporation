"use client";

import React from 'react';
import Link from 'next/link';

// Icônes SVG intégrées
const IconCamera = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconVideo = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconPenTool = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconSmartphone = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const IconMonitor = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconDollar = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const bmServicesData = [
  {
    title: "Communication Visuelle",
    items: [
      {
        icon: IconCamera,
        title: "Photographie Professionnelle",
        description: "Photo Studio, Portrait, Mariage, Dot, Anniversaire, Événements Cultuels, Conférences, etc.",
      },
      {
        icon: IconVideo,
        title: "Vidéographie & Production",
        description: "Tournage de Clips Vidéo, Spots Publicitaires, Vidéos de Motivation, Documentaires, Production Live.",
      },
      {
        icon: IconPenTool,
        title: "Design & Supports",
        description: "Création de Logos, Flyers, Affiches, Cartes de Visite, Dépliants, Profils d'Entreprise.",
      },
    ],
  },
  {
    title: "Communication Marketing",
    items: [
      {
        icon: IconSmartphone,
        title: "Marketing Digital & Réseaux Sociaux",
        description: "Création et gestion complète de comptes et pages professionnels (Community Management).",
      },
      {
        icon: IconMonitor,
        title: "Web & Développement",
        description: "Design de sites web, Création et hébergement de sites web et applications mobiles.",
      },
      {
        icon: IconDollar,
        title: "Monétisation & Publicité",
        description: "Boostage et création de campagnes publicitaires ciblées, Monétisation des comptes sociaux.",
      },
    ],
  },
];

export default function CommunicationPage() {
  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased pt-28">
      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-line">
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/5 text-red-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4 border border-red-700/40">
            BM CORPORATION
          </span>
          <h1 className="text-4xl min-[400px]:text-5xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            L'Agence de <span className="text-gradient-red">Communication</span> Intégrale
          </h1>
          <p className="text-xl text-ink-soft mb-10 leading-relaxed max-w-2xl mx-auto">
            Propulsez votre marque avec l'expertise de BM Communication. Du visuel à fort impact au marketing digital stratégique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-all">
              Demander un Devis Gratuit
            </Link>
            <a href="#visuelle" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt transition border border-line">
              Découvrir nos services
            </a>
          </div>
        </div>
      </section>

      {/* GRILLES DE SERVICES */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {bmServicesData.map((category, index) => (
          <section key={index} id={index === 0 ? "visuelle" : "marketing"} className="relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-line pb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-ink flex items-center gap-3">
                <span className="w-2 h-10 bg-red-600 rounded"></span>
                {category.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((service, serviceIndex) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={serviceIndex}
                    className="group bg-surface/60 p-8 rounded-3xl border border-line transition-all duration-300 hover:border-red-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
                  >
                    <div className="flex items-center gap-5 mb-6">
                      <div className="p-4 bg-surface-alt rounded-2xl border border-line group-hover:border-red-600/50 transition-colors">
                        <IconComponent />
                      </div>
                      <h3 className="text-xl font-bold text-ink group-hover:text-red-500 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-ink-soft leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CALL TO ACTION */}
      <section className="bg-surface-sunken py-24 px-6 border-t border-line text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl min-[400px]:text-3xl md:text-4xl font-extrabold text-ink mb-6">
            Vous avez un projet en tête ?
          </h2>
          <p className="text-xl text-ink-soft mb-10 max-w-2xl mx-auto">
            BM Communication vous accompagne de la conception à la réalisation.
          </p>
          <Link href="/devis" className="glow-accent inline-block bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-xl transition hover:scale-105">
            Demander un Devis Gratuit
          </Link>
        </div>
      </section>
    </main>
  );
}