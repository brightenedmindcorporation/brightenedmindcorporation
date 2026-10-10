"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { availableLanguages } from "@/content/curriculum";
import PasswordInput from "@/components/academy/PasswordInput";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("Level 1");
  const [langCode, setLangCode] = useState(availableLanguages[0].code);
  const [studyDays, setStudyDays] = useState<3 | 5>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const checkResponse = await fetch("/api/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const check = await checkResponse.json();

      if (!check.valid) {
        setError(
          check.reason === "format"
            ? "Le format de l'adresse email n'est pas valide."
            : "Cette adresse email semble invalide : son domaine ne peut pas recevoir d'emails. Vérifiez qu'il n'y a pas de faute de frappe."
        );
        setLoading(false);
        return;
      }

      // One email can hold several language enrollments, so a registration
      // can either create a brand new account or, if this email already
      // has one, add a new language to it (confirmed via the password just
      // entered) instead of failing outright.
      let idToken: string;
      try {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        idToken = await cred.user.getIdToken();
      } catch (authErr: any) {
        if (authErr.code === "auth/email-already-in-use") {
          try {
            const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
            idToken = await cred.user.getIdToken();
          } catch {
            setError(
              "Un compte existe déjà avec cet email. Pour ajouter une nouvelle langue, saisissez le mot de passe de ce compte existant (ou connectez-vous puis réessayez)."
            );
            setLoading(false);
            return;
          }
        } else if (authErr.code === "auth/weak-password") {
          setError("Mot de passe trop court (6 caractères minimum).");
          setLoading(false);
          return;
        } else {
          console.error("Erreur inscription:", authErr);
          setError("Une erreur est survenue lors de l'inscription.");
          setLoading(false);
          return;
        }
      }

      const enrollResponse = await fetch("/api/academy/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, name, langCode, level, studyDays }),
      });
      const enrollResult = await enrollResponse.json();

      if (!enrollResponse.ok) {
        if (enrollResponse.status === 409) {
          const langLabel = availableLanguages.find((l) => l.code === langCode)?.label ?? langCode;
          setError(
            `Vous avez déjà une inscription en ${langLabel} (statut : ${enrollResult.status}). Choisissez une autre langue, ou contactez l'administration.`
          );
        } else {
          setError(enrollResult.error || "Une erreur est survenue lors de l'inscription.");
        }
        setLoading(false);
        return;
      }

      setDone(true);
    } catch (err: any) {
      console.error("Erreur inscription:", err);
      setError("Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page px-4 py-24">
        <div className="bg-surface-sunken border border-line p-8 rounded-2xl w-full max-w-md text-center text-ink">
          <h1 className="text-2xl font-bold mb-2">Inscription enregistrée !</h1>
          <p className="text-ink-soft text-sm mb-6">
            Payez maintenant pour activer votre compte immédiatement et recevoir votre matricule tout de suite,
            ou patientez pour une approbation manuelle par l'administration.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/paiement")}
              className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Payer et activer mon compte
            </button>
            <button
              onClick={() => router.push("/login")}
              className="text-ink-soft hover:text-ink text-sm font-medium transition"
            >
              → Aller à la connexion plus tard
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-page px-4 py-24">
      <div className="bg-surface-sunken border border-line p-8 shadow-xl shadow-black/40 rounded-2xl w-full max-w-md text-ink">
        <h1 className="text-2xl font-bold text-center mb-1">Inscription</h1>
        <p className="text-sm text-ink-faint text-center mb-6">Espace Apprentissage — BM Corporation</p>
        <p className="text-xs text-ink-faint text-center mb-6">
          Déjà inscrit(e) à une autre langue ? Utilisez le même email et mot de passe pour ajouter une nouvelle langue à votre compte.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Nom complet</label>
            <input
              required
              placeholder="Jordi Mukosa"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              minLength={6}
              autoComplete="new-password"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Langue</label>
            <select
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-red-600"
              value={langCode}
              onChange={(e) => setLangCode(e.target.value)}
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Niveau</label>
            <select
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-red-600"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Level 1">Niveau 1</option>
              <option value="Level 2">Niveau 2</option>
              <option value="Level 3">Niveau 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Rythme d'étude</label>
            <select
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-red-600"
              value={studyDays}
              onChange={(e) => setStudyDays(Number(e.target.value) as 3 | 5)}
            >
              <option value={3}>3 jours / semaine (1 à 2h/semaine)</option>
              <option value={5}>5 jours / semaine (intensif)</option>
            </select>
            <p className="text-xs text-ink-faint mt-1">
              Détermine le rythme de déverrouillage des chapitres de votre niveau.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-line text-center">
          <p className="text-sm text-ink-faint">Déjà inscrit ?</p>
          <Link
            href="/login"
            className="inline-block mt-2 text-sm font-bold text-red-500 hover:text-red-400 hover:underline transition"
          >
            → Se connecter
          </Link>
        </div>
      </div>
    </main>
  );
}
