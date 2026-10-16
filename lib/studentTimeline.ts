import "server-only";
import { localDay } from "@/lib/activityLog";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

/** One student's activity file: latest events, time spent per day, last sign-in and counters. */
export async function loadTimeline(uid: string) {
  const db = getAdminDb();
  const studentRef = db.collection("students").doc(uid);
  // Index-free reads: the latest events (sorted here if the database cannot sort them for us) and
  // the last 30 days of time spent, read by day name rather than by a sorted query.
  const days = Array.from({ length: 30 }, (_, i) => localDay(Date.now() - i * 86_400_000));
  const loadEvents = async () => {
    try {
      const snap = await studentRef.collection("activity").orderBy("at", "desc").limit(200).get();
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch {
      const snap = await studentRef.collection("activity").limit(500).get();
      return snap.docs
        .map((d) => ({ id: d.id, ...(d.data() as { at?: string }) }))
        .sort((x, y) => String(y.at).localeCompare(String(x.at)))
        .slice(0, 200);
    }
  };
  const [events, student, timeDocs] = await Promise.all([
    loadEvents(),
    studentRef.get(),
    db.getAll(...days.map((d) => studentRef.collection("timeSpent").doc(d))),
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
    events,
    time: timeDocs.filter((d) => d.exists).map((d) => ({ day: d.id, seconds: d.data()!.seconds || 0, pages: d.data()!.pages || {} })),
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
