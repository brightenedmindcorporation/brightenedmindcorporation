import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import type { Firestore, QueryDocumentSnapshot } from "firebase-admin/firestore";

// GET routes are cached by Next.js by default unless marked dynamic — this
// serves live admin data and must never be stale.
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

async function requireAdmin(idToken: string | undefined) {
  if (!idToken) throw { status: 400, message: "idToken requis." };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  if (decoded.email !== ADMIN_EMAIL) throw { status: 403, message: "Non autorisé." };
}

const LEGACY_GAP_MS = 2 * 60 * 1000;

/**
 * Messages sent before adminMessages existed only live as per-recipient
 * notifications (type "admin-message", no batchId) — one doc per student,
 * each stamped a few ms apart. Group them back into broadcasts (same
 * subject + body, sent within a couple of minutes of each other) and give
 * each group a real adminMessages record + batchId, so they become
 * editable/deletable exactly like newer messages. Idempotent: once a
 * notification has a batchId it's skipped on later calls.
 */
async function backfillLegacyMessages(adminDb: Firestore) {
  const snap = await adminDb.collection("notifications").where("type", "==", "admin-message").get();
  const legacy = snap.docs
    .filter((d) => !d.data().batchId)
    .sort((a, b) => String(a.data().createdAt).localeCompare(String(b.data().createdAt)));
  if (legacy.length === 0) return;

  const groups: QueryDocumentSnapshot[][] = [];
  for (const doc of legacy) {
    const data = doc.data();
    const group = groups.find((g) => {
      const last = g[g.length - 1].data();
      return (
        last.title === data.title &&
        last.message === data.message &&
        Math.abs(new Date(data.createdAt).getTime() - new Date(last.createdAt).getTime()) <= LEGACY_GAP_MS
      );
    });
    if (group) group.push(doc);
    else groups.push([doc]);
  }

  for (const group of groups) {
    const first = group[0].data();
    const batchRef = adminDb.collection("adminMessages").doc();
    const batch = adminDb.batch();
    batch.set(batchRef, {
      subject: first.title,
      body: first.message,
      recipients: group.map((d) => ({ uid: d.data().audience, email: "" })),
      attachmentNames: [],
      createdAt: first.createdAt,
      legacy: true,
    });
    group.forEach((d) => batch.update(d.ref, { batchId: batchRef.id }));
    await batch.commit();
  }
}

// Lists every broadcast/direct message the admin has sent to students, so
// they can be reviewed, corrected or withdrawn after the fact instead of
// being fire-and-forget.
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    await requireAdmin(idToken);

    const adminDb = getAdminDb();
    await backfillLegacyMessages(adminDb);
    const snap = await adminDb.collection("adminMessages").orderBy("createdAt", "desc").get();
    const messages = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ messages });
  } catch (error: any) {
    const status = error?.status ?? 500;
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
