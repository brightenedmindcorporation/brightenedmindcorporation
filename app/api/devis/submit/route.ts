import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Central landing point for every "Demander un devis" submission, across
 * all departments (Communication, Academia, Domestica). Persists to
 * Firestore for the admin "Devis" tab and notifies the central admin email
 * via Resend — the admin can then reply either by email (reply-to is the
 * requester's address) or on WhatsApp using the phone number collected.
 */
export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
    }

    let docId: string | null = null;
    if (isAdminConfigured()) {
      const docRef = await getAdminDb().collection("devisRequests").add({
        name: String(name).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : "",
        service: service || "Autre",
        message: String(message).trim(),
        status: "new",
        createdAt: new Date().toISOString(),
      });
      docId = docRef.id;
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
