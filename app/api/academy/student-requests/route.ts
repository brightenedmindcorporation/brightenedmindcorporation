import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const MAX_FILE_BYTES = 8 * 1024 * 1024;

const TYPE_LABELS: Record<string, string> = {
  complaint: "Plainte",
  concern: "Inquiétude",
  request: "Demande particulière",
  other: "Autre",
};

/**
 * Lets a logged-in student submit a complaint, concern, or special request
 * from their dashboard, with optional file attachments — previously the
 * only channel was emailing the administration directly. Persists to
 * Firestore (admin "Plaintes" tab), notifies the admin bell, and — same
 * "no Firebase Storage" reasoning as job applications — emails any
 * attachments to the admin directly rather than storing them anywhere.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
    const type = form.get("type")?.toString();
    const subject = form.get("subject")?.toString();
    const message = form.get("message")?.toString();

    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    if (!subject || !message) {
      return NextResponse.json({ error: "Sujet et message sont requis." }, { status: 400 });
    }
    const requestType = TYPE_LABELS[type || ""] ? (type as string) : "other";

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();

    // The Firebase Auth ID token's "name" claim is never set on this
    // project (registration stores the student's name in Firestore, not
    // on the Auth profile), so it always fell back to the email address
    // here. Look up the real name from students/enrollments instead.
    let realName: string | null = null;
    const legacySnap = await adminDb.collection("students").doc(decoded.uid).get();
    if (legacySnap.exists && legacySnap.data()?.name) {
      realName = legacySnap.data()!.name;
    } else {
      const enrollSnap = await adminDb.collection("enrollments").where("uid", "==", decoded.uid).limit(1).get();
      if (!enrollSnap.empty) realName = enrollSnap.docs[0].data().name || null;
    }
    const studentName = realName || decoded.name || decoded.email || "Étudiant";

    const attachments: { filename: string; content: Buffer }[] = [];
    for (const file of form.getAll("attachments")) {
      if (!(file instanceof File) || file.size === 0) continue;
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `Le fichier "${file.name}" dépasse 8 Mo.` }, { status: 400 });
      }
      attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
    }

    const docRef = await adminDb.collection("studentRequests").add({
      uid: decoded.uid,
      name: studentName,
      email: decoded.email || "",
      type: requestType,
      subject: String(subject).trim(),
      message: String(message).trim(),
      attachmentNames: attachments.map((a) => a.filename),
      status: "new",
      createdAt: new Date().toISOString(),
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: sendError } = await resend.emails.send({
          from: "Brightened Mind <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          replyTo: decoded.email || undefined,
          subject: `${TYPE_LABELS[requestType]} — ${subject}`,
          html: `
            <h2>${TYPE_LABELS[requestType]} d'un étudiant</h2>
            <p><b>Nom :</b> ${studentName}</p>
            <p><b>Email :</b> ${decoded.email}</p>
            <p><b>Sujet :</b> ${subject}</p>
            <p><b>Message :</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
          `,
          attachments: attachments.length ? attachments : undefined,
        });
        // The Resend SDK returns an {error} field on an API-level rejection
        // instead of throwing — not checking it meant a silently-dropped
        // email looked identical to a successful one everywhere this
        // pattern was used in this project.
        if (sendError) console.error("Resend rejected student request email (non-fatal):", sendError);
      } catch (emailError) {
        console.error("Error emailing student request (non-fatal):", emailError);
      }
    }

    try {
      await createNotification({
        audience: "admin",
        type: "student-request",
        title: `${TYPE_LABELS[requestType]} d'un étudiant`,
        message: `${studentName} — ${subject}`,
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
