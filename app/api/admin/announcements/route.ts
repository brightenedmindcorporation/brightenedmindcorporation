import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAdminConfigured, getAdminAuth, getAdminDb, getAdminBucket } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${folder}/${randomUUID()}.${ext}`;
  const bucket = getAdminBucket();
  const blob = bucket.file(path);
  await blob.save(buffer, { contentType: file.type || "application/octet-stream" });
  await blob.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${path}`;
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

export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
    await requireAdmin(idToken);

    const title = form.get("title")?.toString()?.trim();
    const description = form.get("description")?.toString()?.trim();
    const type = form.get("type")?.toString() === "job" ? "job" : "normal";
    const details = form.get("details")?.toString()?.trim() || "";

    if (!title || !description) {
      return NextResponse.json({ error: "title et description sont requis." }, { status: 400 });
    }

    const imageFile = form.get("image");
    const videoFile = form.get("video");

    let imageUrl: string | null = null;
    let videoUrl: string | null = null;

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile, "announcements/images");
    }
    if (videoFile instanceof File && videoFile.size > 0) {
      videoUrl = await uploadFile(videoFile, "announcements/videos");
    }

    const adminDb = getAdminDb();
    const docRef = await adminDb.collection("announcements").add({
      title,
      description,
      type,
      details,
      imageUrl,
      videoUrl,
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
