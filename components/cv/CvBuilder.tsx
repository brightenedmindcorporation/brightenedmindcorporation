"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CvSobre, CV_PAGE, EMPTY_CV, fullName, type CvData, type CvExperience, type CvReference, type CvStudy } from "./templates";
import { buildCvPdf, cvFileName, type CvAnnex } from "@/lib/cv/cvPdf";

const LEVELS = ["Primaire", "Secondaire (Humanités)", "Supérieur / Université", "Formation professionnelle", "Autre"];
const DIPLOMAS = [
  "Certificat de fin d'études primaires (CEP)",
  "Diplôme d'État",
  "Diplôme de graduat",
  "Diplôme de licence",
  "Certificat de formation",
  "Attestation de fin de formation",
  "Attestation de fréquentation",
  "Bulletin / relevé de notes",
  "Autre pièce",
];
const CATEGORIES = [
  "Carte d'électeur / pièce d'identité",
  "Carte de service",
  "Attestation de service",
  "Certificat / attestation de formation",
  "Diplôme / titre d'études",
  "Lettre de recommandation",
  "Autre document",
];
const JOBS = ["Aide ménagère", "Nounou / garde d'enfants", "Cuisinier / cuisinière", "Chauffeur privé", "Gardien / agent de sécurité", "Jardinier", "Autre"];
const MAX_BYTES = 5 * 1024 * 1024;
const DRAFT_KEY = "bm_cv_draft_v1";

const input = "w-full rounded-xl border border-line bg-surface-sunken px-3.5 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60";

/** Reads an image file, shrinks it (so the PDF and the upload stay light) and returns a JPEG data URL. */
async function shrinkImage(file: File, maxSide: number, quality: number): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("image"));
      el.src = url;
    });
    const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * ratio);
    canvas.height = Math.round(img.height * ratio);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}
const dataUrlToFile = (dataUrl: string, name: string): File => {
  const [head, body] = dataUrl.split(",");
  const bin = atob(body);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new File([bytes], name, { type: head.match(/:(.*?);/)?.[1] || "image/jpeg" });
};
const isImage = (f: File) => /^image\/(jpeg|png)$/.test(f.type);

