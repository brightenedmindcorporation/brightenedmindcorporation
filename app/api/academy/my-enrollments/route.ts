import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

/**
 * Returns the signed-in caller's own profile + enrollments, used by the
 * login page. Goes through the Admin SDK instead of the client SDK
 * reading `students`/`enrollments` directly in the browser — `enrollments`
 * is a newer collection with no Firestore security rule of its own yet,
 * so a client-side read of it throws permission-denied, which previously
 * broke every login attempt right after the password check succeeded
 * (same root cause as the admin panel showing zero students — see
 * /api/admin/students).
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const uid = decoded.uid;

    const adminDb = getAdminDb();
    const [studentSnap, enrollmentsSnap] = await Promise.all([
      adminDb.collection("students").doc(uid).get(),
      adminDb.collection("enrollments").where("uid", "==", uid).get(),
    ]);

    if (!studentSnap.exists) {
      return NextResponse.json({ error: "Compte étudiant introuvable dans la base de données." }, { status: 404 });
    }

    const student = studentSnap.data()!;
    let enrollments: any[] = enrollmentsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    // Legacy accounts created before multi-enrollment support carry their
    // single langCode/level/status/matricule directly on students/{uid}.
    if (enrollments.length === 0 && student.langCode) {
      enrollments = [
        {
          id: uid,
          langCode: student.langCode,
          level: student.level,
          studyDays: student.studyDays,
          status: student.status,
          matricule: student.matricule,
        },
      ];
    }

    return NextResponse.json({
      student: { name: student.name, email: student.email },
      enrollments,
    });
  } catch (error: any) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
