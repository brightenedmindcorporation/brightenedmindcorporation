import type { Firestore } from "firebase-admin/firestore";

/**
 * The teachers' marks (out of 10) for the written parts of the quizzes, read from the corrected writings.
 * Keyed by progress document id (uid_langCode_level), then by lesson id or "final".
 */
export async function loadWritingMarks(db: Firestore, uid?: string): Promise<Map<string, Record<string, number>>> {
  const base = db.collection("writingReviews");
  // Single-field queries only (no composite index needed); reviewed ones are filtered here.
  const snap = uid ? await base.where("uid", "==", uid).get() : await base.where("status", "==", "reviewed").get();
  const out = new Map<string, Record<string, number>>();
  for (const d of snap.docs) {
    const r = d.data();
    if (r.status !== "reviewed" || typeof r.mark !== "number") continue;
    const id = `${r.uid}_${r.langCode}_${r.level}`;
    out.set(id, { ...(out.get(id) || {}), [String(r.key)]: r.mark });
  }
  return out;
}
