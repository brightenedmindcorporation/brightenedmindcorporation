"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const IconCheck = () => (
  <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function BureautiquePage() {
  const phoneOfficial = "+243988830799";
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Academia, je souhaite m'informer sur la formation Bureautique.")}`;

  const [activeTab, setActiveTab] = useState<'word' | 'excel' | 'powerpoint' | 'windows'>('word');

  const modules = {
    word: {
      title: "Microsoft Word",
      description: "Traitement de texte et mise en page de documents professionnels.",
      features: [
        "Mise en forme avancée et styles de document",
        "Tableaux, en-têtes, pieds de page et sommaire automatique",
        "Publipostage (lettres, étiquettes, convocations en masse)",
        "Modèles de CV, rapports, contrats et courriers officiels",
      ],
    },
    excel: {
      title: "Microsoft Excel",
      description: "Tableaux, formules, gestion de données et calculs.",
      features: [
        "Formules et fonctions (RECHERCHEV, SI, SOMME.SI, etc.)",
        "Tableaux croisés dynamiques et graphiques",
        "Gestion de budgets, factures et suivis comptables",
        "Mise en forme conditionnelle et validation de données",
      ],
    },
    powerpoint: {
      title: "Microsoft PowerPoint",
      description: "Création de présentations visuelles percutantes.",
      features: [
        "Structurer une présentation convaincante",
        "Animations, transitions et minutage",
        "Supports pour soutenances, réunions et pitchs commerciaux",
        "Bonnes pratiques de design et de lisibilité",
      ],
    },
    windows: {
      title: "Windows & Systèmes",
      description: "Prise en main de l'environnement de travail informatique.",
      features: [
        "Organisation et gestion des fichiers et dossiers",
        "Sécurité informatique de base (mots de passe, antivirus, sauvegardes)",
        "Installation et gestion des logiciels courants",
        "Travail en réseau, partage de fichiers et impression",
      ],
    },
  };

  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased pt-28 pb-20">
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-line">
        <div className="relative z-10 max-w-4xl">
          <Link href="/academy" className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm mb-6 hover:underline">
            ← Retour aux formations BM Academia
          </Link>
          <div className="flex justify-center mb-4">
            <svg className="w-9 h-9 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            Formation <span className="text-gradient-red">Bureautique</span>
          </h1>
          <p className="text-xl text-ink-soft mb-8 leading-relaxed max-w-2xl mx-auto">
            Maîtrisez les outils incontournables du travail sur ordinateur : Word, Excel, PowerPoint et la gestion
            de votre environnement Windows.
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
            <Link href="/register?program=BUREAUTIQUE" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt transition border border-line">
              S'inscrire à la formation
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            Déjà inscrit(e) ? <Link href="/login" className="text-red-500 font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <section className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink mb-3">Choisissez un module</h2>
            <p className="text-ink-soft text-sm">Cliquez sur un logiciel pour découvrir le contenu de la formation.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(['word', 'excel', 'powerpoint', 'windows'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition ${
                  activeTab === key
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-surface text-ink-soft hover:text-ink border border-line'
                }`}
              >
                {modules[key].title}
              </button>
            ))}
          </div>

          <div className="bg-surface p-8 rounded-2xl border border-line max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-ink mb-2">{modules[activeTab].title}</h3>
            <p className="text-ink-soft text-sm mb-6">{modules[activeTab].description}</p>
            <ul className="space-y-3">
              {modules[activeTab].features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-ink-soft text-sm">
                  <IconCheck />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface/50 p-8 rounded-3xl border border-line">
            <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>
              Cours en Ligne Direct
            </h3>
            <p className="text-ink-soft text-sm leading-relaxed mb-4">
              Sessions en direct avec un formateur qualifié, exercices pratiques guidés sur cas réels et corrections
              instantanées.
            </p>
            <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30">
              Horaires flexibles (Soir & Week-end)
            </span>
          </div>

          <div className="bg-surface/50 p-8 rounded-3xl border border-line">
            <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Formation Particulière ou Entreprise
            </h3>
            <p className="text-ink-soft text-sm leading-relaxed mb-4">
              Programme sur-mesure pour vos équipes (secrétariat, comptabilité, administration) ou coaching
              individuel intensif.
            </p>
            <span className="text-xs font-semibold px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-600/30">
              Programme 100% Personnalisé
            </span>
          </div>
        </section>
      </div>

      <section className="bg-surface-sunken py-20 px-6 border-t border-line text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-ink mb-6">Prêt à maîtriser la bureautique ?</h2>
          <p className="text-xl text-ink-soft mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pédagogique au <span className="text-ink font-bold">{phoneOfficial}</span> ou sur
            WhatsApp pour réserver votre première session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register?program=BUREAUTIQUE" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
              S'inscrire à la formation
            </Link>
            <Link href="/login" className="bg-surface text-ink font-bold px-8 py-4 rounded-full text-lg hover:bg-surface-alt transition border border-line">
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
