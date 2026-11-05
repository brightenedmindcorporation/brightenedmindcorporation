"use client";

import { useEffect, useState } from "react";

const JOBS = ["Aide ménagère", "Nounou / garde d'enfants", "Cuisinier / cuisinière", "Chauffeur privé", "Gardien / agent de sécurité", "Jardinier", "Autre"];

const field = "w-full min-h-[48px] rounded-xl border border-line bg-surface-sunken px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/30";

/** The two request forms of BM Domestica: a household looking for staff, and a person looking for a job. */
export default function DomesticaForms({ initial = "employer" }: { initial?: "employer" | "candidate" }) {
  const [kind, setKind] = useState<"employer" | "candidate">(initial);
  const [values, setValues] = useState<Record<string, string>>({ job: JOBS[0] });
  const [consent, setConsent] = useState(false);
  const [docs, setDocs] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setError(null);
    // Only what is indispensable is required; each missing item is explained next to its field.
    const errs: Record<string, string> = {};
    if ((values.name ?? "").trim().length < 3) errs.name = "Écrivez votre nom complet.";
    if ((values.phone ?? "").replace(/[^\d]/g, "").length < 9) errs.phone = "Écrivez un numéro de téléphone valable (au moins 9 chiffres). Exemple : 099 123 4567";
    if (kind === "candidate" && !consent) errs.consent = "Cochez la case pour que nous puissions étudier votre candidature.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      setTimeout(() => document.querySelector("#demande-form .field-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      return;
    }
    setSending(true);
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
        <p role="status" className="text-2xl font-black text-ink">Demande bien reçue ✓</p>
        <p className="mt-3 text-base text-ink-soft">
          {kind === "employer"
            ? "Merci. Notre équipe étudie votre besoin et vous appelle ou vous écrit sur WhatsApp, en général dans la journée (au plus tard sous 24 heures ouvrables), avec des profils adaptés."
            : "Merci. Notre équipe étudie votre candidature et vous contacte pour la suite, en général sous quelques jours. Gardez votre téléphone à portée de main."}
        </p>
        <p className="mt-3 text-base text-ink-soft">
          Une question en attendant ?{" "}
          <a href="https://wa.me/243988830799" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 dark:text-emerald-300 underline">
            Écrivez-nous sur WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  const tab = (k: "employer" | "candidate", label: string) => (
    <button
      type="button"
      onClick={() => setKind(k)}
      className={`flex-1 min-h-[48px] rounded-xl px-4 py-3 text-base font-bold transition ${kind === k ? "bg-red-600 text-white shadow-lg shadow-red-600/30" : "text-ink-soft hover:text-ink"}`}
    >
      {label}
    </button>
  );

  return (
    <form id="demande-form" onSubmit={submit} noValidate className="space-y-4 rounded-3xl border border-line bg-surface p-5 md:p-8">
      <div className="flex gap-2 rounded-2xl border border-line bg-surface-sunken p-1.5">
        {tab("employer", "Je cherche du personnel")}
        {tab("candidate", "Je cherche un emploi")}
      </div>

      {/* honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website ?? ""} onChange={set("website")} className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dom-name" className="mb-1 block text-sm font-semibold text-ink">Nom complet *</label>
          <input
            id="dom-name"
            autoComplete="name"
            className={`${field} ${errors.name ? "field-invalid" : ""}`}
            placeholder="Votre nom"
            value={values.name ?? ""}
            onChange={(e) => {
              set("name")(e);
              setErrors((p) => ({ ...p, name: "" }));
            }}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p role="alert" className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="dom-phone" className="mb-1 block text-sm font-semibold text-ink">Téléphone / WhatsApp *</label>
          <input
            id="dom-phone"
            autoComplete="tel"
            className={`${field} ${errors.phone ? "field-invalid" : ""}`}
            placeholder="099 123 4567"
            value={values.phone ?? ""}
            onChange={(e) => {
              set("phone")(e);
              setErrors((p) => ({ ...p, phone: "" }));
            }}
            inputMode="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p role="alert" className="field-error">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="dom-job" className="mb-1 block text-sm font-semibold text-ink">{kind === "employer" ? "Poste recherché" : "Métier visé"}</label>
          <select id="dom-job" className={field} value={values.job} onChange={set("job")}>
            {JOBS.map((j) => (
              <option key={j}>{j}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dom-message" className="mb-1 block text-sm font-semibold text-ink">{kind === "employer" ? "Votre besoin" : "Parlez-nous de vous"} (facultatif)</label>
        <textarea
          id="dom-message"
          className={`${field} min-h-[110px]`}
          placeholder={kind === "employer" ? "Composition du foyer, tâches, exigences particulières…" : "Expériences précédentes, formations, références…"}
          value={values.message ?? ""}
          onChange={set("message")}
        />
      </div>

      <details className="rounded-xl border border-line bg-surface-sunken/50 p-4">
        <summary className="cursor-pointer min-h-[44px] flex items-center font-bold text-ink">Ajouter des détails (facultatif)</summary>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <input className={field} aria-label="E-mail" placeholder="E-mail" type="email" inputMode="email" autoComplete="email" value={values.email ?? ""} onChange={set("email")} />
          <input className={field} aria-label="Ville ou commune" placeholder="Ville / commune" value={values.city ?? ""} onChange={set("city")} />
          {kind === "employer" ? (
            <>
              <input className={field} aria-label="Horaires" placeholder="Horaires (ex. 7 h – 17 h, lundi à samedi)" value={values.schedule ?? ""} onChange={set("schedule")} />
              <input className={field} aria-label="Date de début souhaitée" placeholder="Date de début souhaitée" value={values.startDate ?? ""} onChange={set("startDate")} />
              <input className={field} aria-label="Budget mensuel envisagé" placeholder="Budget mensuel envisagé" value={values.budget ?? ""} onChange={set("budget")} />
            </>
          ) : (
            <>
              <input className={field} aria-label="Années d'expérience" placeholder="Années d'expérience (ex. 3 ans)" value={values.experience ?? ""} onChange={set("experience")} />
              <input className={field} aria-label="Langues parlées" placeholder="Langues parlées (français, lingala, swahili…)" value={values.languages ?? ""} onChange={set("languages")} />
              <input className={field} aria-label="Disponibilité" placeholder="Disponibilité (immédiate, dans un mois…)" value={values.availability ?? ""} onChange={set("availability")} />
            </>
          )}
        </div>
      </details>

      {kind === "candidate" && (
        <div className="rounded-xl border border-dashed border-line bg-surface-sunken p-4">
          <p className="text-sm font-bold text-ink">Vos documents (facultatif)</p>
          <p className="mt-1 text-sm text-ink-soft">CV, attestations, lettres de recommandation : PDF, Word, JPG ou PNG, 4 fichiers de 5 Mo maximum.</p>
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
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              {docs.map((f) => (
                <li key={f.name}>
                  📎 {f.name} ({Math.max(1, Math.round(f.size / 1024))} Ko)
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-sm text-ink-soft">Pas de CV ? <a href="/domestica/cv" className="inline-flex items-center min-h-[44px] font-bold text-red-600 dark:text-red-300 underline">Créez-en un gratuitement</a> et joignez-le ici.</p>
        </div>
      )}

      {kind === "candidate" && (
        <div>
          <label className="flex items-start gap-3 text-sm text-ink-soft min-h-[44px]">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 accent-red-600"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                setErrors((p) => ({ ...p, consent: "" }));
              }}
              aria-invalid={!!errors.consent}
            />
            <span>J&apos;accepte que BM Domestica conserve ces informations pour étudier ma candidature et me contacter. Elles ne sont communiquées à un employeur qu&apos;avec mon accord.</span>
          </label>
          {errors.consent && <p role="alert" className="field-error">{errors.consent}</p>}
        </div>
      )}

      {error && <p role="alert" className="rounded-xl border border-red-600/30 bg-red-500/10 p-3 text-sm font-semibold text-red-800 dark:text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="glow-accent w-full min-h-[56px] rounded-xl bg-gradient-to-br from-red-600 to-red-900 text-lg font-bold text-white transition hover:from-red-500 hover:to-red-800 disabled:opacity-60"
      >
        {sending ? "Envoi en cours…" : kind === "employer" ? "Envoyer ma demande" : "Envoyer ma candidature"}
      </button>
      <p className="text-center text-sm text-ink-soft">Nous vous répondons par téléphone ou WhatsApp, en général dans la journée.</p>
    </form>
  );
}
