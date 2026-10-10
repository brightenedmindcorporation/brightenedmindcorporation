import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import dns from "node:dns/promises";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb, getAdminBucket } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

async function isRealEmail(email: string): Promise<boolean> {
  if (!EMAIL_REGEX.test(email)) return false;
  try {
    const mxRecords = await dns.resolveMx(email.split("@")[1]);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${folder}/${randomUUID()}.${ext}`;
  const bucket = getAdminBucket();
  const blob = bucket.file(path);
  await blob.save(buffer, { contentType: file.type || "application/octet-stream" });
  await blob.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    const announcementId = form.get("announcementId")?.toString();
    const name = form.get("name")?.toString()?.trim();
    const email = form.get("email")?.toString()?.trim();
    const phone = form.get("phone")?.toString()?.trim() || "";
    const message = form.get("message")?.toString()?.trim() || "";
    const cvFile = form.get("cv");

    if (!announcementId || !name || !email) {
      return NextResponse.json({ error: "Nom, email et offre sont requis." }, { status: 400 });
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

    const cvUrl = await uploadFile(cvFile, "job-applications/cv");

    const coverLetterFile = form.get("coverLetter");
    const referenceLetterFile = form.get("referenceLetter");
    const coverLetterUrl =
      coverLetterFile instanceof File && coverLetterFile.size > 0
        ? await uploadFile(coverLetterFile, "job-applications/cover-letters")
        : null;
    const referenceLetterUrl =
      referenceLetterFile instanceof File && referenceLetterFile.size > 0
        ? await uploadFile(referenceLetterFile, "job-applications/reference-letters")
        : null;

    const docRef = await adminDb.collection("jobApplications").add({
      announcementId,
      announcementTitle,
      name,
      email,
      phone,
      message,
      cvUrl,
      coverLetterUrl,
      referenceLetterUrl,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
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
        await resend.emails.send({
          from: "Brightened Mind <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          subject: `Nouvelle candidature — ${announcementTitle}`,
          html: `
            <h2>Nouvelle candidature</h2>
            <p><b>Offre :</b> ${announcementTitle}</p>
            <p><b>Nom :</b> ${name}</p>
            <p><b>Email :</b> ${email}</p>
            <p><b>Téléphone :</b> ${phone || "-"}</p>
            <p><b>Message :</b> ${message || "-"}</p>
            <p><b>CV :</b> <a href="${cvUrl}">${cvUrl}</a></p>
            ${coverLetterUrl ? `<p><b>Lettre de motivation :</b> <a href="${coverLetterUrl}">${coverLetterUrl}</a></p>` : ""}
            ${referenceLetterUrl ? `<p><b>Lettre de référence :</b> <a href="${referenceLetterUrl}">${referenceLetterUrl}</a></p>` : ""}
          `,
        });
      } catch (emailError) {
        console.error("Error sending application emails (non-fatal):", emailError);
      }
    }

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error: any) {
    console.error("Error submitting job application:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
