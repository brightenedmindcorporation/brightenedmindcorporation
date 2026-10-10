import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { isSessionUpcomingOrLive, type LiveSession } from "@/lib/academy/liveSessions";

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

    const adminDb = getAdminDb();
    const snap = await adminDb
      .collection("liveSessions")
      .where("langCode", "==", langCode)
      .where("level", "==", Number(level))
      .get();

    const sessions = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as LiveSession[];
    const upcoming = sessions
      .filter((s) => isSessionUpcomingOrLive(s))
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

    return NextResponse.json({ session: upcoming[0] ?? null });
  } catch (error: any) {
    console.error("Error fetching live sessions:", error);
    return NextResponse.json({ session: null });
  }
}
