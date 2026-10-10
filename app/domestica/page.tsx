"use client";

import React from 'react';
import Link from 'next/link';

const IconUsers = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-4.13a4 4 0 110-5.29m0 5.29a4 4 0 010 5.29M9 11a4 4 0 118 0 4 4 0 01-8 0z" />
  </svg>
);

const IconShield = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconGraduation = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const services = [
  {
    icon: IconUsers,
    title: "Recrutement & Sélection",
    description: "Identification et présélection rigoureuse de personnel domestique qualifié : aides ménagères, nounous, cuisiniers, chauffeurs et gardiens.",
  },
  {
    icon: IconGraduation,
    title: "Formation du Personnel",
    description: "Mise à niveau pratique sur l'hygiène, la sécurité domestique, l'organisation du foyer et le savoir-être professionnel.",
  },
  {
    icon: IconShield,
    title: "Placement & Suivi",
    description: "Mise en relation avec les ménages, accompagnement administratif et suivi de satisfaction après placement.",
  },
];

export default function DomesticaPage() {
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Domestica, je souhaite en savoir plus sur vos services de personnel domestique.")}`;

  return (
    <main className="min-h-screen bg-background text-white font-sans antialiased pt-28">
      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-neutral-800">
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/5 text-gold-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4 border border-gold-700/40">
            BM CORPORATION
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            BM <span className="text-gradient-gold">Domestica</span>
          </h1>
          <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Recrutement, formation et placement de personnel domestique qualifié, pour répondre aux besoins
            de votre foyer avec professionnalisme, confiance et efficacité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-all">
              Demander un Devis Gratuit
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-neutral-900 text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-neutral-800 transition border border-neutral-700">
              Nous écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos Services</h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm">
            Un accompagnement complet, de la sélection du personnel jusqu'à son intégration durable dans votre foyer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800 transition-all duration-300 hover:border-red-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10"
              >
                <div className="p-4 bg-black rounded-2xl border border-neutral-800 w-fit mb-6 group-hover:border-red-600/50 transition-colors">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CALL TO ACTION */}
      <section className="bg-neutral-950 py-24 px-6 border-t border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Besoin de personnel domestique de confiance ?
          </h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            Contactez notre équipe pour décrire votre besoin et recevoir une proposition adaptée à votre foyer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/devis" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
              Demander un Devis Gratuit
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-full text-lg transition hover:scale-105 shadow-xl shadow-emerald-600/20">
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
