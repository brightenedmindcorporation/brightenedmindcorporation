import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

// Lists every announcement (admin management view — includes inactive
// ones too, unlike the public /api/announcements endpoint).
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const adminDb = getAdminDb();
    const snap = await adminDb.collection("announcements").orderBy("createdAt", "desc").get();
    const announcements = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ announcements });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}

// Images/videos are plain links (pasted by the admin) rather than
// uploaded files — Firebase Storage needs the paid Blaze plan, which
// this project isn't on, so file uploads are avoided entirely here.
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const body = await request.json();
    const { idToken, title, description, type, details, imageUrl, videoUrl } = body;
    await requireAdmin(idToken);

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "title et description sont requis." }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const docRef = await adminDb.collection("announcements").add({
      title: title.trim(),
      description: description.trim(),
      type: type === "job" ? "job" : "normal",
      details: details?.trim() || "",
      imageUrl: imageUrl?.trim() || null,
      videoUrl: videoUrl?.trim() || null,
      active: true,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
