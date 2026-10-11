import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/** Edits an existing certificate's details (e.g. fixing a typo in the
 * name before re-downloading it) or toggles its revoked flag. */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const { idToken, ...updates } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const allowed: Record<string, unknown> = {};
    for (const key of ["studentName", "studentEmail", "langCode", "level", "levelTitle", "average", "revoked"]) {
      if (key in updates) allowed[key] = updates[key];
    }

    await getAdminDb().collection("certificates").doc(id).update(allowed);
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error updating certificate:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await getAdminDb().collection("certificates").doc(id).delete();
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error deleting certificate:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
