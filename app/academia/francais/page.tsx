"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Icônes SVG
const IconCheck = () => (
  <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconBook = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconSpeech = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function FrenchCoursePage() {
  const phoneOfficial = "+243988830799";
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Academia, je souhaite m'informer sur le cours de Français en ligne.")}`;

  const [activeTab, setActiveTab] = useState<'debutant' | 'intermediaire' | 'avance'>('debutant');

  const levels = {
    debutant: {
      title: "Niveau Débutant (A1 - A2)",
      description: "Pour poser des bases solides, comprendre et vous exprimer simplement dans la vie quotidienne.",
      features: [
        "Prononciation et phonétique de base",
        "Vocabulaire usuel et expressions courantes",
        "Bases de la grammaire et conjugaison essentielle",
        "Formuler des phrases simples à l'oral et à l'écrit"
      ]
    },
    intermediaire: {
      title: "Niveau Intermédiaire (B1 - B2)",
      description: "Pour développer votre fluidité, enrichir votre vocabulaire et rédiger des textes structurés.",
      features: [
        "Aisance à l'expression orale et conversations spontanées",
        "Maîtrise des temps complexes et de la syntaxe",
        "Rédaction de mails, lettres et compte-rendus",
        "Compréhension de textes et documents complexes"
      ]
    },
    avance: {
      title: "Niveau Avancé & Pro (C1 - C2)",
      description: "Pour viser la perfection linguistique, la rédaction administrative et l'éloquence professionnelle.",
      features: [
        "Français des affaires et négociation commerciale",
        "Perfectionnement orthographique et rédaction de haut niveau",
        "Prise de parole en public et présentation professionnelle",
        "Préparation aux examens certifiants (DELF / DALF)"
      ]
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans antialiased pt-28 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-neutral-800">
        <div className="relative z-10 max-w-4xl">
          <Link href="/academia" className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm mb-6 hover:underline">
            ← Retour aux formations BM Academia
          </Link>
          <div className="flex justify-center mb-4">
            <span className="text-4xl">🇫🇷</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Apprendre le <span className="text-red-600">Français</span> en Ligne
          </h1>
          <p className="text-xl text-neutral-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Aperçu complet du programme : maîtrisez la rédaction professionnelle, perfectionnez votre grammaire et exprimez-vous avec aisance à l'oral.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/30"
            >
              Passer un Test de Niveau Gratis
            </a>
            <Link href="/devis" className="bg-neutral-900 text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-neutral-800 transition border border-neutral-700">
              S'inscrire au Cours
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* LES POLES DE FORMATION */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">Ce que vous allez développer</h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm">Une méthode axée sur la pratique immédiate et l'application dans votre environnement professionnel et quotidien.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800">
              <div className="p-3 bg-black rounded-2xl border border-neutral-800 w-fit mb-6">
                <IconSpeech />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expression Orale</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Gagnez en assurance, travaillez votre prononciation et participez activement aux réunions ou discussions.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800">
              <div className="p-3 bg-black rounded-2xl border border-neutral-800 w-fit mb-6">
                <IconBook />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Grammaire & Orthographe</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Éliminez les fautes récurrentes, structurez vos phrases sans hésitation et maîtrisez les règles essentielles.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-8 rounded-3xl border border-neutral-800">
              <div className="p-3 bg-black rounded-2xl border border-neutral-800 w-fit mb-6">
                <IconBriefcase />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rédaction Professionnelle</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Rédigez des emails percutants, des rapports administratifs, des comptes-rendus et des courriers officiels sans erreur.
              </p>
            </div>
          </div>
        </section>

        {/* NIVEAUX & PARCOURS */}
        <section className="bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-neutral-800">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Choisissez votre niveau</h2>
            <p className="text-neutral-400 text-sm">Cliquez sur un niveau pour découvrir le contenu de la formation.</p>
          </div>

          {/* Onglets de sélection */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(['debutant', 'intermediaire', 'avance'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveTab(lvl)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition ${
                  activeTab === lvl 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {lvl === 'debutant' && '1. Débutant (A1-A2)'}
                {lvl === 'intermediaire' && '2. Intermédiaire (B1-B2)'}
                {lvl === 'avance' && '3. Avancé / Pro (C1-C2)'}
              </button>
            ))}
          </div>

          {/* Contenu du niveau actif */}
          <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">{levels[activeTab].title}</h3>
            <p className="text-neutral-400 text-sm mb-6">{levels[activeTab].description}</p>
            
            <ul className="space-y-3">
              {levels[activeTab].features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm">
                  <IconCheck />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MODALITÉ DES COURS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-4">💻 Cours en Ligne Direct (Zoom / Teams)</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Sessions en direct avec un formateur qualifié. Interaction orale en temps réel, exercices pratiques guidés et corrections instantanées.
            </p>
            <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30">
              Horaires flexibles (Soir & Week-end)
            </span>
          </div>

          <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-4">👔 Formation Particulière ou Entreprise</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Programme sur-mesure adapté au secteur de votre entreprise (commerce, administration, finance, juridique) ou coaching individuel intensif.
            </p>
            <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30">
              Programme 100% Personnalisé
            </span>
          </div>
        </section>

      </div>

      {/* CALL TO ACTION */}
      <section className="bg-neutral-950 py-20 px-6 border-t border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Prêt à perfectionner votre Français ?
          </h2>
          <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pédagogique au <span className="text-white font-bold">{phoneOfficial}</span> ou sur WhatsApp pour évaluer votre niveau et réserver votre première session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/devis" className="bg-red-600 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-red-700 transition hover:scale-105 shadow-xl shadow-red-600/30">
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