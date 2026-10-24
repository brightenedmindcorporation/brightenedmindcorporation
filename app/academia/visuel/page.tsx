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
          <Link href="/academia" className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm mb-6 hover:underline">
            ← Retour aux formations BM Academia
          </Link>
          <div className="flex justify-center mb-4">
            <svg className="w-9 h-9 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M2 7l3-3h14l3 3M2 7v13a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7M2 7h20M7 4l2 3M13 4l2 3M18 4l2 3"/></svg>
          </div>
          <h1 className="text-3xl min-[400px]:text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            Formation <span className="text-gradient-red">Visuel & Audiovisuel</span>
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
            <Link href="/register?program=VISUEL" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt transition border border-line">
              S'inscrire à la formation
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            Déjà inscrit(e) ? <Link href="/login?program=VISUEL" className="text-red-500 font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink mb-3">Un parcours en 3 niveaux</h2>
            <p className="text-ink-soft text-sm max-w-2xl mx-auto">
              36 leçons illustrées, des travaux pratiques, des tutoriels vidéo en français, un quiz par leçon noté sur 100 et un quiz final
              pour chaque niveau. À la fin de chaque niveau, vous recevez votre certificat BM Academia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: 1, t: "Image et design graphique", d: "Image numérique, couleur et composition ; Photoshop (calques, détourage, retouche) ; Illustrator (formes, plume, logo).", l: "12 leçons · quiz final de 20 questions" },
              { n: 2, t: "Montage vidéo", d: "Tournage, montage dans DaVinci Resolve, Premiere Pro ou CapCut, son, titres, étalonnage et export pour chaque plateforme.", l: "12 leçons · quiz final de 20 questions" },
              { n: 3, t: "Perfectionnement et direct", d: "Photoshop avancé, identité visuelle, impression, multicaméra, motion design, OBS Studio, vMix et diffusion en direct.", l: "12 leçons · quiz final de 20 questions" },
            ].map((lv) => (
              <div key={lv.n} className="bg-surface p-7 rounded-3xl border border-line">
                <span className="inline-flex w-10 h-10 rounded-full bg-red-600 text-white font-black items-center justify-center">{lv.n}</span>
                <h3 className="text-xl font-bold text-ink mt-4">Niveau {lv.n} · {lv.t}</h3>
                <p className="text-ink-soft text-sm mt-2 leading-relaxed">{lv.d}</p>
                <p className="text-xs font-semibold text-red-500 mt-4">{lv.l}</p>
              </div>
            ))}
          </div>
        </section>


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
          <h2 className="text-2xl min-[400px]:text-3xl md:text-4xl font-extrabold text-ink mb-6">Prêt à vous lancer dans le visuel ?</h2>
          <p className="text-xl text-ink-soft mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pédagogique au <span className="text-ink font-bold">{phoneOfficial}</span> ou sur
            WhatsApp pour réserver votre première session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register?program=VISUEL" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
              S'inscrire à la formation
            </Link>
            <Link href="/login?program=VISUEL" className="bg-surface text-ink font-bold px-8 py-4 rounded-full text-lg hover:bg-surface-alt transition border border-line">
              Se connecter
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
