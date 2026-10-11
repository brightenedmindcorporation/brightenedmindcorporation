import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const snap = await adminDb.collection("certificates").orderBy("issuedAt", "desc").get();
    const certificates = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ certificates });
  } catch (error: any) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}

/** Admin manually issues a certificate — the PDF is still generated
 * client-side (jsPDF needs a browser), this just records it, same shape
 * as a self-issued one but issuedBy: "admin" / source: "manual". */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, studentName, studentEmail, langCode, level, levelTitle, average, certificateId } = await request.json();
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!studentName || !certificateId) {
      return NextResponse.json({ error: "Nom de l'étudiant et identifiant de certificat requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    await adminDb.collection("certificates").doc(certificateId).set({
      certificateId,
      uid: null,
      studentName,
      studentEmail: studentEmail || null,
      langCode: langCode || null,
      level: level || null,
      levelTitle: levelTitle || null,
      average: average ?? null,
      issuedAt: new Date().toISOString(),
      issuedBy: "admin",
      source: "manual",
      revoked: false,
    });

    if (studentEmail) {
      try {
        await createNotification({
          audience: "admin",
          type: "certificate-issued",
          title: "Certificat émis manuellement",
          message: `${studentName} — ${levelTitle || certificateId}`,
          link: "/academy/admin",
        });
      } catch {}
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error issuing certificate:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
