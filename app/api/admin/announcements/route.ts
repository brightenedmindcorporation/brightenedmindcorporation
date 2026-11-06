import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { parseAnnouncementFields, storeAnnouncementMedia } from "@/lib/announcementForm";

// GET routes are cached by Next.js by default unless marked dynamic — this
// serves live admin data and must never be stale.
export const dynamic = "force-dynamic";

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

// Pictures are made light automatically (see lib/imageOptimize.ts) and stored on Cloudinary (not Firebase Storage, which needs
// the paid Blaze plan); the resulting address is kept on the announcement.
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const form = await request.formData();
    await requireAdmin(form.get("idToken")?.toString());

    const fields = parseAnnouncementFields(form);
    const durationDaysRaw = form.get("durationDays")?.toString();
    const durationDays = durationDaysRaw ? Number(durationDaysRaw) : null;
    // The duration counts from the day the announcement starts (today, or the scheduled day).
    let expiresAt: string | null = null;
    if (durationDays && durationDays > 0) {
      const from = fields.startAt ? new Date(fields.startAt) : new Date();
      from.setDate(from.getDate() + durationDays);
      expiresAt = from.toISOString();
    }

    const media = await storeAnnouncementMedia(form);
    const draft = form.get("draft")?.toString() === "true";

    const docRef = await getAdminDb().collection("announcements").add({
      ...fields,
      imageUrl: media.imageUrl ?? null,
      videoUrl: media.videoUrl ?? null,
      active: !draft,
      showInTicker: false,
      expiresAt,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: "success", id: docRef.id, saved: media.saved ?? null });
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
