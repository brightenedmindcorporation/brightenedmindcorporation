import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { availableLanguages } from "@/content/curriculum";
import { buildPlacementTest, gradePlacement, WRITING_MIN } from "@/lib/academy/placement";
import { clipUrl, dialogueClipText } from "@/lib/academy/audioClips";
import { diffAnswer } from "@/lib/academy/writingLab";
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
    const test = buildPlacementTest(ctx.lang.slug, ctx.decoded.uid);
    if (!test) return NextResponse.json({ error: "Test indisponible pour cette langue." }, { status: 404 });
    return NextResponse.json({
      status: "requested",
      langSlug: ctx.lang.slug,
      questions: test.questions.map(({ answer, ...q }) => q),
      reading: { title: test.content.reading.title, paragraphs: test.content.reading.paragraphs },
      readAloud: test.content.readAloud,
      // The conversation is only given as audio: the text is not sent.
      listening: test.content.listening.lines.map((text, i) => ({ url: clipUrl(ctx.lang.slug, dialogueClipText(i % 2 === 0 ? "A" : "B", text)) })),
      writingMin: WRITING_MIN,
    });
  } catch (error: any) {
    console.error("Placement GET failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}

/** The student hands in the test: graded here (the answers never leave the server), then sent to the administration. */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const body = await request.json().catch(() => ({}));
    const langCode = String(body.langCode || "");
    const ctx = await context(request, langCode);
    if ("error" in ctx) return ctx.error;
    if (ctx.placement.status !== "requested") return NextResponse.json({ error: "Ce test a déjà été envoyé." }, { status: 409 });

    const test = buildPlacementTest(ctx.lang.slug, ctx.decoded.uid);
    if (!test) return NextResponse.json({ error: "Test indisponible pour cette langue." }, { status: 404 });

    const answers: Record<string, string> =
      body.answers && typeof body.answers === "object" ? Object.fromEntries(Object.entries(body.answers).map(([k, v]) => [k, String(v)])) : {};
    const writing = typeof body.writing === "string" ? body.writing.trim().slice(0, 4000) : "";
    const grade = gradePlacement(test.questions, answers);

    // Reading aloud: what the browser's speech recognition heard, compared with the passage; and the recording, for the reviewer to listen to.
    const spoken = body.readAloud && typeof body.readAloud === "object" ? body.readAloud : {};
    const transcript = typeof spoken.transcript === "string" ? spoken.transcript.slice(0, 1500) : "";
    const cjk = ctx.lang.slug === "chinese";
    const readAloud = {
      transcript,
      score: transcript ? Math.round(diffAnswer(test.content.readAloud, transcript, cjk).score * 100) : null,
      audioUrl: typeof spoken.audioUrl === "string" && spoken.audioUrl.startsWith("https://res.cloudinary.com/") ? spoken.audioUrl : null,
      skipped: spoken.skipped === true,
    };

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
      reading: grade.reading,
      listening: grade.listening,
      suggestedLevel: grade.suggestedLevel,
      // What the student chose for each question, with the right answer, for the reviewer.
      answers: test.questions.map((q) => ({
        id: q.id,
        section: q.section,
        level: q.level,
        question: q.question,
        chosen: answers[q.id] ?? "",
        correct: q.answer,
        ok: answers[q.id] === q.answer,
      })),
      readAloud: { ...readAloud, expected: test.content.readAloud },
      writing,
    });
    await ctx.enrollmentRef.update({ placement: { ...ctx.placement, status: "submitted", submittedAt: now, suggestedLevel: grade.suggestedLevel } });

    try {
      await createNotification({
        audience: "admin",
        type: "placement-submitted",
        title: "Test de niveau à corriger",
        message: `${name} (${ctx.lang.label}) a passé le test de niveau : niveau suggéré ${grade.suggestedLevel}. Il attend votre décision.`,
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
