import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { logActivitySafe } from "@/lib/activityLog";
import { findEnrollment } from "@/lib/academy/levelInvite";
import { levelNumber } from "@/lib/academy/levelAccess";
import { findProgramByCode, programLevels } from "@/content/curriculum";

/**
 * The student asks for the next level after passing the final quiz of their
 * current one. Checked against the saved progress; the administration then
 * unlocks the level (see /api/admin/approve-level).
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const { idToken, langCode } = await request.json();
    if (!idToken || !langCode) return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const found = await findEnrollment(decoded.uid, String(langCode));
    if (!found || found.data.status !== "Approved") {
      return NextResponse.json({ error: "Inscription introuvable ou non approuvée." }, { status: 403 });
    }

    const current = levelNumber(found.data.level);
    const program = findProgramByCode(String(langCode));
    const last = program ? programLevels(program.slug).length || 3 : 3;
    if (current >= last) return NextResponse.json({ error: "Vous êtes déjà au dernier niveau." }, { status: 400 });
    const next = current + 1;

    const progress = await getAdminDb().collection("progress").doc(`${decoded.uid}_${langCode}_${current}`).get();
    if (!progress.exists || !progress.data()?.finalQuizPassed) {
      return NextResponse.json({ error: `Réussissez d'abord le quiz final du niveau ${current}.` }, { status: 400 });
    }

    if (found.data.levelRequest?.level === next) return NextResponse.json({ status: "already", level: next });
    await found.ref.set({ levelRequest: { level: next, requestedAt: new Date().toISOString() } }, { merge: true });

    await logActivitySafe(decoded.uid, "level_request", `A demandé le niveau ${next} (${langCode})`, { langCode: String(langCode), level: next });

    try {
      await createNotification({
        audience: "admin",
        type: "level-request",
        title: `Demande du niveau ${next}`,
        message: `${found.data.name || "Un étudiant"} (${found.data.matricule || langCode}) demande le niveau ${next}.`,
        link: "/admin?tab=students",
      });
    } catch (error) {
      console.error("Admin notification failed (non-fatal):", error);
    }
    return NextResponse.json({ status: "success", level: next });
  } catch (error: any) {
    console.error("Error requesting next level:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status: 500 });
  }
}
