"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  /** Second line of the popup. */
  detail?: string;
  /** A truck sending its position right now (green) or a last known one (grey). */
  live?: boolean;
}

// Lubumbashi, where the trucks are based, when there is nothing to show yet.
const DEFAULT_CENTER: [number, number] = [-11.66, 27.48];

const icon = (L: typeof import("leaflet"), live: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="font-size:26px;line-height:1;filter:${live ? "none" : "grayscale(1) opacity(.7)"};text-shadow:0 0 4px #fff,0 0 4px #fff">🚚</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  });

/** An OpenStreetMap showing trucks; the markers move when the points change. */
export default function TruckMap({ points, height = 420, onSelect, follow = false }: { points: MapPoint[]; height?: number; onSelect?: (id: string) => void; follow?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new globalThis.Map<string, Marker>());
  const lib = useRef<typeof import("leaflet") | null>(null);
  const fitted = useRef(false);
  const lastFollow = useRef("");
  const latest = useRef(points);
  latest.current = points;
  const select = useRef(onSelect);
  select.current = onSelect;

  const draw = () => {
    const L = lib.current;
    const m = map.current;
    if (!L || !m) return;
    const seen = new Set<string>();
    for (const p of latest.current) {
      seen.add(p.id);
      const popup = `<b>${esc(p.label)}</b>${p.detail ? `<br/>${esc(p.detail)}` : ""}`;
      const existing = markers.current.get(p.id);
      if (existing) {
        existing.setLatLng([p.lat, p.lng]);
        existing.setIcon(icon(L, !!p.live));
        existing.setPopupContent(popup);
      } else {
        const mk = L.marker([p.lat, p.lng], { icon: icon(L, !!p.live) }).addTo(m).bindPopup(popup);
        mk.on("click", () => select.current?.(p.id));
        markers.current.set(p.id, mk);
      }
    }
    for (const [id, mk] of markers.current) {
      if (!seen.has(id)) {
        mk.remove();
        markers.current.delete(id);
      }
    }
    // A client following one truck: the map stays on it when it moves.
    if (follow && latest.current.length === 1) {
      const p = latest.current[0];
      const key = `${p.lat},${p.lng}`;
      if (key !== lastFollow.current) {
        lastFollow.current = key;
        m.setView([p.lat, p.lng], Math.max(m.getZoom(), 12), { animate: true });
        fitted.current = true;
      }
    }
    // Frame the trucks once; after that the viewer keeps whatever view they chose.
    if (!fitted.current && latest.current.length) {
      fitted.current = true;
      if (latest.current.length === 1) m.setView([latest.current[0].lat, latest.current[0].lng], 12);
      else m.fitBounds(latest.current.map((p) => [p.lat, p.lng] as [number, number]), { padding: [40, 40], maxZoom: 13 });
    }
  };

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !box.current || map.current) return;
      lib.current = L;
      const m = L.map(box.current, { scrollWheelZoom: false }).setView(DEFAULT_CENTER, 6);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(m);
      map.current = m;
      draw();
      // The box may have been laid out after the map was created.
      setTimeout(() => m.invalidateSize(), 200);
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      markers.current.clear();
      fitted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(draw);

  return <div ref={box} style={{ height }} className="z-0 w-full overflow-hidden rounded-2xl border border-line bg-surface-alt" />;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
