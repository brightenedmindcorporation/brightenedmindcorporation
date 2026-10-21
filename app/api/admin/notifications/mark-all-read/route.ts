import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const snap = await adminDb.collection("notifications").where("audience", "==", "admin").get();
    const unread = snap.docs.filter((doc) => doc.data().read === false);
    if (unread.length > 0) {
      const batch = adminDb.batch();
      unread.forEach((doc) => batch.update(doc.ref, { read: true, readAt: new Date().toISOString() }));
      await batch.commit();
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error marking all admin notifications read:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
