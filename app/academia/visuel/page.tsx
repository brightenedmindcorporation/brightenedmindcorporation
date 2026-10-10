"use client";

import React from 'react';
import Link from 'next/link';

const IconCheck = () => (
  <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function VisuelPage() {
  const phoneOfficial = "+243988830799";
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Academia, je souhaite m'informer sur la formation Visuel & Audiovisuel.")}`;

  const programs = [
    {
      badge: "Design Graphique",
      title: "Photoshop & Illustrator",
      description: "Création de visuels publicitaires, affiches, retouche photo avancée et logos vectoriels.",
      features: [
        "Retouche et détourage photo professionnel",
        "Création d'affiches, flyers et visuels réseaux sociaux",
        "Conception de logos et identité visuelle vectorielle",
        "Préparation de fichiers pour l'impression",
      ],
    },
    {
      badge: "Montage Vidéo",
      title: "DaVinci Resolve, Premiere Pro & CapCut",
      description: "Montage professionnel, étalonnage des couleurs, effets visuels et découpe dynamique.",
      features: [
        "Montage narratif et rythme pour réseaux sociaux ou télévision",
        "Étalonnage des couleurs et correction d'image",
        "Habillage, sous-titres et effets de transition",
        "Export optimisé pour chaque plateforme (YouTube, Instagram, TikTok)",
      ],
    },
    {
      badge: "Diffusion Direct",
      title: "OBS Studio & vMix",
      description: "Gestion de régie vidéo en direct, captation multi-caméras et retransmission live.",
      features: [
        "Configuration d'une régie multi-caméras",
        "Incrustation de titres, logos et habillages en direct",
        "Retransmission en direct (concerts, cultes, événements, conférences)",
        "Gestion du son et des transitions en temps réel",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased pt-28 pb-20">
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-line">
        <div className="relative z-10 max-w-4xl">
          <Link href="/academia" className="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm mb-6 hover:underline">
            ← Retour aux formations BM Academia
          </Link>
          <div className="flex justify-center mb-4">
            <span className="text-4xl">🎬</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            Formation <span className="text-gradient-gold">Visuel & Audiovisuel</span>
          </h1>
          <p className="text-xl text-ink-soft mb-8 leading-relaxed max-w-2xl mx-auto">
            Apprenez le design graphique, le montage vidéo professionnel et la diffusion en direct.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-all"
            >
              Discuter avec un conseiller
            </a>
            <Link href="/devis" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt transition border border-line">
              S'inscrire à la formation
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        {programs.map((program, i) => (
          <section key={i} className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line">
            <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30 mb-4 inline-block">
              {program.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-2">{program.title}</h2>
            <p className="text-ink-soft text-sm mb-6">{program.description}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-ink-soft text-sm">
                  <IconCheck />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="bg-surface-sunken py-20 px-6 border-t border-line text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-ink mb-6">Prêt à vous lancer dans le visuel ?</h2>
          <p className="text-xl text-ink-soft mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pédagogique au <span className="text-ink font-bold">{phoneOfficial}</span> ou sur
            WhatsApp pour réserver votre première session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/devis" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
              S'inscrire à la formation
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
