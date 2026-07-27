"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null); // 🆕 Pour afficher les erreurs sous le formulaire

  // 🔁 États pour la réinitialisation de mot de passe
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  // 🔐 CONNEXION
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      const snap = await getDoc(doc(db, "students", user.uid));

      if (!snap.exists()) {
        setLoginError("Compte étudiant introuvable dans la base de données.");
        return;
      }

      const data = snap.data();

      if (data.status !== "Approved") {
        setLoginError("Votre compte n'a pas encore été approuvé par l'administration.");
        return;
      }

      // ✅ SAUVEGARDE LOCALE
      localStorage.setItem(
        "loggedStudent",
        JSON.stringify({
          uid: user.uid,
          ...data,
        })
      );

      // 🚀 REDIRECTION DASHBOARD
      router.replace("/academy/dashboard");

    } catch (error: any) {
      console.error("Erreur login:", error);

      // Messages d'erreur personnalisés plus lisibles
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setLoginError("Adresse email ou mot de passe incorrect.");
      } else if (error.code === "auth/too-many-requests") {
        setLoginError("Trop de tentatives échouées. Veuillez patienter quelques minutes.");
      } else if (error.code === "auth/api-key-not-valid") {
        setLoginError("Erreur de configuration serveur (Clé API invalide dans .env.local).");
      } else {
        setLoginError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔁 ÉTAPES MOT DE PASSE OUBLIÉ (Firebase)
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);

    const cleanEmail = resetEmail.trim();

    if (!cleanEmail) {
      setResetMessage({ type: "error", text: "Veuillez saisir votre adresse email." });
      return;
    }

    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, cleanEmail);
      setResetMessage({
        type: "success",
        text: "Un lien de réinitialisation a été envoyé ! Vérifiez votre boîte de réception (et vos spams).",
      });
    } catch (error: any) {
      console.error("Erreur reset password:", error);
      setResetMessage({
        type: "error",
        text: "Impossible d'envoyer l'email. Vérifiez que l'adresse est correcte.",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-12">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md text-black relative">

        <h1 className="text-2xl font-bold text-red-800 text-center mb-6">
          Student Login
        </h1>

        {/* MESSAGE D'ERREUR PRINCIPAL */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 text-sm rounded-lg">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="votre.email@exemple.com"
              className="w-full border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* MOT DE PASSE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* LIEN MOT DE PASSE OUBLIÉ */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setResetEmail(email); // pré-remplit si déjà saisi
                setShowResetModal(true);
              }}
              className="text-xs text-red-700 hover:underline font-medium"
            >
              Forgot password? / Mot de passe oublié ?
            </button>
          </div>

          {/* BOUTON LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 text-white p-3 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SECTION REGISTRATION */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Pas encore inscrit ? / Don't have an account?
          </p>
          <Link
            href="/academy/register"
            className="inline-block mt-2 text-sm font-bold text-red-700 hover:text-black hover:underline transition"
          >
            → Student Register / S'inscrire ici
          </Link>
        </div>

      </div>

      {/* MODAL RÉINITIALISATION MOT DE PASSE */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl relative">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Réinitialiser le mot de passe
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Entrez votre adresse email ci-dessous. Nous vous enverrons un lien sécurisé pour créer un nouveau mot de passe.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                required
                placeholder="votre.email@exemple.com"
                className="w-full border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />

              {resetMessage && (
                <div
                  className={`p-3 rounded text-sm ${
                    resetMessage.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {resetMessage.text}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetMessage(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded disabled:opacity-50"
                >
                  {resetLoading ? "Envoi..." : "Envoyer le lien"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}