"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Navigation, Square, AlertTriangle } from "lucide-react";

export default function ChauffeurClient() {
  return (
    <Suspense fallback={null}>
      <Driver />
    </Suspense>
  );
}

/** The driver's page: opened from the personal link, it sends the phone's position while the screen stays on. */
function Driver() {
  const token = useSearchParams().get("t") || "";
  const [on, setOn] = useState(false);
  const [error, setError] = useState("");
  const [last, setLast] = useState<{ at: Date; lat: number; lng: number; speed: number | null } | null>(null);
  const [sent, setSent] = useState(0);
  const watch = useRef<number | null>(null);
  const wake = useRef<{ release: () => Promise<void> } | null>(null);

  const send = useCallback(
    async (body: object) => {
      const response = await fetch("/api/truck-ping", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, ...body }) });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Envoi impossible.");
    },
    [token]
  );

  const stop = useCallback(async () => {
    if (watch.current !== null) navigator.geolocation.clearWatch(watch.current);
    watch.current = null;
    wake.current?.release().catch(() => {});
    wake.current = null;
    setOn(false);
    await send({ stop: true }).catch(() => {});
  }, [send]);

  const start = async () => {
    setError("");
    if (!navigator.geolocation) return setError("Ce téléphone ne permet pas de partager la position.");
    try {
      // The screen must not go to sleep, or the phone stops reporting.
      wake.current = await (navigator as any).wakeLock?.request("screen");
    } catch {
      // not supported: the driver keeps the screen on by hand
    }
    watch.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, speed, heading, accuracy } = pos.coords;
        send({ lat, lng, speed, heading, accuracy })
          .then(() => {
            setLast({ at: new Date(), lat, lng, speed: speed === null ? null : Math.round(speed * 3.6) });
            setSent((n) => n + 1);
            setError("");
          })
          .catch((e) => setError(e.message));
      },
      (e) => setError(e.code === 1 ? "Position refusée : autorisez la localisation pour ce site dans le navigateur." : "Position introuvable pour le moment."),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 }
    );
    setOn(true);
  };

  useEffect(() => () => {
    if (watch.current !== null) navigator.geolocation.clearWatch(watch.current);
  }, []);

  // The wake lock is dropped when the page is hidden: take it back when the driver returns.
  useEffect(() => {
    const back = async () => {
      if (document.visibilityState === "visible" && on && !wake.current) {
        try {
          wake.current = await (navigator as any).wakeLock?.request("screen");
        } catch {
          // ignore
        }
      }
    };
    document.addEventListener("visibilitychange", back);
    return () => document.removeEventListener("visibilitychange", back);
  }, [on]);

  return (
    <main className="min-h-screen bg-page px-6 pt-32 pb-20">
      <div className="mx-auto max-w-md text-center">
        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${on ? "bg-emerald-500/15 text-emerald-500" : "bg-red-600/10 text-red-600"}`}>
          <Navigation size={30} />
        </div>
        <h1 className="font-serif text-3xl font-black text-ink">Partage de position</h1>
        <p className="mt-2 text-ink-soft">Brightened Mind : en route, gardez cette page ouverte et l'écran allumé. Le bureau voit votre camion sur la carte.</p>

        {!token && (
          <p className="mt-6 flex items-start gap-2 rounded-2xl border border-red-600/40 bg-red-500/10 p-4 text-left text-sm text-ink">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            Lien incomplet. Demandez au bureau de vous renvoyer votre lien personnel.
          </p>
        )}

        {token && (
          <>
            <button
              onClick={on ? stop : start}
              className={`mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-5 text-lg font-black text-white shadow-xl ${on ? "bg-zinc-700" : "bg-gradient-to-br from-emerald-500 to-emerald-700"}`}
            >
              {on ? <Square size={22} /> : <MapPin size={22} />}
              {on ? "Arrêter le partage" : "Démarrer le partage"}
            </button>

            {on && (
              <div className="mt-6 rounded-2xl border border-line bg-surface p-4 text-left text-sm text-ink-soft">
                <p className="flex items-center gap-2 font-bold text-emerald-500">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" /> Partage en cours
                </p>
                {last ? (
                  <p className="mt-2">
                    Dernier envoi à {last.at.toLocaleTimeString("fr-FR")} · {last.lat.toFixed(5)}, {last.lng.toFixed(5)}
                    {last.speed !== null ? ` · ${last.speed} km/h` : ""} ({sent} envois)
                  </p>
                ) : (
                  <p className="mt-2">En attente de la position du téléphone…</p>
                )}
              </div>
            )}
            {error && (
              <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-left text-sm text-ink">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" />
                {error}
              </p>
            )}
            <p className="mt-6 text-xs text-ink-faint">Le partage s'arrête quand vous touchez « Arrêter » ou fermez la page. Il ne vaut que pour ce trajet.</p>
          </>
        )}
      </div>
    </main>
  );
}
