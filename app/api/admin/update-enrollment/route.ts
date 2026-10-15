import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";

/**
 * Admin changes a student's study plan (3 or 5 days per week). The plan sets
 * the pacing between lessons (1 day between lessons at 5 days/week, 2 days at
 * 3 days/week), so changing it takes effect immediately: the student's
 * lesson-unlock dates are recomputed from it.
 */
export async function PATCH(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    await getCaller(bearer(request), ["admin"]);

    const { id, kind, studyDays } = await request.json();
    if (!id || (studyDays !== 3 && studyDays !== 5)) {
      return NextResponse.json({ error: "id et studyDays (3 ou 5) requis." }, { status: 400 });
    }

    const db = getAdminDb();
    const ref = db.collection(kind === "legacyStudent" ? "students" : "enrollments").doc(String(id));
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });

    const before = snap.data()!.studyDays === 5 ? 5 : 3;
    await ref.update({ studyDays, studyDaysChangedAt: new Date().toISOString() });

    if (before !== studyDays) {
      try {
        const uid = (snap.data()!.uid as string) || String(id).split("_")[0];
        await createNotification({
          audience: uid,
          type: "study-plan-changed",
          title: "Votre rythme d'étude a changé",
          message:
            studyDays === 5
              ? "Votre formation passe à 5 jours par semaine : une nouvelle leçon vous sera accessible chaque jour."
              : "Votre formation passe à 3 jours par semaine : une nouvelle leçon vous sera accessible tous les 2 jours.",
          link: "/academia/dashboard",
        });
      } catch (notifError) {
        console.error("Study-plan notification failed (non-fatal):", notifError);
      }
    }

    return NextResponse.json({ status: "success", studyDays });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error updating enrollment:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
