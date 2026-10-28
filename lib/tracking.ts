/** The steps of a parcel / equipment shipment, in the order they usually happen. */
export const SHIPMENT_STATUSES = [
  { id: "registered", label: "Colis enregistré" },
  { id: "received", label: "Reçu à l'entrepôt" },
  { id: "packed", label: "Emballé, prêt à partir" },
  { id: "transit", label: "En transit" },
  { id: "arrived", label: "Arrivé à destination" },
  { id: "customs", label: "En dédouanement" },
  { id: "ready", label: "Prêt pour la livraison ou le retrait" },
  { id: "delivered", label: "Livré" },
  { id: "problem", label: "Un problème : nous vous contactons" },
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number]["id"];

export const statusLabel = (id: string) => SHIPMENT_STATUSES.find((s) => s.id === id)?.label ?? id;

export const SHIPMENT_CATEGORIES = ["Équipements automobiles", "Pièces détachées", "Colis", "Autre"] as const;

export interface ShipmentEvent {
  status: string;
  note?: string;
  location?: string;
  at: string;
}

export interface Shipment {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  category: string;
  description: string;
  origin: string;
  destination: string;
  weightKg?: number | null;
  eta?: string;
  status: string;
  history: ShipmentEvent[];
  createdAt: string;
  updatedAt: string;
}

/** What anybody holding the code may see: nothing about the client. */
export interface PublicShipment {
  code: string;
  category: string;
  description: string;
  origin: string;
  destination: string;
  eta?: string;
  status: string;
  history: ShipmentEvent[];
  updatedAt: string;
}

// Letters and digits that cannot be confused (no 0/O, 1/I/L): a code can be read out over the phone.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** A code such as BMT-7K4Q2X: random, so that other parcels cannot be guessed from one's own. */
export function newTrackingCode(random: (n: number) => number = (n) => Math.floor(Math.random() * n)): string {
  let out = "";
  for (let i = 0; i < 6; i++) out += ALPHABET[random(ALPHABET.length)];
  return `BMT-${out}`;
}

export const normalizeCode = (raw: string) => {
  const c = raw.trim().toUpperCase().replace(/\s+/g, "");
  return /^BMT-/.test(c) ? c : c.length === 6 ? `BMT-${c}` : c;
};
