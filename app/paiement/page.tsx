"use client";

import React, { useState } from "react";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<"mobile" | "card">("mobile");
  const [operator, setOperator] = useState<"mpesa" | "orange" | "airtel" | "afrimoney">("mpesa");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de l'appel API vers la passerelle de paiement (CinetPay / FlexPay)
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-extrabold mb-2">Finaliser votre inscription</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Choisissez votre mode de paiement sécurisé pour valider votre formation.
        </p>

        {status === "success" ? (
          <div className="bg-emerald-950/80 border border-emerald-600/50 rounded-xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-emerald-400">Paiement Reçu avec Succès !</h2>
            <p className="text-neutral-300 text-sm">
              Votre transaction a été validée. Un message de confirmation vous a été envoyé par SMS/Email avec vos accès.
            </p>
            <a
              href="/academy"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition mt-4"
            >
              Accéder à mon Espace Élève
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Choix du type de paiement */}
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
                  <span>💳 Carte / Banques</span>
                  {selectedMethod === "card" && <span className="w-3 h-3 bg-red-600 rounded-full"></span>}
                </button>
              </div>
            </div>

            {/* Options Mobile Money */}
            {selectedMethod === "mobile" && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold">Sélectionnez l'opérateur</label>
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

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Numéro de téléphone payeur</label>
                  <input
                    type="tel"
                    placeholder="+243 8X XXX XX XX"
                    required
                    className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Options Carte Bancaire */}
            {selectedMethod === "card" && (
              <div className="space-y-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <p className="text-xs text-neutral-400">
                  Paiement sécurisé via Carte Visa, Mastercard ou virement bancaire direct.
                </p>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Nom sur la carte</label>
                  <input
                    type="text"
                    placeholder="Jordi Mukosa"
                    required
                    className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Récapitulatif et validation */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Total à payer</p>
                <p className="text-2xl font-black text-red-500">$50.00 USD</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-red-600/30"
              >
                {loading ? "Traitement en cours..." : "Payer maintenant ↗"}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}