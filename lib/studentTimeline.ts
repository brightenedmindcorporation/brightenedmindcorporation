import "server-only";
import { FieldPath } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

/** One student's activity file: latest events, time spent per day, last sign-in and counters. */
export async function loadTimeline(uid: string) {
  const db = getAdminDb();
  const studentRef = db.collection("students").doc(uid);
  const [events, student, timeSnap] = await Promise.all([
    studentRef.collection("activity").orderBy("at", "desc").limit(200).get(),
    studentRef.get(),
    studentRef.collection("timeSpent").orderBy(FieldPath.documentId(), "desc").limit(30).get(),
  ]);
  let account: { lastSignInAt?: string; createdAt?: string } = {};
  try {
    const u = await getAdminAuth().getUser(uid);
    account = {
      lastSignInAt: u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).toISOString() : undefined,
      createdAt: u.metadata.creationTime ? new Date(u.metadata.creationTime).toISOString() : undefined,
    };
  } catch {
    // the account lookup is optional
  }
  const s = student.data() || {};
  return {
    events: events.docs.map((d) => ({ id: d.id, ...d.data() })),
    time: timeSnap.docs.map((d) => ({ day: d.id, seconds: d.data().seconds || 0, pages: d.data().pages || {} })),
    summary: {
      name: s.name,
      email: s.email,
      lastSeenAt: s.lastSeenAt || null,
      lastLoginAt: s.lastLoginAt || null,
      loginCount: s.loginCount || 0,
      sessionCount: s.sessionCount || 0,
      stats: s.activityStats || {},
      reminderCount: s.reminderCount || 0,
      lastReminderAt: s.lastReminderAt || null,
      ...account,
    },
  };
}
