import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { parseAnnouncementFields, storeAnnouncementMedia } from "@/lib/announcementForm";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

// Edits an announcement. A new photo/video replaces the existing one (a picture is made light automatically); left blank,
// the existing one is kept. The duration field is omitted to leave the end date untouched, "0" for no end, or a number of days
// counted from the start day (today, or the scheduled day).
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const { id } = await params;
    const form = await request.formData();
    const fields = parseAnnouncementFields(form);
    const updates: Record<string, any> = { ...fields };

    const durationDaysRaw = form.get("durationDays")?.toString();
    if (durationDaysRaw) {
      const durationDays = Number(durationDaysRaw);
      if (durationDays > 0) {
        const from = fields.startAt ? new Date(fields.startAt) : new Date();
        from.setDate(from.getDate() + durationDays);
        updates.expiresAt = from.toISOString();
      } else {
        updates.expiresAt = null;
      }
    }

    const media = await storeAnnouncementMedia(form);
    if (media.imageUrl) updates.imageUrl = media.imageUrl;
    if (media.videoUrl) updates.videoUrl = media.videoUrl;
    if (form.get("removeImage")?.toString() === "true" && !media.imageUrl) updates.imageUrl = null;
    if (form.get("removeVideo")?.toString() === "true" && !media.videoUrl) updates.videoUrl = null;

    await getAdminDb().collection("announcements").doc(id).update(updates);
    return NextResponse.json({ status: "success", saved: media.saved ?? null });
  } catch (error: any) {
    console.error("Error updating announcement:", error);
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}

// Shows or hides an announcement, and pins it first (or not), without touching the rest.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const body = await request.json();
    const { id } = await params;
    const updates: Record<string, boolean> = {};
    if (typeof body.active === "boolean") updates.active = body.active;
    if (typeof body.pinned === "boolean") updates.pinned = body.pinned;
    if (Object.keys(updates).length === 0) return NextResponse.json({ error: "Rien à modifier." }, { status: 400 });
    await getAdminDb().collection("announcements").doc(id).update(updates);

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
