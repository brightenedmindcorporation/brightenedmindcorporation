"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { CheckCircle2, Circle, Package, Search, AlertTriangle } from "lucide-react";
import { agoLabel } from "@/lib/trucks";
import { SHIPMENT_STATUSES, statusLabel, type PublicShipment } from "@/lib/tracking";

const date = (iso: string) => new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

const TruckMap = dynamic(() => import("@/components/TruckMap"), { ssr: false });

export default function SuiviClient() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}

function Tracker() {
  const params = useSearchParams();
  const [code, setCode] = useState(params.get("code") || "");
  const [shipment, setShipment] = useState<PublicShipment | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (value: string) => {
    if (!value.trim()) return;
    setLoading(true);
    setError("");
    setShipment(null);
    try {
      const response = await fetch(`/api/tracking?code=${encodeURIComponent(value.trim())}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Recherche impossible.");
      setShipment(data.shipment);
    } catch (e: any) {
      setError(e.message || "Recherche impossible.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initial = params.get("code");
    if (initial) search(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While the parcel is in a truck, the map follows it: the page quietly asks again every 10 seconds.
  const code2 = shipment?.code;
  const onRoad = !!shipment?.truck;
  useEffect(() => {
    if (!code2 || !onRoad) return;
    const id = setInterval(async () => {
      try {
        const r = await fetch(`/api/tracking?code=${encodeURIComponent(code2)}`, { cache: "no-store" });
        if (r.ok) setShipment((await r.json()).shipment);
      } catch {
        // keep the last known position
      }
    }, 10_000);
    return () => clearInterval(id);
  }, [code2, onRoad]);

  // The steps still to come, shown greyed after the ones done (the problem step only when it happened).
  const happened = new Set((shipment?.history ?? []).map((h) => h.status));
  const flow = SHIPMENT_STATUSES.filter((s) => s.id !== "problem");
  const current = shipment ? flow.findIndex((s) => s.id === shipment.status) : -1;

  return (
    <main className="min-h-screen bg-page pt-32 pb-20 px-6">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
            <Package size={28} />
          </div>
          <h1 className="font-serif text-3xl font-black text-ink md:text-4xl">Suivre mon colis</h1>
          <p className="mt-2 text-ink-soft">Entrez le code reçu de Brightened Mind, par exemple BMT-7K4Q2X.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(code);
          }}
          className="mt-8 flex gap-2"
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="BMT-XXXXXX"
            autoCapitalize="characters"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-xl border border-line bg-surface p-3.5 font-mono text-lg tracking-wider text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button type="submit" disabled={loading} className="glow-accent inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-900 px-5 font-bold text-white disabled:opacity-50">
            <Search size={18} />
            {loading ? "…" : "Suivre"}
          </button>
        </form>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-600/40 bg-red-500/10 p-4 text-sm text-ink">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            {error}
          </div>
        )}

        {shipment && (
          <section className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-xl md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-faint">{shipment.category}</p>
                <h2 className="mt-1 text-xl font-black text-ink">{shipment.description}</h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {shipment.origin || "—"} → {shipment.destination || "—"}
                </p>
              </div>
              <span className="rounded-full bg-red-600/10 px-3 py-1 font-mono text-sm font-bold text-red-600">{shipment.code}</span>
            </div>

            <div className={`mt-5 rounded-2xl p-4 ${shipment.status === "problem" ? "bg-amber-500/10 text-amber-600" : shipment.status === "delivered" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-600/10 text-red-600"}`}>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">État actuel</p>
              <p className="text-lg font-black">{statusLabel(shipment.status)}</p>
              {shipment.eta && <p className="mt-1 text-sm opacity-90">Arrivée prévue : {new Date(shipment.eta).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>}
            </div>

            {shipment.truck && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-bold text-ink">
                  Votre colis est dans {shipment.truck.name} ·{" "}
                  <span className={shipment.truck.sharing ? "text-emerald-500" : "text-ink-soft"}>
                    {shipment.truck.sharing ? "position en direct" : `dernière position ${agoLabel(shipment.truck.updatedAt)}`}
                  </span>
                </p>
                <TruckMap height={300} follow points={[{ id: "t", lat: shipment.truck.lat, lng: shipment.truck.lng, label: shipment.truck.name, detail: agoLabel(shipment.truck.updatedAt), live: shipment.truck.sharing }]} />
              </div>
            )}

            <ol className="mt-6 space-y-0">
              {flow.map((step, i) => {
                const done = i <= current || happened.has(step.id);
                const events = (shipment.history ?? []).filter((h) => h.status === step.id);
                return (
                  <li key={step.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {done ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Circle size={20} className="text-ink-faint" />}
                      {i < flow.length - 1 && <span className={`my-1 w-px flex-1 ${done ? "bg-emerald-500/50" : "bg-line"}`} />}
                    </div>
                    <div className="pb-5">
                      <p className={`font-bold ${done ? "text-ink" : "text-ink-faint"}`}>{step.label}</p>
                      {events.map((ev) => (
                        <p key={ev.at} className="text-sm text-ink-soft">
                          {date(ev.at)}
                          {ev.location ? ` · ${ev.location}` : ""}
                          {ev.note ? ` — ${ev.note}` : ""}
                        </p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ol>

            {(shipment.history ?? []).some((h) => h.status === "problem") && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-ink">
                <p className="font-bold">Un problème a été signalé</p>
                {(shipment.history ?? [])
                  .filter((h) => h.status === "problem")
                  .map((h) => (
                    <p key={h.at} className="text-ink-soft">
                      {date(h.at)}
                      {h.note ? ` — ${h.note}` : ""}
                    </p>
                  ))}
              </div>
            )}

            <p className="mt-4 text-xs text-ink-faint">Dernière mise à jour : {date(shipment.updatedAt)}. Une question ? Écrivez-nous sur WhatsApp au +243 988 830 799.</p>
          </section>
        )}
      </div>
    </main>
  );
}
