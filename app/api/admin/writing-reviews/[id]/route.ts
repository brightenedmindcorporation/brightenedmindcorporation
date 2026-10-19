import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller } from "@/lib/teacherAuth";
import { createNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

/**
 * A teacher (or the administration) corrects a student's written work: for each text, the corrected
 * version and a comment; overall, a comment and an optional mark out of 10. The student is told.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request));
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    const ref = getAdminDb().collection("writingReviews").doc(id);
    const review = (await ref.get()).data();
    if (!review) return NextResponse.json({ error: "Rédaction introuvable." }, { status: 404 });
    if (caller.role === "teacher") {
      const mine = review.teacherUid ? review.teacherUid === caller.uid : canTeach(caller.assignments, review.langCode, Number(review.level));
      if (!mine) return NextResponse.json({ error: "Cette rédaction ne fait pas partie de vos étudiants." }, { status: 403 });
    }

    const count = Array.isArray(review.items) ? review.items.length : 0;
    const feedback = (Array.isArray(body.feedback) ? body.feedback : []).slice(0, count).map((f: any) => ({
      corrected: typeof f?.corrected === "string" ? f.corrected.trim().slice(0, 4000) : "",
      comment: typeof f?.comment === "string" ? f.comment.trim().slice(0, 1000) : "",
    }));
    const overall = typeof body.overall === "string" ? body.overall.trim().slice(0, 1500) : "";
    const rawMark = body.mark === "" || body.mark === null || body.mark === undefined ? null : Number(body.mark);
    const mark = rawMark !== null && Number.isFinite(rawMark) ? Math.max(0, Math.min(10, Math.round(rawMark * 2) / 2)) : null;
    if (!overall && !feedback.some((f: any) => f.corrected || f.comment)) {
      return NextResponse.json({ error: "Ajoutez au moins une correction ou un commentaire." }, { status: 400 });
    }

    await ref.update({
      status: "reviewed",
      feedback,
      overall,
      mark,
      reviewedAt: new Date().toISOString(),
      reviewedBy: caller.name || caller.email,
    });

    try {
      await createNotification({
        audience: review.uid,
        type: "writing-corrected",
        title: "Votre rédaction est corrigée",
        message: `${review.quizTitle || "Votre quiz"} : ${caller.role === "teacher" ? "votre professeur" : "l'administration"} a corrigé vos textes${mark !== null ? ` (${mark}/10)` : ""}.`,
        link: "/academia/corrections",
      });
    } catch (error) {
      console.error("Correction notification failed (non-fatal):", error);
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Writing review failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
