import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { sendGmailMessage } from "@/lib/gmail";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, to, subject, body } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Destinataire, sujet et message sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await sendGmailMessage({ to, subject, body });
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error sending new Gmail message:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
