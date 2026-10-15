import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller, teachesLanguage } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

interface FeedItem {
  id: string;
  kind: "enrollment" | "certificate" | "message" | "session" | "announcement";
  title: string;
  detail?: string;
  at: string;
  langCode?: string;
}

/**
 * "Actualités" for a teacher: what happened recently around their courses —
 * new students, certificates earned, messages from students, their upcoming
 * live classes, and the school's announcements — newest first.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["teacher"]);
    if (caller.role !== "teacher") return NextResponse.json({ error: "Non autorisé." }, { status: 403 });

    const db = getAdminDb();
    const [enrollSnap, certSnap, requestsSnap, sessionsSnap, announcementsSnap] = await Promise.all([
      db.collection("enrollments").where("status", "==", "Approved").get(),
      db.collection("certificates").orderBy("issuedAt", "desc").limit(100).get(),
      db.collection("studentRequests").orderBy("createdAt", "desc").limit(100).get(),
      db.collection("liveSessions").where("teacherUid", "==", caller.uid).get(),
      db.collection("announcements").orderBy("createdAt", "desc").limit(10).get(),
    ]);

    const items: FeedItem[] = [];
    const myStudentUids = new Set<string>();

    for (const d of enrollSnap.docs) {
      const e = d.data();
      if (!teachesLanguage(caller.assignments, e.langCode)) continue;
      myStudentUids.add(e.uid);
      items.push({
        id: `enr-${d.id}`,
        kind: "enrollment",
        title: `${e.name || "Un étudiant"} a rejoint votre cours`,
        detail: e.langCode,
        at: e.approvedAt || e.createdAt || "",
        langCode: e.langCode,
      });
    }

    for (const d of certSnap.docs) {
      const c = d.data();
      if (!c.langCode || !teachesLanguage(caller.assignments, c.langCode) || c.revoked) continue;
      if (c.level && !canTeach(caller.assignments, c.langCode, Number(c.level))) continue;
      items.push({
        id: `cert-${d.id}`,
        kind: "certificate",
        title: `${c.studentName || "Un étudiant"} a obtenu son certificat`,
        detail: c.levelTitle || undefined,
        at: c.issuedAt || "",
        langCode: c.langCode,
      });
    }

    for (const d of requestsSnap.docs) {
      const r = d.data();
      if (!myStudentUids.has(r.uid)) continue;
      items.push({
        id: `msg-${d.id}`,
        kind: "message",
        title: `Message de ${r.name || "un étudiant"}`,
        detail: r.subject,
        at: r.createdAt || "",
      });
    }

    const now = Date.now();
    for (const d of sessionsSnap.docs) {
      const s = d.data();
      const start = new Date(s.scheduledAt).getTime();
      if (!Number.isFinite(start) || start < now - 24 * 3600_000) continue;
      items.push({
        id: `ses-${d.id}`,
        kind: "session",
        title: start >= now ? "Classe en direct à venir" : "Classe en direct récente",
        detail: `${s.title ? s.title + " · " : ""}${s.langCode} niveau ${s.level}`,
        at: s.scheduledAt,
        langCode: s.langCode,
      });
    }

    for (const d of announcementsSnap.docs) {
      const a = d.data();
      if (a.active === false) continue;
      items.push({ id: `ann-${d.id}`, kind: "announcement", title: a.title, detail: a.description, at: a.createdAt || "" });
    }

    items.sort((a, b) => String(b.at).localeCompare(String(a.at)));
    return NextResponse.json({ items: items.slice(0, 80) });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error building teacher feed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
