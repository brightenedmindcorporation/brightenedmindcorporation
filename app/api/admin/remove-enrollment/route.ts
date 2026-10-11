import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/** Permanently deletes an enrollments/{uid}_{langCode} doc — distinct from
 * reject/revoke, which only change its status and keep the record. Used
 * for cleaning up spam/duplicate/mistaken registrations. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, enrollmentId } = await request.json();
    if (!idToken || !enrollmentId) {
      return NextResponse.json({ error: "idToken et enrollmentId sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await getAdminDb().collection("enrollments").doc(enrollmentId).delete();
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error removing enrollment:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
