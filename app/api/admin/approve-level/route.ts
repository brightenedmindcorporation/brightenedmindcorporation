import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting } from "@/lib/salutation";
import { levelLabel, levelNumber } from "@/lib/academy/levelAccess";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { findProgramByCode, programLevels } from "@/content/curriculum";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

/**
 * Unlocks the next level for a student, with the SAME account and Student ID.
 * The Student ID never changes. Used when the student asked for the level, or
 * by the admin directly once the fees are paid.
 *
 * Body: { id, kind: "enrollment" | "legacyStudent" }
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    await getCaller(bearer(request), ["admin"]);

    const { id, kind } = await request.json();
    if (!id) return NextResponse.json({ error: "id requis." }, { status: 400 });

    const db = getAdminDb();
    const ref = db.collection(kind === "legacyStudent" ? "students" : "enrollments").doc(String(id));
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    const data = snap.data()!;
    if (data.status !== "Approved") {
      return NextResponse.json({ error: "L'inscription doit d'abord être approuvée." }, { status: 400 });
    }

    const current = levelNumber(data.level);
    const program = findProgramByCode(String(data.langCode));
    const last = program ? programLevels(program.slug).length || 3 : 3;
    if (current >= last) return NextResponse.json({ error: "Cet étudiant est déjà au dernier niveau." }, { status: 400 });
    const next = current + 1;

    await ref.set(
      {
        level: levelLabel(next),
        levelUnlockedAt: { ...(data.levelUnlockedAt || {}), [`L${next}`]: new Date().toISOString() },
        levelRequest: FieldValue.delete(),
      },
      { merge: true }
    );

    const uid = (data.uid as string) || String(id).split("_")[0];
    try {
      await createNotification({
        audience: uid,
        type: "level-unlocked",
        title: `Niveau ${next} débloqué`,
        message: `Le niveau ${next} est ouvert. Votre Student ID reste le même. Bonne continuation !`,
        link: "/academia/dashboard",
      });
    } catch (error) {
      console.error("Level unlocked notification failed (non-fatal):", error);
    }

    let emailSent = false;
    const email = String(data.email || "").trim();
    if (email && process.env.RESEND_API_KEY) {
      const profile = await db.collection("students").doc(uid).get().catch(() => null);
      const gender = data.gender || profile?.data()?.gender;
      const name = data.name || profile?.data()?.name;
      const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
        from: mailFrom("BM Academia"),
        to: email,
        replyTo: "info@bmcorporation-cd.com",
        subject: `Niveau ${next} débloqué — BM Academia`,
        html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
          <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(name, gender)}</h2>
          <p>Votre accès au <b>niveau ${next}</b> est ouvert, avec le même compte et le même Student ID${data.matricule ? ` (<b>${data.matricule}</b>)` : ""}.</p>
          <p style="margin: 24px 0;"><a href="${SITE_URL}/academia/dashboard" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Commencer le niveau ${next}</a></p>
        </div>`,
      });
      emailSent = !error;
      if (error) console.error("Level unlocked e-mail failed (non-fatal):", error);
    }

    return NextResponse.json({ status: "success", level: next, emailSent });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error approving level:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
