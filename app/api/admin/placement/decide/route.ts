import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, isTeachersStudent } from "@/lib/teacherAuth";
import { createNotification } from "@/lib/notifications";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting } from "@/lib/salutation";
import { findProgramByCode } from "@/content/curriculum";
import { levelLabel } from "@/lib/academy/levelAccess";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

/**
 * The administration gives the student their starting level after reading the test. A teacher can only
 * RECOMMEND a level: the decision stays with the administration.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request));
    const body = await request.json().catch(() => ({}));
    const id = String(body.id || "");
    const level = Number(body.level);
    const comment = typeof body.comment === "string" ? body.comment.trim().slice(0, 1000) : "";
    if (!id || ![1, 2, 3].includes(level)) return NextResponse.json({ error: "Test et niveau (1 à 3) requis." }, { status: 400 });

    const db = getAdminDb();
    const testRef = db.collection("placementTests").doc(id);
    const test = (await testRef.get()).data();
    if (!test) return NextResponse.json({ error: "Test introuvable." }, { status: 404 });
    if (caller.role === "teacher" && !isTeachersStudent(caller, { langCode: test.langCode, teacherUid: test.teacherUid })) {
      return NextResponse.json({ error: "Ce test ne fait pas partie de vos étudiants." }, { status: 403 });
    }

    if (caller.role === "teacher") {
      await testRef.update({ recommendation: { level, comment, by: caller.name || caller.email, at: new Date().toISOString() } });
      try {
        await createNotification({
          audience: "admin",
          type: "placement-recommendation",
          title: "Recommandation d'un professeur",
          message: `${caller.name || caller.email} recommande le niveau ${level} pour ${test.name} (${test.langCode}).`,
          link: "/admin?tab=placement",
        });
      } catch (error) {
        console.error("Recommendation notification failed (non-fatal):", error);
      }
      return NextResponse.json({ ok: true, recommended: true });
    }

    const enrollmentRef = db.collection("enrollments").doc(id);
    const enrollment = await enrollmentRef.get();
    if (!enrollment.exists) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    const now = new Date().toISOString();

    await enrollmentRef.update({
      level: levelLabel(level),
      startLevel: level,
      placement: { ...(enrollment.data()!.placement || {}), status: "decided", level, comment, decidedAt: now, decidedBy: caller.email },
    });
    await testRef.update({ status: "decided", decidedLevel: level, comment, decidedAt: now, decidedBy: caller.email });

    const lang = findProgramByCode(test.langCode);
    try {
      await createNotification({
        audience: test.uid,
        type: "placement-decided",
        title: "Votre niveau est attribué",
        message: `Après correction de votre test de niveau, vous commencez au niveau ${level} en ${lang?.label ?? test.langCode}.${comment ? ` ${comment}` : ""}`,
        link: "/academia/dashboard",
      });
    } catch (error) {
      console.error("Placement decision notification failed (non-fatal):", error);
    }
    const email = String(test.email || "");
    if (email && process.env.RESEND_API_KEY) {
      const profile = (await db.collection("students").doc(test.uid).get()).data();
      const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
        from: mailFrom("BM Academia"),
        to: email,
        replyTo: "info@bmcorporation-cd.com",
        subject: `Votre niveau en ${lang?.label ?? test.langCode} : niveau ${level}`,
        html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
          <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(test.name, enrollment.data()!.gender || profile?.gender)}</h2>
          <p>Votre test de niveau a été corrigé : vous commencez au <b>niveau ${level}</b> en ${lang?.label ?? test.langCode}.</p>
          ${comment ? `<p style="background:#f7f1f1;padding:12px;border-radius:8px;">${comment.replace(/</g, "&lt;")}</p>` : ""}
          <p style="margin: 24px 0;"><a href="${SITE_URL}/academia/dashboard" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Accéder à mon espace</a></p>
        </div>`,
      });
      if (error) console.error("Placement decision e-mail failed (non-fatal):", error);
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Placement decision failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
