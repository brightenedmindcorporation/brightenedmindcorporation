"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { MapPoint } from "@/components/TruckMap";

const TruckMap = dynamic(() => import("@/components/TruckMap"), { ssr: false });

// Kolwezi → Likasi → Lubumbashi, roughly along the road.
const ROUTE: [number, number][] = [
  [-10.7148, 25.4666],
  [-10.8, 25.75],
  [-10.9, 26.1],
  [-10.98, 26.73],
  [-11.1, 26.85],
  [-11.3, 27.1],
  [-11.5, 27.35],
  [-11.6647, 27.4794],
];

const along = (t: number): [number, number] => {
  const x = Math.min(Math.max(t, 0), 0.999) * (ROUTE.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  return [ROUTE[i][0] + (ROUTE[i + 1][0] - ROUTE[i][0]) * f, ROUTE[i][1] + (ROUTE[i + 1][1] - ROUTE[i][1]) * f];
};

/** Three pretend trucks: one drives, one is parked and sending, one stopped sending a while ago. */
export default function Demo() {
  const [t, setT] = useState(0.05);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 0.004 > 0.99 ? 0.05 : v + 0.004)), 1000);
    return () => clearInterval(id);
  }, []);
  const [a, b] = along(t);
  const points: MapPoint[] = [
    { id: "1", lat: a, lng: b, label: "Camion 1 · 1234AB/05", detail: "En direct · il y a 2 s · 62 km/h", live: true },
    { id: "2", lat: -11.6647, lng: 27.4794, label: "Camion 2 · 5678CD/05", detail: "En direct · il y a 5 s · 0 km/h", live: true },
    { id: "3", lat: -10.98, lng: 26.73, label: "Camion 3 · 9012EF/05", detail: "Dernière position · il y a 3 h", live: false },
  ];
  return (
    <main className="min-h-screen bg-page px-6 pb-20 pt-32">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="font-serif text-3xl font-black text-ink">Test local : carte des camions</h1>
        <p className="text-sm text-ink-soft">Données simulées (le camion 1 roule de Kolwezi vers Lubumbashi). Cette page n'existe pas sur le vrai site.</p>
        <TruckMap points={points} />
        <p className="text-sm font-bold text-ink">Ce que voit le client sur sa page de suivi :</p>
        <TruckMap height={300} points={[{ ...points[0], id: "client", label: "Camion 1" }]} />
      </div>
    </main>
  );
}
