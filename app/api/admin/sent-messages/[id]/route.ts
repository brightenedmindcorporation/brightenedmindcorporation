import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

// Edits an already-sent message's subject/body — only the Firestore
// notification students see in their dashboard bell can actually be
// corrected this way (an email already delivered cannot be recalled).
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const { subject, body } = await request.json();
    if (!subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "Sujet et message sont requis." }, { status: 400 });
    }

    const { id } = await params;
    const adminDb = getAdminDb();

    await adminDb.collection("adminMessages").doc(id).update({ subject, body });

    const notifSnap = await adminDb.collection("notifications").where("batchId", "==", id).get();
    const batch = adminDb.batch();
    notifSnap.docs.forEach((doc) => batch.update(doc.ref, { title: subject, message: body }));
    await batch.commit();

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}

// Withdraws a sent message: deletes the summary doc and every per-recipient
// notification it created, so it disappears from students' dashboards too.
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const { id } = await params;
    const adminDb = getAdminDb();

    const notifSnap = await adminDb.collection("notifications").where("batchId", "==", id).get();
    const batch = adminDb.batch();
    notifSnap.docs.forEach((doc) => batch.delete(doc.ref));
    batch.delete(adminDb.collection("adminMessages").doc(id));
    await batch.commit();

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
