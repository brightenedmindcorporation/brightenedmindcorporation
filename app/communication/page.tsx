"use client";

import React from 'react';
import Link from 'next/link';
import HeroSlideshow from "@/components/communication/HeroSlideshow";
import Portfolio from "@/components/communication/Portfolio";

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

const steps = [
  { n: "01", t: "Le brief", d: "Vous nous décrivez votre projet, la date et le lieu : par le formulaire ou sur WhatsApp." },
  { n: "02", t: "Le devis", d: "Nous vous répondons avec une proposition claire, écrite avant tout engagement." },
  { n: "03", t: "La production", d: "Prise de vue, tournage ou création : l'équipe BM se déplace et réalise." },
  { n: "04", t: "La livraison", d: "Retouche soignée et livraison des fichiers aux formats convenus." },
];

const bmServicesData = [
  {
    title: "Communication Visuelle",
    items: [
      {
        icon: IconCamera,
        title: "Photographie Professionnelle",
        quote: "Photographie",
        description: "Photo Studio, Portrait, Mariage, Dot, Anniversaire, Événements Cultuels, Conférences, etc.",
      },
      {
        icon: IconVideo,
        title: "Vidéographie & Production",
        quote: "Vidéographie",
        description: "Tournage de Clips Vidéo, Spots Publicitaires, Vidéos de Motivation, Documentaires, Production Live.",
      },
      {
        icon: IconPenTool,
        title: "Design & Supports",
        quote: "Design & Supports",
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
        quote: "Marketing Digital",
        description: "Création et gestion complète de comptes et pages professionnels (Community Management).",
      },
      {
        icon: IconMonitor,
        title: "Web & Développement",
        quote: "Site Web / Application",
        description: "Design de sites web, Création et hébergement de sites web et applications mobiles.",
      },
      {
        icon: IconDollar,
        title: "Monétisation & Publicité",
        quote: "Marketing Digital",
        description: "Boostage et création de campagnes publicitaires ciblées, Monétisation des comptes sociaux.",
      },
    ],
  },
];

export default function CommunicationPage() {
  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased">
      {/* HERO SECTION */}
      <HeroSlideshow>
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-red-300 font-semibold text-xs tracking-[0.2em] uppercase mb-4 border border-red-400/40 backdrop-blur">
          BM COMMUNICATION
        </span>
        <h1 className="text-4xl min-[400px]:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
          Nous racontons vos moments, <span className="text-[#ff8a95]">nous faisons rayonner votre marque</span>
        </h1>
        <p className="text-xl text-white/85 mb-10 leading-relaxed max-w-2xl mx-auto">
          Photographie, vidéo, design et marketing digital : l'agence de communication qui donne de l'impact à vos événements et à votre image.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/devis" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-all">
            Demander un Devis Gratuit
          </Link>
          <a href="#portfolio" className="bg-white/10 backdrop-blur text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-white/20 transition border border-white/40">
            Voir le portfolio
          </a>
        </div>
      </HeroSlideshow>

      <Portfolio />

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
                    <Link href={`/devis?service=${encodeURIComponent(service.quote)}`} className="mt-6 inline-block text-sm font-bold text-red-500 hover:text-red-400">
                      Demander un devis pour ce service →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* COMMENT NOUS TRAVAILLONS */}
      <section className="bg-surface-sunken border-t border-line py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">Comment nous travaillons</h2>
            <p className="text-ink-soft text-sm max-w-xl mx-auto">Un parcours simple, de votre première demande à la livraison.</p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-3xl border border-line bg-surface p-6">
                <span className="text-4xl font-black text-red-600/30 leading-none">{s.n}</span>
                <p className="mt-3 text-lg font-bold text-ink">{s.t}</p>
                <p className="mt-1 text-sm text-ink-soft leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
          <p className="mt-6">
            <a href="https://wa.me/243988830799?text=Bonjour%20BM%20Communication%2C%20je%20souhaite%20en%20savoir%20plus." target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-500 hover:text-emerald-400">
              Ou écrivez-nous sur WhatsApp
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}