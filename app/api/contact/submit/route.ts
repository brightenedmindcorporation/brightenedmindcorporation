import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

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

    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
    }

    const docRef = await getAdminDb().collection("projectRequests").add({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    });

    try {
      await createNotification({
        audience: "admin",
        type: "project-request",
        title: "Nouveau message « Parlons de votre projet »",
        message: `${String(name).trim()} a envoyé un message depuis le site`,
        link: "/academy/admin?tab=projects",
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
