import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * The permanent record of every notification the site has sent (to the administration and to students): who
 * it was for, what it said, when, and when it was read. Notifications are never deleted, only marked as read.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) return NextResponse.json({ error: "Non autorisé." }, { status: 403 });

    const db = getAdminDb();
    const [snap, students] = await Promise.all([db.collection("notifications").get(), db.collection("students").get()]);
    const names = new Map<string, { name: string; email: string }>();
    for (const d of students.docs) names.set(d.id, { name: String(d.data().name || ""), email: String(d.data().email || "") });

    const notifications = snap.docs
      .map((d) => {
        const n = d.data();
        const who = n.audience === "admin" ? null : names.get(String(n.audience));
        return {
          id: d.id,
          audience: n.audience,
          recipient: n.audience === "admin" ? "Administration" : who?.name || String(n.audience),
          email: who?.email || "",
          type: n.type || "",
          title: n.title || "",
          message: n.message || "",
          link: n.link || null,
          read: Boolean(n.read),
          readAt: n.readAt || null,
          createdAt: n.createdAt || "",
        };
      })
      .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      .slice(0, 3000);
    return NextResponse.json({ notifications, total: snap.size });
  } catch (error: any) {
    console.error("Notification log failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
