import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { rejectIfFakeEmail } from "@/lib/emailValidation";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

/**
 * Persists a copy of a homepage Contact form submission to Firestore so it
 * shows up in the admin "Projets" tab. The actual notification to BM
 * Corporation still goes out via EmailJS directly from Contact.tsx — this
 * call only adds a durable record, so it's fire-and-forget from the client
 * and never blocks the EmailJS send.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    const name = form.get("name")?.toString()?.trim();
    const email = form.get("email")?.toString()?.trim();
    const message = form.get("message")?.toString()?.trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
    }
    const fakeEmail = await rejectIfFakeEmail(email);
    if (fakeEmail) return fakeEmail;

    let attachmentUrl: string | null = null;
    let attachmentName: string | null = null;
    const attachmentFile = form.get("attachment");
    if (attachmentFile instanceof File && attachmentFile.size > 0) {
      if (attachmentFile.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "Le fichier dépasse la taille maximale autorisée (8 Mo)." }, { status: 400 });
      }
      if (isCloudinaryConfigured()) {
        attachmentUrl = await uploadToCloudinary(attachmentFile, "project-requests", "raw");
        attachmentName = attachmentFile.name;
      }
    }

    const docRef = await getAdminDb().collection("projectRequests").add({
      name,
      email,
      message,
      attachmentUrl,
      attachmentName,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    try {
      await createNotification({
        audience: "admin",
        type: "project-request",
        title: "Nouveau message « Parlons de votre projet »",
        message: `${String(name).trim()} a envoyé un message depuis le site`,
        link: "/admin?tab=projects",
      });
    } catch (notifError) {
      console.error("Error creating project request notification (non-fatal):", notifError);
    }

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error: any) {
    console.error("Error storing project request:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
