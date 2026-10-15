import { mailFrom } from "@/lib/mailFrom";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { sendGmailMessage, type GmailAttachment } from "@/lib/gmail";
import { sendWithText } from "@/lib/mailText";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const ALLOWED_COLLECTIONS = ["projectRequests", "devisRequests", "jobApplications", "studentRequests"];
const MAX_FILE_BYTES = 8 * 1024 * 1024;

// Each collection's board uses its own status vocabulary — applying the
// same "contacted" value to all of them (as a previous version of this
// route did) silently wrote a status studentRequests never checks for,
// so a reply there never visibly changed anything.
const CONTACTED_STATUS: Record<string, string> = {
  projectRequests: "contacted",
  devisRequests: "contacted",
  studentRequests: "reviewing",
};

/**
 * Lets the admin reply to a project/devis/candidature/student-message
 * submitter directly from the admin panel instead of leaving the site to
 * open Gmail — the email is sent from the central BM Corporation address,
 * with reply-to set to the admin's own inbox so any further back-and-forth
 * still lands there normally. Supports attachments (emailed, same
 * no-Firebase-Storage pattern as everywhere else in this project).
 */
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
    const to = form.get("to")?.toString();
    const subject = form.get("subject")?.toString();
    const message = form.get("message")?.toString();
    const collection = form.get("collection")?.toString();
    const docId = form.get("docId")?.toString();
    const via = form.get("via")?.toString() === "resend" ? "resend" : "gmail";

    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Destinataire, sujet et message sont requis." }, { status: 400 });
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

    // Preferred path: send through the admin's own Gmail account. Mail from a
    // Gmail account lands in the recipient's inbox far more reliably than
    // mail from a brand-new domain (which Gmail often files as spam), and
    // the customer's answer comes straight back to the admin's mailbox.
    let sentVia: "gmail" | "resend" = "resend";
    let sendError: { message?: string } | null = null;
    if (via === "gmail") {
      try {
        const gmailAttachments: GmailAttachment[] = attachments.map((a, i) => ({
          filename: a.filename,
          mimeType: "application/octet-stream",
          content: a.content,
        }));
        await sendGmailMessage({ from: ADMIN_EMAIL, to, subject, body: String(message), attachments: gmailAttachments });
        sentVia = "gmail";
      } catch (gmailError: any) {
        console.error("Gmail send failed, falling back to Resend:", gmailError);
      }
    }

    if (sentVia !== "gmail") {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const html = `<div style="white-space: pre-wrap; font-family: sans-serif;">${String(message).replace(/\n/g, "<br/>")}</div>`;
      const result = await sendWithText(resend, {
        from: mailFrom("BM Corporation"),
        to,
        replyTo: ADMIN_EMAIL,
        subject,
        html,
        attachments: attachments.length ? attachments : undefined,
      });
      sendError = result.error;
    }

    // The Resend SDK returns an {error} field on an API-level rejection
    // instead of throwing — not checking it meant a reply could "succeed"
    // in the admin panel while Resend silently dropped it, which is
    // exactly how a student could never receive a reply with no error
    // ever surfacing anywhere.
    if (sendError) {
      console.error("Resend rejected admin reply:", sendError);
      return NextResponse.json({ error: sendError.message || "L'envoi de l'email a échoué." }, { status: 502 });
    }

    if (collection && docId && ALLOWED_COLLECTIONS.includes(collection)) {
      const adminDb = getAdminDb();
      const update: Record<string, unknown> = { lastRepliedAt: new Date().toISOString() };
      if (collection in CONTACTED_STATUS) update.status = CONTACTED_STATUS[collection];
      await adminDb.collection(collection).doc(docId).update(update);
    }

    return NextResponse.json({ status: "success", sentVia });
  } catch (error: any) {
    console.error("Error sending admin reply:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
