/**
 * Everything the advertising space needs to know about an announcement, shared by the public pages, the
 * administration and the poster maker (no server-only code in here).
 */

export type AnnouncementCategory = "formation" | "emploi" | "promo" | "evenement" | "info";
export type CtaType = "detail" | "whatsapp" | "call" | "register" | "devis" | "link" | "apply";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  /** Old field, kept for the announcements created before the categories ("job" = a job offer). */
  type?: "job" | "normal";
  category?: AnnouncementCategory;
  details?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  ctaType?: CtaType;
  ctaLabel?: string;
  ctaUrl?: string;
  /** What the pills show: when, where, how much. */
  eventDate?: string;
  place?: string;
  price?: string;
  /** Scheduled start (ISO): the announcement stays hidden until then. */
  startAt?: string | null;
  expiresAt?: string | null;
  createdAt?: string;
  pinned?: boolean;
  active?: boolean;
  showInTicker?: boolean;
}

export const PHONE_DISPLAY = "+243 988 830 799";
export const PHONE_E164 = "+243988830799";
export const WHATSAPP_NUMBER = "243988830799";
export const SITE_HOST = "bmcorporation-cd.com";

export const CATEGORIES: { id: AnnouncementCategory; label: string; badge: string; hex: string; defaultCta: CtaType }[] = [
  { id: "formation", label: "Formation", badge: "bg-red-700 text-white", hex: "#7a1f2b", defaultCta: "register" },
  { id: "emploi", label: "Offre d'emploi", badge: "bg-sky-700 text-white", hex: "#0369a1", defaultCta: "apply" },
  { id: "promo", label: "Promotion", badge: "bg-amber-600 text-white", hex: "#d97706", defaultCta: "whatsapp" },
  { id: "evenement", label: "Événement", badge: "bg-violet-700 text-white", hex: "#6d28d9", defaultCta: "whatsapp" },
  { id: "info", label: "Information", badge: "bg-slate-700 text-white", hex: "#334155", defaultCta: "detail" },
];

export const CTA_OPTIONS: { id: CtaType; label: string }[] = [
  { id: "detail", label: "Voir le détail" },
  { id: "whatsapp", label: "Écrire sur WhatsApp" },
  { id: "call", label: "Appeler" },
  { id: "register", label: "S'inscrire à l'Academia" },
  { id: "devis", label: "Demander un devis" },
  { id: "link", label: "Ouvrir un lien" },
  { id: "apply", label: "Postuler (offre d'emploi)" },
];

export function categoryOf(a: Pick<Announcement, "category" | "type">): AnnouncementCategory {
  if (a.category && CATEGORIES.some((c) => c.id === a.category)) return a.category;
  return a.type === "job" ? "emploi" : "info";
}

export const categoryInfo = (a: Pick<Announcement, "category" | "type">) => CATEGORIES.find((c) => c.id === categoryOf(a))!;

export function ctaTypeOf(a: Announcement): CtaType {
  if (a.ctaType && CTA_OPTIONS.some((c) => c.id === a.ctaType)) return a.ctaType;
  return categoryOf(a) === "emploi" ? "apply" : "detail";
}

const whatsappLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/** The main button of an announcement: its text, where it goes, and what to count when it is pressed. */
export function ctaFor(a: Announcement): { label: string; href: string; external: boolean; kind: "detail" | "apply" | "whatsapp" | "call" | "register" | "devis" | "link" } {
  const type = ctaTypeOf(a);
  const custom = (a.ctaLabel || "").trim();
  switch (type) {
    case "apply":
      return { label: custom || "Postuler", href: `/annonces/${a.id}/postuler`, external: false, kind: "apply" };
    case "whatsapp":
      return { label: custom || "Écrire sur WhatsApp", href: whatsappLink(`Bonjour BM Corporation, je suis intéressé(e) par : ${a.title}`), external: true, kind: "whatsapp" };
    case "call":
      return { label: custom || "Appeler", href: `tel:${PHONE_E164}`, external: false, kind: "call" };
    case "register":
      return { label: custom || "S'inscrire", href: "/register", external: false, kind: "register" };
    case "devis":
      return { label: custom || "Demander un devis", href: "/devis", external: false, kind: "devis" };
    case "link":
      return /^https?:\/\//i.test(a.ctaUrl || "")
        ? { label: custom || "En savoir plus", href: a.ctaUrl as string, external: true, kind: "link" }
        : { label: custom || "Voir le détail", href: `/annonces/${a.id}`, external: false, kind: "detail" };
    default:
      return { label: custom || "Voir le détail", href: `/annonces/${a.id}`, external: false, kind: "detail" };
  }
}

