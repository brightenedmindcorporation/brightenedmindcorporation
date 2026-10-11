"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { availableLanguages } from "@/content/curriculum";

const COURSE_PRICE_USD = 50;

export default function PaymentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [langCode, setLangCode] = useState(availableLanguages[0].code);
  const [selectedMethod, setSelectedMethod] = useState<"mobile" | "card">("mobile");
  const [operator, setOperator] = useState<"mpesa" | "orange" | "airtel" | "afrimoney">("mpesa");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [matricule, setMatricule] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const langLabel = availableLanguages.find((l) => l.code === langCode)?.label ?? langCode;

      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: COURSE_PRICE_USD,
          currency: "USD",
          phone,
          studentName: user.displayName || user.email,
          studentEmail: user.email,
          courseName: `${langLabel} — Niveau 1`,
          uid: user.uid,
          langCode,
          level: 1,
          method: selectedMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Le paiement a échoué.");
      }

      if (result.status === "pending") {
        // Real FlexPay Mobile Money flow: the customer approves a USSD
        // prompt on their phone, confirmation arrives asynchronously on
        // /api/payment/webhook — poll until that lands.
        setStatus("pending");
        pollPaymentStatus(result.reference);
        return;
      }

      setMatricule(result.matricule ?? null);
      setStatus("success");
    } catch (error: any) {
      console.error("Erreur paiement:", error);
      setErrorMessage(error.message || "Une erreur est survenue lors du paiement. Veuillez réessayer.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = (reference: string) => {
    const startedAt = Date.now();
    const timeoutMs = 3 * 60 * 1000; // Mobile Money USSD prompts expire after a few minutes anyway.

    const check = async () => {
      try {
        const response = await fetch(`/api/payment/status?reference=${encodeURIComponent(reference)}`);
        const result = await response.json();

        if (result.status === "paid") {
          setMatricule(result.matricule ?? null);
          setStatus("success");
          return;
        }
        if (result.status === "failed") {
          setErrorMessage("Le paiement a été refusé ou annulé sur votre téléphone. Réessayez.");
          setStatus("error");
          return;
        }
      } catch (error) {
        console.error("Erreur de vérification du paiement:", error);
      }

      if (Date.now() - startedAt > timeoutMs) {
        setErrorMessage("Nous n'avons pas reçu de confirmation à temps. Si l'argent a été débité, contactez l'administration ; sinon réessayez.");
        setStatus("error");
        return;
      }
      setTimeout(check, 5000);
    };

    setTimeout(check, 5000);
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink-soft">
        Chargement...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page text-ink px-6">
        <div className="max-w-md text-center bg-surface-sunken border border-line rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-3">Connexion requise</h1>
          <p className="text-ink-soft text-sm mb-6">
            Créez votre compte ou connectez-vous avant de procéder au paiement de votre formation.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/register" className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-6 py-3 rounded-xl transition">
              Créer un compte
            </Link>
            <Link href="/login?next=/paiement" className="text-red-500 hover:text-red-400 font-semibold text-sm">
              → J'ai déjà un compte
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-page text-ink pt-28 pb-16 px-6">
      <div className="max-w-3xl mx-auto bg-surface border border-line rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-extrabold mb-2">Finaliser votre inscription</h1>
        <p className="text-ink-soft text-sm mb-8">
          Choisissez votre langue et votre mode de paiement sécurisé pour valider votre formation.
        </p>

        {status === "pending" ? (
          <div className="bg-surface-alt border border-line rounded-xl p-6 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-xl font-bold text-ink">En attente de confirmation…</h2>
            <p className="text-ink-soft text-sm max-w-sm mx-auto">
              Vérifiez votre téléphone : une demande de confirmation Mobile Money a été envoyée au numéro {phone}. Approuvez-la pour activer votre compte.
            </p>
          </div>
        ) : status === "success" ? (
          <div className="bg-emerald-950/80 border border-emerald-600/50 rounded-xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-emerald-400">Paiement Reçu avec Succès !</h2>
            <p className="text-ink-soft text-sm">
              Votre transaction a été validée. Votre compte est maintenant activé.
            </p>
            {matricule && (
              <div className="bg-surface-alt border border-emerald-700/50 rounded-xl p-4 inline-block">
                <p className="text-xs text-ink-faint mb-1">Votre matricule</p>
                <p className="text-2xl font-black text-emerald-400 font-mono tracking-wider">{matricule}</p>
              </div>
            )}
            <div>
              <Link
                href="/login"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition mt-4"
              >
                Me connecter à mon Espace Élève
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {errorMessage && (
              <div className="p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">{errorMessage}</div>
            )}

            {/* Choix de la langue */}
            <div>
              <label className="block text-sm font-semibold mb-3">Langue de la formation</label>
              <select
                value={langCode}
                onChange={(e) => setLangCode(e.target.value)}
                className="w-full bg-surface-alt border border-line rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Choix du type de paiement */}
            <div>
              <label className="block text-sm font-semibold mb-3">Mode de paiement</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("mobile")}
                  className={`p-4 rounded-xl border text-left font-semibold transition flex items-center justify-between ${
                    selectedMethod === "mobile"
                      ? "border-red-600 bg-red-950/20 text-ink"
                      : "border-line bg-surface-sunken text-ink-soft"
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
                      ? "border-red-600 bg-red-950/20 text-ink"
                      : "border-line bg-surface-sunken text-ink-soft"
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
                          ? "border-white bg-surface-alt text-ink"
                          : "border-line bg-surface-sunken text-ink-soft"
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      {item.name}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-ink-soft mb-1">Numéro de téléphone payeur</label>
                  <input
                    type="tel"
                    placeholder="+243 8X XXX XX XX"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-alt border border-line rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Options Carte Bancaire */}
            {selectedMethod === "card" && (
              <div className="space-y-4 bg-surface-sunken p-4 rounded-xl border border-line">
                <p className="text-xs text-ink-soft">
                  Paiement sécurisé via Carte Visa, Mastercard ou virement bancaire direct.
                </p>
                <div>
                  <label className="block text-xs text-ink-soft mb-1">Nom sur la carte</label>
                  <input
                    type="text"
                    placeholder="Jordi Mukosa"
                    required
                    className="w-full bg-surface-alt border border-line rounded-xl p-3 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Récapitulatif et validation */}
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-soft">Total à payer</p>
                <p className="text-2xl font-black text-red-500">${COURSE_PRICE_USD}.00 USD</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-red-600/30"
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
