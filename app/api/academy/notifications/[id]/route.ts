import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const { idToken } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();
    const ref = adminDb.collection("notifications").doc(id);
    const snap = await ref.get();
    if (!snap.exists || snap.data()?.audience !== decoded.uid) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await ref.update({ read: true, readAt: new Date().toISOString() });
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error marking student notification read:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
