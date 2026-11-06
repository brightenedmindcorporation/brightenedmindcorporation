"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Eye, EyeOff, Image as ImageIcon, Pin, PinOff, Plus, SquarePen, Trash2, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import PosterMaker from "@/components/admin/PosterMaker";
import { compressImage, formatBytes } from "@/lib/imageClient";
import { CATEGORIES, CTA_OPTIONS, categoryInfo, optimizedImage, type Announcement, type AnnouncementCategory, type CtaType } from "@/lib/announcements";

interface Stat {
  views: number;
  clicks: number;
  whatsapp: number;
  calls: number;
  plays: number;
}

const TITLE_MAX = 60;
const DESC_MAX = 140;

interface Draft {
  category: AnnouncementCategory;
  title: string;
  description: string;
  details: string;
  eventDate: string;
  place: string;
  price: string;
  ctaType: CtaType;
  ctaLabel: string;
  ctaUrl: string;
  startAt: string;
  duration: string;
  pinned: boolean;
  image: File | null;
  video: File | null;
  removeImage: boolean;
  keepImageUrl: string;
  keepVideoUrl: string;
}

const EMPTY: Draft = {
  category: "formation",
  title: "",
  description: "",
  details: "",
  eventDate: "",
  place: "",
  price: "",
  ctaType: "register",
  ctaLabel: "",
  ctaUrl: "",
  startAt: "",
  duration: "14",
  pinned: false,
  image: null,
  video: null,
  removeImage: false,
  keepImageUrl: "",
  keepVideoUrl: "",
};

/** Ready-made starting points: the category, a title, a short text, the right button and a sensible duration. */
const TEMPLATES: { label: string; patch: Partial<Draft> }[] = [
  {
    label: "Nouvelle session de formation",
    patch: { category: "formation", title: "Nouvelle session : inscriptions ouvertes", description: "Cours en ligne avec accompagnement, à votre rythme. Places limitées : inscrivez-vous dès maintenant.", place: "En ligne", ctaType: "register", duration: "30" },
  },
  {
    label: "Offre d'emploi",
    patch: { category: "emploi", title: "Nous recrutons : [poste]", description: "BM Corporation recrute à Lubumbashi. Envoyez votre CV avant la date limite.", place: "Lubumbashi", ctaType: "apply", duration: "30" },
  },
  {
    label: "Promotion",
    patch: { category: "promo", title: "Promotion : [offre]", description: "Profitez de cette offre pendant une durée limitée. Écrivez-nous vite sur WhatsApp.", ctaType: "whatsapp", duration: "14" },
  },
  {
    label: "Événement",
    patch: { category: "evenement", title: "Événement : [nom]", description: "Rejoignez-nous pour cet événement. Entrée sur inscription.", ctaType: "whatsapp", duration: "14" },
  },
  {
    label: "Information",
    patch: { category: "info", title: "Information importante", description: "Une information à partager avec nos étudiants et nos clients.", ctaType: "detail", duration: "14" },
  },
];

const input = "w-full min-h-[44px] rounded-xl border border-line bg-surface-alt px-3 py-2.5 text-base text-ink placeholder:text-ink-faint focus:border-red-600/60 focus:outline-none";
const label = "mb-1.5 block text-sm font-semibold text-ink";
const btn = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-bold text-ink-soft transition hover:border-red-600/60 hover:text-ink";

const localInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const dateFr = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "");

function statusOf(a: Announcement, now: string): { text: string; tone: string } {
  if (a.active === false) return { text: "Masquée (brouillon)", tone: "bg-slate-600 text-white" };
  if (a.startAt && a.startAt > now) return { text: `Programmée le ${dateFr(a.startAt)}`, tone: "bg-violet-700 text-white" };
  if (a.expiresAt && a.expiresAt <= now) return { text: "Terminée", tone: "bg-slate-600 text-white" };
  return { text: "En ligne", tone: "bg-emerald-700 text-white" };
}

