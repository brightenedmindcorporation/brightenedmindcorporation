import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth } from "@/lib/firebase-admin";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BYTES = 10 * 1024 * 1024;

/**
 * A student whose browser cannot recognise speech records their voice reading the passage of a quiz; the file is
 * kept on Cloudinary and its address goes to the administration with the quiz (see writing/submit), which listens to it.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Service indisponible pour le moment." }, { status: 503 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "Reconnectez-vous puis réessayez." }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const form = await request.formData();
    const file = form.get("audio");
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Aucun enregistrement reçu." }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "L'enregistrement est trop long (10 Mo maximum). Lisez plus court ou recommencez." }, { status: 400 });
    if (file.type && !/^(audio|video)\//.test(file.type)) return NextResponse.json({ error: "Ce fichier n'est pas un enregistrement audio." }, { status: 400 });
    if (!isCloudinaryConfigured()) return NextResponse.json({ error: "L'envoi d'enregistrements n'est pas disponible pour le moment. Passez cette étape : l'administration vous interrogera à l'oral." }, { status: 503 });

    const buffer = Buffer.from(await file.arrayBuffer());
    // Cloudinary stores audio under the "video" resource type.
    const url = await uploadBufferToCloudinary(buffer, file.name || "lecture", `reading-audio/${decoded.uid}`, "video");
    return NextResponse.json({ ok: true, url });
  } catch (error: any) {
    console.error("Reading audio upload failed:", error);
    return NextResponse.json({ error: "L'envoi a échoué. Vérifiez votre connexion et réessayez." }, { status: 500 });
  }
}
