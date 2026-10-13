import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { reserveCertificateNumber } from "@/lib/academy/certificateNumber";

/** Returns (reserving it on first call) the certificate number for the
 * signed-in student's language + level. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, langCode, level } = await request.json();
    if (!idToken || !langCode || !level) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const certificateId = await reserveCertificateNumber(decoded.uid, String(langCode), Number(level));
    return NextResponse.json({ certificateId });
  } catch (error: any) {
    console.error("Error reserving certificate number:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
