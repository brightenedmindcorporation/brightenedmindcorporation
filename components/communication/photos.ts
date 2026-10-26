export type PhotoCategory = "mariage" | "portrait" | "evenement";

export interface Photo {
  id: string;
  category: PhotoCategory;
  alt: string;
  /** Width and height of the full-size file, to reserve the space before it loads. */
  w: number;
  h: number;
}

export const CATEGORIES: { key: "all" | PhotoCategory; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "mariage", label: "Mariage & couples" },
  { key: "portrait", label: "Portrait & mode" },
  { key: "evenement", label: "Événements & sport" },
];

const full = (id: string) => `/communication/bm-${id}.webp`;
const thumb = (id: string) => `/communication/bm-${id}-t.webp`;
export const photoSrc = full;
export const photoThumb = thumb;

// The photos of the BM Communication portfolio. The academic ceremony photos wait for the people's consent.
export const PHOTOS: Photo[] = [
  { id: "03", category: "mariage", alt: "Portrait en robe rouge dans un escalier lumineux", w: 733, h: 1080 },
  { id: "01", category: "mariage", alt: "Séance de couple : costume sombre et robe rouge", w: 847, h: 1080 },
  { id: "16", category: "evenement", alt: "Match de boxe en plein air au coucher du soleil", w: 1080, h: 724 },
  { id: "11", category: "portrait", alt: "Mannequin en robe bleu nuit sur fond turquoise", w: 728, h: 1080 },
  { id: "06", category: "mariage", alt: "Couple en tendre étreinte pendant une séance photo", w: 1080, h: 725 },
  { id: "02", category: "portrait", alt: "Portrait d'homme en chemise camouflage sur fond bleu nuit", w: 716, h: 1080 },
  { id: "25", category: "evenement", alt: "Cortège en pagnes wax lors d'une cérémonie", w: 1080, h: 735 },
  { id: "10", category: "mariage", alt: "Mariée en robe blanche perlée devant une grande baie vitrée", w: 720, h: 1080 },
  { id: "17", category: "evenement", alt: "Combat de boxe sous un ciel orangé", w: 1080, h: 727 },
  { id: "09", category: "portrait", alt: "Portrait de jeune femme sur fond bleu", w: 717, h: 1080 },
  { id: "04", category: "mariage", alt: "Cérémonie de mariage, échange dans un décor floral", w: 739, h: 1080 },
  { id: "12", category: "portrait", alt: "Portrait de mode en veste beige et pantalon blanc", w: 727, h: 1080 },
  { id: "08", category: "mariage", alt: "Portrait de mariée avec voilette et collier de perles", w: 756, h: 1080 },
  { id: "26", category: "mariage", alt: "Couple en tenues wax bleues, séance de fiançailles", w: 720, h: 1080 },
  { id: "05", category: "portrait", alt: "Séance de couple en studio, chemise bleue sur fond gris", w: 749, h: 1080 },
  { id: "13", category: "evenement", alt: "Deux invitées sur le tapis rouge", w: 728, h: 1080 },
  { id: "14", category: "portrait", alt: "Portrait de mode en studio, robe bleu nuit sur fond clair", w: 720, h: 1080 },
  { id: "27", category: "evenement", alt: "Danse en tenue wax lors d'une réception", w: 1080, h: 735 },
  { id: "07", category: "mariage", alt: "Couple de mariés, costume bordeaux et robe blanche", w: 720, h: 1080 },
  { id: "18", category: "portrait", alt: "Portrait en robe marron sur tapis rouge", w: 724, h: 1080 },
  { id: "15", category: "evenement", alt: "Silhouettes autour d'un ring de boxe au soleil couchant", w: 1080, h: 721 },
  { id: "23", category: "portrait", alt: "Portrait en extérieur avec bouquet de fleurs et diplôme", w: 1080, h: 1034 },
  { id: "22", category: "evenement", alt: "Boxeurs sur le ring devant le public", w: 1080, h: 716 },
];

export const HERO_SLIDES = [
  { id: "17", alt: "Combat de boxe sous un ciel orangé" },
  { id: "06", alt: "Couple en tendre étreinte pendant une séance photo" },
  { id: "25", alt: "Cortège en pagnes wax lors d'une cérémonie" },
  { id: "16", alt: "Match de boxe en plein air au coucher du soleil" },
];
