import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const MAX_FILE_BYTES = 8 * 1024 * 1024;

/**
 * Central landing point for every "Demander un devis" submission, across
 * all departments (Communication, Academia, Domestica). Persists to
 * Firestore for the admin "Devis" tab and notifies the central admin email
 * via Resend — the admin can then reply either by email (reply-to is the
 * requester's address) or on WhatsApp using the phone number collected.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = form.get("name")?.toString()?.trim();
    const email = form.get("email")?.toString()?.trim();
    const phone = form.get("phone")?.toString()?.trim() || "";
    const service = form.get("service")?.toString() || "Autre";
    const message = form.get("message")?.toString()?.trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
    }

    let attachmentUrl: string | null = null;
    let attachmentName: string | null = null;
    const attachmentFile = form.get("attachment");
    if (attachmentFile instanceof File && attachmentFile.size > 0) {
      if (attachmentFile.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "Le fichier dépasse la taille maximale autorisée (8 Mo)." }, { status: 400 });
      }
      if (isCloudinaryConfigured()) {
        attachmentUrl = await uploadToCloudinary(attachmentFile, "devis-requests", "raw");
        attachmentName = attachmentFile.name;
      }
    }

    let docId: string | null = null;
    if (isAdminConfigured()) {
      const docRef = await getAdminDb().collection("devisRequests").add({
        name,
        email,
        phone,
        service,
        message,
        attachmentUrl,
        attachmentName,
        status: "new",
        createdAt: new Date().toISOString(),
      });
      docId = docRef.id;

      try {
        await createNotification({
          audience: "admin",
          type: "devis-request",
          title: "Nouvelle demande de devis",
          message: `${String(name).trim()} — ${service || "Autre"}`,
          link: "/admin?tab=devis",
        });
      } catch (notifError) {
        console.error("Error creating devis notification (non-fatal):", notifError);
      }
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Brightened Mind <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `Nouvelle demande de devis — ${service || "Autre"}`,
        html: `
          <h2>Nouvelle demande de devis</h2>
          <p><b>Service :</b> ${service || "Autre"}</p>
          <p><b>Nom :</b> ${name}</p>
          <p><b>Email :</b> ${email}</p>
          <p><b>Téléphone / WhatsApp :</b> ${phone || "-"}</p>
          <p><b>Détails :</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    if (!docId && !process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    return NextResponse.json({ status: "success", id: docId });
  } catch (error: any) {
    console.error("Error submitting devis request:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
