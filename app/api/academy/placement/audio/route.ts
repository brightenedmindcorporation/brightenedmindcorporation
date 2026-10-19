import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;

/** The recording of the passage a student read aloud in their placement test, kept for the reviewer to listen to. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    if (!isCloudinaryConfigured()) return NextResponse.json({ error: "Hébergement des fichiers non configuré." }, { status: 503 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const form = await request.formData();
    const langCode = String(form.get("langCode") || "");
    const file = form.get("audio");
    if (!(file instanceof Blob) || file.size === 0) return NextResponse.json({ error: "Enregistrement vide." }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Enregistrement trop long." }, { status: 413 });

    const enrollment = await getAdminDb().collection("enrollments").doc(`${decoded.uid}_${langCode}`).get();
    if (enrollment.data()?.placement?.status !== "requested") return NextResponse.json({ error: "Aucun test en cours." }, { status: 403 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadBufferToCloudinary(buffer, `${decoded.uid}_${langCode}.webm`, "bm-placement", "video");
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Placement audio upload failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: error?.status || 500 });
  }
}
