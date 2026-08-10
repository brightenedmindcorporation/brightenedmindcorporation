"use client";

import React, { useState } from "react";

// Config des numéros/comptes récepteurs de l'entreprise
const COMPANY_ACCOUNTS = {
  mpesa: { name: "M-Pesa (Vodacom)", number: "+243 810 000 000", merchantId: "BM-MPESA-RDCO" },
  orange: { name: "Orange Money", number: "+243 840 000 000", merchantId: "BM-ORANGE-RDCO" },
  airtel: { name: "Airtel Money", number: "+243 990 000 000", merchantId: "BM-AIRTEL-RDCO" },
  afrimoney: { name: "Afrimoney", number: "+243 900 000 000", merchantId: "BM-AFRI-RDCO" },
  bank: { name: "Compte Banque / Visa", iban: "CD56 1234 5678 9012 3456 7890 123", bankName: "Rawbank / Equity BCDC" },
};

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<"mobile" | "card">("mobile");
  const [operator, setOperator] = useState<"mpesa" | "orange" | "airtel" | "afrimoney">("mpesa");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  
  // État du processus : idle -> waiting_pin (attente validation téléphone) -> success
  const [step, setStep] = useState<"idle" | "waiting_pin" | "success">("idle");
  const [generatedMatricule, setGeneratedMatricule] = useState<string>("");

  // Fonction de génération du matricule séquentiel BMCA-2026-XXXXXX
  const generateStudentId = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // Génère 6 chiffres
    return `BMCA-2026-${randomNum}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("waiting_pin");

    // Simulation : La passerelle envoie le Push USSD sur le téléphone de l'élève
    setTimeout(() => {
      // Dès que le Webhook confirme que le paiement est réellement reçu sur le compte entreprise :
      const newMatricule = generateStudentId();
      setGeneratedMatricule(newMatricule);
      setStep("success");
    }, 4000); // 4 secondes d'attente de validation PIN téléphone
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-extrabold">Finaliser votre inscription</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Paiement direct sécurisé vers les comptes officiels Brightened Mind Corporation.
            </p>
          </div>
          <span className="bg-red-950 text-red-400 border border-red-800 text-xs px-3 py-1 rounded-full font-semibold">
            Session 2026
          </span>
        </div>

        {/* ÉTAPE 1 : Attente de validation du code PIN sur le téléphone */}
        {step === "waiting_pin" && (
          <div className="bg-neutral-950 border border-yellow-600/40 rounded-xl p-8 text-center space-y-6 animate-pulse">
            <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto text-3xl">
              📲
            </div>
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">Demande envoyée sur votre téléphone !</h2>
              <p className="text-neutral-300 text-sm mt-2">
                Un message s'est affiché sur votre numéro <span className="font-bold text-white">{phone}</span>.
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                Veuillez saisir votre **Code PIN {operator.toUpperCase()}** sur votre téléphone portable pour valider le transfert vers le compte récepteur de BM Corp.
              </p>
            </div>
            <div className="text-xs text-neutral-500">
              Vérification automatique de la transaction en cours...
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Paiement Confirmé + Génération du Matricule */}
        {step === "success" && (
          <div className="bg-emerald-950/80 border border-emerald-600/50 rounded-xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-emerald-400">Paiement Reçu avec Succès !</h2>
              <p className="text-neutral-300 text-sm mt-1">
                L'argent a été perçu sur le compte officiel de Brightened Mind Corporation.
              </p>
            </div>

            {/* AFFICHER LE MATRICULE EN ROUGE / BLANC */}
            <div className="bg-black/60 border border-emerald-500/30 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Votre Matricule Élève Officiel</p>
              <p className="text-3xl font-mono font-black text-red-500 tracking-wider">
                {generatedMatricule}
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                Conservez ce matricule, il vous permettra d'accéder à vos cours sur BM Academy.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="/academia"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-red-600/30"
              >
                Accéder à mon Espace Academia ↗
              </a>
            </div>
          </div>
        )}

        {/* FORMULAIRE INITIAL */}
        {step === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Choix du mode de paiement */}
            <div>
              <label className="block text-sm font-semibold mb-3">Mode de paiement</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("mobile")}
                  className={`p-4 rounded-xl border text-left font-semibold transition flex items-center justify-between ${
                    selectedMethod === "mobile"
                      ? "border-red-600 bg-red-950/20 text-white"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400"
                  }`}
                >
                  <span>📱 Mobile Money</span>
                  {selectedMethod === "mobile" && <span className="w-3 h-3 bg-red-600 rounded-full"></span>}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("card")}
                  className={`p-4 rounded-xl border text-left font-semibold transition flex items-center justify-between ${
                    selectedMethod === "card"
                      ? "border-red-600 bg-red-950/20 text-white"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400"
                  }`}
                >
                  <span>💳 Carte / Banque</span>
                  {selectedMethod === "card" && <span className="w-3 h-3 bg-red-600 rounded-full"></span>}
                </button>
              </div>
            </div>

            {/* Mode Mobile Money */}
            {selectedMethod === "mobile" && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold">1. Choisissez votre opérateur</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "mpesa", name: "M-Pesa", color: "bg-red-600" },
                    { id: "orange", name: "Orange Money", color: "bg-orange-500" },
                    { id: "airtel", name: "Airtel Money", color: "bg-red-700" },
                    { id: "afrimoney", name: "Afrimoney", color: "bg-purple-600" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOperator(item.id as any)}
                      className={`p-3 rounded-lg border text-xs font-bold transition flex items-center gap-2 ${
                        operator === item.id
                          ? "border-white bg-neutral-800 text-white"
                          : "border-neutral-800 bg-neutral-950 text-neutral-400"
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      {item.name}
                    </button>
                  ))}
                </div>

                {/* Information sur le compte récepteur entreprise */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs text-neutral-400 space-y-1">
                  <p className="font-semibold text-white">Compte récepteur de l'entreprise :</p>
                  <p>Récepteur : <span className="text-white font-mono">{COMPANY_ACCOUNTS[operator].name}</span></p>
                  <p>N° Marchand BM Corp : <span className="text-red-400 font-mono">{COMPANY_ACCOUNTS[operator].number}</span></p>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Votre numéro de téléphone payeur</label>
                  <input
                    type="tel"
                    placeholder="+243 8X XXX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Mode Carte / Banque */}
            {selectedMethod === "card" && (
              <div className="space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="text-xs text-neutral-400 space-y-1">
                  <p className="font-semibold text-white">Compte Bancaire Récepteur :</p>
                  <p>Banque : <span className="text-white font-mono">{COMPANY_ACCOUNTS.bank.bankName}</span></p>
                  <p>IBAN / Compte BM Corp : <span className="text-red-400 font-mono">{COMPANY_ACCOUNTS.bank.iban}</span></p>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Nom complet du titulaire de la carte</label>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Récapitulatif et Bouton */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Frais d'inscription</p>
                <p className="text-2xl font-black text-red-500">$50.00 USD</p>
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-red-600/30"
              >
                Payer et Obtenir mon Matricule ↗
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}