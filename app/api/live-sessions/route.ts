import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { getStudentStanding, sessionOpenToStudent } from "@/lib/academy/liveAccess";
import { isSessionOpenNow, isSessionUpcomingOrLive, type LiveSession } from "@/lib/academy/liveSessions";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

// The student page polls this every few seconds to learn when the teacher
// opens the room — it must never be cached.
export const dynamic = "force-dynamic";

/**
 * Public, read-only: returns the next upcoming-or-live session for a given
 * language/level, if any. Used by the level page, dashboard, and live page
 * to display the schedule and gate the "join" button. Goes through the
 * Admin SDK (like the admin routes) rather than the client SDK so it never
 * depends on Firestore security rules being configured for anonymous/
 * student reads — the same class of bug that broke admin approve/reject.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      // No admin SDK configured yet: no schedule data available, but this
      // must never break the page — just report "nothing scheduled".
      return NextResponse.json({ session: null });
    }

    const { searchParams } = new URL(request.url);
    const langCode = searchParams.get("langCode");
    const level = searchParams.get("level");

    if (!langCode || !level) {
      return NextResponse.json({ error: "langCode et level sont requis." }, { status: 400 });
    }

    // The caller must be a signed-in student (or the admin): a teacher's class
    // is only shown to that teacher's students.
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ session: null });
    let decoded;
    try {
      decoded = await getAdminAuth().verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ session: null });
    }

    const adminDb = getAdminDb();
    const isAdmin = decoded.email === ADMIN_EMAIL;
    const standing = isAdmin ? null : await getStudentStanding(adminDb, decoded.uid, langCode);
    if (standing && !standing.approved) return NextResponse.json({ session: null });

    const snap = await adminDb
      .collection("liveSessions")
      .where("langCode", "==", langCode)
      .where("level", "==", Number(level))
      .get();

    const sessions = (snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as LiveSession[]).filter(
      (s) => !standing || sessionOpenToStudent(s, standing, decoded.uid)
    );
    // A room the teacher has opened always wins (even if the class overruns
    // its scheduled slot); otherwise the next upcoming session.
    const upcoming = sessions
      .filter((s) => isSessionOpenNow(s) || isSessionUpcomingOrLive(s))
      .sort((a, b) => {
        const openDiff = Number(isSessionOpenNow(b)) - Number(isSessionOpenNow(a));
        if (openDiff !== 0) return openDiff;
        return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
      });

    return NextResponse.json({ session: upcoming[0] ?? null });
  } catch (error: any) {
    console.error("Error fetching live sessions:", error);
    return NextResponse.json({ session: null });
  }
}
