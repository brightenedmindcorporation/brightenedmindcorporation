"use client";

import { useEffect, useState } from "react";

const JOBS = ["Aide ménagère", "Nounou / garde d'enfants", "Cuisinier / cuisinière", "Chauffeur privé", "Gardien / agent de sécurité", "Jardinier", "Autre"];

const field = "w-full rounded-xl border border-line bg-surface-sunken px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60";

/** The two request forms of BM Domestica: a household looking for staff, and a person looking for a job. */
export default function DomesticaForms({ initial = "employer" }: { initial?: "employer" | "candidate" }) {
  const [kind, setKind] = useState<"employer" | "candidate">(initial);
  const [values, setValues] = useState<Record<string, string>>({ job: JOBS[0] });
  const [consent, setConsent] = useState(false);
  const [docs, setDocs] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // The two buttons of the page open the matching tab (#demande = household, #demande-candidat = candidate).
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#demande-candidat") setKind("candidate");
      else if (window.location.hash === "#demande") setKind("employer");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const form = new FormData();
      for (const [k, v] of Object.entries({ ...values, kind, consent: String(consent) })) form.append(k, v);
      if (kind === "candidate") docs.forEach((f) => form.append("documents", f));
      const response = await fetch("/api/domestica/submit", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setDone(true);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-surface p-8 text-center">
        <p className="text-2xl font-black text-ink">Demande envoyée ✓</p>
        <p className="mt-3 text-sm text-ink-soft">
          {kind === "employer"
            ? "Merci. Notre équipe étudie votre besoin et vous contacte rapidement par téléphone ou WhatsApp avec des profils adaptés."
            : "Merci. Notre équipe étudie votre candidature et vous contactera pour la suite. Gardez votre téléphone à portée de main."}
        </p>
      </div>
    );
  }

  const tab = (k: "employer" | "candidate", label: string) => (
    <button
      type="button"
      onClick={() => setKind(k)}
      className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition ${kind === k ? "bg-red-600 text-white shadow-lg shadow-red-600/30" : "text-ink-soft hover:text-ink"}`}
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-line bg-surface p-6 md:p-8">
      <div className="flex gap-2 rounded-2xl border border-line bg-surface-sunken p-1.5">
        {tab("employer", "Je cherche du personnel")}
        {tab("candidate", "Je cherche un emploi")}
      </div>

      {/* honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website ?? ""} onChange={set("website")} className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} placeholder="Nom complet *" value={values.name ?? ""} onChange={set("name")} required />
        <input className={field} placeholder="Téléphone / WhatsApp *" value={values.phone ?? ""} onChange={set("phone")} required inputMode="tel" />
        <input className={field} placeholder="E-mail (facultatif)" type="email" value={values.email ?? ""} onChange={set("email")} />
        <input className={field} placeholder="Ville / commune" value={values.city ?? ""} onChange={set("city")} />
        <select className={field} value={values.job} onChange={set("job")} aria-label={kind === "employer" ? "Poste recherché" : "Métier visé"}>
          {JOBS.map((j) => (
            <option key={j}>{j}</option>
          ))}
        </select>
        {kind === "employer" ? (
          <input className={field} placeholder="Horaires (ex. 7 h – 17 h, lundi à samedi)" value={values.schedule ?? ""} onChange={set("schedule")} />
        ) : (
          <input className={field} placeholder="Années d'expérience (ex. 3 ans)" value={values.experience ?? ""} onChange={set("experience")} />
        )}
        {kind === "employer" ? (
          <>
            <input className={field} placeholder="Date de début souhaitée" value={values.startDate ?? ""} onChange={set("startDate")} />
            <input className={field} placeholder="Budget mensuel envisagé" value={values.budget ?? ""} onChange={set("budget")} />
          </>
        ) : (
          <>
            <input className={field} placeholder="Langues parlées (français, lingala, swahili…)" value={values.languages ?? ""} onChange={set("languages")} />
            <input className={field} placeholder="Disponibilité (immédiate, dans un mois…)" value={values.availability ?? ""} onChange={set("availability")} />
          </>
        )}
      </div>

      <textarea
        className={`${field} min-h-[110px]`}
        placeholder={kind === "employer" ? "Décrivez votre besoin : composition du foyer, tâches, exigences particulières…" : "Parlez-nous de vous : expériences précédentes, formations, références…"}
        value={values.message ?? ""}
        onChange={set("message")}
      />

      {kind === "candidate" && (
        <div className="rounded-xl border border-dashed border-line bg-surface-sunken p-4">
          <p className="text-sm font-bold text-ink">Vos documents (facultatif)</p>
          <p className="mt-1 text-xs text-ink-soft">CV, attestations, lettres de recommandation : PDF, Word, JPG ou PNG, 4 fichiers de 5 Mo maximum.</p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => {
              const picked = Array.from(e.target.files ?? []).slice(0, 4);
              setDocs(picked);
            }}
            className="mt-3 block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
          />
          {docs.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-ink-soft">
              {docs.map((f) => (
                <li key={f.name}>
                  📎 {f.name} ({Math.max(1, Math.round(f.size / 1024))} Ko)
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-ink-faint">Pas de CV ? <a href="/domestica/cv" className="font-bold text-red-500 underline">Créez-en un gratuitement</a> et joignez-le ici.</p>
        </div>
      )}

      {kind === "candidate" && (
        <label className="flex items-start gap-3 text-xs text-ink-soft">
          <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>J'accepte que BM Domestica conserve ces informations pour étudier ma candidature et me contacter. Elles ne sont communiquées à un employeur qu'avec mon accord.</span>
        </label>
      )}

      {error && <p className="rounded-xl border border-red-600/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="glow-accent w-full rounded-xl bg-gradient-to-br from-red-600 to-red-900 py-3.5 text-lg font-bold text-white transition hover:from-red-500 hover:to-red-800 disabled:opacity-60"
      >
        {sending ? "Envoi…" : kind === "employer" ? "Envoyer ma demande" : "Envoyer ma candidature"}
      </button>
      <p className="text-center text-xs text-ink-faint">Réponse rapide par téléphone ou WhatsApp.</p>
    </form>
  );
}
