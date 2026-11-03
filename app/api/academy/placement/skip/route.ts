import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { findEnrollment } from "@/lib/academy/levelInvite";

/**
 * A student who is asked for the placement test but already knows their level
 * (they registered at level 1, or the test was ticked by mistake) starts at the
 * level they registered at, without the test. Only while the test is still to
 * be taken: a test already sent stays with the administration.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const { idToken, langCode } = await request.json();
    if (!idToken || !langCode) return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const found = await findEnrollment(decoded.uid, String(langCode));
    if (!found) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    const placement = (found.data.placement || {}) as { status?: string };
    if (placement.status !== "requested") {
      return NextResponse.json({ status: "success", unchanged: true });
    }

    const now = new Date().toISOString();
    const level = Number(String(found.data.level ?? "").slice(-1)) || 1;
    await found.ref.update({
      startLevel: level,
      placement: { ...placement, status: "decided", level, comment: "Niveau choisi par l'étudiant, sans test.", decidedAt: now, decidedBy: "student" },
    });
    // Nothing was sent yet, so there is no test to correct; close the draft if one exists.
    const testRef = getAdminDb().collection("placementTests").doc(`${decoded.uid}_${langCode}`);
    const test = await testRef.get();
    if (test.exists && test.data()?.status !== "submitted") await testRef.update({ status: "decided", decidedLevel: level, decidedAt: now, decidedBy: "student" });
    return NextResponse.json({ status: "success", level });
  } catch (error: any) {
    console.error("Placement skip error:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}
