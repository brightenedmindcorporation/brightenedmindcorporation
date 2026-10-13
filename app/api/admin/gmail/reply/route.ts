import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { sendGmailReply, type GmailAttachment } from "@/lib/gmail";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const MAX_FILE_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
    const from = form.get("from")?.toString();
    const threadId = form.get("threadId")?.toString();
    const to = form.get("to")?.toString();
    const subject = form.get("subject")?.toString();
    const body = form.get("body")?.toString();
    const inReplyToMessageId = form.get("inReplyToMessageId")?.toString();
    const references = form.get("references")?.toString();

    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!threadId || !to || !subject || !body) {
      return NextResponse.json({ error: "Destinataire, sujet et message sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const attachments: GmailAttachment[] = [];
    for (const file of form.getAll("attachments")) {
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `Le fichier "${file.name}" dépasse 8 Mo.` }, { status: 400 });
      }
      attachments.push({
        filename: file.name,
        mimeType: file.type || "application/octet-stream",
        content: Buffer.from(await file.arrayBuffer()),
      });
    }

    await sendGmailReply({ from, threadId, to, subject, body, inReplyToMessageId, references, attachments });
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error sending Gmail reply:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
