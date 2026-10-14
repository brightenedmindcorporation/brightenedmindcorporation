"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/lib/firebase";

function VerifyEmail() {
  const code = useSearchParams().get("code");
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    if (!code) {
      setState("error");
      return;
    }
    applyActionCode(auth, code)
      .then(() => setState("ok"))
      .catch(() => setState("error"));
  }, [code]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-page px-4 py-24">
      <div className="bg-surface-sunken border border-line p-8 rounded-2xl w-full max-w-md text-center text-ink">
        {state === "loading" && (
          <>
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-ink-soft">Vérification de votre adresse e-mail…</p>
          </>
        )}
        {state === "ok" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Adresse e-mail confirmée ✓</h1>
            <p className="text-ink-soft text-sm mb-6">
              Merci ! L'administration peut maintenant approuver votre inscription. Vous recevrez un e-mail avec votre
              Student ID dès que ce sera fait.
            </p>
            <Link
              href="/login"
              className="inline-block glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Aller à la connexion
            </Link>
          </>
        )}
        {state === "error" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Lien invalide ou expiré</h1>
            <p className="text-ink-soft text-sm mb-6">
              Ce lien a déjà été utilisé ou a expiré. Connectez-vous : vous pourrez demander un nouvel e-mail de
              vérification (si votre adresse est déjà confirmée, vous pouvez simplement vous connecter).
            </p>
            <Link href="/login" className="text-red-500 hover:text-red-400 font-semibold">
              Aller à la connexion →
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
}
