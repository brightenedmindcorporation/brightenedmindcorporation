"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { availableLanguages } from "@/content/curriculum";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("Level 1");
  const [langCode, setLangCode] = useState(availableLanguages[0].code);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        name,
        email: email.trim(),
        level,
        langCode,
        status: "Pending",
        matricule: "",
        createdAt: new Date(),
      });

      setDone(true);
    } catch (err: any) {
      console.error("Erreur inscription:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Un compte existe déjà avec cet email.");
      } else if (err.code === "auth/weak-password") {
        setError("Mot de passe trop court (6 caractères minimum).");
      } else {
        setError("Une erreur est survenue lors de l'inscription.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-4 py-24">
        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-2xl w-full max-w-md text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Inscription enregistrée !</h1>
          <p className="text-neutral-400 text-sm mb-6">
            Payez maintenant pour activer votre compte immédiatement et recevoir votre matricule tout de suite,
            ou patientez pour une approbation manuelle par l'administration.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/paiement")}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Payer et activer mon compte
            </button>
            <button
              onClick={() => router.push("/login")}
              className="text-neutral-400 hover:text-white text-sm font-medium transition"
            >
              → Aller à la connexion plus tard
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4 py-24">
      <div className="bg-neutral-950 border border-neutral-800 p-8 shadow-xl shadow-black/40 rounded-2xl w-full max-w-md text-white">
        <h1 className="text-2xl font-bold text-center mb-1">Inscription</h1>
        <p className="text-sm text-neutral-500 text-center mb-6">Espace Apprentissage — BM Corporation</p>

        {error && (
          <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Nom complet</label>
            <input
              required
              placeholder="Jordi Mukosa"
              className="w-full border border-neutral-700 bg-neutral-900 p-3 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="votre.email@exemple.com"
              className="w-full border border-neutral-700 bg-neutral-900 p-3 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full border border-neutral-700 bg-neutral-900 p-3 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Langue</label>
            <select
              className="w-full border border-neutral-700 bg-neutral-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
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
            <label className="block text-sm font-medium text-neutral-300 mb-1">Niveau</label>
            <select
              className="w-full border border-neutral-700 bg-neutral-900 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Level 1">Niveau 1</option>
              <option value="Level 2">Niveau 2</option>
              <option value="Level 3">Niveau 3</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-sm text-neutral-500">Déjà inscrit ?</p>
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
