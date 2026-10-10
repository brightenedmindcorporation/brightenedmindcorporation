import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const VALID_STATUSES = ["new", "reviewing", "accepted", "rejected"];

async function sendAcknowledgementEmail(email: string, name: string, title: string) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Brightened Mind <onboarding@resend.dev>",
    to: email,
    subject: `Votre candidature — ${title}`,
    html: `
      <p>Bonjour ${name},</p>
      <p>Nous vous confirmons la bonne réception de votre candidature pour le poste de <b>${title}</b>.</p>
      <p>Notre équipe étudie actuellement votre dossier et vous recevrez une réponse d'ici peu, directement par email.</p>
      <p>Si vous êtes retenu(e), vous en serez informé(e) par ce même canal. Dans le cas contraire, n'hésitez pas à postuler à nouveau — pour ce poste ou pour un autre — dès qu'une opportunité correspondant à votre profil se présentera.</p>
      <p>Merci pour votre intérêt envers BM Corporation.</p>
      <p>Cordialement,<br/>L'équipe BM Corporation</p>
    `,
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { id } = await params;
    const { idToken, status } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const docRef = adminDb.collection("jobApplications").doc(id);
    const snap = await docRef.get();
    await docRef.update({ status });

    if (status === "accepted" && snap.exists) {
      const data = snap.data()!;
      try {
        await sendAcknowledgementEmail(data.email, data.name, data.announcementTitle || "Offre");
      } catch (emailError) {
        console.error("Error sending acceptance acknowledgement email (non-fatal):", emailError);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error updating job application:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
