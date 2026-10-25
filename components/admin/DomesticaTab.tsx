"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";

interface Note {
  at: string;
  by: string;
  text: string;
}
interface Item {
  id: string;
  kind: "employer" | "candidate";
  name: string;
  phone: string;
  email: string;
  city: string;
  job: string;
  message: string;
  schedule?: string;
  startDate?: string;
  budget?: string;
  experience?: string;
  languages?: string;
  availability?: string;
  status: string;
  createdAt: string;
  notes?: Note[];
  documents?: { name: string; url: string; size: number; category?: string }[];
  cv?: Record<string, any>;
  placedWith?: string;
  placedWithName?: string;
  placedAt?: string;
  followUps?: Record<string, { done: boolean; at: string; note?: string }>;
  feedbacks?: Record<string, { at: string; overall: number; punctuality: number; quality: number; behaviour: number; recommend: string; needsReplacement: boolean; comment: string }>;
}

const CANDIDATE_STATUS: Record<string, string> = {
  new: "Nouvelle",
  contacted: "Contactée",
  verified: "Vérifiée",
  training: "En formation",
  available: "Disponible",
  placed: "Placée",
  closed: "Clôturée",
};
const EMPLOYER_STATUS: Record<string, string> = {
  new: "Nouvelle",
  contacted: "Contactée",
  proposing: "Profils proposés",
  placed: "Placée",
  closed: "Clôturée",
};
const READY_ORDER = ["available", "training", "verified", "contacted", "new"];

