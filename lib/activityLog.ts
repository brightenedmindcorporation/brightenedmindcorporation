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
  | "level_request";

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
