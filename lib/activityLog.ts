import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * What a student does on the platform, kept so the administration can see when
 * they last came and what they did. Events go to students/{uid}/activity; the
 * student's own document keeps the last-seen time and a few running counters,
 * so the overview needs no scanning of events.
 */
export type ActivityType =
  | "login" // signed in with e-mail and password
  | "session" // opened their learning space (already signed in)
  | "lesson_open"
  | "quiz"
  | "final_quiz"
  | "live_join"
  | "message"
  | "certificate"
  | "level_request"
  | "reminder"; // automatic reminder sent by the platform

/** Events a student's own browser may report (the rest are written by the server routes). */
export const CLIENT_ACTIVITY: ActivityType[] = ["login", "session", "lesson_open", "quiz", "final_quiz", "live_join"];

const COUNTERS: Partial<Record<ActivityType, string>> = {
  lesson_open: "lessonOpens",
  quiz: "quizzes",
  final_quiz: "finalQuizzes",
  live_join: "liveJoins",
  message: "messages",
  certificate: "certificates",
};

/** Africa/Lubumbashi (UTC+2) calendar day, YYYY-MM-DD. */
export const localDay = (ms: number = Date.now()) => new Date(ms + 2 * 3600_000).toISOString().slice(0, 10);

export async function logActivity(uid: string, type: ActivityType, label: string, meta: Record<string, unknown> = {}): Promise<void> {
  if (!uid) return;
  const db = getAdminDb();
  const now = new Date().toISOString();
  const studentRef = db.collection("students").doc(uid);

  // The same sign-in reported twice within ten minutes counts once.
  if (type === "login" || type === "session") {
    const snap = await studentRef.get();
    const last = snap.data()?.[type === "login" ? "lastLoginAt" : "lastSessionAt"] as string | undefined;
    if (last && Date.now() - new Date(last).getTime() < 10 * 60_000) {
      await studentRef.set({ lastSeenAt: now }, { merge: true });
      return;
    }
  }

  await studentRef.collection("activity").add({ type, label: label.slice(0, 200), meta, at: now });

  // Platform-wide daily counters (feed the weekly report).
  const inc = FieldValue.increment(1);
  const day: Record<string, unknown> = { [type]: inc };
  if (type === "quiz" || type === "final_quiz") day[meta.passed === false ? "quizFailed" : "quizPassed"] = inc;
  await db.collection("activity_days").doc(localDay()).set(day, { merge: true }).catch(() => {});

  const update: Record<string, unknown> = { lastSeenAt: now };
  if (type === "login") {
    update.lastLoginAt = now;
    update.lastSessionAt = now;
    update.loginCount = FieldValue.increment(1);
  }
  if (type === "session") {
    update.lastSessionAt = now;
    update.sessionCount = FieldValue.increment(1);
  }
  const counter = COUNTERS[type];
  if (counter) update.activityStats = { [counter]: FieldValue.increment(1) };
  await studentRef.set(update, { merge: true });
}

/** Never lets a logging problem break the real action. */
export async function logActivitySafe(uid: string, type: ActivityType, label: string, meta: Record<string, unknown> = {}) {
  try {
    await logActivity(uid, type, label, meta);
  } catch (error) {
    console.error("Activity log failed (non-fatal):", error);
  }
}

/** Active time on a page, reported in small chunks by the student's browser. */
export async function addTimeSpent(uid: string, seconds: number, key: string): Promise<void> {
  const s = Math.max(0, Math.min(120, Math.round(seconds)));
  if (!uid || !s) return;
  const safeKey = key.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 40);
  const db = getAdminDb();
  const studentRef = db.collection("students").doc(uid);
  const inc = FieldValue.increment(s);
  await studentRef.collection("timeSpent").doc(localDay()).set({ seconds: inc, pages: { [safeKey]: inc } }, { merge: true });
  await studentRef.set({ lastSeenAt: new Date().toISOString(), activityStats: { seconds: inc } }, { merge: true });
}
