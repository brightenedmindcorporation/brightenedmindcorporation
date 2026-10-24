"use client";

import { Suspense, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { availableLanguages } from "@/content/curriculum";
import { otherPrograms, isOtherProgramCode, getOtherProgramLabel } from "@/content/programs";
import PasswordInput from "@/components/academy/PasswordInput";

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const requestedProgram = searchParams.get("program");
  const initialProgram =
    availableLanguages.find((l) => l.code === requestedProgram)?.code ||
    otherPrograms.find((p) => p.code === requestedProgram)?.code ||
    availableLanguages[0].code;

  const [name, setName] = useState("");
  const [gender, setGender] = useState<"" | "M" | "F">("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [level, setLevel] = useState("Level 1");
  // "known": the student picks their level; "test": they take the placement test and are given a level.
  const [levelMode, setLevelMode] = useState<"known" | "test">("known");
  const [programCode, setProgramCode] = useState(initialProgram);
  const [studyDays, setStudyDays] = useState<3 | 5>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const router = useRouter();
  const isLanguageProgram = !isOtherProgramCode(programCode);
  // Bureautique has levels and a study rhythm like a language, but no placement test and no online payment yet.
  const hasLevels = isLanguageProgram || programCode === "BUREAUTIQUE";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email.trim().toLowerCase() !== emailConfirm.trim().toLowerCase()) {
      setError("Les deux adresses e-mail ne sont pas identiques. Vérifiez votre saisie.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Les deux mots de passe ne sont pas identiques. Vérifiez votre saisie.");
      return;
    }

    try {
      setLoading(true);

      const checkResponse = await fetch("/api/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const check = await checkResponse.json();

      if (!check.valid) {
        setError(check.message || "Cette adresse e-mail n'est pas valide.");
        setLoading(false);
        return;
      }

      // One email can hold several enrollments (languages and/or other
      // programs), so a registration can either create a brand new account
      // or, if this email already has one, add a new program to it
      // (confirmed via the password just entered) instead of failing
      // outright.
      let idToken: string;
      try {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        idToken = await cred.user.getIdToken();
        // Proof that the address is real and theirs: they must click the link.
        try {
          const verification = await fetch("/api/auth/send-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
          if (verification.ok) setVerificationSent(true);
        } catch (verificationError) {
          console.error("Verification e-mail not sent:", verificationError);
        }
      } catch (authErr: any) {
        if (authErr.code === "auth/email-already-in-use") {
          try {
            const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
            idToken = await cred.user.getIdToken();
          } catch {
            setError(
              "Un compte existe déjà avec cet email. Pour ajouter une nouvelle formation, saisissez le mot de passe de ce compte existant (ou connectez-vous puis réessayez)."
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
        body: JSON.stringify({
          idToken,
          name: name.trim(),
          gender,
          source: (() => {
            try {
              return localStorage.getItem("bm_src") || "";
            } catch {
              return "";
            }
          })(),
          langCode: programCode,
          level: hasLevels ? level : "N/A",
          placement: isLanguageProgram && levelMode === "test",
          studyDays: hasLevels ? studyDays : undefined,
        }),
      });
      const enrollResult = await enrollResponse.json();

      if (!enrollResponse.ok) {
        if (enrollResponse.status === 409) {
          const programLabel =
            availableLanguages.find((l) => l.code === programCode)?.label ??
            getOtherProgramLabel(programCode) ??
            programCode;
          setError(
            `Vous avez déjà une inscription en ${programLabel} (statut : ${enrollResult.status}). Choisissez une autre formation, ou contactez l'administration.`
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
          {verificationSent && (
            <p className="text-sm text-amber-500 bg-amber-500/10 border border-amber-600/30 rounded-xl p-3 mb-4">
              Un e-mail de confirmation a été envoyé à <b>{email.trim()}</b> (pensez à regarder les courriers
              indésirables). Cliquez sur le lien qu'il contient pour confirmer votre adresse : c'est elle qui recevra
              votre Student ID et les notifications de vos cours.
            </p>
          )}
          <p className="text-ink-soft text-sm mb-6">
            {isLanguageProgram && levelMode === "test"
              ? "Passez maintenant votre test de niveau : il est corrigé par l'administration, qui vous attribue ensuite votre niveau. Vous pouvez aussi le passer plus tard depuis votre espace."
              : isLanguageProgram
              ? "Vous pouvez régler votre formation en ligne dès maintenant. Dans tous les cas, votre compte est activé (et votre Student ID envoyé) après validation par l'administration."
              : "Votre demande a été transmise à l'administration. Vous recevrez un email de confirmation une fois votre inscription approuvée."}
          </p>
          <div className="flex flex-col gap-3">
            {isLanguageProgram && levelMode === "test" && (
              <button
                onClick={() => router.push(`/academia/placement/${availableLanguages.find((l) => l.code === programCode)?.slug ?? ""}`)}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-semibold transition"
              >
                Passer mon test de niveau maintenant
              </button>
            )}
            {isLanguageProgram && (
              <button
                onClick={() => router.push("/paiement")}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-semibold transition"
              >
                Payer ma formation en ligne
              </button>
            )}
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
          Déjà inscrit(e) à une autre formation ? Utilisez le même email et mot de passe pour en ajouter une nouvelle à votre compte.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Vous êtes</label>
            <div className="grid grid-cols-2 gap-3">
              {([["M", "Un homme"], ["F", "Une femme"]] as const).map(([value, text]) => (
                <label
                  key={value}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                    gender === value ? "border-red-600 bg-red-600/10 text-ink font-semibold" : "border-line bg-surface text-ink-soft hover:border-red-600/50"
                  }`}
                >
                  <input type="radio" name="gender" value={value} required checked={gender === value} onChange={() => setGender(value)} className="accent-red-600" />
                  {text}
                </label>
              ))}
            </div>
            <p className="text-xs text-ink-faint mt-1.5">Pour nous adresser à vous correctement (Monsieur / Madame).</p>
          </div>

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
            <p className="text-xs text-ink-faint mt-1.5">
              Utilisez une <b>vraie adresse e-mail que vous consultez</b> : vous y recevrez votre Student ID et les
              notifications de votre apprentissage (cours en direct, messages de vos enseignants, certificats…).
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Confirmez votre e-mail</label>
            <input
              type="email"
              required
              placeholder="Retapez votre adresse e-mail"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Mot de passe</label>
            <PasswordInput
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-ink-faint mt-1">Au moins 8 caractères. Notez-le bien : il sert à vous connecter.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Confirmer le mot de passe</label>
            <PasswordInput
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Retapez le mot de passe"
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">Formation</label>
            <select
              className="w-full border border-line bg-surface p-3 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-red-600"
              value={programCode}
              onChange={(e) => setProgramCode(e.target.value)}
            >
              <optgroup label="Langues">
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Autres formations">
                {otherPrograms.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {hasLevels && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink-soft">Votre niveau</label>
                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${levelMode === "known" ? "border-red-600 bg-red-600/5" : "border-line"}`}>
                  <input type="radio" name="levelMode" className="mt-1" checked={levelMode === "known"} onChange={() => setLevelMode("known")} />
                  <span className="flex-1 text-sm">
                    <b>Je connais mon niveau</b>
                    <select
                      className="mt-2 w-full border border-line bg-surface p-2.5 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-red-600"
                      value={level}
                      onChange={(e) => {
                        setLevel(e.target.value);
                        setLevelMode("known");
                      }}
                    >
                      <option value="Level 1">Niveau 1 : débutant</option>
                      <option value="Level 2">Niveau 2 : intermédiaire</option>
                      <option value="Level 3">Niveau 3 : avancé</option>
                    </select>
                  </span>
                </label>
                {isLanguageProgram && (
                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${levelMode === "test" ? "border-red-600 bg-red-600/5" : "border-line"}`}>
                  <input type="radio" name="levelMode" className="mt-1" checked={levelMode === "test"} onChange={() => setLevelMode("test")} />
                  <span className="text-sm">
                    <b>Je ne connais pas mon niveau</b>
                    <span className="block text-xs text-ink-faint mt-1">
                      Vous passez un test de niveau juste après l&apos;inscription. L&apos;administration le corrige et vous attribue le niveau qui vous convient.
                    </span>
                  </span>
                </label>
                )}
                <p className="text-xs text-ink-faint">Vous accédez à votre niveau, pas aux niveaux inférieurs. Le niveau suivant s&apos;ouvre quand vous réussissez le test final.</p>
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
            </>
          )}

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