const date = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { dateStyle: "medium" });
const addDays = (iso: string, days: number) => new Date(new Date(iso).getTime() + days * 86400000);
const whatsapp = (phone: string, text?: string) => `https://wa.me/${phone.replace(/[^\d]/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
/** Public satisfaction questionnaire for a placement ("1" = 1 month, "3" = 3 months). */
const surveyLink = (id: string, key: "d30" | "d90") => `${window.location.origin}/domestica/avis?id=${id}&m=${key === "d30" ? 1 : 3}`;
const surveyText = (item: { id: string; name: string }, key: "d30" | "d90") =>
  `Bonjour ${item.name.split(/\s+/)[0]}, BM Domestica prend de vos nouvelles : comment se passe la collaboration depuis ${key === "d30" ? "1 mois" : "3 mois"} ? Votre avis (2 minutes) : ${surveyLink(item.id, key)}`;

type View = "employer" | "candidate" | "placed" | "followups";

/** BM Domestica: household requests and job applications, their progress, matching and follow-up after placement. */
export default function DomesticaTab() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("employer");
  const [open, setOpen] = useState<string | null>(null);
  const [note, setNote] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const call = async (method: "GET" | "PATCH", body?: object) => {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch("/api/admin/domestica", {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur serveur");
    return result;
  };

  const load = async () => {
    try {
      setItems((await call("GET")).items);
    } catch (e: any) {
      setError(e.message);
    }
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const act = async (id: string, body: object) => {
    setBusy(id);
    setError(null);
    try {
      await call("PATCH", { id, ...body });
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  const byId = useMemo(() => new Map((items ?? []).map((i) => [i.id, i])), [items]);

  const due = useMemo(() => {
    const out: { item: Item; key: "d30" | "d90"; label: string; at: Date; late: boolean }[] = [];
    const now = Date.now();
    for (const i of items ?? []) {
      if (i.kind !== "employer" || !i.placedAt || i.status !== "placed") continue;
      for (const [key, days, label] of [["d30", 30, "Suivi à 1 mois"], ["d90", 90, "Suivi à 3 mois"]] as const) {
        if (i.followUps?.[key]?.done) continue;
        const at = addDays(i.startDate || i.placedAt, days);
        if (at.getTime() - now < 7 * 86400000) out.push({ item: i, key, label, at, late: at.getTime() < now });
      }
    }
    return out.sort((a, b) => a.at.getTime() - b.at.getTime());
  }, [items]);

  if (!items) return <p className="text-ink-soft">{error ? <span className="text-red-500">{error}</span> : "Chargement…"}</p>;

  const q = search.trim().toLowerCase();
  const matches = (i: Item) => !q || [i.name, i.phone, i.city, i.job, i.email].some((v) => (v || "").toLowerCase().includes(q));
  const list = items.filter((i) => (view === "placed" ? i.status === "placed" && i.kind === "employer" : i.kind === view) && matches(i));
  const count = (k: "employer" | "candidate") => items.filter((i) => i.kind === k && i.status === "new").length;

  const suggestions = (employer: Item) =>
    items
      .filter((c) => c.kind === "candidate" && !c.placedWith && c.status !== "closed" && c.job === employer.job)
      .sort((a, b) => READY_ORDER.indexOf(a.status) - READY_ORDER.indexOf(b.status));

  const tabButton = (v: View, label: string, badge = 0) => (
    <button
      key={v}
      onClick={() => setView(v)}
      className={`rounded-xl px-4 py-2 text-sm font-bold transition ${view === v ? "bg-red-600 text-white" : "border border-line bg-surface text-ink-soft hover:text-ink"}`}
    >
      {label}
      {badge > 0 && <span className="ml-1.5 rounded-full bg-white/90 px-1.5 text-[10px] font-black text-red-600">{badge}</span>}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {tabButton("employer", "Demandes de personnel", count("employer"))}
        {tabButton("candidate", "Candidats", count("candidate"))}
        {tabButton("placed", "Placements")}
        {tabButton("followups", "Suivis à faire", due.length)}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher (nom, métier, ville)…"
          className="ml-auto w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm sm:w-64"
        />
      </div>
      {error && <p className="rounded-xl border border-red-600/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}

      {view === "followups" ? (
        due.length === 0 ? (
          <p className="text-sm text-ink-soft">Aucun suivi à faire pour le moment. Les suivis à 1 et 3 mois apparaissent ici après un placement.</p>
        ) : (
          due.map(({ item, key, label, at, late }) => (
            <div key={item.id + key} className={`rounded-2xl border p-4 ${late ? "border-red-600/50 bg-red-500/5" : "border-line bg-surface"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">
                    {label} — {item.name} <span className="font-normal text-ink-soft">({item.job})</span>
                  </p>
                  <p className="text-xs text-ink-soft">
                    Prévu le {date(at.toISOString())}
                    {late && <b className="ml-2 text-red-500">en retard</b>} · avec {item.placedWithName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={whatsapp(item.phone, surveyText(item, key))} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white">
                    Envoyer le questionnaire (WhatsApp)
                  </a>
                  <button
                    onClick={() => navigator.clipboard?.writeText(surveyLink(item.id, key)).then(() => window.alert("Lien copié."))}
                    className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-bold text-ink"
                  >
                    Copier le lien
                  </button>
                  <button
                    disabled={busy === item.id}
                    onClick={() => {
                      const n = window.prompt("Résultat du suivi (satisfaction, difficultés) :") ?? "";
                      act(item.id, { followUp: { key, done: true, note: n }, ...(n ? { note: `${label} : ${n}` } : {}) });
                    }}
                    className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                  >
                    Marquer comme fait
                  </button>
                </div>
              </div>
            </div>
          ))
        )
      ) : list.length === 0 ? (
        <p className="text-sm text-ink-soft">Rien à afficher ici pour le moment.</p>
      ) : (
        list.map((i) => {
          const isOpen = open === i.id;
          const statuses = i.kind === "candidate" ? CANDIDATE_STATUS : EMPLOYER_STATUS;
          return (
            <div key={i.id} className="rounded-2xl border border-line bg-surface">
              <button onClick={() => setOpen(isOpen ? null : i.id)} className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left">
                <div>
                  <p className="font-bold text-ink">
                    {i.name} <span className="font-normal text-ink-soft">· {i.job}</span>
                  </p>
                  <p className="text-xs text-ink-soft">
                    {i.city || "ville non précisée"} · {date(i.createdAt)}
                    {i.placedWithName && <> · placé avec {i.placedWithName}</>}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${i.status === "new" ? "bg-red-600 text-white" : i.status === "placed" ? "bg-emerald-600 text-white" : "border border-line bg-surface-alt text-ink-soft"}`}>
                  {statuses[i.status] ?? i.status}
                </span>
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-line p-4 text-sm">
                  <div className="grid gap-x-6 gap-y-1 text-ink-soft sm:grid-cols-2">
                    <p>
                      <b className="text-ink">Téléphone :</b> {i.phone}{" "}
                      <a href={whatsapp(i.phone)} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-500">
                        WhatsApp
                      </a>
                    </p>
                    <p>
                      <b className="text-ink">E-mail :</b> {i.email || "—"}
                    </p>
                    {i.kind === "employer" ? (
                      <>
                        <p>
                          <b className="text-ink">Horaires :</b> {i.schedule || "—"}
                        </p>
                        <p>
                          <b className="text-ink">Début :</b> {i.startDate || "—"}
                        </p>
                        <p>
                          <b className="text-ink">Budget :</b> {i.budget || "—"}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <b className="text-ink">Expérience :</b> {i.experience || "—"}
                        </p>
                        <p>
                          <b className="text-ink">Langues :</b> {i.languages || "—"}
                        </p>
                        <p>
                          <b className="text-ink">Disponibilité :</b> {i.availability || "—"}
                        </p>
                      </>
                    )}
                  </div>
                  {i.cv && (
                    <div className="rounded-xl border border-line bg-surface-alt p-3 text-ink-soft">
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">Identité complète (CV)</p>
                      <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                        <p><b className="text-ink">Nom :</b> {[i.cv.lastName, i.cv.middleName, i.cv.firstName].filter(Boolean).join(" ")}</p>
                        <p><b className="text-ink">Sexe :</b> {i.cv.gender || "—"}</p>
                        <p><b className="text-ink">Né(e) :</b> {[i.cv.birthDate, i.cv.birthPlace].filter(Boolean).join(" à ") || "—"}</p>
                        <p><b className="text-ink">Nationalité :</b> {i.cv.nationality || "—"} {i.cv.origin ? `(${i.cv.origin})` : ""}</p>
                        <p><b className="text-ink">État civil :</b> {[i.cv.civilStatus, i.cv.children && `${i.cv.children} enfant(s)`].filter(Boolean).join(", ") || "—"}</p>
                        <p><b className="text-ink">Parents :</b> {[i.cv.father, i.cv.mother].filter(Boolean).join(" et ") || "—"}</p>
                        <p className="sm:col-span-2"><b className="text-ink">Adresse :</b> {[i.cv.street, i.cv.quarter, i.cv.commune, i.cv.city, i.cv.country].filter(Boolean).join(", ") || "—"}</p>
                      </div>
                      {Array.isArray(i.cv.studies) && i.cv.studies.length > 0 && (
                        <div className="mt-2">
                          <b className="text-ink">Études :</b>
                          <ul className="ml-4 list-disc">
                            {i.cv.studies.map((s: any, k: number) => (
                              <li key={k}>{[s.level, s.school, s.option && `option ${s.option}`, s.year, s.diploma && `→ ${s.diploma}`].filter(Boolean).join(" · ")}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(i.cv.experiences) && i.cv.experiences.length > 0 && (
                        <div className="mt-2">
                          <b className="text-ink">Expérience :</b>
                          <ul className="ml-4 list-disc">
                            {i.cv.experiences.map((x: any, k: number) => (
                              <li key={k}>{[x.job, x.employer, x.period].filter(Boolean).join(" · ")}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(i.cv.references) && i.cv.references.length > 0 && (
                        <p className="mt-2"><b className="text-ink">Références :</b> {i.cv.references.map((r: any) => [r.name, r.relation, r.phone].filter(Boolean).join(" — ")).join(" | ")}</p>
                      )}
                    </div>
                  )}
                  {i.message && <p className="whitespace-pre-wrap rounded-xl border border-line bg-surface-alt p-3 text-ink-soft">{i.message}</p>}
                  {(i.documents ?? []).length > 0 && (
                    <div>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">Documents joints</p>
                      <div className="flex flex-wrap gap-2">
                        {(i.documents ?? []).map((d) => (
                          <a key={d.url} href={d.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-line bg-surface-alt px-3 py-2 text-xs font-bold text-ink hover:border-red-600/60">
                            📎 {d.category ? `${d.category} : ` : ""}{d.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wide text-ink-soft">Statut</label>
                    <select
                      value={i.status}
                      disabled={busy === i.id || i.status === "placed"}
                      onChange={(e) => act(i.id, { status: e.target.value })}
                      className="rounded-xl border border-line bg-surface-sunken px-3 py-2 font-bold"
                    >
                      {Object.entries(statuses)
                        .filter(([k]) => k !== "placed" || i.status === "placed")
                        .map(([k, v]) => (
                          <option key={k} value={k}>
                            {v}
                          </option>
                        ))}
                    </select>
                    {i.status === "placed" && (
                      <button
                        disabled={busy === i.id}
                        onClick={() => window.confirm("Annuler ce placement ? Les deux dossiers reviennent à l'état précédent.") && act(i.id, { unplace: true })}
                        className="rounded-xl border border-line px-3 py-2 text-xs font-bold text-ink-soft hover:text-red-500"
                      >
                        Annuler le placement
                      </button>
                    )}
                  </div>

                  {i.kind === "employer" && i.status !== "placed" && (
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft">Candidats correspondants ({i.job})</p>
                      {suggestions(i).length === 0 ? (
                        <p className="text-ink-faint">Aucun candidat disponible pour ce métier pour l'instant.</p>
                      ) : (
                        <div className="divide-y divide-line rounded-xl border border-line">
                          {suggestions(i).map((c) => (
                            <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
                              <div>
                                <p className="font-bold text-ink">
                                  {c.name} <span className="font-normal text-ink-soft">· {CANDIDATE_STATUS[c.status] ?? c.status}</span>
                                </p>
                                <p className="text-xs text-ink-soft">
                                  {c.city || "—"} · {c.experience || "expérience non précisée"} · {c.availability || "disponibilité non précisée"}
                                </p>
                              </div>
                              <button
                                disabled={busy === i.id}
                                onClick={() => {
                                  if (c.status !== "available" && !window.confirm(`${c.name} n'est pas encore « Disponible » (${CANDIDATE_STATUS[c.status]}). Placer quand même ?`)) return;
                                  const start = window.prompt("Date de début (AAAA-MM-JJ) :", new Date().toISOString().slice(0, 10)) ?? "";
                                  act(i.id, { placeWith: c.id, startDate: start });
                                }}
                                className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                              >
                                Placer chez ce client
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {i.kind === "employer" && i.status === "placed" && i.placedWith && (
                    <div className="rounded-xl border border-line bg-surface-alt p-3 text-ink-soft">
                      Placement avec <b className="text-ink">{byId.get(i.placedWith)?.name ?? i.placedWithName}</b>, début {i.startDate ? date(i.startDate) : "—"}.
                      <ul className="mt-2 space-y-1">
                        {([["d30", 30, "1 mois"], ["d90", 90, "3 mois"]] as const).map(([k, d, l]) => (
                          <li key={k}>
                            Suivi à {l} ({date(addDays(i.startDate || i.placedAt || i.createdAt, d).toISOString())}) :{" "}
                            {i.followUps?.[k]?.done ? <b className="text-emerald-500">fait{i.followUps[k].note ? ` — ${i.followUps[k].note}` : ""}</b> : <span className="text-ink-faint">à faire</span>}
                            {i.feedbacks?.[k]?.needsReplacement && <b className="ml-2 text-red-500">remplacement demandé</b>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft">Notes internes</p>
                    <div className="space-y-1.5">
                      {(i.notes ?? []).map((n, idx) => (
                        <p key={idx} className="rounded-lg bg-surface-alt px-3 py-2 text-ink-soft">
                          <span className="text-xs text-ink-faint">
                            {date(n.at)} · {n.by} —{" "}
                          </span>
                          {n.text}
                        </p>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={note[i.id] ?? ""}
                        onChange={(e) => setNote((v) => ({ ...v, [i.id]: e.target.value }))}
                        placeholder="Ajouter une note (appel passé, vérification faite…)"
                        className="flex-1 rounded-xl border border-line bg-surface-sunken px-3 py-2"
                      />
                      <button
                        disabled={busy === i.id || !(note[i.id] ?? "").trim()}
                        onClick={async () => {
                          await act(i.id, { note: note[i.id] });
                          setNote((v) => ({ ...v, [i.id]: "" }));
                        }}
                        className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
