"use client";

import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { SHIPMENT_CATEGORIES, SHIPMENT_STATUSES, statusLabel, type Shipment } from "@/lib/tracking";

const date = (iso: string) => new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const waNumber = (phone: string) => phone.replace(/[^\d]/g, "");

const EMPTY = { clientName: "", clientPhone: "", clientEmail: "", category: SHIPMENT_CATEGORIES[0] as string, description: "", origin: "", destination: "", weightKg: "", eta: "" };

/** Registers parcels / equipment shipments and moves them through their steps; clients follow them at /suivi with the code. */
export default function ShipmentsTab() {
  const [items, setItems] = useState<Shipment[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState<string | null>(null);
  const [step, setStep] = useState<Record<string, { status: string; note: string; location: string }>>({});

  const call = async (method: "GET" | "POST" | "PATCH" | "DELETE", body?: object) => {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch("/api/admin/shipments", {
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

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? items.filter((s) => [s.code, s.clientName, s.clientPhone, s.description, s.destination].join(" ").toLowerCase().includes(q)) : items;
  }, [items, search]);

  const link = (s: Shipment) => `${window.location.origin}/suivi?code=${s.code}`;
  const message = (s: Shipment) =>
    `Bonjour ${s.clientName.split(/\s+/)[0]}, votre colis (${s.description}) est enregistré chez Brightened Mind. Code de suivi : ${s.code}. Suivez-le ici : ${link(s)}`;

  const create = async () => {
    setBusy("new");
    try {
      await call("POST", { ...form, weightKg: form.weightKg ? Number(form.weightKg) : undefined });
      setForm({ ...EMPTY });
      setCreating(false);
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  const update = async (s: Shipment) => {
    const v = step[s.id];
    if (!v?.status) return alert("Choisissez le nouvel état.");
    setBusy(s.id);
    try {
      await call("PATCH", { id: s.id, status: v.status, note: v.note, location: v.location });
      setStep((m) => ({ ...m, [s.id]: { status: "", note: "", location: "" } }));
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (s: Shipment) => {
    if (!confirm(`Supprimer le colis ${s.code} de ${s.clientName} ? Cette action est définitive.`)) return;
    setBusy(s.id);
    try {
      await call("DELETE", { id: s.id });
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  const field = "w-full rounded-lg border border-line bg-surface-alt px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600";

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        Enregistrez un colis ou des équipements automobiles, puis faites-le avancer étape par étape. Le client suit son colis avec son code sur <b>/suivi</b>, sans connexion.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setCreating((v) => !v)} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white">
          {creating ? "Fermer" : "+ Enregistrer un colis"}
        </button>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Chercher (code, client, description…)" className={`${field} max-w-xs`} />
        <span className="text-xs text-ink-faint">{items.length} colis</span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {creating && (
        <div className="grid gap-3 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-2">
          <input className={field} placeholder="Nom du client *" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
          <input className={field} placeholder="Téléphone / WhatsApp (+243…)" value={form.clientPhone} onChange={(e) => setForm({ ...form, clientPhone: e.target.value })} />
          <input className={field} placeholder="E-mail (facultatif)" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} />
          <select className={field} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {SHIPMENT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input className={`${field} sm:col-span-2`} placeholder="Description * (ex. 4 pneus, batterie, kit freins)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className={field} placeholder="Origine (ex. Dubaï)" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
          <input className={field} placeholder="Destination (ex. Lubumbashi)" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
          <input className={field} type="number" min="0" step="0.1" placeholder="Poids (kg)" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} />
          <label className="flex items-center gap-2 text-xs text-ink-soft">
            Arrivée prévue
            <input className={field} type="date" value={form.eta} onChange={(e) => setForm({ ...form, eta: e.target.value })} />
          </label>
          <button onClick={create} disabled={busy === "new"} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50 sm:col-span-2">
            {busy === "new" ? "Enregistrement…" : "Enregistrer et générer le code"}
          </button>
        </div>
      )}

      {shown.length === 0 && !error && <p className="text-sm text-ink-soft">Aucun colis pour le moment.</p>}
      {shown.map((s) => {
        const v = step[s.id] ?? { status: "", note: "", location: "" };
        return (
          <div key={s.id} className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">
                  <span className="mr-2 rounded-full bg-red-600/10 px-2.5 py-0.5 font-mono text-sm text-red-600">{s.code}</span>
                  {s.clientName}
                  <span className="ml-2 text-xs font-normal text-ink-soft">{s.clientPhone}</span>
                </p>
                <p className="text-sm text-ink-soft">
                  {s.category} · {s.description} · {s.origin || "—"} → {s.destination || "—"}
                  {s.weightKg ? ` · ${s.weightKg} kg` : ""}
                  {s.eta ? ` · prévu le ${new Date(s.eta).toLocaleDateString("fr-FR")}` : ""}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${s.status === "delivered" ? "bg-emerald-500/15 text-emerald-600" : s.status === "problem" ? "bg-amber-500/15 text-amber-600" : "bg-red-600/10 text-red-600"}`}>{statusLabel(s.status)}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <select className={`${field} max-w-[16rem]`} value={v.status} onChange={(e) => setStep((m) => ({ ...m, [s.id]: { ...v, status: e.target.value } }))}>
                <option value="">Nouvel état…</option>
                {SHIPMENT_STATUSES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.label}
                  </option>
                ))}
              </select>
              <input className={`${field} max-w-[11rem]`} placeholder="Lieu (facultatif)" value={v.location} onChange={(e) => setStep((m) => ({ ...m, [s.id]: { ...v, location: e.target.value } }))} />
              <input className={`${field} max-w-xs flex-1`} placeholder="Note pour le client (facultatif)" value={v.note} onChange={(e) => setStep((m) => ({ ...m, [s.id]: { ...v, note: e.target.value } }))} />
              <button onClick={() => update(s)} disabled={busy === s.id} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
                Mettre à jour
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
              {s.clientPhone && (
                <a href={`https://wa.me/${waNumber(s.clientPhone)}?text=${encodeURIComponent(message(s))}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white">
                  Envoyer le code (WhatsApp)
                </a>
              )}
              <button onClick={() => navigator.clipboard?.writeText(link(s)).then(() => alert("Lien copié."))} className="rounded-lg border border-line px-3 py-1.5 text-ink">
                Copier le lien de suivi
              </button>
              <button onClick={() => remove(s)} disabled={busy === s.id} className="rounded-lg border border-line px-3 py-1.5 text-ink-soft hover:text-red-500">
                Supprimer
              </button>
            </div>

            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-ink-soft">Historique ({s.history?.length ?? 0})</summary>
              <ul className="mt-2 space-y-1 text-ink-soft">
                {[...(s.history ?? [])].reverse().map((h) => (
                  <li key={h.at}>
                    {date(h.at)} — <b className="text-ink">{statusLabel(h.status)}</b>
                    {h.location ? ` · ${h.location}` : ""}
                    {h.note ? ` — ${h.note}` : ""}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        );
      })}
    </div>
  );
}
