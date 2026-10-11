import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const MAX_FILE_BYTES = 8 * 1024 * 1024;

/** Lets the admin email one or several enrolled students directly from the
 * panel (a specific student, or a broadcast list), with attachments —
 * same email-attachment approach as everywhere else in this project since
 * there's no Firebase Storage. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "L'envoi d'email n'est pas configuré côté serveur." }, { status: 503 });
    }

    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
    const subject = form.get("subject")?.toString();
    const body = form.get("body")?.toString();
    const recipients = form.getAll("recipients").map((r) => r.toString()).filter(Boolean);

    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!subject || !body || recipients.length === 0) {
      return NextResponse.json({ error: "Destinataire(s), sujet et message sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    for (const file of form.getAll("attachments")) {
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `Le fichier "${file.name}" dépasse 8 Mo.` }, { status: 400 });
      }
      attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
    }

    // bcc, not to, when there's more than one recipient — a broadcast
    // shouldn't expose every student's email address to the others.
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "BM Corporation Academy <onboarding@resend.dev>",
      to: recipients.length === 1 ? recipients[0] : ADMIN_EMAIL,
      bcc: recipients.length > 1 ? recipients : undefined,
      replyTo: ADMIN_EMAIL,
      subject,
      html: `<div style="white-space: pre-wrap; font-family: sans-serif;">${String(body).replace(/\n/g, "<br/>")}</div>`,
      attachments: attachments.length ? attachments : undefined,
    });

    return NextResponse.json({ status: "success", sentTo: recipients.length });
  } catch (error: any) {
    console.error("Error messaging students:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
