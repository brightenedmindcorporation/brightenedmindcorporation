import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

/** A student's own written work and the corrections their teachers made. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ reviews: [] });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ reviews: [] }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const snap = await getAdminDb().collection("writingReviews").where("uid", "==", decoded.uid).get();
    const reviews = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a: any, b: any) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] }, { status: 401 });
  }
}
