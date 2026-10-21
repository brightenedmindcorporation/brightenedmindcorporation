import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { findStuckQuizzes } from "@/lib/alerts";
import { loadTimeline } from "@/lib/studentTimeline";

export const dynamic = "force-dynamic";

/**
 * Admin only.
 *  - GET            → one row per student: last sign-in (from the sign-in
 *                      service, so it is known even for activity before this
 *                      tracking existed), last activity, counters.
 *  - GET ?uid=…     → that student's timeline (latest 200 events).
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);
    const db = getAdminDb();
    const uid = new URL(request.url).searchParams.get("uid");

    if (uid) return NextResponse.json(await loadTimeline(uid));

    const [studentsSnap, enrollSnap] = await Promise.all([db.collection("students").get(), db.collection("enrollments").get()]);
    const langs = new Map<string, Set<string>>();
    for (const d of enrollSnap.docs) {
      const e = d.data();
      if (e.status !== "Approved" || !e.uid) continue;
      langs.set(e.uid, (langs.get(e.uid) ?? new Set()).add(e.langCode));
    }
    const uids = studentsSnap.docs.map((d) => d.id);
    const signIn = new Map<string, { last?: string; created?: string }>();
    for (let i = 0; i < uids.length; i += 100) {
      try {
        const res = await getAdminAuth().getUsers(uids.slice(i, i + 100).map((x) => ({ uid: x })));
        for (const u of res.users) {
          signIn.set(u.uid, {
            last: u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).toISOString() : undefined,
            created: u.metadata.creationTime ? new Date(u.metadata.creationTime).toISOString() : undefined,
          });
        }
      } catch (error) {
        console.error("Sign-in lookup failed (non-fatal):", error);
      }
    }

    const rows = studentsSnap.docs
      .filter((d) => langs.has(d.id) || d.data().status)
      .map((d) => {
        const s = d.data();
        const auth = signIn.get(d.id);
        const candidates = [s.lastSeenAt, auth?.last].filter(Boolean) as string[];
        return {
          uid: d.id,
          name: s.name || "",
          email: s.email || "",
          langCodes: Array.from(langs.get(d.id) ?? (s.langCode ? [s.langCode] : [])),
          createdAt: auth?.created || s.createdAt || null,
          lastSignInAt: auth?.last || null,
          lastSeenAt: s.lastSeenAt || null,
          lastActivityAt: candidates.sort().pop() || null,
          loginCount: s.loginCount || 0,
          sessionCount: s.sessionCount || 0,
          stats: s.activityStats || {},
          reminderCount: s.reminderCount || 0,
          lastReminderAt: s.lastReminderAt || null,
        };
      });
    return NextResponse.json({ students: rows, alerts: { stuck: await findStuckQuizzes() } });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Admin activity failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
