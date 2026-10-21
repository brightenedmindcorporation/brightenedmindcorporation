import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { loadWritingMarks } from "@/lib/academy/writingMarks";

export const dynamic = "force-dynamic";

/** A signed-in student reads their own saved progress for one level (other devices, administration changes). */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ progress: null });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ progress: null }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const url = new URL(request.url);
    const langCode = url.searchParams.get("langCode");
    const level = url.searchParams.get("level");
    if (!langCode || !level) return NextResponse.json({ error: "langCode et level requis." }, { status: 400 });
    const db = getAdminDb();
    const id = `${decoded.uid}_${langCode}_${level}`;
    const snap = await db.collection("progress").doc(id).get();
    if (!snap.exists) return NextResponse.json({ progress: null });
    // The teachers' marks for the written parts (they count in the level's average).
    const marks = await loadWritingMarks(db, decoded.uid).catch(() => new Map<string, Record<string, number>>());
    return NextResponse.json({ progress: { ...snap.data(), writingMarks: marks.get(id) || {} } });
  } catch {
    return NextResponse.json({ progress: null }, { status: 401 });
  }
}
