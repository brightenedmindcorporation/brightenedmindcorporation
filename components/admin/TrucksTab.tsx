"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { auth } from "@/lib/firebase";
import { agoLabel, isLive, type Truck } from "@/lib/trucks";
import type { MapPoint } from "@/components/TruckMap";

const TruckMap = dynamic(() => import("@/components/TruckMap"), { ssr: false, loading: () => <div className="h-[420px] animate-pulse rounded-2xl bg-surface-alt" /> });

const EMPTY = { name: "", plate: "", driver: "", driverPhone: "" };
const waNumber = (phone: string) => phone.replace(/[^\d]/g, "");

/** The trucks on a live map; each driver shares the phone's position from a personal link. */
export default function TrucksTab() {
  const [items, setItems] = useState<Truck[]>([]);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [, tick] = useState(0);

  const call = useCallback(async (method: "GET" | "POST" | "PATCH" | "DELETE", body?: object) => {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch("/api/admin/trucks", {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur serveur");
    return result;
  }, []);

  const load = useCallback(async () => {
    try {
      setItems((await call("GET")).items);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  }, [call]);

  // The map follows the trucks: positions are fetched every 8 seconds, the "il y a …" labels every second.
  useEffect(() => {
    load();
    const a = setInterval(load, 8000);
    const b = setInterval(() => tick((n) => n + 1), 1000);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [load]);

  const points: MapPoint[] = useMemo(
    () =>
      items
        .filter((t) => typeof t.lat === "number" && typeof t.lng === "number")
        .map((t) => ({
          id: t.id,
          lat: t.lat!,
          lng: t.lng!,
          label: `${t.name}${t.plate ? ` · ${t.plate}` : ""}`,
          detail: `${isLive(t) ? "En direct" : "Dernière position"} · ${agoLabel(t.updatedAt)}${t.speedKmh ? ` · ${t.speedKmh} km/h` : ""}`,
          live: isLive(t),
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, Math.floor(Date.now() / 5000)]
  );

  const link = (t: Truck) => `${window.location.origin}/chauffeur?t=${t.token}`;
  const message = (t: Truck) =>
    `Bonjour ${t.driver.split(/\s+/)[0] || ""}, voici votre lien Brightened Mind pour partager la position du camion ${t.name}. Ouvrez-le sur votre téléphone, touchez « Démarrer le partage » et laissez l'écran allumé : ${link(t)}`;

  const run = async (id: string, fn: () => Promise<unknown>) => {
    setBusy(id);
    try {
      await fn();
      await load();
    } catch (e: any) {
      alert(`Erreur : ${e.message}`);
    } finally {
      setBusy(null);
    }
  };

  const create = () =>
    run("new", async () => {
      await call("POST", form);
      setForm({ ...EMPTY });
      setCreating(false);
    });

  const field = "w-full rounded-lg border border-line bg-surface-alt px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600";
  const liveCount = items.filter((t) => isLive(t)).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        Chaque chauffeur ouvre son lien personnel sur son téléphone et touche « Démarrer le partage » : le camion apparaît ici en temps réel. Les clients dont le colis est dans un camion le voient sur leur page de suivi.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setCreating((v) => !v)} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white">
          {creating ? "Fermer" : "+ Ajouter un camion"}
        </button>
        <span className="text-xs text-ink-faint">
          {items.length} camion{items.length > 1 ? "s" : ""} · {liveCount} en direct
        </span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {creating && (
        <div className="grid gap-3 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-2">
          <input className={field} placeholder="Nom du camion * (ex. Camion 1)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={field} placeholder="Plaque (ex. 1234AB/05)" value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} />
          <input className={field} placeholder="Chauffeur" value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })} />
          <input className={field} placeholder="Téléphone / WhatsApp du chauffeur (+243…)" value={form.driverPhone} onChange={(e) => setForm({ ...form, driverPhone: e.target.value })} />
          <button onClick={create} disabled={busy === "new"} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50 sm:col-span-2">
            {busy === "new" ? "Enregistrement…" : "Enregistrer et créer le lien du chauffeur"}
          </button>
        </div>
      )}

      <TruckMap points={points} onSelect={setSelected} />
      {points.length === 0 && items.length > 0 && <p className="text-xs text-ink-faint">Aucun camion n'a encore envoyé sa position.</p>}

      {items.length === 0 && !error && <p className="text-sm text-ink-soft">Aucun camion pour le moment.</p>}
      {items.map((t) => {
        const live = isLive(t);
        return (
          <div key={t.id} className={`rounded-2xl border bg-surface p-4 ${selected === t.id ? "border-red-600" : "border-line"} ${t.active ? "" : "opacity-60"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">
                  🚚 {t.name}
                  {t.plate && <span className="ml-2 rounded-full bg-surface-alt px-2.5 py-0.5 font-mono text-xs text-ink-soft">{t.plate}</span>}
                </p>
                <p className="text-sm text-ink-soft">
                  {t.driver || "Chauffeur non renseigné"}
                  {t.driverPhone ? ` · ${t.driverPhone}` : ""}
                </p>
                <p className="mt-1 text-xs text-ink-faint">
                  {t.updatedAt ? `Dernière position ${agoLabel(t.updatedAt)}${t.speedKmh ? ` · ${t.speedKmh} km/h` : ""}` : "Aucune position reçue"}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${!t.active ? "bg-zinc-500/15 text-zinc-500" : live ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"}`}>
                {!t.active ? "Désactivé" : live ? "En direct" : t.sharing ? "Signal perdu" : "Hors ligne"}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
              {t.driverPhone && (
                <a href={`https://wa.me/${waNumber(t.driverPhone)}?text=${encodeURIComponent(message(t))}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white">
                  Envoyer le lien (WhatsApp)
                </a>
              )}
              <button onClick={() => navigator.clipboard?.writeText(link(t)).then(() => alert("Lien du chauffeur copié."))} className="rounded-lg border border-line px-3 py-1.5 text-ink">
                Copier le lien du chauffeur
              </button>
              <button
                onClick={() => confirm("Le lien actuel ne marchera plus. Continuer ?") && run(t.id, () => call("PATCH", { id: t.id, renewToken: true }))}
                disabled={busy === t.id}
                className="rounded-lg border border-line px-3 py-1.5 text-ink-soft"
              >
                Nouveau lien
              </button>
              <button onClick={() => run(t.id, () => call("PATCH", { id: t.id, active: !t.active }))} disabled={busy === t.id} className="rounded-lg border border-line px-3 py-1.5 text-ink-soft">
                {t.active ? "Désactiver" : "Réactiver"}
              </button>
              <button
                onClick={() => confirm(`Supprimer le camion ${t.name} ? Ses colis seront détachés.`) && run(t.id, () => call("DELETE", { id: t.id }))}
                disabled={busy === t.id}
                className="rounded-lg border border-line px-3 py-1.5 text-ink-soft hover:text-red-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
