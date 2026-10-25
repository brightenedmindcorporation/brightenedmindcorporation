"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { availableLanguages, findProgramByCode, programLevels } from "@/content/curriculum";
import { otherPrograms } from "@/content/programs";

interface TeacherOption {
  id: string;
  name?: string;
  email?: string;
}
interface Result {
  matricule: string;
  accountCreated: boolean;
  emailSent: boolean;
  emailError: string;
  setupLink: string;
}

const field = "w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60";

/** The administration registers a student directly (account + approved enrolment + e-mail with a password link). */
export default function AddStudentModal({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "">("");
  const [langCode, setLangCode] = useState(availableLanguages[0]?.code ?? "EN");
  const [level, setLevel] = useState(1);
  const [studyDays, setStudyDays] = useState(3);
  const [teacherUid, setTeacherUid] = useState("");
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const isLanguage = availableLanguages.some((l) => l.code === langCode);

  useEffect(() => {
    (async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        const response = await fetch("/api/admin/teachers", { headers: { Authorization: `Bearer ${idToken}` } });
        const data = await response.json();
        if (response.ok) setTeachers(data.teachers || []);
      } catch {
        // choosing a teacher is optional
      }
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/create-student", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ name, email, gender, langCode, level, studyDays, teacherUid }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur serveur.");
      setResult(data);
      onDone();
    } catch (err: any) {
      setError(err.message || "Erreur.");
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.setupLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copiez ce lien :", result.setupLink);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 flex items-start justify-center overflow-y-auto p-4" onClick={onClose}>
      <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
        {result ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-ink">✅ Étudiant inscrit</h3>
            <p className="text-sm text-ink-soft">
              Student ID : <b className="text-ink">{result.matricule}</b>
              <br />
              {result.accountCreated ? "Un compte a été créé." : "Cette adresse avait déjà un compte : la formation a été ajoutée."} L&apos;inscription est déjà approuvée.
            </p>
            {result.emailSent ? (
              <p className="text-sm text-emerald-500">📧 E-mail envoyé à l&apos;étudiant{result.setupLink ? " avec le lien pour choisir son mot de passe." : "."}</p>
            ) : (
              <p className="text-sm text-amber-500">
                ⚠️ L&apos;e-mail n&apos;a pas pu partir{result.emailError ? ` (${result.emailError})` : ""}.
                {result.setupLink ? " Copiez le lien ci-dessous et envoyez-le-lui par WhatsApp." : ""}
              </p>
            )}
            {result.setupLink && (
              <div className="space-y-2">
                <p className="text-xs text-ink-soft">Lien pour choisir son mot de passe (à ne donner qu&apos;à cet étudiant) :</p>
                <code className="block px-3 py-2 rounded-lg bg-surface-alt border border-line text-xs text-ink break-all max-h-24 overflow-y-auto">{result.setupLink}</code>
                <button onClick={copyLink} className="px-4 py-2 rounded-lg bg-surface-alt border border-line text-sm font-bold text-ink hover:bg-surface">
                  {copied ? "Copié ✓" : "Copier le lien"}
                </button>
              </div>
            )}
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => {
                  setResult(null);
                  setName("");
                  setEmail("");
                }}
                className="px-4 py-2 rounded-xl border border-line text-sm font-bold text-ink-soft hover:text-ink"
              >
                Inscrire un autre
              </button>
              <button onClick={onClose} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold">
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-ink">Inscrire un étudiant</h3>
              <p className="text-xs text-ink-soft mt-1">
                Le compte est créé et l&apos;inscription approuvée tout de suite. L&apos;étudiant reçoit un e-mail pour choisir son mot de passe.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5">Nom complet *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} className={field} placeholder="Ex. Marie Kabongo" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5">Adresse e-mail *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={field} placeholder="nom@exemple.com" />
            </div>
            <div className="flex gap-4 text-sm text-ink">
              <span className="text-xs font-semibold text-ink-soft self-center">Civilité</span>
              {[
                ["M", "Homme"],
                ["F", "Femme"],
              ].map(([val, label]) => (
                <label key={val} className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="gender" checked={gender === val} onChange={() => setGender(val as "M" | "F")} /> {label}
                </label>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Formation *</label>
                <select value={langCode} onChange={(e) => setLangCode(e.target.value)} className={field}>
                  <optgroup label="Langues">
                    {availableLanguages.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label}
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
              {isLanguage && (
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1.5">Niveau de départ</label>
                  <select value={level} onChange={(e) => setLevel(Number(e.target.value))} className={field}>
                    {(findProgramByCode(langCode) ? programLevels(findProgramByCode(langCode)!.slug) : [1, 2, 3]).map((n) => (
                      <option key={n} value={n}>
                        Niveau {n}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {isLanguage && (
                <div>
                  <label className="block text-xs font-semibold text-ink-soft mb-1.5">Rythme</label>
                  <select value={studyDays} onChange={(e) => setStudyDays(Number(e.target.value))} className={field}>
                    <option value={3}>3 jours par semaine</option>
                    <option value={5}>5 jours par semaine</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Professeur (facultatif)</label>
                <select value={teacherUid} onChange={(e) => setTeacherUid(e.target.value)} className={field}>
                  <option value="">Aucun pour l&apos;instant</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name || t.email || t.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2 justify-end pt-1">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-line text-sm font-bold text-ink-soft hover:text-ink">
                Annuler
              </button>
              <button type="submit" disabled={busy} className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold">
                {busy ? "Inscription…" : "Inscrire l'étudiant"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
