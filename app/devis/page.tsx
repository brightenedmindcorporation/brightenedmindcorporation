"use client";

import React, { useState } from 'react';
import Link from 'next/link';

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
  const [selectedCode, setSelectedCode] = useState("+243"); // Code par défaut (RDC)
  const [phoneNumber, setPhoneNumber] = useState("");

  // Renseigne ici le vrai numéro WhatsApp de ton entreprise (au format international sans le +)
  const whatsappNumber = "+243970874852"; 
  const whatsappMessage = encodeURIComponent("Bonjour BM Corporation, je souhaite obtenir un devis pour mes projets de communication.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto bg-neutral-900/80 p-8 md:p-12 rounded-3xl border border-neutral-800 shadow-2xl">
        
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 text-red-500 font-semibold text-sm mb-3 border border-red-600/30">
            DEMANDE DE DEVIS
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Parlez-nous de votre projet
          </h1>
          <p className="text-neutral-400 mt-2">
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
          <div className="flex-grow border-t border-neutral-800"></div>
          <span className="flex-shrink mx-4 text-neutral-500 text-sm">OU REMPLISSEZ LE FORMULAIRE</span>
          <div className="flex-grow border-t border-neutral-800"></div>
        </div>

        {submitted ? (
          <div className="bg-red-600/10 border border-red-600 text-center p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Message envoyé avec succès !</h3>
            <p className="text-neutral-300">
              Merci ! L'équipe de BM Corporation a bien reçu votre demande et vous répondra sur votre e-mail très rapidement.
            </p>
          </div>
        ) : (
          <form action="https://formspree.io/f/xbjnypqg" method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Votre nom"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Adresse E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="votre@email.com"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CHAMP TÉLÉPHONE AVEC SÉLECTEUR D'INDICATIF */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Téléphone / WhatsApp</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    className="bg-black border border-neutral-800 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-red-600 transition text-sm max-w-[130px]"
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
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition"
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
                <label className="block text-sm font-medium text-neutral-300 mb-2">Service concerné</label>
                <select
                  name="service"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition"
                >
                  <option value="Photographie">Photographie</option>
                  <option value="Vidéographie">Vidéographie & Clips</option>
                  <option value="Design & Supports">Design, Logo & Print</option>
                  <option value="Marketing Digital">Marketing Digital & Réseaux</option>
                  <option value="Site Web / Application">Création Site Web / App</option>
                  <option value="Autre">Autre projet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Détails de votre projet *</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Décrivez vos besoins, délais, objectifs..."
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg transition shadow-xl shadow-red-600/30"
            >
              Envoyer la demande de devis
            </button>
          </form>
        )}

        <div className="text-center mt-8">
          <Link href="/communication" className="text-neutral-500 hover:text-white text-sm transition">
            ← Retour à BM Communication
          </Link>
        </div>
      </div>
    </main>
  );
}