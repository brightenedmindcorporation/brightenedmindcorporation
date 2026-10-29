/** A truck whose driver shares the phone's position while driving. */
export interface Truck {
  id: string;
  name: string;
  plate: string;
  driver: string;
  driverPhone?: string;
  /** Secret held by the driver's link: it is the only thing that lets a phone report this truck's position. */
  token: string;
  active: boolean;
  /** The driver's phone is currently sending its position. */
  sharing: boolean;
  lat?: number;
  lng?: number;
  speedKmh?: number | null;
  heading?: number | null;
  accuracy?: number | null;
  updatedAt?: string;
  createdAt: string;
}

/** What the client of a parcel may see about the truck carrying it: no driver, no plate, no secret. */
export interface PublicTruck {
  name: string;
  lat: number;
  lng: number;
  updatedAt: string;
  sharing: boolean;
}

/** The position is called "live" while it is this recent. */
export const LIVE_WITHIN_MS = 2 * 60_000;

export const isLive = (t: { sharing?: boolean; updatedAt?: string }, now = Date.now()) =>
  !!t.sharing && !!t.updatedAt && now - new Date(t.updatedAt).getTime() < LIVE_WITHIN_MS;

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";

/** A long random secret for a driver's link. */
export function newTruckToken(random: (n: number) => number = (n) => Math.floor(Math.random() * n)): string {
  let out = "";
  for (let i = 0; i < 24; i++) out += ALPHABET[random(ALPHABET.length)];
  return out;
}

export const agoLabel = (iso?: string, now = Date.now()) => {
  if (!iso) return "jamais";
  const s = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (s < 60) return `il y a ${s} s`;
  if (s < 3600) return `il y a ${Math.round(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.round(s / 3600)} h`;
  return `il y a ${Math.round(s / 86400)} j`;
};
