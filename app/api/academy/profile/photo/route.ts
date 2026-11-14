import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import sharp from "sharp";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BYTES = 12 * 1024 * 1024;

async function caller(request: Request) {
  const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!idToken) throw Object.assign(new Error("Reconnectez-vous puis réessayez."), { status: 401 });
  return getAdminAuth().verifyIdToken(idToken);
}

/** Profile photo: turned upright, cropped to a square on the face area, shrunk to 480 px, saved as a light WebP. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
    const decoded = await caller(request);
    const form = await request.formData();
    const file = form.get("photo");
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Aucune photo reçue." }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Cette photo est trop lourde (12 Mo maximum)." }, { status: 400 });
    if (file.type && !file.type.startsWith("image/")) return NextResponse.json({ error: "Ce fichier n'est pas une image." }, { status: 400 });
    if (!isCloudinaryConfigured()) return NextResponse.json({ error: "L'envoi de photos n'est pas disponible pour le moment." }, { status: 503 });

    let out: Buffer;
    try {
      out = await sharp(Buffer.from(await file.arrayBuffer()), { failOn: "none" })
        .rotate()
        .resize(480, 480, { fit: "cover", position: sharp.strategy.attention })
        .webp({ quality: 78, effort: 4 })
        .toBuffer();
    } catch {
      return NextResponse.json({ error: "Cette image n'a pas pu être lue. Essayez une photo JPG ou PNG." }, { status: 400 });
    }
    const url = await uploadBufferToCloudinary(out, `${decoded.uid}.webp`, "profile-photos", "image");
    await getAdminDb().collection("students").doc(decoded.uid).set({ photoUrl: url, profileUpdatedAt: new Date().toISOString() }, { merge: true });
    return NextResponse.json({ ok: true, url });
  } catch (error: any) {
    console.error("Profile photo upload failed:", error);
    return NextResponse.json({ error: error?.status === 401 ? error.message : "L'envoi de la photo a échoué. Réessayez." }, { status: error?.status || 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
    const decoded = await caller(request);
    await getAdminDb().collection("students").doc(decoded.uid).set({ photoUrl: FieldValue.delete() }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.status === 401 ? error.message : "La suppression a échoué." }, { status: error?.status || 500 });
  }
}
