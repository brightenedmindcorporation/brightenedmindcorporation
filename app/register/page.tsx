"use client";

import { Suspense, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { availableLanguages, findProgramByCode, programLevels } from "@/content/curriculum";
import { otherPrograms, isOtherProgramCode, getOtherProgramLabel } from "@/content/programs";
import PasswordInput from "@/components/academy/PasswordInput";
import StepBar from "@/components/StepBar";

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
  // Three short steps instead of one long form: 1 formation, 2 who you are, 3 password.
  const [step, setStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const STEP_LABELS = ["Votre formation", "Vos informations", "Votre mot de passe"];

  const router = useRouter();
  const isLanguageProgram = !isOtherProgramCode(programCode);
  // Bureautique has levels, a study rhythm and a placement test like a language, but no online payment yet.
  const hasLevels = Boolean(findProgramByCode(programCode));
  // A course with one level only (BM Domestica training): no level to choose and no placement test.
  const singleLevel = hasLevels && programLevels(findProgramByCode(programCode)!.slug).length === 1;

  const clearField = (key: string) => setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));

  // Checks one step and says, next to the field, what to fix (plain French, no browser pop-ups).
  const validateStep = (which: number): boolean => {
    const errs: Record<string, string> = {};
    if (which === 2) {
      if (!gender) errs.gender = "Indiquez si vous êtes un homme ou une femme.";
      if (name.trim().length < 3) errs.name = "Écrivez votre nom complet (nom et prénom).";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = "Cette adresse e-mail n'est pas complète. Exemple : prenom@gmail.com";
      if (!emailConfirm.trim()) errs.emailConfirm = "Retapez votre adresse e-mail pour la confirmer.";
      else if (email.trim().toLowerCase() !== emailConfirm.trim().toLowerCase()) errs.emailConfirm = "Les deux adresses e-mail ne sont pas identiques. Vérifiez votre saisie.";
    }
    if (which === 3) {
      if (password.length < 8) errs.password = "Le mot de passe doit contenir au moins 8 caractères.";
      if (!passwordConfirm) errs.passwordConfirm = "Retapez votre mot de passe pour le confirmer.";
      else if (password !== passwordConfirm) errs.passwordConfirm = "Les deux mots de passe ne sont pas identiques. Vérifiez votre saisie.";
    }
    setFieldErrors(errs);
    const ok = Object.keys(errs).length === 0;
    // Bring the first problem into view so the person sees what to fix.
    if (!ok) setTimeout(() => document.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
    return ok;
  };

  const goNext = () => {
    setError(null);
    if (!validateStep(step)) return;
    setStep((n) => Math.min(3, n + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    setError(null);
    setFieldErrors({});
    setStep((n) => Math.max(1, n - 1));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Enter pressed on step 1 or 2 moves on instead of sending.
    if (step < 3) {
      goNext();
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    if (!validateStep(3)) return;

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
          setError("Mot de passe trop court : 8 caractères minimum.");
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
          placement: hasLevels && levelMode === "test",
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
            <p className="text-sm text-amber-800 dark:text-amber-300 bg-amber-500/10 border border-amber-600/30 rounded-xl p-3 mb-4">
              Un e-mail de confirmation a été envoyé à <b>{email.trim()}</b> (pensez à regarder les courriers
              indésirables). Cliquez sur le lien qu'il contient pour confirmer votre adresse : c'est elle qui recevra
              votre Student ID et les notifications de vos cours.
            </p>
          )}
          <p className="text-ink-soft text-sm mb-6">
            {hasLevels && levelMode === "test"
              ? "Passez maintenant votre test de niveau : il est corrigé par l'administration, qui vous attribue ensuite votre niveau. Vous pouvez aussi le passer plus tard depuis votre espace."
              : isLanguageProgram
              ? "Vous pouvez régler votre formation en ligne dès maintenant. Dans tous les cas, votre compte est activé (et votre Student ID envoyé) après validation par l'administration."
              : "Votre demande a été transmise à l'administration. Vous recevrez un email de confirmation une fois votre inscription approuvée."}
          </p>
          <div className="flex flex-col gap-3">
            {hasLevels && levelMode === "test" && (
              <button
                onClick={() => router.push(`/academia/placement/${findProgramByCode(programCode)?.slug ?? ""}`)}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 min-h-[52px] rounded-lg font-bold transition"
              >
                Passer mon test de niveau maintenant
              </button>
            )}
            {isLanguageProgram && (
              <button
                onClick={() => router.push("/paiement")}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-5 min-h-[52px] rounded-lg font-bold transition"
              >
                Payer ma formation en ligne
              </button>
            )}
            <button
              onClick={() => router.push("/login")}
              className="text-ink-soft hover:text-ink text-base font-medium min-h-[44px] transition"
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
        <p className="text-sm text-ink-soft text-center mb-5">Espace Apprentissage — BM Corporation</p>

        <StepBar step={step} labels={STEP_LABELS} />

        {error && (
          <div role="alert" className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} noValidate className="space-y-4">
          {step === 1 && (
            <>
              <p className="text-sm text-ink-soft">
                Déjà inscrit(e) à une autre formation ? Utilisez le même e-mail et le même mot de passe pour en ajouter une nouvelle à votre compte.
              </p>

              <div>
                <label htmlFor="reg-program" className="block text-sm font-semibold text-ink mb-1">Formation</label>
                <select
                  id="reg-program"
                  className="w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  {singleLevel ? null : (
                    <fieldset className="space-y-2">
                      <legend className="block text-sm font-semibold text-ink mb-1">Votre niveau</legend>
                      <label className={`flex items-start gap-3 p-3 min-h-[56px] rounded-lg border cursor-pointer ${levelMode === "known" ? "border-red-600 bg-red-600/5" : "border-line"}`}>
                        <input type="radio" name="levelMode" className="mt-1 accent-red-600 w-5 h-5" checked={levelMode === "known"} onChange={() => setLevelMode("known")} />
                        <span className="flex-1 text-sm">
                          <b>Je connais mon niveau</b>
                          <select
                            aria-label="Choisir mon niveau"
                            className="mt-2 w-full min-h-[44px] border border-line bg-surface p-2.5 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      <label className={`flex items-start gap-3 p-3 min-h-[56px] rounded-lg border cursor-pointer ${levelMode === "test" ? "border-red-600 bg-red-600/5" : "border-line"}`}>
                        <input type="radio" name="levelMode" className="mt-1 accent-red-600 w-5 h-5" checked={levelMode === "test"} onChange={() => setLevelMode("test")} />
                        <span className="text-sm">
                          <b>Je ne connais pas mon niveau</b>
                          <span className="block text-sm text-ink-soft mt-1">
                            Vous passez un test de niveau juste après l&apos;inscription. L&apos;administration le corrige et vous attribue le niveau qui vous convient.
                          </span>
                        </span>
                      </label>
                      <p className="text-sm text-ink-soft">Vous accédez à votre niveau, pas aux niveaux inférieurs. Le niveau suivant s&apos;ouvre quand vous réussissez le test final.</p>
                    </fieldset>
                  )}

                  <div>
                    <label htmlFor="reg-days" className="block text-sm font-semibold text-ink mb-1">Rythme d&apos;étude</label>
                    <select
                      id="reg-days"
                      className="w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                      value={studyDays}
                      onChange={(e) => setStudyDays(Number(e.target.value) as 3 | 5)}
                    >
                      <option value={3}>3 jours / semaine (1 à 2h/semaine)</option>
                      <option value={5}>5 jours / semaine (intensif)</option>
                    </select>
                    <p className="text-sm text-ink-soft mt-1">Détermine le rythme de déverrouillage des chapitres de votre niveau.</p>
                  </div>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <fieldset>
                <legend className="block text-sm font-semibold text-ink mb-1">Vous êtes</legend>
                <div className="grid grid-cols-2 gap-3">
                  {([["M", "Un homme"], ["F", "Une femme"]] as const).map(([value, text]) => (
                    <label
                      key={value}
                      className={`flex items-center justify-center gap-2 p-3 min-h-[48px] rounded-lg border cursor-pointer transition ${
                        gender === value ? "border-red-600 bg-red-600/10 text-ink font-semibold" : "border-line bg-surface text-ink-soft hover:border-red-600/50"
                      } ${fieldErrors.gender ? "field-invalid" : ""}`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={gender === value}
                        onChange={() => {
                          setGender(value);
                          clearField("gender");
                        }}
                        className="accent-red-600 w-5 h-5"
                      />
                      {text}
                    </label>
                  ))}
                </div>
                {fieldErrors.gender ? (
                  <p role="alert" className="field-error">{fieldErrors.gender}</p>
                ) : (
                  <p className="text-sm text-ink-soft mt-1.5">Pour nous adresser à vous correctement (Monsieur / Madame).</p>
                )}
              </fieldset>

              <div>
                <label htmlFor="reg-name" className="block text-sm font-semibold text-ink mb-1">Nom complet</label>
                <input
                  id="reg-name"
                  autoComplete="name"
                  placeholder="Jordi Mukosa"
                  aria-invalid={!!fieldErrors.name}
                  className={`w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600 ${fieldErrors.name ? "field-invalid" : ""}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearField("name");
                  }}
                />
                {fieldErrors.name && <p role="alert" className="field-error">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-semibold text-ink mb-1">E-mail</label>
                <input
                  id="reg-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="votre.email@exemple.com"
                  aria-invalid={!!fieldErrors.email}
                  className={`w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600 ${fieldErrors.email ? "field-invalid" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearField("email");
                  }}
                />
                {fieldErrors.email ? (
                  <p role="alert" className="field-error">{fieldErrors.email}</p>
                ) : (
                  <p className="text-sm text-ink-soft mt-1.5">
                    Utilisez une <b>vraie adresse e-mail que vous consultez</b> : vous y recevrez votre Student ID et les notifications de votre apprentissage (cours en direct, messages de vos enseignants, certificats…).
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="reg-email2" className="block text-sm font-semibold text-ink mb-1">Confirmez votre e-mail</label>
                <input
                  id="reg-email2"
                  type="email"
                  inputMode="email"
                  placeholder="Retapez votre adresse e-mail"
                  aria-invalid={!!fieldErrors.emailConfirm}
                  className={`w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600 ${fieldErrors.emailConfirm ? "field-invalid" : ""}`}
                  value={emailConfirm}
                  onChange={(e) => {
                    setEmailConfirm(e.target.value);
                    clearField("emailConfirm");
                  }}
                  onPaste={(e) => e.preventDefault()}
                  autoComplete="off"
                />
                {fieldErrors.emailConfirm && <p role="alert" className="field-error">{fieldErrors.emailConfirm}</p>}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label htmlFor="reg-pass" className="block text-sm font-semibold text-ink mb-1">Mot de passe</label>
                <PasswordInput
                  id="reg-pass"
                  minLength={8}
                  autoComplete="new-password"
                  className={`w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600 ${fieldErrors.password ? "field-invalid" : ""}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearField("password");
                  }}
                />
                {fieldErrors.password ? (
                  <p role="alert" className="field-error">{fieldErrors.password}</p>
                ) : (
                  <p className="text-sm text-ink-soft mt-1">Au moins 8 caractères. Notez-le bien : il sert à vous connecter.</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-pass2" className="block text-sm font-semibold text-ink mb-1">Confirmer le mot de passe</label>
                <PasswordInput
                  id="reg-pass2"
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Retapez le mot de passe"
                  className={`w-full min-h-[48px] border border-line bg-surface px-3.5 py-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600 ${fieldErrors.passwordConfirm ? "field-invalid" : ""}`}
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    clearField("passwordConfirm");
                  }}
                />
                {fieldErrors.passwordConfirm && <p role="alert" className="field-error">{fieldErrors.passwordConfirm}</p>}
              </div>

              <p className="text-sm text-ink-soft rounded-lg bg-surface border border-line p-3">
                En vous inscrivant, vous créez votre compte pour : <b className="text-ink">{availableLanguages.find((l) => l.code === programCode)?.label ?? getOtherProgramLabel(programCode) ?? programCode}</b>
                {hasLevels && !singleLevel ? (levelMode === "test" ? " (niveau déterminé par le test)" : ` (${level.replace("Level", "niveau")})`) : ""}.
              </p>
            </>
          )}

          <div className="flex gap-3 pt-1">
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="min-h-[52px] px-5 rounded-lg border border-line text-ink font-semibold hover:border-red-600/60 transition"
              >
                ← Retour
              </button>
            )}
            {step < 3 ? (
              <button
                type="submit"
                className="flex-1 min-h-[52px] glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-4 rounded-lg font-bold transition"
              >
                Continuer →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 min-h-[52px] glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-4 rounded-lg font-bold transition disabled:opacity-60"
              >
                {loading ? "Création de votre compte…" : "Créer mon compte"}
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-line text-center">
          <p className="text-sm text-ink-soft">Déjà inscrit ?</p>
          <Link
            href="/login"
            className="inline-flex items-center min-h-[44px] mt-1 text-base font-bold text-red-600 dark:text-red-300 hover:underline transition"
          >
            → Se connecter
          </Link>
        </div>
      </div>
    </main>
  );
}
