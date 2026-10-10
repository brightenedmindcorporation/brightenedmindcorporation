"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const IconCheck = () => (
  <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function LogicielsPage() {
  const phoneOfficial = "+243988830799";
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Academia, je souhaite m'informer sur la formation Logiciels de Gestion.")}`;

  const [activeSoft, setActiveSoft] = useState<'odoo' | 'sage' | 'dolibarr' | 'douane'>('odoo');

  const software = {
    odoo: {
      title: "ODOO",
      subtitle: "ERP tout-en-un pour la gestion d'entreprise",
      description:
        "Odoo est un progiciel de gestion intégré (ERP) modulaire utilisé par des entreprises de toutes tailles pour centraliser la gestion commerciale, comptable et des stocks.",
      features: [
        "Module Ventes : devis, commandes et facturation client",
        "Module Achats : commandes fournisseurs et approvisionnement",
        "Module Comptabilité : écritures, rapprochements et états financiers",
        "Module Stock & Inventaire : suivi des entrées/sorties et valorisation",
        "Module CRM : suivi des prospects et opportunités commerciales",
        "Module RH : gestion des employés, congés et présences",
      ],
    },
    sage: {
      title: "SAGE",
      subtitle: "Comptabilité & gestion commerciale",
      description: "Logiciel de référence pour la comptabilité générale, la facturation et la gestion commerciale des PME.",
      features: [
        "Saisie comptable et plan comptable",
        "Facturation clients et gestion des règlements",
        "États financiers (bilan, compte de résultat)",
        "Rapprochement bancaire",
      ],
    },
    dolibarr: {
      title: "Dolibarr",
      subtitle: "Gestion de stocks, facturation & CRM",
      description: "Solution open-source de gestion d'entreprise, légère et accessible pour les petites structures.",
      features: [
        "Gestion des stocks et des produits",
        "Devis, factures et suivi des paiements",
        "Suivi des contacts et opportunités commerciales (CRM)",
        "Tableaux de bord de suivi d'activité",
      ],
    },
    douane: {
      title: "Sydonia & SEGUB",
      subtitle: "Opérations douanières et guichet unique",
      description: "Logiciels spécialisés pour les déclarations douanières et les opérations de guichet unique utilisés en RDC.",
      features: [
        "Déclarations douanières import/export",
        "Suivi des dossiers et des taxes",
        "Procédures du guichet unique des opérations du commerce extérieur",
        "Bonnes pratiques de conformité réglementaire",
      ],
    },
  };

  const otherSoftware = ["AuditSoft (audit et contrôle de gestion)", "AUDOCompt (gestion comptable spécialisée)"];

  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased pt-28 pb-20">
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-line">
        <div className="relative z-10 max-w-4xl">
          <Link href="/academy" className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm mb-6 hover:underline">
            ← Retour aux formations BM Academia
          </Link>
          <div className="flex justify-center mb-4">
            <span className="text-4xl">🧾</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            Formation <span className="text-gradient-red">Logiciels de Gestion</span>
          </h1>
          <p className="text-xl text-ink-soft mb-8 leading-relaxed max-w-2xl mx-auto">
            Logiciels comptables, ERP, gestion commerciale, douanière et d'audit — dont une formation complète sur <strong className="text-ink">ODOO</strong>.
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
            <Link href="/register?program=LOGICIELS" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt transition border border-line">
              S'inscrire à la formation
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-faint">
            Déjà inscrit(e) ? <Link href="/login" className="text-red-500 font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <section className="bg-surface/40 p-8 md:p-12 rounded-3xl border border-line">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink mb-3">Choisissez un logiciel</h2>
            <p className="text-ink-soft text-sm">Cliquez sur un logiciel pour découvrir le contenu de la formation.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(['odoo', 'sage', 'dolibarr', 'douane'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSoft(key)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition ${
                  activeSoft === key
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-surface text-ink-soft hover:text-ink border border-line'
                }`}
              >
                {software[key].title}
              </button>
            ))}
          </div>

          <div className="bg-surface p-8 rounded-2xl border border-line max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-ink mb-1">{software[activeSoft].title}</h3>
            <p className="text-red-500 text-sm font-semibold mb-3">{software[activeSoft].subtitle}</p>
            <p className="text-ink-soft text-sm mb-6">{software[activeSoft].description}</p>
            <ul className="space-y-3">
              {software[activeSoft].features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-ink-soft text-sm">
                  <IconCheck />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">Autres logiciels couverts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {otherSoftware.map((item, i) => (
              <div key={i} className="bg-surface p-5 rounded-2xl border border-line text-center text-ink-soft text-sm">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-surface-sunken py-20 px-6 border-t border-line text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-ink mb-6">Prêt à maîtriser vos outils de gestion ?</h2>
          <p className="text-xl text-ink-soft mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pédagogique au <span className="text-ink font-bold">{phoneOfficial}</span> ou sur
            WhatsApp pour réserver votre première session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register?program=LOGICIELS" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
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
