import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { sanitizeDocumentSettings } from "@/lib/academy/documentSettings";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/** Saves the editable certificate/document wording (admin only). */
export async function PUT(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, settings } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const clean = sanitizeDocumentSettings(settings);
    await getAdminDb().collection("config").doc("documents").set({ ...clean, updatedAt: new Date().toISOString() });
    return NextResponse.json({ status: "success", settings: clean });
  } catch (error: any) {
    console.error("Error saving document settings:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
