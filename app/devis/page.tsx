"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Paperclip, X } from 'lucide-react';
import { availableLanguages } from '@/content/curriculum';
import { otherPrograms } from '@/content/programs';

// Liste des pays avec leurs indicatifs téléphoniques
const countryCodes = [
  { code: "+243", country: "RDC (Congo-Kinshasa)", flag: "🇨🇩" },
  { code: "+242", country: "Congo-Brazzaville", flag: "🇨🇬" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+32", country: "Belgique", flag: "🇧🇪" },
  { code: "+41", country: "Suisse", flag: "🇨🇭" },
  { code: "+1", country: "Canada / USA", flag: "🇨🇦" },
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "+221", country: "Sénégal", flag: "🇸🇳" },
  { code: "+237", country: "Cameroun", flag: "🇨🇲" },
  { code: "+228", country: "Togo", flag: "🇹🇬" },
  { code: "+229", country: "Bénin", flag: "🇧🇯" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
  { code: "+223", country: "Mali", flag: "🇲🇱" },
  { code: "+224", country: "Guinée", flag: "🇬🇳" },
  { code: "+241", country: "Gabon", flag: "🇬🇦" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+257", country: "Burundi", flag: "🇧🇮" },
  { code: "+235", country: "Tchad", flag: "🇹🇩" },
  { code: "+261", country: "Madagascar", flag: "🇲🇬" },
  { code: "+212", country: "Maroc", flag: "🇲🇦" },
  { code: "+216", country: "Tunisie", flag: "🇹🇳" },
  { code: "+213", country: "Algérie", flag: "🇩🇿" },
  { code: "+244", country: "Angola", flag: "🇦🇴" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+27", country: "Afrique du Sud", flag: "🇿🇦" },
  { code: "+44", country: "Royaume-Uni", flag: "🇬🇧" },
  { code: "+49", country: "Allemagne", flag: "🇩🇪" },
  { code: "+34", country: "Espagne", flag: "🇪🇸" },
  { code: "+39", country: "Italie", flag: "🇮🇹" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+31", country: "Pays-Bas", flag: "🇳🇱" },
  { code: "+55", country: "Brésil", flag: "🇧🇷" },
  { code: "+509", country: "Haïti", flag: "🇭🇹" },
  { code: "+590", country: "Guadeloupe / St-Martin", flag: "🇬🇵" },
  { code: "+596", country: "Martinique", flag: "🇲🇶" },
  { code: "+262", country: "La Réunion", flag: "🇷🇪" },
  { code: "+594", country: "Guyane Française", flag: "🇬🇫" },
];

export default function DevisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState("+243"); // Code par défaut (RDC)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Photographie");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  // Renseigne ici le vrai numéro WhatsApp de ton entreprise (au format international sans le +)
  const whatsappNumber = "243988830799";
  const whatsappMessage = encodeURIComponent("Bonjour BM Corporation, je souhaite obtenir un devis pour mes projets de communication.");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("phone", `${selectedCode} ${phoneNumber}`);
      form.append("service", service);
      form.append("message", message);
      if (attachment) form.append("attachment", attachment);

      const response = await fetch("/api/devis/submit", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setSubmitted(true);
      setAttachment(null);
    } catch (error: any) {
      setSubmitError(error.message || "Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-page text-ink font-sans pt-28 pb-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 radial-fade pointer-events-none" />
      <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/40 relative">

        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/5 text-red-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3 border border-red-700/40">
            DEMANDE DE DEVIS
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">
            Parlez-nous de votre projet
          </h1>
          <p className="text-ink-soft mt-2">
            Remplissez le formulaire ci-dessous ou contactez-nous directement via WhatsApp.
          </p>
        </div>

        {/* BOUTON WHATSAPP RAPIDE */}
        <div className="mb-10 text-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-2xl transition shadow-lg shadow-green-600/20"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            Discuter directement sur WhatsApp
          </a>
        </div>

        <div className="relative flex py-2 items-center mb-10">
          <div className="flex-grow border-t border-line"></div>
          <span className="flex-shrink mx-4 text-ink-faint text-sm">OU REMPLISSEZ LE FORMULAIRE</span>
          <div className="flex-grow border-t border-line"></div>
        </div>

        {submitted ? (
          <div className="bg-red-600/10 border border-red-600 text-center p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-ink mb-2">Message envoyé avec succès !</h3>
            <p className="text-ink-soft">
              Merci ! L'équipe de BM Corporation a bien reçu votre demande et vous répondra sur votre e-mail ou votre WhatsApp très rapidement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <p className="text-red-500 text-sm text-center font-medium">{submitError}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ink-soft mb-2">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-sunken/60 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-soft mb-2">Adresse E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-sunken/60 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CHAMP TÉLÉPHONE AVEC SÉLECTEUR D'INDICATIF */}
              <div>
                <label className="block text-sm font-medium text-ink-soft mb-2">Téléphone / WhatsApp</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    className="bg-surface-sunken/60 border border-line rounded-xl px-3 py-3 text-ink focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30 transition text-sm max-w-[130px]"
                  >
                    {countryCodes.map((c, i) => (
                      <option key={i} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="tel"
                    placeholder="81 234 5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-surface-sunken/60 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30 transition"
                  />
                  
                  {/* Champ caché transmis avec le numéro complet pour le formulaire */}
                  <input
                    type="hidden"
                    name="phone"
                    value={`${selectedCode} ${phoneNumber}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-soft mb-2">Service / Département concerné</label>
                <select
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-surface-sunken/60 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30 transition"
                >
                  <optgroup label="Communication">
                    <option value="Photographie">Photographie</option>
                    <option value="Vidéographie">Vidéographie & Clips</option>
                    <option value="Design & Supports">Design, Logo & Print</option>
                    <option value="Marketing Digital">Marketing Digital & Réseaux</option>
                    <option value="Site Web / Application">Création Site Web / App</option>
                  </optgroup>
                  <optgroup label="Academia — Langues">
                    {availableLanguages.map((lang) => (
                      <option key={lang.code} value={`Formation — ${lang.label}`}>Formation en {lang.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Academia — Formations professionnelles">
                    {otherPrograms.map((program) => (
                      <option key={program.code} value={`Formation — ${program.label}`}>{program.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Domestica">
                    <option value="Domestica — Personnel domestique">Recrutement de personnel domestique</option>
                  </optgroup>
                  <option value="Autre">Autre projet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">Détails de votre projet *</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Décrivez vos besoins, délais, objectifs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-surface-sunken/60 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30 transition"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-2">Pièce jointe (optionnel)</label>
              {attachment ? (
                <span className="inline-flex items-center gap-2 text-sm bg-surface-sunken/60 border border-line rounded-xl px-4 py-3 text-ink-soft">
                  <Paperclip size={15} className="shrink-0" />
                  <span className="truncate max-w-[240px]">{attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    aria-label="Retirer la pièce jointe"
                    className="text-ink-faint hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ) : (
                <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-ink-soft hover:text-ink border border-line rounded-xl px-4 py-3 transition bg-surface-sunken/60">
                  <Paperclip size={15} />
                  Joindre un fichier (cahier des charges, plan, document...)
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg transition"
            >
              {submitting ? "Envoi en cours..." : "Envoyer la demande de devis"}
            </button>
          </form>
        )}

        <div className="text-center mt-8">
          <Link href="/communication" className="text-ink-faint hover:text-ink text-sm transition">
            ← Retour à BM Communication
          </Link>
        </div>
      </div>
    </main>
  );
}