/** The advertising space of the administration: write, preview, schedule, pin, duplicate, follow the results and make the poster. */
export default function AnnouncementsTab({ refreshKey = 0 }: { refreshKey?: number }) {
  const [list, setList] = useState<Announcement[] | null>(null);
  const [stats, setStats] = useState<Record<string, Stat>>({});
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [busy, setBusy] = useState<null | "publish" | "draft">(null);
  const [poster, setPoster] = useState<Announcement | null>(null);
  const [imageNote, setImageNote] = useState<string | null>(null);
  const formTop = useRef<HTMLDivElement>(null);
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const token = async () => auth.currentUser?.getIdToken();

  const load = useCallback(async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const [listRes, statRes] = await Promise.all([
        fetch("/api/admin/announcements", { headers: { Authorization: `Bearer ${idToken}` } }),
        fetch("/api/admin/content-stats?days=90", { headers: { Authorization: `Bearer ${idToken}` } }).catch(() => null),
      ]);
      const result = await listRes.json();
      if (!listRes.ok) throw new Error(result.error || "Erreur serveur");
      setList(result.announcements || []);
      if (statRes && statRes.ok) {
        const data = await statRes.json();
        const map: Record<string, Stat> = {};
        for (const it of data.items || []) {
          if (it.type !== "ann") continue;
          const n = it.n || {};
          const clicks = Object.keys(n).filter((k) => k.startsWith("click_") && k !== "click_apply_page").reduce((sum, k) => sum + (n[k] || 0), 0);
          map[it.key] = { views: n.views || 0, clicks, whatsapp: n.click_whatsapp || 0, calls: n.click_call || 0, plays: n.plays || 0 };
        }
        setStats(map);
      }
      setError(null);
    } catch (e: any) {
      setError(e.message || "Impossible de charger les annonces.");
      setList((prev) => prev ?? []);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  // A picture chosen by the administrator, shown in the preview.
  const imagePreview = useMemo(() => (draft.image ? URL.createObjectURL(draft.image) : ""), [draft.image]);
  useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  const startNew = (patch: Partial<Draft> = {}) => {
    setEditing(null);
    setDraft({ ...EMPTY, ...patch });
    setImageNote(null);
    setOpen(true);
    setNotice(null);
    setTimeout(() => formTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  const startEdit = (a: Announcement) => {
    setEditing(a);
    setDraft({
      ...EMPTY,
      category: a.category ?? (a.type === "job" ? "emploi" : "info"),
      title: a.title || "",
      description: a.description || "",
      details: a.details || "",
      eventDate: a.eventDate || "",
      place: a.place || "",
      price: a.price || "",
      ctaType: a.ctaType ?? (a.type === "job" ? "apply" : "detail"),
      ctaLabel: a.ctaLabel || "",
      ctaUrl: a.ctaUrl || "",
      startAt: localInput(a.startAt),
      duration: "",
      pinned: Boolean(a.pinned),
    });
    setImageNote(null);
    setOpen(true);
    setNotice(null);
    setTimeout(() => formTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  const duplicate = (a: Announcement) => {
    startNew({
      category: a.category ?? (a.type === "job" ? "emploi" : "info"),
      title: `${a.title} (copie)`.slice(0, TITLE_MAX),
      description: a.description || "",
      details: a.details || "",
      eventDate: a.eventDate || "",
      place: a.place || "",
      price: a.price || "",
      ctaType: a.ctaType ?? (a.type === "job" ? "apply" : "detail"),
      ctaLabel: a.ctaLabel || "",
      ctaUrl: a.ctaUrl || "",
      keepImageUrl: a.imageUrl || "",
      keepVideoUrl: a.videoUrl || "",
    });
  };

  const chooseCategory = (c: AnnouncementCategory) => {
    const info = CATEGORIES.find((x) => x.id === c)!;
    setDraft((d) => ({ ...d, category: c, ctaType: c === "emploi" ? "apply" : d.ctaType === "apply" ? info.defaultCta : d.ctaType }));
  };

  const chooseImage = async (file: File | null) => {
    setImageNote(null);
    if (!file) {
      set("image", null);
      return;
    }
    const light = await compressImage(file);
    set("image", light);
    set("removeImage", false);
    setImageNote(light.size < file.size ? `Photo allégée automatiquement : ${formatBytes(file.size)} → ${formatBytes(light.size)}.` : `Photo de ${formatBytes(file.size)} : elle sera encore allégée à l'envoi si nécessaire.`);
  };

  const submit = async (mode: "publish" | "draft") => {
    setError(null);
    setNotice(null);
    if (!draft.title.trim() || !draft.description.trim()) {
      setError("Écrivez au moins le titre et la description courte.");
      return;
    }
    if (draft.ctaType === "link" && !/^https?:\/\//i.test(draft.ctaUrl.trim())) {
      setError("Le lien du bouton doit commencer par http:// ou https://.");
      return;
    }
    setBusy(mode);
    try {
      const form = new FormData();
      const idToken = (await token()) || "";
      form.append("idToken", idToken);
      const text: [string, string][] = [
        ["category", draft.category],
        ["title", draft.title],
        ["description", draft.description],
        ["details", draft.details],
        ["eventDate", draft.eventDate],
        ["place", draft.place],
        ["price", draft.price],
        ["ctaType", draft.ctaType],
        ["ctaLabel", draft.ctaLabel],
        ["ctaUrl", draft.ctaUrl],
        ["pinned", String(draft.pinned)],
      ];
      for (const [k, v] of text) form.append(k, v);
      if (draft.startAt) form.append("startAt", new Date(draft.startAt).toISOString());
      if (draft.duration !== "") form.append("durationDays", draft.duration);
      if (draft.image) form.append("image", draft.image);
      if (draft.video) form.append("video", draft.video);
      if (draft.removeImage) form.append("removeImage", "true");
      if (draft.keepImageUrl && !draft.image) form.append("keepImageUrl", draft.keepImageUrl);
      if (draft.keepVideoUrl && !draft.video) form.append("keepVideoUrl", draft.keepVideoUrl);
      if (mode === "draft") form.append("draft", "true");

      const response = editing
        ? await fetch(`/api/admin/announcements/${editing.id}`, { method: "PUT", headers: { Authorization: `Bearer ${idToken}` }, body: form })
        : await fetch("/api/admin/announcements", { method: "POST", body: form });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      const saved = result.saved ? ` Photo allégée : ${formatBytes(result.saved.before)} → ${formatBytes(result.saved.after)}.` : "";
      setNotice(editing ? `Modifications enregistrées.${saved}` : mode === "draft" ? `Brouillon enregistré : il n'est pas visible sur le site.${saved}` : draft.startAt ? `Annonce programmée.${saved}` : `Annonce publiée sur le site.${saved}`);
      setOpen(false);
      setEditing(null);
      setDraft(EMPTY);
      await load();
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setBusy(null);
    }
  };

  const patch = async (id: string, body: { active?: boolean; pinned?: boolean }) => {
    try {
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Erreur serveur");
      await load();
    } catch (e: any) {
      setError(e.message || "Erreur");
    }
  };

  const remove = async (a: Announcement) => {
    if (!confirm(`Supprimer définitivement l'annonce « ${a.title} » ?`)) return;
    try {
      const response = await fetch(`/api/admin/announcements/${a.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${await token()}` } });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Erreur serveur");
      setNotice("Annonce supprimée.");
      await load();
    } catch (e: any) {
      setError(e.message || "Erreur");
    }
  };

  const now = new Date().toISOString();
  const previewAnn: Announcement = {
    id: "apercu",
    title: draft.title.trim() || "Titre de votre annonce",
    description: draft.description.trim() || "La description courte apparaît ici, sous le titre.",
    category: draft.category,
    eventDate: draft.eventDate,
    place: draft.place,
    price: draft.price,
    ctaType: draft.ctaType,
    ctaLabel: draft.ctaLabel,
    ctaUrl: draft.ctaUrl,
    imageUrl: imagePreview || (!draft.removeImage ? draft.keepImageUrl || editing?.imageUrl || null : null),
    videoUrl: draft.keepVideoUrl || editing?.videoUrl || null,
    createdAt: now,
    expiresAt: draft.duration && Number(draft.duration) > 0 && Number(draft.duration) <= 7 ? new Date(Date.now() + Number(draft.duration) * 86_400_000).toISOString() : null,
  };

  const total = list?.length ?? 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-2xl text-base text-ink-soft">
          Les annonces en ligne s&apos;affichent sous forme de cartes sur la page d&apos;accueil (les 3 premières) et dans la page « Annonces », avec un bouton d&apos;action, un bouton Partager et une page à elles.
        </p>
        <button
          type="button"
          onClick={() => startNew()}
          className="glow-accent inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-5 font-bold text-white"
        >
          <Plus size={18} aria-hidden={true} /> Nouvelle annonce
        </button>
      </div>

      {notice && (
        <p role="status" className="mb-4 rounded-xl border border-emerald-600/40 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="field-error mb-4 rounded-xl border border-red-600/40 bg-red-500/10 p-3">
          {error}
        </p>
      )}

      <div ref={formTop} />
      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit("publish");
          }}
          className="mb-8 rounded-2xl border border-line bg-surface p-4 sm:p-6"
        >
          <div className="mb-5 flex items-start justify-between gap-3">
            <h2 className="text-xl font-black text-ink">{editing ? "Modifier l'annonce" : "Nouvelle annonce"}</h2>
            <button type="button" onClick={() => { setOpen(false); setEditing(null); }} aria-label="Fermer le formulaire" className={btn}>
              <X size={16} aria-hidden={true} /> Fermer
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              {!editing && (
                <div>
                  <p className={label}>Partir d&apos;un modèle (facultatif)</p>
                  <div className="flex flex-wrap gap-2">
                    {TEMPLATES.map((t) => (
                      <button key={t.label} type="button" onClick={() => setDraft((d) => ({ ...d, ...t.patch }))} className={btn}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className={label}>Catégorie</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Catégorie">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={draft.category === c.id}
                      onClick={() => chooseCategory(c.id)}
                      className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-bold transition ${draft.category === c.id ? "border-red-700 bg-red-700 text-white" : "border-line bg-surface text-ink-soft hover:border-red-600/60"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="ann-title" className={label}>
                  Titre <span className="font-normal text-ink-soft">({draft.title.length}/{TITLE_MAX})</span>
                </label>
                <input id="ann-title" value={draft.title} maxLength={TITLE_MAX} onChange={(e) => set("title", e.target.value)} placeholder="Ex : Nouvelle session d'anglais : inscriptions ouvertes" className={input} />
              </div>
              <div>
                <label htmlFor="ann-desc" className={label}>
                  Description courte <span className="font-normal text-ink-soft">({draft.description.length}/{DESC_MAX}) : visible sur la carte</span>
                </label>
                <textarea id="ann-desc" value={draft.description} maxLength={DESC_MAX} rows={2} onChange={(e) => set("description", e.target.value)} placeholder="Une ou deux phrases qui donnent envie." className={input} />
              </div>
              <div>
                <label htmlFor="ann-details" className={label}>Détails complets (facultatif) <span className="font-normal text-ink-soft">: visibles sur la page de l&apos;annonce</span></label>
                <textarea id="ann-details" value={draft.details} rows={5} onChange={(e) => set("details", e.target.value)} placeholder="Programme, conditions, comment s'inscrire…" className={input} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="ann-date" className={label}>Quand</label>
                  <input id="ann-date" type="date" value={/^\d{4}-\d{2}-\d{2}$/.test(draft.eventDate) ? draft.eventDate : ""} onChange={(e) => set("eventDate", e.target.value)} className={input} />
                  <input aria-label="Ou écrivez la date en texte" value={/^\d{4}-\d{2}-\d{2}$/.test(draft.eventDate) ? "" : draft.eventDate} onChange={(e) => set("eventDate", e.target.value)} placeholder="ou : Tous les lundis" className={`${input} mt-2`} />
                </div>
                <div>
                  <label htmlFor="ann-place" className={label}>Où</label>
                  <input id="ann-place" value={draft.place} maxLength={80} onChange={(e) => set("place", e.target.value)} placeholder="Ex : En ligne, Kasumbalesa" className={input} />
                </div>
                <div>
                  <label htmlFor="ann-price" className={label}>Prix</label>
                  <input id="ann-price" value={draft.price} maxLength={60} onChange={(e) => set("price", e.target.value)} placeholder="Ex : 25 USD, Gratuit" className={input} />
                </div>
              </div>

              <fieldset className="rounded-xl border border-line p-4">
                <legend className="px-2 text-sm font-bold text-ink">Bouton d&apos;action</legend>
                {draft.category === "emploi" ? (
                  <p className="text-sm text-ink-soft">Une offre d&apos;emploi mène toujours au formulaire de candidature (bouton « Postuler »).</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ann-cta" className={label}>Que doit faire le visiteur ?</label>
                      <select id="ann-cta" value={draft.ctaType} onChange={(e) => set("ctaType", e.target.value as CtaType)} className={input}>
                        {CTA_OPTIONS.filter((c) => c.id !== "apply").map((c) => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ann-cta-label" className={label}>Texte du bouton (facultatif)</label>
                      <input id="ann-cta-label" value={draft.ctaLabel} maxLength={40} onChange={(e) => set("ctaLabel", e.target.value)} placeholder="Laissez vide pour le texte par défaut" className={input} />
                    </div>
                    {draft.ctaType === "link" && (
                      <div className="sm:col-span-2">
                        <label htmlFor="ann-cta-url" className={label}>Adresse du lien</label>
                        <input id="ann-cta-url" type="url" value={draft.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)} placeholder="https://…" className={input} />
                      </div>
                    )}
                  </div>
                )}
              </fieldset>

              <fieldset className="rounded-xl border border-line p-4">
                <legend className="px-2 text-sm font-bold text-ink">Publication</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ann-start" className={label}>Publier à partir de (facultatif)</label>
                    <input id="ann-start" type="datetime-local" value={draft.startAt} onChange={(e) => set("startAt", e.target.value)} className={input} />
                    <p className="mt-1 text-sm text-ink-soft">Vide = tout de suite. Sinon l&apos;annonce reste cachée jusqu&apos;à ce moment.</p>
                  </div>
                  <div>
                    <label htmlFor="ann-duration" className={label}>Durée en ligne</label>
                    <select id="ann-duration" value={draft.duration} onChange={(e) => set("duration", e.target.value)} className={input}>
                      {editing && <option value="">Ne pas changer{editing.expiresAt ? ` (fin le ${dateFr(editing.expiresAt)})` : " (sans fin)"}</option>}
                      <option value="3">3 jours</option>
                      <option value="7">7 jours</option>
                      <option value="14">14 jours (recommandé)</option>
                      <option value="30">30 jours</option>
                      <option value="60">60 jours</option>
                      <option value="90">90 jours</option>
                      <option value="0">Sans fin (à masquer vous-même)</option>
                    </select>
                  </div>
                </div>
                <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 text-base text-ink">
                  <input type="checkbox" checked={draft.pinned} onChange={(e) => set("pinned", e.target.checked)} className="h-5 w-5 accent-red-600" />
                  Épingler : toujours en premier
                </label>
              </fieldset>

              <fieldset className="rounded-xl border border-line p-4">
                <legend className="px-2 text-sm font-bold text-ink">Photo et vidéo</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ann-image" className={label}>Photo (facultatif)</label>
                    <input id="ann-image" type="file" accept="image/*" onChange={(e) => chooseImage(e.target.files?.[0] ?? null)} className={`${input} text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:font-semibold file:text-white`} />
                    <p className="mt-1 text-sm text-ink-soft">Format paysage conseillé (16/10). <b>Le poids est réduit automatiquement</b> : inutile de la retoucher.</p>
                    {imageNote && <p role="status" className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">{imageNote}</p>}
                    {editing?.imageUrl && !draft.image && (
                      <label className="mt-2 flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-ink">
                        <input type="checkbox" checked={draft.removeImage} onChange={(e) => set("removeImage", e.target.checked)} className="h-5 w-5 accent-red-600" /> Retirer la photo actuelle
                      </label>
                    )}
                  </div>
                  <div>
                    <label htmlFor="ann-video" className={label}>Vidéo (facultatif, 60 Mo maximum)</label>
                    <input id="ann-video" type="file" accept="video/*" onChange={(e) => set("video", e.target.files?.[0] ?? null)} className={`${input} text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-surface file:px-3 file:py-1.5 file:font-semibold file:text-ink`} />
                    <p className="mt-1 text-sm text-ink-soft">Elle ne se lance pas toute seule : le visiteur appuie sur lecture. Elle est diffusée en version allégée.</p>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Live preview */}
            <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Aperçu de l'annonce">
              <p className="mb-2 text-sm font-bold text-ink">Aperçu : comme sur le site</p>
              <div className="pointer-events-none select-none" aria-hidden="true">
                <AnnouncementCard a={previewAnn} />
              </div>
            </aside>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
            <button
              type="submit"
              disabled={busy !== null}
              className="glow-accent inline-flex min-h-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-8 text-base font-bold text-white disabled:opacity-60"
            >
              {busy === "publish" ? "Envoi en cours…" : editing ? "Enregistrer" : draft.startAt ? "Programmer l'annonce" : "Publier maintenant"}
            </button>
            {!editing && (
              <button type="button" disabled={busy !== null} onClick={() => submit("draft")} className={`${btn} min-h-[52px] px-6 text-base`}>
                {busy === "draft" ? "Enregistrement…" : "Enregistrer en brouillon"}
              </button>
            )}
          </div>
        </form>
      )}

      {/* The list */}
      {list === null ? (
        <p role="status" className="rounded-2xl border border-line bg-surface p-4 text-ink-soft">Chargement des annonces…</p>
      ) : total === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <p className="text-lg font-bold text-ink">Aucune annonce pour le moment</p>
          <p className="mt-1 text-ink-soft">Cliquez sur « Nouvelle annonce » : choisissez un modèle, le site fait le reste.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {list.map((a) => {
            const st = statusOf(a, now);
            const s = stats[a.id];
            const cat = categoryInfo(a);
            const rate = s && s.views > 0 ? Math.round((s.clicks / s.views) * 100) : null;
            return (
              <li key={a.id} className={`rounded-2xl border border-line bg-surface p-4 ${a.active === false ? "opacity-80" : ""}`}>
                <div className="flex flex-col gap-4 sm:flex-row">
                  {a.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={optimizedImage(a.imageUrl, 240)} alt="" className="h-24 w-full shrink-0 rounded-xl border border-line object-cover sm:w-36" />
                  ) : (
                    <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-xl border border-line bg-surface-alt text-ink-soft sm:w-36" aria-hidden="true">
                      <ImageIcon size={28} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${cat.badge}`}>{cat.label}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${st.tone}`}>{st.text}</span>
                      {a.pinned && <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-2.5 py-0.5 text-xs font-bold text-white"><Pin size={12} aria-hidden={true} /> Épinglée</span>}
                    </div>
                    <p className="text-lg font-bold text-ink">{a.title}</p>
                    <p className="line-clamp-2 text-sm text-ink-soft">{a.description}</p>
                    <p className="mt-2 text-sm font-semibold text-ink-soft">
                      {s ? (
                        <>
                          {s.views} vues · {s.clicks} clics{rate !== null ? ` (${rate} %)` : ""}
                          {s.whatsapp > 0 && ` · ${s.whatsapp} WhatsApp`}
                          {s.calls > 0 && ` · ${s.calls} appels`}
                          {s.plays > 0 && ` · ${s.plays} lectures vidéo`}
                          <span className="font-normal"> (90 jours)</span>
                        </>
                      ) : (
                        <span className="font-normal">Pas encore de statistiques.</span>
                      )}
                    </p>
                    {a.expiresAt && (
                      <p className="text-sm text-ink-soft">{a.expiresAt > now ? `Se termine le ${dateFr(a.expiresAt)}` : `Terminée le ${dateFr(a.expiresAt)}`}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => startEdit(a)} className={btn}><SquarePen size={16} aria-hidden={true} /> Modifier</button>
                  <button type="button" onClick={() => duplicate(a)} className={btn}><Copy size={16} aria-hidden={true} /> Dupliquer</button>
                  <button type="button" onClick={() => setPoster(a)} className={`${btn} border-red-600/50 text-red-700 dark:text-red-300`}><ImageIcon size={16} aria-hidden={true} /> Créer l&apos;affiche</button>
                  <button type="button" onClick={() => patch(a.id, { pinned: !a.pinned })} className={btn}>
                    {a.pinned ? <><PinOff size={16} aria-hidden={true} /> Désépingler</> : <><Pin size={16} aria-hidden={true} /> Épingler</>}
                  </button>
                  <button type="button" onClick={() => patch(a.id, { active: a.active === false })} className={btn}>
                    {a.active === false ? <><Eye size={16} aria-hidden={true} /> Afficher</> : <><EyeOff size={16} aria-hidden={true} /> Masquer</>}
                  </button>
                  <a href={`/annonces/${a.id}`} target="_blank" rel="noopener noreferrer" className={btn}>Voir la page</a>
                  <button type="button" onClick={() => remove(a)} className={`${btn} border-red-600/40 text-red-700 dark:text-red-300`}><Trash2 size={16} aria-hidden={true} /> Supprimer</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {poster && <PosterMaker announcement={poster} onClose={() => setPoster(null)} />}
    </div>
  );
}