/** Days left before the announcement ends (null when it has no end), rounded up; 0 = ends today. */
export function daysLeft(a: Pick<Announcement, "expiresAt">, now = Date.now()): number | null {
  if (!a.expiresAt) return null;
  const left = Math.ceil((new Date(a.expiresAt).getTime() - now) / 86_400_000);
  return left < 0 ? null : left;
}

/** "Nouveau" during the first seven days. */
export function isNew(a: Pick<Announcement, "createdAt" | "startAt">, now = Date.now()): boolean {
  const from = new Date(a.startAt || a.createdAt || 0).getTime();
  return from > 0 && now - from < 7 * 86_400_000;
}

/** The pill shown for the remaining time: only when it is worth a sense of urgency (a week or less). */
export function urgencyLabel(a: Pick<Announcement, "expiresAt">, now = Date.now()): string | null {
  const left = daysLeft(a, now);
  if (left === null || left > 7) return null;
  if (left === 0) return "Dernier jour";
  return left === 1 ? "Plus qu'un jour" : `Plus que ${left} jours`;
}

/** A human date for the "when" pill: an ISO date becomes "12 janvier 2027", free text is kept as typed. */
export function prettyDate(value?: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const d = new Date(`${value}T12:00:00Z`);
    if (!Number.isNaN(d.getTime())) return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  }
  return value;
}

// ---- images and videos: Cloudinary resizes and compresses them on delivery --------------------------------

const CLOUDINARY = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/)(.+)$/;

/** The same picture at the size really needed (and in the lightest format the browser supports). */
export function optimizedImage(url: string | null | undefined, width = 800): string {
  if (!url) return "";
  const m = url.match(CLOUDINARY);
  if (!m || m[2] !== "image" || /(^|,)f_auto/.test(m[3])) return url;
  return `${m[1]}f_auto,q_auto,c_limit,w_${width}/${m[3]}`;
}

/** The 1200x630 picture shown when a link to the announcement is pasted in WhatsApp or Facebook. */
export function shareImage(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  const m = url.match(CLOUDINARY);
  if (!m || m[2] !== "image") return url;
  return `${m[1]}f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/${m[3].replace(/^f_auto[^/]*\//, "")}`;
}

export function optimizedVideo(url: string | null | undefined, width = 720): string {
  if (!url) return "";
  const m = url.match(CLOUDINARY);
  if (!m || m[2] !== "video" || /(^|,)q_auto/.test(m[3])) return url;
  return `${m[1]}f_auto,q_auto,c_limit,w_${width}/${m[3]}`;
}

/** A still picture of the first second of a video (shown before anyone presses play, so nothing heavy loads). */
export function videoPoster(url: string | null | undefined, width = 800): string {
  if (!url) return "";
  const m = url.match(CLOUDINARY);
  if (!m || m[2] !== "video") return "";
  return `${m[1]}so_1,f_jpg,q_auto,c_limit,w_${width}/${m[3].replace(/\.[a-z0-9]+$/i, ".jpg")}`;
}

/** What an announcement looks like once shared as plain text (WhatsApp, SMS). */
export function shareText(a: Announcement, origin: string): string {
  const bits = [a.title, prettyDate(a.eventDate), a.place, a.price].filter(Boolean).join(" · ");
  return `${bits}\n${origin}/annonces/${a.id}`;
}

/** The announcements the public may see: published, started, not ended; pinned first, then the newest. */
export function visibleNow<T extends Announcement>(list: T[], now = new Date().toISOString()): T[] {
  return list
    .filter((a) => a.active !== false && (!a.startAt || a.startAt <= now) && (!a.expiresAt || a.expiresAt > now))
    .sort((a, b) => (a.pinned === b.pinned ? ((b.startAt || b.createdAt || "") > (a.startAt || a.createdAt || "") ? 1 : -1) : a.pinned ? -1 : 1));
}
