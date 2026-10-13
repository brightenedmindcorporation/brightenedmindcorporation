import { mailFrom } from "@/lib/mailFrom";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

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
    // regardless of Resend's domain-verification status. Each recipient's
    // notification carries the same batchId as the adminMessages summary
    // doc below, so the admin can later edit or delete this broadcast as
    // one unit (editing/deleting every per-recipient notification too)
    // instead of it being fire-and-forget.
    const adminDb = getAdminDb();
    const createdAt = new Date().toISOString();
    const batchRef = adminDb.collection("adminMessages").doc();
    const batchId = batchRef.id;

    await Promise.all(
      recipients.map((r) =>
        adminDb
          .collection("notifications")
          .add({
            audience: r.uid,
            type: "admin-message",
            title: subject,
            message: body,
            link: "/academy/dashboard",
            read: false,
            createdAt,
            batchId,
          })
          .catch((err) => console.error(`Error notifying ${r.uid} (non-fatal):`, err))
      )
    );

    await batchRef.set({
      subject,
      body,
      recipients,
      attachmentNames: attachments.map((a) => a.filename),
      createdAt,
    });

    let emailWarning: string | null = null;
    if (process.env.RESEND_API_KEY) {
      const emails = recipients.map((r) => r.email).filter(Boolean);
      const resend = new Resend(process.env.RESEND_API_KEY);
      // One email per student: nobody sees the other addresses, and the
      // admin no longer gets a stray copy of every broadcast (the old
      // single bcc send needed a visible "to", which was the admin). Paced
      // below Resend's 2 requests/second default limit.
      let failed = 0;
      let lastError = "";
      for (let i = 0; i < emails.length; i++) {
        if (i > 0) await new Promise((r) => setTimeout(r, 600));
        const { error: sendError } = await resend.emails.send({
          from: mailFrom("BM Corporation Academia"),
          to: emails[i],
          replyTo: ADMIN_EMAIL,
          subject,
          html: `<div style="white-space: pre-wrap; font-family: sans-serif;">${String(body).replace(/\n/g, "<br/>")}</div>`,
          attachments: attachments.length ? attachments : undefined,
        });
        if (sendError) {
          failed++;
          lastError = sendError.message;
          console.error("Resend rejected email to a student:", sendError);
        }
      }
      if (failed > 0) {
        emailWarning = `${failed} email(s) sur ${emails.length} n'ont pas pu partir${lastError ? ` (${lastError})` : ""} — la notification dans le tableau de bord a bien été envoyée à tous.`;
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
