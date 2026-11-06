import "server-only";
import { CATEGORIES, CTA_OPTIONS, type AnnouncementCategory, type CtaType } from "@/lib/announcements";
import { optimizeImage } from "@/lib/imageOptimize";
import { uploadBufferToCloudinary, uploadToCloudinary } from "@/lib/cloudinary";

const MAX_VIDEO_BYTES = 60 * 1024 * 1024;
const MAX_IMAGE_INPUT_BYTES = 25 * 1024 * 1024;
const CLOUD = /^https:\/\/res\.cloudinary\.com\//;

const text = (form: FormData, key: string, max: number) => (form.get(key)?.toString() ?? "").trim().slice(0, max);

/** The fields of the administration form, checked and cleaned (the same for a new announcement and an edit). */
export function parseAnnouncementFields(form: FormData) {
  const title = text(form, "title", 100);
  const description = text(form, "description", 300);
  if (!title || !description) throw { status: 400, message: "Le titre et la description courte sont requis." };

  const category = (CATEGORIES.some((c) => c.id === form.get("category")) ? form.get("category") : "info") as AnnouncementCategory;
  const requested = form.get("ctaType")?.toString() as CtaType;
  // A job offer always leads to the application form.
  const ctaType: CtaType = category === "emploi" ? "apply" : CTA_OPTIONS.some((c) => c.id === requested) ? requested : "detail";
  const ctaUrlRaw = text(form, "ctaUrl", 500);
  if (ctaType === "link" && !/^https?:\/\//i.test(ctaUrlRaw)) throw { status: 400, message: "Le lien du bouton doit commencer par http:// ou https://." };

  const startRaw = text(form, "startAt", 40);
  const startAt = startRaw && !Number.isNaN(new Date(startRaw).getTime()) ? new Date(startRaw).toISOString() : null;

  return {
    title,
    description,
    category,
    type: category === "emploi" ? ("job" as const) : ("normal" as const),
    details: text(form, "details", 8000),
    ctaType,
    ctaLabel: text(form, "ctaLabel", 40),
    ctaUrl: ctaType === "link" ? ctaUrlRaw : "",
    eventDate: text(form, "eventDate", 80),
    place: text(form, "place", 80),
    price: text(form, "price", 60),
    startAt,
    pinned: form.get("pinned")?.toString() === "true",
  };
}

/** The picture is made light automatically before it is stored; a video is stored as sent (and delivered compressed). */
export async function storeAnnouncementMedia(form: FormData): Promise<{ imageUrl?: string | null; videoUrl?: string | null; saved?: { before: number; after: number } }> {
  const out: { imageUrl?: string | null; videoUrl?: string | null; saved?: { before: number; after: number } } = {};

  const image = form.get("image");
  if (image instanceof File && image.size > 0) {
    if (image.size > MAX_IMAGE_INPUT_BYTES) throw { status: 400, message: "Cette photo est trop lourde (25 Mo maximum)." };
    const optimized = await optimizeImage(image);
    out.imageUrl = await uploadBufferToCloudinary(optimized.buffer, optimized.filename, "announcements", "image");
    out.saved = { before: optimized.before, after: optimized.after };
  } else {
    // Duplicating an announcement keeps its picture (only our own Cloudinary addresses are accepted).
    const keep = form.get("keepImageUrl")?.toString();
    if (keep && CLOUD.test(keep)) out.imageUrl = keep;
  }

  const video = form.get("video");
  if (video instanceof File && video.size > 0) {
    if (video.size > MAX_VIDEO_BYTES) throw { status: 400, message: "Cette vidéo est trop lourde (60 Mo maximum). Raccourcissez-la ou exportez-la en qualité plus basse." };
    out.videoUrl = await uploadToCloudinary(video, "announcements", "video");
  } else {
    const keep = form.get("keepVideoUrl")?.toString();
    if (keep && CLOUD.test(keep)) out.videoUrl = keep;
  }
  return out;
}
