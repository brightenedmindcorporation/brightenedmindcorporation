import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { sendGmailReply } from "@/lib/gmail";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, threadId, to, subject, body, inReplyToMessageId, references } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!threadId || !to || !subject || !body) {
      return NextResponse.json({ error: "Destinataire, sujet et message sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    await sendGmailReply({ threadId, to, subject, body, inReplyToMessageId, references });
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error sending Gmail reply:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
