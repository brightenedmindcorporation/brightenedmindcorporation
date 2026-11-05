import { NextResponse } from "next/server";
import { FieldPath } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { localDay } from "@/lib/activityLog";
import { computeStreak, MIN_SECONDS } from "@/lib/academy/streak";

/**
 * The signed-in student's study streak, from the active time the platform already records per day
 * (students/{uid}/timeSpent/{YYYY-MM-DD}, see lib/activityLog.ts). Read-only; shown on the student's dashboard.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ ok: false }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const snap = await getAdminDb()
      .collection("students")
      .doc(decoded.uid)
      .collection("timeSpent")
      .orderBy(FieldPath.documentId(), "desc")
      .limit(120)
      .get();
    const days = snap.docs.filter((d) => Number(d.data()?.seconds) >= MIN_SECONDS && /^\d{4}-\d{2}-\d{2}$/.test(d.id)).map((d) => d.id);
    return NextResponse.json({ ok: true, ...computeStreak(days, localDay()) });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
