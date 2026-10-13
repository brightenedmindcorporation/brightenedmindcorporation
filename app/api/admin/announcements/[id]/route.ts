import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

// Edits an already-published announcement's content. A new photo/video
// replaces the existing one; left blank, the existing one is kept. The
// duration field is omitted to leave the expiry untouched, "0" to clear it
// (make it unlimited again), or a day count to recompute it from today.
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const { id } = await params;
    const form = await request.formData();

    const title = form.get("title")?.toString()?.trim();
    const description = form.get("description")?.toString()?.trim();
    const type = form.get("type")?.toString() === "job" ? "job" : "normal";
    const details = form.get("details")?.toString()?.trim() || "";

    if (!title || !description) {
      return NextResponse.json({ error: "title et description sont requis." }, { status: 400 });
    }

    const showInTicker = form.get("showInTicker")?.toString() !== "false";
    const updates: Record<string, any> = { title, description, type, details, showInTicker };

    const durationDaysRaw = form.get("durationDays")?.toString();
    if (durationDaysRaw) {
      const durationDays = Number(durationDaysRaw);
      if (durationDays > 0) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + durationDays);
        updates.expiresAt = expiry.toISOString();
      } else {
        updates.expiresAt = null;
      }
    }

    const imageFile = form.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      updates.imageUrl = await uploadToCloudinary(imageFile, "announcements", "image");
    }
    const videoFile = form.get("video");
    if (videoFile instanceof File && videoFile.size > 0) {
      updates.videoUrl = await uploadToCloudinary(videoFile, "announcements", "video");
    }

    await getAdminDb().collection("announcements").doc(id).update(updates);

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Error updating announcement:", error);
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}

// Toggles an announcement's visibility on the homepage without deleting it.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const { active } = await request.json();
    const { id } = await params;
    await getAdminDb().collection("announcements").doc(id).update({ active: Boolean(active) });

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params;
    await getAdminDb().collection("announcements").doc(id).delete();

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
