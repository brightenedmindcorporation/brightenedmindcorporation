import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { availableLanguages } from "@/content/curriculum";
import { buildPlacementTest, gradePlacement, WRITING_MIN } from "@/lib/academy/placement";
import { createNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

async function context(request: Request, langCode: string) {
  const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!idToken) return { error: NextResponse.json({ error: "Connexion requise." }, { status: 401 }) };
  const decoded = await getAdminAuth().verifyIdToken(idToken);
  const lang = availableLanguages.find((l) => l.code === langCode);
  if (!lang) return { error: NextResponse.json({ error: "Langue inconnue." }, { status: 400 }) };
  const db = getAdminDb();
  const enrollmentRef = db.collection("enrollments").doc(`${decoded.uid}_${langCode}`);
  const enrollment = await enrollmentRef.get();
  const placement = enrollment.data()?.placement;
  if (!enrollment.exists || !placement) {
    return { error: NextResponse.json({ error: "Aucun test de niveau n'est demandé pour cette formation." }, { status: 404 }) };
  }
  return { decoded, lang, db, enrollmentRef, enrollment: enrollment.data()!, placement };
}

/** The student's placement test: questions WITHOUT their answers, or the state of a test already taken. */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const langCode = new URL(request.url).searchParams.get("langCode") || "";
    const ctx = await context(request, langCode);
    if ("error" in ctx) return ctx.error;
    if (ctx.placement.status !== "requested") {
      return NextResponse.json({ status: ctx.placement.status, level: ctx.placement.level ?? null, comment: ctx.placement.comment ?? null });
    }
    const questions = buildPlacementTest(ctx.lang.slug, ctx.decoded.uid).map(({ answer, ...q }) => q);
    return NextResponse.json({ status: "requested", questions, writingMin: WRITING_MIN, langSlug: ctx.lang.slug });
  } catch (error: any) {
    console.error("Placement GET failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}

/** The student hands in the test: graded here (the answers never leave the server), then sent to be reviewed. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const langCode = String(body.langCode || "");
    const ctx = await context(request, langCode);
    if ("error" in ctx) return ctx.error;
    if (ctx.placement.status !== "requested") return NextResponse.json({ error: "Ce test a déjà été envoyé." }, { status: 409 });

    const answers: Record<string, string> =
      body.answers && typeof body.answers === "object" ? Object.fromEntries(Object.entries(body.answers).map(([k, v]) => [k, String(v)])) : {};
    const writing = typeof body.writing === "string" ? body.writing.trim().slice(0, 4000) : "";
    const questions = buildPlacementTest(ctx.lang.slug, ctx.decoded.uid);
    const grade = gradePlacement(questions, answers);
    const now = new Date().toISOString();
    const profile = (await ctx.db.collection("students").doc(ctx.decoded.uid).get()).data();
    const name = ctx.enrollment.name || profile?.name || ctx.decoded.email || "";

    await ctx.db.collection("placementTests").doc(`${ctx.decoded.uid}_${langCode}`).set({
      uid: ctx.decoded.uid,
      langCode,
      name,
      email: ctx.decoded.email || ctx.enrollment.email || "",
      teacherUid: ctx.enrollment.teacherUid || null,
      status: "submitted",
      submittedAt: now,
      byLevel: grade.byLevel,
      suggestedLevel: grade.suggestedLevel,
      // What the student chose for each question, with the right answer, for the reviewer.
      answers: questions.map((q) => ({ id: q.id, level: q.level, question: q.question, chosen: answers[q.id] ?? "", correct: q.answer, ok: answers[q.id] === q.answer })),
      writing,
    });
    await ctx.enrollmentRef.update({ placement: { ...ctx.placement, status: "submitted", submittedAt: now, suggestedLevel: grade.suggestedLevel } });

    try {
      await createNotification({
        audience: "admin",
        type: "placement-submitted",
        title: "Test de niveau à corriger",
        message: `${name} (${ctx.lang.label}) a passé le test de niveau : niveau suggéré ${grade.suggestedLevel}.`,
        link: "/admin?tab=placement",
      });
    } catch (error) {
      console.error("Placement notification failed (non-fatal):", error);
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Placement POST failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
