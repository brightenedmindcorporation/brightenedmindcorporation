import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

// Lists every scheduled live session (admin management view — includes
// past sessions too, unlike the public /api/live-sessions endpoint).
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const adminDb = getAdminDb();
    const snap = await adminDb.collection("liveSessions").orderBy("scheduledAt", "desc").get();
    const sessions = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ sessions });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const body = await request.json();
    const { idToken, langCode, level, scheduledAt, durationMinutes, title } = body;
    await requireAdmin(idToken);

    if (!langCode || !level || !scheduledAt) {
      return NextResponse.json({ error: "langCode, level et scheduledAt sont requis." }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const docRef = await adminDb.collection("liveSessions").add({
      langCode,
      level: Number(level),
      scheduledAt,
      durationMinutes: Number(durationMinutes) || 60,
      title: title || null,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
