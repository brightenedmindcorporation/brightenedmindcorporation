import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB per file — keeps the notification email well under common inbox attachment limits.

async function isRealEmail(email: string): Promise<boolean> {
  if (!EMAIL_REGEX.test(email)) return false;
  try {
    const mxRecords = await dns.resolveMx(email.split("@")[1]);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

async function toAttachment(file: File) {
  if (file.size > MAX_FILE_BYTES) {
    throw { status: 400, message: `Le fichier "${file.name}" dépasse la taille maximale autorisée (8 Mo).` };
  }
  // Read the file's bytes once and reuse the same buffer for both the email
  // attachment and the Cloudinary upload, instead of letting Cloudinary
  // re-read the same File a second time.
  const buffer = Buffer.from(await file.arrayBuffer());

  let url: string | null = null;
  if (isCloudinaryConfigured()) {
    try {
      url = await uploadBufferToCloudinary(buffer, file.name, "job-applications", "raw");
    } catch (uploadError) {
      console.error("Error uploading candidate file to Cloudinary (non-fatal):", uploadError);
    }
  }

  return { filename: file.name, content: buffer, url };
}

/**
 * No Firebase Storage on this project (it requires the paid Blaze plan), so
 * candidate files are read into memory, attached directly to the admin
 * notification email via Resend, AND (when Cloudinary is configured)
 * uploaded there too so the admin can still open them from the
 * "Candidatures" tab after the email is long gone.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "L'envoi d'email n'est pas configuré côté serveur. Contactez l'administration directement." },
        { status: 503 }
      );
    }

    const form = await request.formData();
    const announcementId = form.get("announcementId")?.toString();
    const name = form.get("name")?.toString()?.trim();
    const email = form.get("email")?.toString()?.trim();
    const phone = form.get("phone")?.toString()?.trim() || "";
    const message = form.get("message")?.toString()?.trim() || "";
    const cvFile = form.get("cv");

    if (!announcementId || !name || !email || !phone) {
      return NextResponse.json({ error: "Nom, email, téléphone et offre sont requis." }, { status: 400 });
    }
    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ error: "Le CV est obligatoire." }, { status: 400 });
    }

    if (!(await isRealEmail(email))) {
      return NextResponse.json(
        { error: "Cette adresse email semble invalide : son domaine ne peut pas recevoir d'emails." },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();
    const announcementSnap = await adminDb.collection("announcements").doc(announcementId).get();
    if (!announcementSnap.exists) {
      return NextResponse.json({ error: "Offre introuvable." }, { status: 404 });
    }
    const announcementTitle = announcementSnap.data()?.title || "Offre";

    const coverLetterFile = form.get("coverLetter");
    const referenceLetterFile = form.get("referenceLetter");
    const otherFiles = form.getAll("otherDocuments").filter((f): f is File => f instanceof File && f.size > 0).slice(0, 5);

    const attachments = [await toAttachment(cvFile)];
    if (coverLetterFile instanceof File && coverLetterFile.size > 0) {
      attachments.push(await toAttachment(coverLetterFile));
    }
    if (referenceLetterFile instanceof File && referenceLetterFile.size > 0) {
      attachments.push(await toAttachment(referenceLetterFile));
    }
    for (const file of otherFiles) {
      attachments.push(await toAttachment(file));
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // The admin email with the attached files is the only place these
    // files end up — if it fails to send, the application must be
    // treated as failed rather than silently lost.
    await resend.emails.send({
      from: "Brightened Mind <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Nouvelle candidature — ${announcementTitle}`,
      html: `
        <h2>Nouvelle candidature</h2>
        <p><b>Offre :</b> ${announcementTitle}</p>
        <p><b>Nom :</b> ${name}</p>
        <p><b>Email :</b> ${email}</p>
        <p><b>Téléphone :</b> ${phone || "-"}</p>
        <p><b>Message :</b> ${message || "-"}</p>
        <p>Pièces jointes : ${attachments.map((a) => a.filename).join(", ")}</p>
      `,
      attachments: attachments.map(({ filename, content }) => ({ filename, content })),
    });

    const docRef = await adminDb.collection("jobApplications").add({
      announcementId,
      announcementTitle,
      name,
      email,
      phone,
      message,
      attachmentNames: attachments.map((a) => a.filename),
      attachments: attachments.map((a) => ({ name: a.filename, url: a.url })),
      status: "new",
      createdAt: new Date().toISOString(),
    });

    try {
      await createNotification({
        audience: "admin",
        type: "job-application",
        title: "Nouvelle candidature",
        message: `${name} a postulé — ${announcementTitle}`,
        link: "/academy/admin?tab=applications",
      });
    } catch (notifError) {
      console.error("Error creating job application notification (non-fatal):", notifError);
    }

    try {
      await resend.emails.send({
        from: "Brightened Mind <onboarding@resend.dev>",
        to: email,
        subject: `Candidature reçue — ${announcementTitle}`,
        html: `
          <h2>Merci ${name} !</h2>
          <p>Nous avons bien reçu votre candidature pour : <b>${announcementTitle}</b>.</p>
          <p>Notre équipe va étudier votre dossier et reviendra vers vous à cette adresse email.</p>
        `,
      });
    } catch (confirmationError) {
      // Non-fatal: the admin already has the application + files.
      console.error("Error sending candidate confirmation email (non-fatal):", confirmationError);
    }

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error: any) {
    console.error("Error submitting job application:", error);
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
