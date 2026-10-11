import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ notifications: [] });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();
    const snap = await adminDb.collection("notifications").where("audience", "==", decoded.uid).get();
    const notifications = snap.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => (b.createdAt > a.createdAt ? 1 : -1))
      .slice(0, 40);

    return NextResponse.json({ notifications });
  } catch (error: any) {
    console.error("Error fetching student notifications:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
