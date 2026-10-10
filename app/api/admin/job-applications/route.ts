import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

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
    const snap = await adminDb.collection("jobApplications").orderBy("createdAt", "desc").get();
    const applications = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ applications });
  } catch (error: any) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
