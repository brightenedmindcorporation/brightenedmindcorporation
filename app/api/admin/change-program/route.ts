import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting } from "@/lib/salutation";
import { generateMatriculeAdmin } from "@/lib/academy/matricule-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { availableLanguages, findProgramByCode } from "@/content/curriculum";
import { getOtherProgramLabel, isOtherProgramCode } from "@/content/programs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

const labelOf = (code: string) => availableLanguages.find((l) => l.code === code)?.label ?? getOtherProgramLabel(code) ?? code;

// Statuses in which an enrolment is a live one: a student cannot hold two of them in the same program.
const LIVE = ["Pending", "Approved", "Suspended", "Expired"];

/**
 * The administration moves a student from one program to another (for example French → English).
 * The enrolment is re-created under the new program, because its identity is `<uid>_<langCode>`:
 * - an approved student gets a new Student ID, since the Student ID carries the language (BMCA-EN-…);
 * - the student starts the new program at level 1, with no access to the old levels;
 * - what was done in the old program stays recorded (progress is kept per program), and the old Student ID,
 *   level and date are written on the new enrolment (`changedFrom`) for the dossier;
 * - the teacher attribution is cleared (teachers are assigned per program) and a payment already received is kept;
 * - the student is notified and e-mailed the new Student ID.
 *
 * Body: { id, langCode }  (id: the enrolment's id)
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin"]);

    const { id, langCode: rawCode } = await request.json();
    const newCode = String(rawCode ?? "").trim();
    if (!id || !newCode) return NextResponse.json({ error: "Inscription et nouvelle formation requises." }, { status: 400 });
    if (!findProgramByCode(newCode) && !isOtherProgramCode(newCode)) return NextResponse.json({ error: "Formation inconnue." }, { status: 400 });

    const db = getAdminDb();
    const oldRef = db.collection("enrollments").doc(String(id));
    const oldSnap = await oldRef.get();
    if (!oldSnap.exists) return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    const old = oldSnap.data()!;
    if (old.langCode === newCode) return NextResponse.json({ error: "L'étudiant suit déjà cette formation." }, { status: 400 });
    if (!LIVE.includes(old.status)) return NextResponse.json({ error: "Seule une inscription en attente, approuvée, suspendue ou terminée peut changer de formation." }, { status: 400 });

    const uid = (old.uid as string) || String(id).split("_")[0];
    const newRef = db.collection("enrollments").doc(`${uid}_${newCode}`);
    const existing = await newRef.get();
    if (existing.exists && LIVE.includes(existing.data()!.status)) {
      return NextResponse.json({ error: `L'étudiant est déjà inscrit en ${labelOf(newCode)}.` }, { status: 409 });
    }

    // Only an approved student has a Student ID; a waiting request keeps waiting for its approval.
    const approved = old.status === "Approved";
    const matricule = approved ? await generateMatriculeAdmin(newCode) : "";
    const now = new Date().toISOString();
    const by = caller.name || "administration";

    const fresh: Record<string, unknown> = {
      uid,
      email: old.email || "",
      name: old.name || "",
      ...(old.gender ? { gender: old.gender } : {}),
      langCode: newCode,
      level: "Level 1",
      startLevel: 1,
      studyDays: old.studyDays === 5 ? 5 : 3,
      ...(old.source ? { source: old.source } : {}),
      ...(old.paid ? { paid: old.paid, ...(old.paidAt ? { paidAt: old.paidAt } : {}) } : {}),
      status: old.status,
      matricule,
      ...(approved ? { approvedAt: now } : {}),
      createdAt: old.createdAt || now,
      changedFrom: { langCode: old.langCode, matricule: old.matricule || "", level: old.level || "", at: now, by },
      history: [...(Array.isArray(old.history) ? old.history : []), { at: now, by, action: "program-changed", from: old.langCode, to: newCode }],
    };

    // One atomic step: the new enrolment appears and the old one goes, so the student never has both nor none.
    await db.runTransaction(async (tx) => {
      tx.set(newRef, fresh);
      tx.delete(oldRef);
    });

    try {
      await createNotification({
        audience: uid,
        type: "program-changed",
        title: `Votre formation est maintenant : ${labelOf(newCode)}`,
        message: approved
          ? `L'administration a placé votre inscription en ${labelOf(newCode)}, au niveau 1. Votre nouveau Student ID est ${matricule}.`
          : `L'administration a placé votre demande d'inscription en ${labelOf(newCode)}. Elle attend toujours son approbation.`,
        link: "/academia/dashboard",
      });
    } catch (error) {
      console.error("Program-change notification failed (non-fatal):", error);
    }

    let emailSent = false;
    const email = String(old.email || "").trim();
    if (approved && email && process.env.RESEND_API_KEY) {
      const profile = await db.collection("students").doc(uid).get().catch(() => null);
      const gender = old.gender || profile?.data()?.gender;
      const name = old.name || profile?.data()?.name;
      const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
        from: mailFrom("BM Academia"),
        to: email,
        replyTo: "info@bmcorporation-cd.com",
        subject: `Votre formation est maintenant : ${labelOf(newCode)} — BM Academia`,
        html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
          <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(name, gender)}</h2>
          <p>L'administration a placé votre inscription en <b>${labelOf(newCode)}</b>, au niveau 1.</p>
          <p>Votre nouveau <b>Student ID</b> est : <b>${matricule}</b>. Gardez-le : il remplace l'ancien pour cette formation.</p>
          <p style="margin: 24px 0;"><a href="${SITE_URL}/academia/dashboard" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Ouvrir mon espace</a></p>
        </div>`,
      });
      emailSent = !error;
      if (error) console.error("Program-change e-mail failed (non-fatal):", error);
    }

    return NextResponse.json({ status: "success", langCode: newCode, matricule, emailSent });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error changing program:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
