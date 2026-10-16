import "server-only";
import { FieldPath, FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * Anonymous per-item statistics (announcements, lessons, videos) kept in `analytics_content/{id}`.
 * Everything is stored as per-day counters (`d.<day>.<field>`) so the admin can pick any period.
 * "Unique" counters count a visitor once per day per item (same anonymous visitor id as the visit counter).
 */

export const CONTENT_COLLECTION = "analytics_content";

export function localDay(offsetDays = 0): string {
  return new Date(Date.now() + 2 * 3600_000 - offsetDays * 86_400_000).toISOString().slice(0, 10);
}

export type ContentKind = "ann" | "lesson";

/** Document id for an item: "ann_<announcementId>" or "lesson_EN-1-3". */
export function contentDocId(kind: ContentKind, key: string): string | null {
  if (kind === "ann") return /^[A-Za-z0-9_-]{4,64}$/.test(key) ? `ann_${key}` : null;
  if (kind === "lesson") return /^[A-Za-z]{2,6}-[1-3]-\d{1,2}$/.test(key) ? `lesson_${key.toUpperCase()}` : null;
  return null;
}

/** Counts `field` for the item today. With `unique`, only once per visitor per day (returns false if repeated). */
export async function bump(
  docId: string,
  fields: Record<string, number>,
  meta: { type: ContentKind; title?: string },
  unique?: { vid: string; tag: string }
): Promise<boolean> {
  const db = getAdminDb();
  const day = localDay();
  if (unique) {
    try {
      await db.collection("analytics_dedupe").doc(`${day}_${unique.vid}_${docId}_${unique.tag}`.slice(0, 200)).create({ at: Date.now() });
    } catch {
      return false; // already counted today
    }
  }
  const counters: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) if (v) counters[k] = FieldValue.increment(v);
  await db
    .collection(CONTENT_COLLECTION)
    .doc(docId)
    .set(
      {
        type: meta.type,
        ...(meta.title ? { title: meta.title.slice(0, 120) } : {}),
        lastAt: new Date().toISOString(),
        d: { [day]: counters },
      },
      { merge: true }
    );
  return true;
}

/** Server-side counters for the student funnel (called from the signed-in activity route). */
export async function bumpLesson(key: string, uid: string, field: "opens" | "quizTaken" | "quizPassed", title?: string) {
  const id = contentDocId("lesson", key);
  if (!id) return;
  // A student counts once per day for each step (opened / quiz taken / quiz passed).
  await bump(id, { [field]: 1 }, { type: "lesson", title }, { vid: uid, tag: field }).catch(() => {});
}

export interface ContentItem {
  id: string;
  type: ContentKind;
  key: string;
  title: string;
  duration: number;
  lastAt: string | null;
  series: { day: string; views: number; plays: number }[];
  /** Totals over the period for every counter (views, plays, clicks, funnel…). */
  n: Record<string, number>;
}

/** Statistics of every announcement / lesson over the last `days` days. */
export async function loadContentStats(days: number): Promise<ContentItem[]> {
  const snap = await getAdminDb().collection(CONTENT_COLLECTION).get();
  const dayList = Array.from({ length: days }, (_, i) => localDay(days - 1 - i));
  const items: ContentItem[] = [];
  for (const doc of snap.docs) {
    const data = doc.data();
    const byDay = (data.d || {}) as Record<string, Record<string, number>>;
    const n: Record<string, number> = {};
    const series = dayList.map((day) => {
      const c = byDay[day] || {};
      for (const [k, v] of Object.entries(c)) n[k] = (n[k] || 0) + (Number(v) || 0);
      return { day, views: (c.views || 0) + (c.pageViews || 0), plays: c.plays || 0 };
    });
    if (Object.keys(n).length === 0) continue;
    const [prefix, ...rest] = doc.id.split("_");
    items.push({
      id: doc.id,
      type: prefix as ContentKind,
      key: rest.join("_"),
      title: data.title || "",
      duration: data.duration || 0,
      lastAt: data.lastAt || null,
      series,
      n,
    });
  }
  return items;
}

/** Visits and sign-ups per campaign link (?src=…) over the last `days` days. */
export async function loadCampaigns(days: number) {
  const snap = await getAdminDb().collection("analytics_days").where(FieldPath.documentId(), ">=", localDay(days - 1)).get();
  const rows: Record<string, { visits: number; visitors: number; signups: number }> = {};
  const row = (k: string) => (rows[k] ||= { visits: 0, visitors: 0, signups: 0 });
  for (const d of snap.docs) {
    const data = d.data();
    for (const [src, v] of Object.entries((data.campaigns || {}) as Record<string, { visits?: number; visitors?: number }>)) {
      row(src).visits += v.visits || 0;
      row(src).visitors += v.visitors || 0;
    }
    for (const [src, v] of Object.entries((data.signups || {}) as Record<string, number>)) row(src).signups += Number(v) || 0;
  }
  return Object.entries(rows)
    .map(([src, r]) => ({ src, ...r }))
    .sort((a, b) => b.visits + b.signups * 5 - (a.visits + a.signups * 5));
}
