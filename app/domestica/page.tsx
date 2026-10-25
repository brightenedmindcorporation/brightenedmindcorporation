"use client";

import React from "react";
import DomesticaForms from "@/components/DomesticaForms";

const Icon = ({ d }: { d: string }) => (
  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const services = [
  {
    icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-4.13a4 4 0 110-5.29m0 5.29a4 4 0 010 5.29M9 11a4 4 0 118 0 4 4 0 01-8 0z",
    title: "Recrutement & sélection",
    description: "Présélection rigoureuse de personnel domestique qualifié : entretien, références et expérience sont examinés avant toute présentation.",
  },
  {
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    title: "Formation du personnel",
    description: "Mise à niveau pratique sur l'hygiène, la sécurité du foyer, l'organisation du travail et le savoir-être professionnel.",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Placement & suivi",
    description: "Mise en relation avec les ménages, accompagnement administratif et suivi de satisfaction après l'intégration.",
  },
];

const profiles = [
  { title: "Aides ménagères", emoji: "🧹", tasks: ["Entretien courant du foyer", "Repassage et gestion du linge", "Organisation et rangement"] },
  { title: "Nounous & gardes d'enfants", emoji: "🧸", tasks: ["Surveillance et sécurité des enfants", "Repas, toilette, activités", "Accompagnement scolaire"] },
  { title: "Cuisiniers / cuisinières", emoji: "🍲", tasks: ["Préparation des repas quotidiens", "Hygiène alimentaire", "Gestion des stocks de cuisine"] },
  { title: "Chauffeurs privés", emoji: "🚗", tasks: ["Conduite sûre et ponctuelle", "Entretien courant du véhicule", "Discrétion et sens du service"] },
  { title: "Gardiens & agents de sécurité", emoji: "🛡️", tasks: ["Surveillance de la propriété", "Contrôle des accès", "Rondes et signalement"] },
  { title: "Jardiniers", emoji: "🌿", tasks: ["Entretien des espaces verts", "Arrosage et taille", "Aménagement paysager simple"] },
];

const employerSteps = [
  { n: "01", t: "Vous décrivez votre besoin", d: "Poste, horaires, lieu, budget : via le formulaire ou WhatsApp." },
  { n: "02", t: "Nous présélectionnons", d: "Nous étudions les candidats : entretien, références, expérience." },
  { n: "03", t: "Vous rencontrez et choisissez", d: "Vous recevez des profils adaptés et décidez après rencontre." },
  { n: "04", t: "Placement et suivi", d: "Nous formalisons le placement et suivons la satisfaction." },
];
const candidateSteps = [
  { n: "01", t: "Vous postulez", d: "Un formulaire simple, sans frais d'inscription demandés par le formulaire." },
  { n: "02", t: "Entretien et vérification", d: "Nous vous rencontrons et vérifions vos informations et références." },
  { n: "03", t: "Formation", d: "Une mise à niveau pratique : hygiène, sécurité, savoir-être." },
  { n: "04", t: "Proposition de postes", d: "Nous vous proposons des postes adaptés, avec votre accord." },
];

const plans = [
  { name: "Placement simple", text: "Présélection, présentation de profils, aide à la mise en place du contrat.", items: ["Besoin analysé avec vous", "Candidats présélectionnés", "Mise en relation et entretien"], accent: false },
  { name: "Placement + suivi", text: "Le placement, plus un suivi régulier de la satisfaction après l'intégration.", items: ["Tout le placement simple", "Points de suivi après le démarrage", "Médiation en cas de difficulté"], accent: true },
  { name: "Remplacement", text: "Si le profil ne convient pas, nous proposons un autre candidat dans les conditions convenues.", items: ["Conditions définies à l'avance", "Nouvelle présélection", "Même accompagnement"], accent: false },
];

const trust = [
  "Candidats rencontrés et présélectionnés avant toute présentation",
  "Formation pratique avant placement : hygiène, sécurité, savoir-être",
  "Accompagnement administratif tout au long du processus",
  "Suivi de satisfaction après le placement, remplacement possible selon les conditions convenues",
];

const faqs = [
  { q: "Combien coûte vos services ?", a: "Le tarif dépend du poste, de la durée et de la formule choisie. Décrivez votre besoin : nous vous répondons avec une proposition claire, avant tout engagement." },
  { q: "Comment vérifiez-vous les candidats ?", a: "Nous rencontrons chaque candidat, contrôlons son identité et ses références disponibles, et évaluons son expérience. Nous vous expliquons ce qui a été vérifié pour chaque profil." },
  { q: "Que se passe-t-il si la personne ne convient pas ?", a: "Contactez-nous : nous cherchons d'abord une solution avec les deux parties. Un remplacement est possible selon les conditions convenues au départ." },
  { q: "Qui rédige le contrat et fixe le salaire ?", a: "Le contrat est établi entre le ménage et la personne, avec notre accompagnement. Le salaire et les conditions sont discutés et acceptés par les deux parties, dans le respect de la réglementation du travail." },
  { q: "Je cherche un emploi : dois-je payer pour m'inscrire ?", a: "Le formulaire de candidature est gratuit. Les conditions éventuelles de formation vous sont expliquées clairement avant tout engagement. Ne payez jamais une somme sans reçu officiel." },
  { q: "Mes informations personnelles sont-elles protégées ?", a: "Vos informations ne sont partagées avec un employeur qu'avec votre accord. Vous pouvez demander leur modification ou leur suppression à tout moment." },
  { q: "Dans quelles villes intervenez-vous ?", a: "Écrivez-nous en indiquant votre ville : nous vous confirmons la disponibilité du service dans votre zone." },
];

export default function DomesticaPage() {
  const whatsappUrl = `https://wa.me/243988830799?text=${encodeURIComponent("Bonjour BM Domestica, je souhaite en savoir plus sur vos services de personnel domestique.")}`;

  return (
    <main className="min-h-screen bg-page text-ink font-sans antialiased pt-28">
      {/* HERO */}
      <section className="relative flex items-center justify-center py-16 px-6 text-center border-b border-line">
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/5 text-red-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4 border border-red-700/40">
            BM CORPORATION
          </span>
          <h1 className="text-4xl min-[400px]:text-5xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            BM <span className="text-gradient-red">Domestica</span>
          </h1>
          <p className="text-xl text-ink-soft mb-8 leading-relaxed max-w-2xl mx-auto">
            Du personnel domestique formé, présélectionné et suivi : pour les foyers qui veulent un service de confiance, et pour les personnes qui cherchent un emploi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#demande" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-lg transition-all">
              Je cherche du personnel
            </a>
            <a href="#demande-candidat" className="bg-surface text-ink font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-surface-alt transition border border-line">
              Je cherche un emploi
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl mx-auto text-xs font-bold uppercase tracking-wider text-ink-soft">
            {["Présélectionné", "Formé", "Suivi"].map((t) => (
              <span key={t} className="rounded-full border border-line bg-surface px-3 py-2">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Nos services</h2>
          <p className="text-ink-soft max-w-xl mx-auto text-sm">Un accompagnement complet, de la sélection du personnel jusqu'à son intégration durable dans le foyer.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="group bg-surface/60 p-8 rounded-3xl border border-line transition-all duration-300 hover:border-red-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/10">
              <div className="p-4 bg-surface-alt rounded-2xl border border-line w-fit mb-6 group-hover:border-red-600/50 transition-colors">
                <Icon d={s.icon} />
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-red-500 transition-colors">{s.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROFILS */}
      <div className="bg-surface-sunken border-t border-line py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Les métiers que nous proposons</h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">Chaque métier a ses missions précises. Dites-nous ce dont vous avez besoin : nous vous proposons des profils adaptés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((p) => (
              <div key={p.title} className="bg-surface p-6 rounded-2xl border border-line hover:border-red-600/60 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {p.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-ink-faint">D'autres métiers (garde-malade, majordome…) sur demande.</p>
        </div>
      </div>

      {/* FORMATION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-line bg-surface/60 p-8 md:p-12 text-center">
          <span className="inline-block rounded-full border border-red-700/40 bg-red-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">BM Academia</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-ink">La formation du personnel domestique</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            12 leçons illustrées avec quiz et certificat : le métier et le savoir-être, l'hygiène, l'entretien de la maison, le linge, la cuisine, la garde d'enfants, les premiers secours,
            la sécurité du foyer, la communication, vos droits et votre carrière. Pour les candidats comme pour le personnel déjà en poste.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/register?program=DOMESTICA" className="glow-accent rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-8 py-3.5 text-lg font-bold text-white transition hover:from-red-500 hover:to-red-800">
              S'inscrire à la formation
            </a>
            <a href="/login?program=DOMESTICA" className="rounded-xl border border-line bg-surface px-8 py-3.5 text-lg font-bold text-ink transition hover:bg-surface-alt">
              Se connecter
            </a>
          </div>
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Comment ça marche</h2>
          <p className="text-ink-soft max-w-xl mx-auto text-sm">Un processus simple et encadré, pour les deux côtés.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {[
            { title: "Pour les ménages et entreprises", steps: employerSteps },
            { title: "Pour les candidats", steps: candidateSteps },
          ].map((col) => (
            <div key={col.title} className="rounded-3xl border border-line bg-surface/60 p-6 md:p-8">
              <h3 className="mb-6 text-xl font-bold text-ink">{col.title}</h3>
              <ol className="space-y-5">
                {col.steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="text-3xl font-black text-red-600/30 leading-none">{s.n}</span>
                    <div>
                      <p className="font-bold text-ink">{s.t}</p>
                      <p className="mt-1 text-sm text-ink-soft leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* FORMULES */}
      <div className="bg-surface-sunken border-t border-line py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Nos formules</h2>
            <p className="text-ink-soft max-w-xl mx-auto text-sm">Tarif communiqué sur devis, selon le poste et la durée : pas de surprise, la proposition est écrite avant tout engagement.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-3xl border p-7 ${p.accent ? "border-red-600 bg-surface shadow-xl shadow-red-600/10" : "border-line bg-surface"}`}>
                {p.accent && <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Le plus choisi</span>}
                <h3 className="text-xl font-bold text-ink">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{p.text}</p>
                <ul className="mt-5 space-y-2">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink-soft">
                      <span className="text-red-500 font-bold">✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
                <a href="#demande" className="mt-6 block rounded-xl border border-line py-2.5 text-center text-sm font-bold text-ink hover:border-red-600/60 transition">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GARANTIES */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Pourquoi choisir BM Domestica</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {trust.map((point) => (
            <div key={point} className="flex items-start gap-3 bg-surface p-5 rounded-2xl border border-line">
              <span className="text-red-500 font-bold shrink-0">✓</span>
              <p className="text-ink-soft text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-surface-sunken border-t border-line py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-10 text-center">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-surface p-5 open:border-red-600/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {f.q}
                  <span className="text-red-500 transition group-open:rotate-45 text-xl leading-none" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* DEMANDE */}
      <section id="demande" className="scroll-mt-28 py-20 px-6 border-t border-line">
        <div className="max-w-3xl mx-auto">
          <div id="demande-candidat" className="scroll-mt-28" />
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink mb-4">Parlons de votre besoin</h2>
            <p className="text-ink-soft">Remplissez le formulaire : nous revenons vers vous rapidement.</p>
          </div>
          <DomesticaForms />
          <div className="mt-8 text-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-full transition hover:scale-105 shadow-xl shadow-emerald-600/20">
              Préférez-vous WhatsApp ? Écrivez-nous
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
