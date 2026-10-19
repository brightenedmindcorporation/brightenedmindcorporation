import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { availableLanguages, getLevelCurriculum } from "@/content/curriculum";
import { createNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

const KINDS = new Set(["dictation", "reply", "free"]);

/**
 * The written part of a quiz goes to the teachers: the student hands in their texts with the quiz (first
 * attempt only), a teacher corrects the spelling and grammar. The multiple-choice questions are graded
 * automatically and are not affected.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ ok: false }, { status: 202 });
    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ ok: false }, { status: 401 });
    const decoded = await getAdminAuth().verifyIdToken(idToken);

    const body = await request.json().catch(() => ({}));
    const langCode = String(body.langCode || "");
    const level = Number(body.level);
    const key = String(body.key || "");
    const lang = availableLanguages.find((l) => l.code === langCode);
    if (!lang || ![1, 2, 3].includes(level) || !/^(\d{1,2}|final)$/.test(key)) return NextResponse.json({ ok: false }, { status: 400 });

    const items = (Array.isArray(body.items) ? body.items : [])
      .filter((i: any) => i && KINDS.has(i.kind) && typeof i.text === "string" && i.text.trim())
      .slice(0, 8)
      .map((i: any) => ({
        kind: i.kind,
        prompt: String(i.prompt || "").slice(0, 400),
        ...(typeof i.expected === "string" ? { expected: i.expected.slice(0, 400) } : {}),
        text: i.text.trim().slice(0, 4000),
      }));
    if (items.length === 0) return NextResponse.json({ ok: true, skipped: "empty" });

    const db = getAdminDb();
    const ref = db.collection("writingReviews").doc(`${decoded.uid}_${langCode}_${level}_${key}`);
    if ((await ref.get()).exists) return NextResponse.json({ ok: true, skipped: "already" }); // first attempt only

    const [enrollment, profile] = await Promise.all([
      db.collection("enrollments").doc(`${decoded.uid}_${langCode}`).get(),
      db.collection("students").doc(decoded.uid).get(),
    ]);
    const name = enrollment.data()?.name || profile.data()?.name || decoded.email || "";
    const curriculum = getLevelCurriculum(lang.slug, level);
    const quizTitle = key === "final" ? curriculum?.finalQuiz.title : curriculum?.quizzes.find((q) => q.lessonId === Number(key))?.title;

    await ref.set({
      uid: decoded.uid,
      name,
      email: decoded.email || "",
      langCode,
      level,
      key,
      quizTitle: quizTitle || (key === "final" ? "Quiz final" : `Quiz ${key}`),
      teacherUid: enrollment.data()?.teacherUid || null,
      items,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    try {
      await createNotification({
        audience: "admin",
        type: "writing-submitted",
        title: "Rédaction à corriger",
        message: `${name} (${lang.label}, niveau ${level}) : ${key === "final" ? "quiz final" : `quiz ${key}`}.`,
        link: "/admin?tab=corrections",
      });
    } catch (error) {
      console.error("Writing notification failed (non-fatal):", error);
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Writing submit failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
