import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const ALLOWED_COLLECTIONS = ["projectRequests", "devisRequests", "jobApplications", "studentRequests"];

/**
 * Lets the admin reply to a project/devis/candidature submitter directly
 * from the admin panel instead of leaving the site to open Gmail — the
 * email is sent from the central BM Corporation address, with reply-to
 * set to the admin's own inbox so any further back-and-forth still lands
 * there normally.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "L'envoi d'email n'est pas configuré côté serveur." }, { status: 503 });
    }

    const { idToken, to, subject, message, collection, docId } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Destinataire, sujet et message sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "BM Corporation <onboarding@resend.dev>",
      to,
      replyTo: ADMIN_EMAIL,
      subject,
      html: `<div style="white-space: pre-wrap; font-family: sans-serif;">${String(message).replace(/\n/g, "<br/>")}</div>`,
    });

    if (collection && docId && ALLOWED_COLLECTIONS.includes(collection)) {
      const adminDb = getAdminDb();
      const update: Record<string, unknown> = { lastRepliedAt: new Date().toISOString() };
      if (collection !== "jobApplications") update.status = "contacted";
      await adminDb.collection(collection).doc(docId).update(update);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error sending admin reply:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
