import "server-only";
import { Resend } from "resend";
import { getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting } from "@/lib/salutation";
import { levelNumber } from "@/lib/academy/levelAccess";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

/** The student's enrolment document for a language: the multi-language doc, or the legacy students/{uid} one. */
export async function findEnrollment(uid: string, langCode: string) {
  const db = getAdminDb();
  const enrollmentRef = db.collection("enrollments").doc(`${uid}_${langCode}`);
  const enrollment = await enrollmentRef.get();
  if (enrollment.exists) return { ref: enrollmentRef, data: enrollment.data()!, kind: "enrollment" as const };
  const legacyRef = db.collection("students").doc(uid);
  const legacy = await legacyRef.get();
  if (legacy.exists && legacy.data()?.langCode === langCode) return { ref: legacyRef, data: legacy.data()!, kind: "legacyStudent" as const };
  return null;
}

/**
 * Invites a student who has just passed a level's final quiz to move on to the
 * next level. Sent once per level: an in-app notification and an e-mail. The
 * student then asks for the level from their dashboard and the administration
 * unlocks it (after checking, for instance, that the fees are paid).
 */
export async function sendLevelInvitation(uid: string, langCode: string, completedLevel: number): Promise<void> {
  if (completedLevel >= 3) return;
  const found = await findEnrollment(uid, langCode);
  if (!found || found.data.status !== "Approved") return;
  const next = completedLevel + 1;
  if (levelNumber(found.data.level) >= next) return; // already unlocked
  if (found.data.levelInvites?.[`L${next}`]) return; // already invited

  await found.ref.set({ levelInvites: { [`L${next}`]: new Date().toISOString() } }, { merge: true });

  try {
    await createNotification({
      audience: uid,
      type: "level-invitation",
      title: `Félicitations ! Niveau ${next} disponible`,
      message: `Vous avez réussi le niveau ${completedLevel}. Demandez le niveau ${next} depuis votre tableau de bord.`,
      link: "/academia/dashboard",
    });
  } catch (error) {
    console.error("Level invitation notification failed (non-fatal):", error);
  }

  const email = String(found.data.email || "").trim();
  if (email && process.env.RESEND_API_KEY) {
    let gender = found.data.gender;
    let name = found.data.name;
    if (!gender || !name) {
      const profile = await getAdminDb().collection("students").doc(uid).get().catch(() => null);
      gender = gender || profile?.data()?.gender;
      name = name || profile?.data()?.name;
    }
    const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
      from: mailFrom("BM Academia"),
      to: email,
      replyTo: "info@bmcorporation-cd.com",
      subject: `Félicitations : vous pouvez passer au niveau ${next}`,
      html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
        <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(name, gender)}</h2>
        <p>Bravo : vous avez réussi le <b>niveau ${completedLevel}</b> et vous pouvez maintenant poursuivre avec le <b>niveau ${next}</b>, avec le même compte.</p>
        <p>Connectez-vous à votre espace, puis cliquez sur « Demander le niveau ${next} ». L'administration valide votre demande et vous recevez votre numéro d'inscription du niveau ${next}.</p>
        <p style="margin: 24px 0;"><a href="${SITE_URL}/academia/dashboard" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Accéder à mon espace</a></p>
      </div>`,
    });
    if (error) console.error("Level invitation e-mail failed (non-fatal):", error);
  }
}
