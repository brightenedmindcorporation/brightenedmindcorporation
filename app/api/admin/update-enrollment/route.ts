import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { normalizeGender } from "@/lib/salutation";
import { levelLabel, levelNumber } from "@/lib/academy/levelAccess";
import { findProgramByCode, programLevels } from "@/content/curriculum";

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

    const { id, kind, studyDays, gender: rawGender, startLevel: rawStart, level: rawLevel } = await request.json();
    const start = Number(rawStart);
    const newLevel = Number(rawLevel);
    const gender = normalizeGender(rawGender);
    if (!id || (!gender && !(newLevel >= 1 && newLevel <= 3) && !(start >= 1 && start <= 3) && studyDays !== 3 && studyDays !== 5)) {
      return NextResponse.json({ error: "id et studyDays (3 ou 5) ou gender (M ou F) requis." }, { status: 400 });
    }

    const db = getAdminDb();
    const ref = db.collection(kind === "legacyStudent" ? "students" : "enrollments").doc(String(id));
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });

    // The administration sets the student's current level directly, up or down (the lessons already done stay recorded).
    if (newLevel >= 1 && newLevel <= 3) {
      const data = snap.data()!;
      const program = findProgramByCode(String(data.langCode));
      const last = program ? programLevels(program.slug).length || 3 : 3;
      if (newLevel > last) return NextResponse.json({ error: `Ce programme n'a que ${last} niveau(x).` }, { status: 400 });
      const before = levelNumber(data.level);
      const update: Record<string, unknown> = {
        level: levelLabel(newLevel),
        levelUnlockedAt: { ...(data.levelUnlockedAt || {}), ...(data.levelUnlockedAt?.[`L${newLevel}`] ? {} : { [`L${newLevel}`]: new Date().toISOString() }) },
        levelChangedAt: new Date().toISOString(),
        levelRequest: FieldValue.delete(),
      };
      // The access window starts at the start level: it can never be above the current level.
      if (Number(data.startLevel) > newLevel) update.startLevel = newLevel;
      await ref.set(update, { merge: true });
      if (before !== newLevel) {
        try {
          const uid = (data.uid as string) || String(id).split("_")[0];
          await createNotification({
            audience: uid,
            type: "level-changed",
            title: `Votre niveau est maintenant le niveau ${newLevel}`,
            message: `L'administration a placé votre formation au niveau ${newLevel}. Votre Student ID reste le même.`,
            link: "/academia/dashboard",
          });
        } catch (notifError) {
          console.error("Level-change notification failed (non-fatal):", notifError);
        }
      }
      return NextResponse.json({ status: "success", level: newLevel });
    }

    // The level the student started at: they have no access to the levels below it.
    if (start >= 1 && start <= 3) {
      const current = Number(String(snap.data()!.level ?? "").slice(-1)) || 1;
      if (start > current) return NextResponse.json({ error: "Le niveau de départ ne peut pas dépasser le niveau actuel de l'étudiant." }, { status: 400 });
      await ref.update({ startLevel: start });
      if (studyDays !== 3 && studyDays !== 5 && !gender) return NextResponse.json({ status: "success", startLevel: start });
    }

    // Civility (Monsieur / Madame): kept on the enrolment and on the student profile.
    if (gender) {
      await ref.update({ gender });
      const uid = (snap.data()!.uid as string) || String(id).split("_")[0];
      await db.collection("students").doc(uid).set({ gender }, { merge: true });
      if (studyDays !== 3 && studyDays !== 5) return NextResponse.json({ status: "success", gender });
    }

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
