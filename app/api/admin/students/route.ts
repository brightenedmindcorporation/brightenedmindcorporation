import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Lists every student row for the admin panel: new-style `enrollments`
 * docs (one per uid+language/program) plus any legacy `students/{uid}`
 * doc that still carries its langCode/level/status directly (accounts
 * created before multi-enrollment support).
 *
 * Goes through the Admin SDK instead of the client SDK reading
 * `enrollments`/`students` directly in the browser. The client-side read
 * depends on Firestore security rules being configured for both
 * collections — `enrollments` is new and has no rule yet, so that read
 * was throwing permission-denied and (via Promise.all) taking the whole
 * admin student list down to zero, including the otherwise-fine
 * `students` read. This route sidesteps that entirely, the same reasoning
 * as every other admin route in this app.
 */
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
    const [enrollmentsSnap, studentsSnap] = await Promise.all([
      adminDb.collection("enrollments").get(),
      adminDb.collection("students").get(),
    ]);

    const enrollmentRows = enrollmentsSnap.docs.map((doc) => ({
      id: doc.id,
      kind: "enrollment" as const,
      ...doc.data(),
    }));

    const legacyRows = studentsSnap.docs
      .filter((doc) => doc.data().langCode && doc.data().status)
      .map((doc) => ({
        id: doc.id,
        kind: "legacyStudent" as const,
        ...doc.data(),
      }));

    return NextResponse.json({ students: [...enrollmentRows, ...legacyRows] });
  } catch (error: any) {
    console.error("Error fetching admin students:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
