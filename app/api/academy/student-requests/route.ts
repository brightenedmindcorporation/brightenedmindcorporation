import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

const TYPE_LABELS: Record<string, string> = {
  complaint: "Plainte",
  concern: "Inquiétude",
  request: "Demande particulière",
  other: "Autre",
};

/**
 * Lets a logged-in student submit a complaint, concern, or special request
 * from their dashboard — previously the only channel was emailing the
 * administration directly. Persists to Firestore (admin "Plaintes" tab)
 * and notifies the admin bell.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const { idToken, type, subject, message } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!subject || !message) {
      return NextResponse.json({ error: "Sujet et message sont requis." }, { status: 400 });
    }
    const requestType = TYPE_LABELS[type] ? type : "other";

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();

    const docRef = await adminDb.collection("studentRequests").add({
      uid: decoded.uid,
      name: decoded.name || decoded.email || "Étudiant",
      email: decoded.email || "",
      type: requestType,
      subject: String(subject).trim(),
      message: String(message).trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    });

    try {
      await createNotification({
        audience: "admin",
        type: "student-request",
        title: `${TYPE_LABELS[requestType]} d'un étudiant`,
        message: `${decoded.name || decoded.email} — ${subject}`,
        link: "/academy/admin",
      });
    } catch (notifError) {
      console.error("Error creating student request notification (non-fatal):", notifError);
    }

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error: any) {
    console.error("Error submitting student request:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
