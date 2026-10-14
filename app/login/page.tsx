"use client";

import { Suspense, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { requiresEmailVerification } from "@/lib/emailVerificationPolicy";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PasswordInput from "@/components/academy/PasswordInput";
import { availableLanguages } from "@/content/curriculum";
import { getOtherProgramLabel } from "@/content/programs";

function programLabel(code: string): string {
  return availableLanguages.find((l) => l.code === code)?.label ?? getOtherProgramLabel(code) ?? code;
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationInfo, setVerificationInfo] = useState<string | null>(null);

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/academy/dashboard";
  const requiredProgram = searchParams.get("program");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      // Accounts created from now on must confirm their e-mail address first
      // (older accounts are not affected).
      if (requiresEmailVerification(user.metadata.creationTime) && !user.emailVerified) {
        setNeedsVerification(true);
        setLoginError(
          "Votre adresse e-mail n'est pas encore vérifiée. Cliquez sur le lien envoyé à votre inscription (regardez aussi les courriers indésirables), puis reconnectez-vous."
        );
        return;
      }
      setNeedsVerification(false);
      const idToken = await user.getIdToken();

      const enrollResponse = await fetch("/api/academy/my-enrollments", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const enrollResult = await enrollResponse.json();

      if (!enrollResponse.ok) {
        setLoginError(
          enrollResponse.status === 404
            ? "Compte étudiant introuvable dans la base de données."
            : enrollResult.error || "Une erreur est survenue lors de la connexion."
        );
        return;
      }

      const { student: data, enrollments } = enrollResult;
      const approved = enrollments.filter((en: any) => en.status === "Approved");

      if (approved.length === 0) {
        setLoginError(
          enrollments.length > 0
            ? "Aucune de vos inscriptions n'a encore été approuvée par l'administration."
            : "Aucune inscription trouvée pour ce compte. Inscrivez-vous d'abord."
        );
        return;
      }

      // Une connexion lancée depuis l'onglet d'une formation précise
      // (?program=XX, ex. l'espagnol) ne doit réussir que si l'étudiant a
      // bien une inscription approuvée pour CETTE formation — même s'il en
      // a une autre, approuvée, dans une autre langue.
      let activeEnrollment = approved[0];
      if (requiredProgram) {
        const matching = approved.find((en: any) => en.langCode === requiredProgram);
        if (!matching) {
          await auth.signOut();
          setLoginError(
            `Ce compte n'a pas d'inscription approuvée en ${programLabel(requiredProgram)}. Connectez-vous depuis la page de la formation à laquelle vous êtes inscrit(e).`
          );
          return;
        }
        activeEnrollment = matching;
      }

      localStorage.setItem(
        "loggedStudent",
        JSON.stringify({
          uid: user.uid,
          name: data.name,
          email: data.email,
          enrollments,
          activeLangCode: (activeEnrollment as any).langCode,
        })
      );

      // Pose le cookie de session côté serveur (best-effort : si Firebase
      // Admin n'est pas encore configuré côté serveur, on continue quand
      // même avec la session localStorage existante).
      try {
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
      } catch (sessionError) {
        console.warn("Session cookie non posé :", sessionError);
      }

      router.replace(nextPath);
    } catch (error: any) {
      console.error("Erreur login:", error);

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
    } catch (error) {
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
    <main className="min-h-screen flex items-center justify-center bg-page px-4 py-24">
      <div className="bg-surface-sunken border border-line p-8 shadow-xl shadow-black/40 rounded-2xl w-full max-w-md text-ink relative">
        <h1 className="text-2xl font-bold text-center mb-1">Connexion</h1>
        <p className="text-sm text-ink-faint text-center mb-6">
          {requiredProgram
            ? `Connectez-vous à votre compte inscrit en ${programLabel(requiredProgram)}`
            : "Espace Apprentissage — BM Corporation"}
        </p>

        {loginError && (
          <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">
            {loginError}
            {needsVerification && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    const idToken = await auth.currentUser?.getIdToken();
                    const response = await fetch("/api/auth/send-verification", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ idToken }),
                    });
                    const result = await response.json();
                    setVerificationInfo(
                      response.ok
                        ? "E-mail de vérification renvoyé. Vérifiez votre boîte de réception (et les courriers indésirables)."
                        : result.error || "Impossible de renvoyer l'e-mail maintenant."
                    );
                  } catch {
                    setVerificationInfo("Impossible de renvoyer l'e-mail maintenant. Réessayez dans quelques minutes.");
                  } finally {
                    await signOut(auth);
                  }
                }}
                className="block mt-2 underline font-semibold"
              >
                Renvoyer l'e-mail de vérification
              </button>
            )}
            {verificationInfo && <p className="mt-2 text-emerald-300">{verificationInfo}</p>}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="votre.email@exemple.com"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Mot de passe</label>
            <PasswordInput
              required
              autoComplete="current-password"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setShowResetModal(true);
              }}
              className="text-xs text-red-500 hover:text-red-400 hover:underline font-medium"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-line text-center">
          <p className="text-sm text-ink-faint">Pas encore inscrit ?</p>
          <Link
            href="/register"
            className="inline-block mt-2 text-sm font-bold text-red-500 hover:text-red-400 hover:underline transition"
          >
            → S'inscrire ici
          </Link>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface-sunken border border-line p-6 rounded-2xl max-w-md w-full shadow-2xl relative text-ink">
            <h2 className="text-xl font-bold mb-2">Réinitialiser le mot de passe</h2>
            <p className="text-sm text-ink-soft mb-4">
              Entrez votre adresse email ci-dessous. Nous vous enverrons un lien sécurisé pour créer un nouveau mot de passe.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                required
                placeholder="votre.email@exemple.com"
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />

              {resetMessage && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    resetMessage.type === "success"
                      ? "bg-green-950 text-green-300 border border-green-800"
                      : "bg-red-950 text-red-200 border border-red-800"
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
                  className="px-4 py-2 text-sm font-medium text-ink-soft hover:bg-surface rounded-lg"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-4 py-2 text-sm font-semibold text-white glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 rounded-lg disabled:opacity-50"
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
