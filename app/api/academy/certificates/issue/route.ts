import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

/** Records that a student self-generated their certificate (the PDF itself
 * is produced client-side via jsPDF, see CertificateButton.tsx — this just
 * gives the admin a server-side record of what was issued, to whom, when). */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const { idToken, langCode, level, levelTitle, studentName, average, certificateId } = await request.json();
    if (!idToken || !certificateId) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();

    await adminDb.collection("certificates").doc(certificateId).set(
      {
        certificateId,
        uid: decoded.uid,
        studentName: studentName || decoded.name || decoded.email || "Étudiant",
        langCode: langCode || null,
        level: level || null,
        levelTitle: levelTitle || null,
        average: average ?? null,
        issuedAt: new Date().toISOString(),
        issuedBy: "self",
        source: "level-completion",
        revoked: false,
      },
      { merge: true }
    );

    try {
      await createNotification({
        audience: "admin",
        type: "certificate-issued",
        title: "Certificat généré",
        message: `${studentName || decoded.email} a obtenu son certificat — ${levelTitle || ""}`,
        link: "/academy/admin",
      });
    } catch (notifError) {
      console.error("Error creating certificate notification (non-fatal):", notifError);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error recording certificate issuance:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
