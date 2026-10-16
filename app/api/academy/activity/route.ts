import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { CLIENT_ACTIVITY, addTimeSpent, logActivitySafe, type ActivityType } from "@/lib/activityLog";
import { createNotification } from "@/lib/notifications";

/** A signed-in student reports what they are doing (see lib/activityLog.ts). */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ ok: false }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const body = await request.json().catch(() => null);
    // Active time on a page (small chunks, summed per day).
    if (body?.type === "time") {
      const key = typeof body.key === "string" ? body.key : "";
      if (!/^[A-Za-z0-9_-]{1,40}$/.test(key)) return NextResponse.json({ ok: false }, { status: 400 });
      await addTimeSpent(decoded.uid, Number(body.seconds) || 0, key).catch(() => {});
      return NextResponse.json({ ok: true });
    }

    const type = body?.type as ActivityType;
    if (!CLIENT_ACTIVITY.includes(type)) return NextResponse.json({ ok: false }, { status: 400 });

    const label = typeof body?.label === "string" ? body.label : "";
    const meta: Record<string, unknown> = {};
    for (const key of ["langCode", "level", "lessonId", "score", "total", "passed"]) {
      const v = body?.meta?.[key];
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") meta[key] = typeof v === "string" ? v.slice(0, 40) : v;
    }
    await logActivitySafe(decoded.uid, type, label, meta);

    // A failed quiz is something the administration wants to know about right away.
    if ((type === "quiz" || type === "final_quiz") && meta.passed === false) {
      try {
        const snap = await getAdminDb().collection("students").doc(decoded.uid).get();
        await createNotification({
          audience: "admin",
          type: "quiz-failed",
          title: "Quiz échoué",
          message: `${snap.data()?.name || decoded.email} : ${label}`,
          link: "/admin?tab=activity",
        });
      } catch (error) {
        console.error("Quiz-failed notification failed (non-fatal):", error);
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
