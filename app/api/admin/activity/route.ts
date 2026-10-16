import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

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

    if (uid) {
      const [events, student] = await Promise.all([
        db.collection("students").doc(uid).collection("activity").orderBy("at", "desc").limit(200).get(),
        db.collection("students").doc(uid).get(),
      ]);
      let account: { lastSignInAt?: string; createdAt?: string } = {};
      try {
        const u = await getAdminAuth().getUser(uid);
        account = { lastSignInAt: u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).toISOString() : undefined, createdAt: u.metadata.creationTime ? new Date(u.metadata.creationTime).toISOString() : undefined };
      } catch {
        // account lookup is optional
      }
      const s = student.data() || {};
      return NextResponse.json({
        events: events.docs.map((d) => ({ id: d.id, ...d.data() })),
        summary: {
          name: s.name,
          email: s.email,
          lastSeenAt: s.lastSeenAt || null,
          lastLoginAt: s.lastLoginAt || null,
          loginCount: s.loginCount || 0,
          sessionCount: s.sessionCount || 0,
          stats: s.activityStats || {},
          ...account,
        },
      });
    }

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
        };
      });
    return NextResponse.json({ students: rows });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Admin activity failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
