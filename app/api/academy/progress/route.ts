import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

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
    const snap = await getAdminDb().collection("progress").doc(`${decoded.uid}_${langCode}_${level}`).get();
    return NextResponse.json({ progress: snap.exists ? snap.data() : null });
  } catch {
    return NextResponse.json({ progress: null }, { status: 401 });
  }
}
