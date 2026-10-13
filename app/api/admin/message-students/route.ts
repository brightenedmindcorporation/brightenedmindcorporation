import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const MAX_FILE_BYTES = 8 * 1024 * 1024;

interface Recipient {
  uid: string;
  email: string;
}

/** Lets the admin message one or several enrolled students directly from
 * the panel (a specific student, or a broadcast list), with attachments.
 * Always records a Firestore notification per recipient (shows up in
 * their dashboard bell) — email is a best-effort addition on top, not the
 * only delivery channel, since a Resend sandbox account can only
 * actually deliver to the account owner's own address until a domain is
 * verified (resend.com/domains). */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
    const subject = form.get("subject")?.toString();
    const body = form.get("body")?.toString();
    let recipients: Recipient[] = [];
    try {
      recipients = JSON.parse(form.get("recipients")?.toString() || "[]");
    } catch {
      return NextResponse.json({ error: "Destinataires invalides." }, { status: 400 });
    }

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

    // Notification first — this is the channel guaranteed to work
    // regardless of Resend's domain-verification status.
    await Promise.all(
      recipients.map((r) =>
        createNotification({
          audience: r.uid,
          type: "admin-message",
          title: subject,
          message: body,
          link: "/academy/dashboard",
        }).catch((err) => console.error(`Error notifying ${r.uid} (non-fatal):`, err))
      )
    );

    let emailWarning: string | null = null;
    if (process.env.RESEND_API_KEY) {
      const emails = recipients.map((r) => r.email);
      const resend = new Resend(process.env.RESEND_API_KEY);
      // bcc, not to, when there's more than one recipient — a broadcast
      // shouldn't expose every student's email address to the others.
      const { error: sendError } = await resend.emails.send({
        from: "BM Corporation Academia <onboarding@resend.dev>",
        to: emails.length === 1 ? emails[0] : ADMIN_EMAIL,
        bcc: emails.length > 1 ? emails : undefined,
        replyTo: ADMIN_EMAIL,
        subject,
        html: `<div style="white-space: pre-wrap; font-family: sans-serif;">${String(body).replace(/\n/g, "<br/>")}</div>`,
        attachments: attachments.length ? attachments : undefined,
      });
      if (sendError) {
        console.error("Resend rejected broadcast email:", sendError);
        emailWarning = sendError.message || "L'envoi de l'email a échoué (voir la notification dans leur tableau de bord à la place).";
      }
    } else {
      emailWarning = "Email non configuré côté serveur — seule la notification dans le tableau de bord a été envoyée.";
    }

    return NextResponse.json({ status: "success", sentTo: recipients.length, emailWarning });
  } catch (error: any) {
    console.error("Error messaging students:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
