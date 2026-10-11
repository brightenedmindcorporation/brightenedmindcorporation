import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/** Permanently deletes a legacy students/{uid} doc — distinct from
 * reject/revoke, which only change its status and keep the record. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, studentId } = await request.json();
    if (!idToken || !studentId) {
      return NextResponse.json({ error: "idToken et studentId sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await getAdminDb().collection("students").doc(studentId).delete();
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error removing student:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