function Field({ label, value, onChange, placeholder, type = "text", hint, list }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; hint?: string; list?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</span>
      <input className={input} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} list={list} />
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}
function Chips({ label, items, onChange, placeholder, hint }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder: string; hint?: string }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (v && !items.includes(v)) onChange([...items, v]);
    setDraft("");
  };
  return (
    <div>
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</span>
      <div className="flex gap-2">
        <input
          className={input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <button type="button" onClick={add} className="shrink-0 rounded-xl bg-red-600 px-4 text-sm font-bold text-white">
          Ajouter
        </button>
      </div>
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-alt px-3 py-1 text-sm">
            {i}
            <button type="button" onClick={() => onChange(items.filter((x) => x !== i))} aria-label={`Retirer ${i}`} className="text-ink-faint hover:text-red-500">
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
function Step({ n, title, open, onToggle, done, children }: { n: number; title: string; open: boolean; onToggle: () => void; done?: boolean; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 p-4 text-left">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${done ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>{done ? "✓" : n}</span>
        <span className="flex-1 font-bold text-ink">{title}</span>
        <span className="text-ink-faint">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="space-y-4 border-t border-line p-4">{children}</div>}
    </section>
  );
}

export default function CvBuilder() {
  const [cv, setCv] = useState<CvData>(EMPTY_CV);
  const [open, setOpen] = useState(1);
  const [view, setView] = useState<"form" | "preview">("form");
  // Files are kept apart from the CV data: documents by category, and the proof of each study.
  const [docs, setDocs] = useState<Record<string, File[]>>({});
  const [proofs, setProofs] = useState<Record<number, File>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [job, setJob] = useState(JOBS[0]);
  const [consent, setConsent] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);

  // Draft: the text fields come back after a refresh (the files do not).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setCv({ ...EMPTY_CV, ...JSON.parse(raw) });
    } catch {
      // no saved draft
    }
  }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...cv, attachments: [] }));
      } catch {
        // storage full or blocked: the CV still works
      }
    }, 600);
    return () => clearTimeout(t);
  }, [cv]);

  const set = <K extends keyof CvData>(k: K, v: CvData[K]) => setCv((c) => ({ ...c, [k]: v }));

  // The CV shows the names of the files that will be attached.
  const full: CvData = useMemo(
    () => ({
      ...cv,
      studies: cv.studies.map((s, i) => ({ ...s, proofName: proofs[i]?.name })),
      attachments: CATEGORIES.map((c) => ({ category: c, names: (docs[c] ?? []).map((f) => f.name) })).filter((a) => a.names.length),
    }),
    [cv, docs, proofs]
  );

  const addDocs = (category: string, files: FileList | null) => {
    if (!files) return;
    setError(null);
    const ok: File[] = [];
    for (const f of Array.from(files)) {
      if (f.size > MAX_BYTES) setError(`« ${f.name} » dépasse 5 Mo.`);
      else if (!/\.(pdf|docx?|jpe?g|png)$/i.test(f.name)) setError(`« ${f.name} » : formats acceptés : PDF, Word, JPG, PNG.`);
      else ok.push(f);
    }
    setDocs((d) => ({ ...d, [category]: [...(d[category] ?? []), ...ok] }));
  };

  const pickPhoto = async (file?: File) => {
    if (!file) return;
    try {
      set("photo", await shrinkImage(file, 480, 0.85));
    } catch {
      setError("Cette photo ne peut pas être lue. Choisissez une image JPG ou PNG.");
    }
  };

  // Every image (documents and proofs) becomes an annex page of the PDF; the original files are also sent separately.
  const annexes = async (): Promise<CvAnnex[]> => {
    const out: CvAnnex[] = [];
    for (const [category, files] of Object.entries(docs)) for (const f of files) if (isImage(f)) out.push({ label: `${category} — ${f.name}`, dataUrl: await shrinkImage(f, 1500, 0.72) });
    for (const [i, f] of Object.entries(proofs)) if (isImage(f)) out.push({ label: `Pièce d'études (${cv.studies[Number(i)]?.level ?? ""}) — ${f.name}`, dataUrl: await shrinkImage(f, 1500, 0.72) });
    return out;
  };

  const missing = [!cv.lastName && "le nom", !cv.firstName && "le prénom", !cv.phone && "le téléphone", !cv.title && "le poste recherché"].filter(Boolean) as string[];

  const download = async () => {
    if (missing.length) {
      setError(`Complétez d'abord : ${missing.join(", ")}.`);
      setOpen(1);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      buildCvPdf(full, await annexes()).save(cvFileName(cv));
    } catch (e: any) {
      setError(e?.message || "Le PDF n'a pas pu être créé.");
    } finally {
      setBusy(false);
    }
  };

  const send = async () => {
    if (missing.length) {
      setError(`Complétez d'abord : ${missing.join(", ")}.`);
      setOpen(1);
      return;
    }
    if (!consent) {
      setError("Cochez la case d'accord pour envoyer votre candidature.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const pdf = buildCvPdf(full, await annexes());
      const pdfFile = new File([pdf.output("blob")], cvFileName(cv), { type: "application/pdf" });
      const files: { file: File; category: string }[] = [{ file: pdfFile, category: "CV (PDF)" }];
      for (const [category, list] of Object.entries(docs)) for (const f of list) files.push({ file: f, category });
      for (const [i, f] of Object.entries(proofs)) files.push({ file: f, category: `Pièce d'études : ${cv.studies[Number(i)]?.level ?? ""}` });
      if (files.length > 15) throw new Error("15 fichiers au maximum : retirez-en quelques-uns.");
      if (pdfFile.size > MAX_BYTES) throw new Error("Le CV avec ses pièces est trop lourd (plus de 5 Mo). Retirez une pièce ou utilisez des photos moins grandes.");

      const form = new FormData();
      form.append("kind", "candidate");
      form.append("name", fullName(cv));
      form.append("phone", cv.phone);
      form.append("email", cv.email);
      form.append("city", cv.city);
      form.append("job", job);
      form.append("languages", cv.languages.join(", "));
      form.append("message", cv.summary);
      form.append("consent", String(consent));
      form.append("cv", JSON.stringify({ ...cv, photo: undefined, attachments: undefined }));
      form.append("docMeta", JSON.stringify(files.map((f) => f.category)));
      files.forEach((f) => form.append("documents", f.file));
      const response = await fetch("/api/domestica/submit", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setSent(true);
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
    } catch (e: any) {
      setError(e?.message || "L'envoi a échoué. Réessayez.");
    } finally {
      setBusy(false);
    }
  };

  // ---- the preview is drawn at A4 size and scaled to the width available ----
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / CV_PAGE.width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [view]);

  if (sent) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-line bg-surface p-8 text-center">
        <p className="text-2xl font-black text-ink">Candidature envoyée ✓</p>
        <p className="mt-3 text-sm text-ink-soft">Votre CV et vos pièces sont arrivés chez BM Domestica. Notre équipe vous contactera par téléphone ou WhatsApp. Vous pouvez aussi télécharger votre CV en PDF à tout moment depuis cette page.</p>
        <button onClick={download} className="mt-5 rounded-xl bg-red-600 px-6 py-3 font-bold text-white">
          Télécharger mon CV (PDF)
        </button>
      </div>
    );
  }

  const o = (n: number) => (open === n ? 0 : n);

  return (
    <div>
      <div className="mb-4 flex gap-2 lg:hidden">
        {(["form", "preview"] as const).map((v) => (
          <button key={v} onClick={() => setView(v)} className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold ${view === v ? "bg-red-600 text-white" : "border border-line bg-surface text-ink-soft"}`}>
            {v === "form" ? "Remplir" : "Voir mon CV"}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,430px)]">
        <div className={`${view === "preview" ? "hidden lg:block" : ""} space-y-3`}>
          <Step n={1} title="Identité complète" open={open === 1} onToggle={() => setOpen(o(1))} done={Boolean(cv.lastName && cv.firstName && cv.birthDate)}>
            <div className="flex items-center gap-4">
              {cv.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cv.photo} alt="Votre photo" className="h-24 w-20 rounded-lg border border-line object-cover" />
              ) : (
                <div className="flex h-24 w-20 items-center justify-center rounded-lg border border-dashed border-line text-xs text-ink-faint">Photo</div>
              )}
              <div>
                <button type="button" onClick={() => photoInput.current?.click()} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white">
                  {cv.photo ? "Changer la photo" : "Ajouter ma photo"}
                </button>
                {cv.photo && (
                  <button type="button" onClick={() => set("photo", undefined)} className="ml-2 text-sm text-ink-soft underline">
                    Retirer
                  </button>
                )}
                <p className="mt-1 text-xs text-ink-faint">Photo d'identité récente, fond clair, visage bien visible.</p>
                <input ref={photoInput} type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => pickPhoto(e.target.files?.[0])} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Nom *" value={cv.lastName} onChange={(v) => set("lastName", v)} placeholder="MBUYI" />
              <Field label="Postnom" value={cv.middleName} onChange={(v) => set("middleName", v)} placeholder="KALALA" />
              <Field label="Prénom *" value={cv.firstName} onChange={(v) => set("firstName", v)} placeholder="Rose" />
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">Sexe</span>
                <select className={input} value={cv.gender} onChange={(e) => set("gender", e.target.value)}>
                  <option value="">—</option>
                  <option>Féminin</option>
                  <option>Masculin</option>
                </select>
              </label>
              <Field label="Date de naissance" value={cv.birthDate} onChange={(v) => set("birthDate", v)} placeholder="14 mars 1994" />
              <Field label="Lieu de naissance" value={cv.birthPlace} onChange={(v) => set("birthPlace", v)} placeholder="Lubumbashi" />
              <Field label="Nationalité" value={cv.nationality} onChange={(v) => set("nationality", v)} />
              <Field label="Province d'origine" value={cv.origin} onChange={(v) => set("origin", v)} placeholder="Haut-Katanga" />
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">État civil</span>
                <select className={input} value={cv.civilStatus} onChange={(e) => set("civilStatus", e.target.value)}>
                  <option value="">—</option>
                  <option>Célibataire</option>
                  <option>Marié(e)</option>
                  <option>Veuf / veuve</option>
                  <option>Divorcé(e)</option>
                </select>
              </label>
              <Field label="Nombre d'enfants" value={cv.children} onChange={(v) => set("children", v)} placeholder="0" type="number" />
              <Field label="Nom du père" value={cv.father} onChange={(v) => set("father", v)} />
              <Field label="Nom de la mère" value={cv.mother} onChange={(v) => set("mother", v)} />
            </div>
          </Step>

          <Step n={2} title="Adresse et contacts" open={open === 2} onToggle={() => setOpen(o(2))} done={Boolean(cv.phone && cv.city)}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Avenue / rue et numéro" value={cv.street} onChange={(v) => set("street", v)} placeholder="Avenue Kasai n° 12" />
              <Field label="Quartier" value={cv.quarter} onChange={(v) => set("quarter", v)} placeholder="Q/ Bel-Air" />
              <Field label="Commune" value={cv.commune} onChange={(v) => set("commune", v)} placeholder="C/ Katuba" />
              <Field label="Ville *" value={cv.city} onChange={(v) => set("city", v)} placeholder="Lubumbashi" />
              <Field label="Pays" value={cv.country} onChange={(v) => set("country", v)} />
              <Field label="Téléphone / WhatsApp *" value={cv.phone} onChange={(v) => set("phone", v)} placeholder="+243 …" type="tel" />
              <Field label="Autre téléphone" value={cv.phone2} onChange={(v) => set("phone2", v)} type="tel" />
              <Field label="E-mail" value={cv.email} onChange={(v) => set("email", v)} type="email" />
            </div>
          </Step>

          <Step n={3} title="Poste recherché et profil" open={open === 3} onToggle={() => setOpen(o(3))} done={Boolean(cv.title && cv.summary)}>
            <Field label="Poste recherché *" value={cv.title} onChange={(v) => set("title", v)} placeholder="Cuisinière et aide ménagère" />
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">Profil (2 à 3 phrases)</span>
              <textarea className={`${input} min-h-[100px]`} value={cv.summary} onChange={(e) => set("summary", e.target.value)} placeholder="Qui êtes-vous ? Combien d'années d'expérience ? Quelles sont vos principales qualités ?" />
            </label>
          </Step>

          <Step n={4} title="Études faites et pièces obtenues" open={open === 4} onToggle={() => setOpen(o(4))} done={cv.studies.length > 0}>
            <p className="text-sm text-ink-soft">Ajoutez chaque niveau d'études : primaire, secondaire (humanités), supérieur, formations. Pour chacun, indiquez la pièce obtenue et joignez-en la copie si vous l'avez.</p>
            <datalist id="diplomas">
              {DIPLOMAS.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
            {cv.studies.map((s, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line bg-surface-sunken p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">Niveau</span>
                    <select className={input} value={s.level} onChange={(e) => set("studies", cv.studies.map((x, k) => (k === i ? { ...x, level: e.target.value } : x)))}>
                      {LEVELS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </label>
                  <Field label="École / institut / centre" value={s.school} onChange={(v) => set("studies", cv.studies.map((x, k) => (k === i ? { ...x, school: v } : x)))} />
                  <Field label="Option / section" value={s.option} onChange={(v) => set("studies", cv.studies.map((x, k) => (k === i ? { ...x, option: v } : x)))} placeholder="Pédagogie générale" />
                  <Field label="Année d'obtention" value={s.year} onChange={(v) => set("studies", cv.studies.map((x, k) => (k === i ? { ...x, year: v } : x)))} placeholder="2012" />
                  <div className="sm:col-span-2">
                    <Field label="Pièce obtenue" value={s.diploma} onChange={(v) => set("studies", cv.studies.map((x, k) => (k === i ? { ...x, diploma: v } : x)))} list="diplomas" placeholder="Diplôme d'État" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer rounded-xl border border-line bg-surface px-3 py-2 text-sm font-bold text-ink hover:border-red-600/60">
                    📎 {proofs[i] ? "Changer la copie jointe" : "Joindre la copie de cette pièce"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        if (f.size > MAX_BYTES) return setError(`« ${f.name} » dépasse 5 Mo.`);
                        setProofs((p) => ({ ...p, [i]: f }));
                      }}
                    />
                  </label>
                  {proofs[i] && <span className="text-xs text-ink-soft">{proofs[i].name}</span>}
                  <button
                    type="button"
                    onClick={() => {
                      set("studies", cv.studies.filter((_, k) => k !== i));
                      setProofs((p) => {
                        const next: Record<number, File> = {};
                        Object.entries(p).forEach(([k, f]) => {
                          const n = Number(k);
                          if (n < i) next[n] = f;
                          else if (n > i) next[n - 1] = f;
                        });
                        return next;
                      });
                    }}
                    className="ml-auto text-sm text-red-500 underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set("studies", [...cv.studies, { level: LEVELS[1], school: "", option: "", year: "", diploma: "" } as CvStudy])} className="rounded-xl border border-dashed border-red-600/60 px-4 py-2.5 text-sm font-bold text-red-500">
              ＋ Ajouter des études
            </button>
          </Step>

          <Step n={5} title="Expériences professionnelles" open={open === 5} onToggle={() => setOpen(o(5))} done={cv.experiences.length > 0}>
            {cv.experiences.map((e, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line bg-surface-sunken p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Poste occupé" value={e.job} onChange={(v) => set("experiences", cv.experiences.map((x, k) => (k === i ? { ...x, job: v } : x)))} placeholder="Cuisinière" />
                  <Field label="Employeur / lieu" value={e.employer} onChange={(v) => set("experiences", cv.experiences.map((x, k) => (k === i ? { ...x, employer: v } : x)))} placeholder="Famille Kasongo, Lubumbashi" />
                  <Field label="Période" value={e.period} onChange={(v) => set("experiences", cv.experiences.map((x, k) => (k === i ? { ...x, period: v } : x)))} placeholder="2021 – 2025" />
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-ink-soft">Ce que vous faisiez (une tâche par ligne)</span>
                  <textarea className={`${input} min-h-[80px]`} value={e.tasks} onChange={(ev) => set("experiences", cv.experiences.map((x, k) => (k === i ? { ...x, tasks: ev.target.value } : x)))} placeholder={"Repas quotidiens pour 5 personnes\nEntretien de la maison"} />
                </label>
                <button type="button" onClick={() => set("experiences", cv.experiences.filter((_, k) => k !== i))} className="text-sm text-red-500 underline">
                  Supprimer
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set("experiences", [...cv.experiences, { job: "", employer: "", period: "", tasks: "" } as CvExperience])} className="rounded-xl border border-dashed border-red-600/60 px-4 py-2.5 text-sm font-bold text-red-500">
              ＋ Ajouter une expérience
            </button>
          </Step>

          <Step n={6} title="Compétences, langues et qualités" open={open === 6} onToggle={() => setOpen(o(6))} done={cv.skills.length > 0}>
            <Chips label="Compétences" items={cv.skills} onChange={(v) => set("skills", v)} placeholder="Cuisine, repassage, garde d'enfants…" hint="Écrivez une compétence puis appuyez sur Entrée." />
            <Chips label="Langues parlées" items={cv.languages} onChange={(v) => set("languages", v)} placeholder="Français (courant), Swahili…" />
            <Chips label="Qualités" items={cv.qualities} onChange={(v) => set("qualities", v)} placeholder="Ponctuelle, honnête, discrète…" />
          </Step>

          <Step n={7} title="Références" open={open === 7} onToggle={() => setOpen(o(7))} done={cv.references.length > 0}>
            <p className="text-sm text-ink-soft">Anciens employeurs ou personnes de confiance qui peuvent parler de votre travail (avec leur accord).</p>
            {cv.references.map((r, i) => (
              <div key={i} className="grid gap-3 rounded-xl border border-line bg-surface-sunken p-3 sm:grid-cols-3">
                <Field label="Nom" value={r.name} onChange={(v) => set("references", cv.references.map((x, k) => (k === i ? { ...x, name: v } : x)))} />
                <Field label="Lien" value={r.relation} onChange={(v) => set("references", cv.references.map((x, k) => (k === i ? { ...x, relation: v } : x)))} placeholder="Ancienne employeuse" />
                <Field label="Téléphone" value={r.phone} onChange={(v) => set("references", cv.references.map((x, k) => (k === i ? { ...x, phone: v } : x)))} />
                <button type="button" onClick={() => set("references", cv.references.filter((_, k) => k !== i))} className="text-left text-sm text-red-500 underline sm:col-span-3">
                  Supprimer
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set("references", [...cv.references, { name: "", relation: "", phone: "" } as CvReference])} className="rounded-xl border border-dashed border-red-600/60 px-4 py-2.5 text-sm font-bold text-red-500">
              ＋ Ajouter une référence
            </button>
          </Step>

          <Step n={8} title="Documents en pièces jointes" open={open === 8} onToggle={() => setOpen(o(8))} done={Object.values(docs).some((d) => d.length)}>
            <p className="text-sm text-ink-soft">Joignez les copies de vos documents (PDF, Word, JPG ou PNG, 5 Mo maximum chacun). Les photos sont ajoutées à la fin du CV en PDF.</p>
            <div className="space-y-2">
              {CATEGORIES.map((c) => (
                <div key={c} className="rounded-xl border border-line bg-surface-sunken p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-ink">{c}</span>
                    <label className="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
                      ＋ Joindre
                      <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => addDocs(c, e.target.files)} />
                    </label>
                  </div>
                  {(docs[c] ?? []).length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {docs[c].map((f, k) => (
                        <li key={f.name + k} className="flex items-center justify-between gap-2 text-xs text-ink-soft">
                          <span className="truncate">📎 {f.name}</span>
                          <button type="button" onClick={() => setDocs((d) => ({ ...d, [c]: d[c].filter((_, j) => j !== k) }))} className="text-red-500 underline">
                            Retirer
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Step>

          {error && <p className="rounded-xl border border-red-600/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}

          <div className="space-y-3 rounded-2xl border border-line bg-surface p-4">
            <button type="button" onClick={download} disabled={busy} className="w-full rounded-xl border border-line bg-surface-sunken py-3 font-bold text-ink hover:border-red-600/60 disabled:opacity-60">
              {busy ? "Création du PDF…" : "⬇ Télécharger mon CV en PDF"}
            </button>
            <div className="rounded-xl border border-dashed border-line p-3">
              <p className="text-sm font-bold text-ink">Envoyer ma candidature à BM Domestica</p>
              <label className="mt-2 block text-xs font-bold uppercase tracking-wide text-ink-soft">Métier visé</label>
              <select className={`${input} mt-1`} value={job} onChange={(e) => setJob(e.target.value)}>
                {JOBS.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
              <label className="mt-3 flex items-start gap-3 text-xs text-ink-soft">
                <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>J'accepte que BM Domestica conserve ces informations et ces documents pour étudier ma candidature. Ils ne sont communiqués à un employeur qu'avec mon accord.</span>
              </label>
              <button type="button" onClick={send} disabled={busy} className="glow-accent mt-3 w-full rounded-xl bg-gradient-to-br from-red-600 to-red-900 py-3 font-bold text-white disabled:opacity-60">
                {busy ? "Envoi…" : "Envoyer ma candidature avec ce CV"}
              </button>
            </div>
          </div>
        </div>

        <div className={`${view === "form" ? "hidden lg:block" : ""}`}>
          <div className="lg:sticky lg:top-28">
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-ink-soft">Aperçu de votre CV</p>
            <div ref={box} className="overflow-hidden rounded-xl border border-line bg-white shadow-xl" style={{ height: CV_PAGE.height * scale }}>
              <div style={{ width: CV_PAGE.width, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <CvSobre cv={full} />
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-ink-faint">Le PDF suit exactement cette mise en page (noir et blanc, prêt à imprimer).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
