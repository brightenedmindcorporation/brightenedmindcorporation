import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { rejectIfFakeEmail } from "@/lib/emailValidation";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { generateMatriculeAdmin } from "@/lib/academy/matricule-admin";
import { createNotification } from "@/lib/notifications";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting, normalizeGender } from "@/lib/salutation";
import { availableLanguages } from "@/content/curriculum";
import { isOtherProgramCode, getOtherProgramLabel } from "@/content/programs";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";

/**
 * The administration registers a student directly: the account, the profile and an already-approved
 * enrolment (with its Student ID) are created in one go, and the student receives an e-mail with a
 * link to choose their own password. Nobody ever sees or types a password for them.
 * If the e-mail already has an account, the enrolment is simply added (or reinstated) on it.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["admin"]);

    const body = await request.json().catch(() => ({}));
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const langCode = typeof body.langCode === "string" ? body.langCode.trim() : "";
    const gender = normalizeGender(body.gender);
    const studyDays = body.studyDays === 5 ? 5 : 3;
    const teacherUid = typeof body.teacherUid === "string" && body.teacherUid ? body.teacherUid : "";
    const language = availableLanguages.some((l) => l.code === langCode);
    const other = isOtherProgramCode(langCode);

    if (name.length < 2) return NextResponse.json({ error: "Le nom complet est obligatoire." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
    if (!language && !other) return NextResponse.json({ error: "Formation inconnue." }, { status: 400 });
    const level = language ? Math.min(3, Math.max(1, Number(body.level) || 1)) : "N/A";

    const fakeEmail = await rejectIfFakeEmail(email);
    if (fakeEmail) return fakeEmail;

    const auth = getAdminAuth();
    const db = getAdminDb();

    // The account: reuse it if the e-mail is already registered, otherwise create it.
    let uid: string;
    let created = false;
    try {
      uid = (await auth.getUserByEmail(email)).uid;
    } catch (error: any) {
      if (error?.code !== "auth/user-not-found") throw error;
      const user = await auth.createUser({ email, displayName: name, emailVerified: true, password: randomBytes(18).toString("base64url") });
      uid = user.uid;
      created = true;
    }

    const enrollmentRef = db.collection("enrollments").doc(`${uid}_${langCode}`);
    const studentRef = db.collection("students").doc(uid);
    const [enrollment, student] = await Promise.all([enrollmentRef.get(), studentRef.get()]);
    if (enrollment.exists && enrollment.data()!.status === "Approved") {
      return NextResponse.json({ error: "Cet étudiant est déjà inscrit et approuvé dans cette formation." }, { status: 409 });
    }

    const now = new Date().toISOString();
    if (!student.exists) {
      await studentRef.set({ uid, name, email, ...(gender ? { gender } : {}), createdAt: now });
    } else if (gender && !student.data()?.gender) {
      await studentRef.set({ gender }, { merge: true });
    }

    // Reinstating keeps the Student ID the student already had.
    const matricule = (enrollment.data()?.matricule as string) || (await generateMatriculeAdmin(langCode));
    await enrollmentRef.set(
      {
        uid,
        email,
        name: student.data()?.name || name,
        ...(gender ? { gender } : {}),
        langCode,
        // Same format as a self-registration ("Level 2"), which the rest of the site reads.
        level: typeof level === "number" ? `Level ${level}` : level,
        ...(typeof level === "number" ? { startLevel: level } : {}),
        studyDays,
        status: "Approved",
        matricule,
        source: "admin",
        ...(teacherUid ? { teacherUid } : {}),
        createdAt: enrollment.data()?.createdAt || now,
        approvedAt: now,
        createdBy: caller.email,
      },
      { merge: true }
    );

    const programLabel = availableLanguages.find((l) => l.code === langCode)?.label ?? getOtherProgramLabel(langCode) ?? langCode;
    try {
      await createNotification({
        audience: uid,
        type: "enrollment-approved",
        title: "Inscription confirmée",
        message: `Vous êtes inscrit(e) en ${programLabel} — Student ID ${matricule}.`,
        link: "/academia/dashboard",
      });
    } catch (error) {
      console.error("Create-student notification failed (non-fatal):", error);
    }

    // The e-mail: a link to choose a password (also given back to the administrator, to pass on by WhatsApp if needed).
    let setupLink = "";
    try {
      setupLink = await auth.generatePasswordResetLink(email, { url: `${SITE_URL}/login` });
    } catch (error) {
      console.error("Password link failed (non-fatal):", error);
    }
    let emailSent = false;
    let emailError = "";
    if (process.env.RESEND_API_KEY) {
      const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
        from: mailFrom("BM Academia"),
        to: email,
        replyTo: "info@bmcorporation-cd.com",
        subject: `Votre inscription en ${programLabel} est confirmée`,
        html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
          <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(name, gender)}</h2>
          <p>L'administration de BM Corporation vous a inscrit(e) en <b>${programLabel}</b>. Votre inscription est déjà validée.</p>
          <p>Votre <b>Student ID</b> : <b>${matricule}</b></p>
          ${
            setupLink && created
              ? `<p>Pour accéder à votre espace, choisissez d'abord votre mot de passe :</p>
          <p style="margin: 24px 0;"><a href="${setupLink}" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Choisir mon mot de passe</a></p>
          <p style="font-size: 13px; color: #666;">Ensuite, connectez-vous sur ${SITE_URL}/login avec cette adresse e-mail.</p>`
              : `<p>Connectez-vous avec votre compte habituel pour accéder à votre espace.</p>
          <p style="margin: 24px 0;"><a href="${SITE_URL}/login" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Accéder à mon espace</a></p>`
          }
        </div>`,
      });
      emailSent = !error;
      if (error) emailError = String((error as any).message || error);
    } else {
      emailError = "Envoi d'e-mails non configuré.";
    }

    return NextResponse.json({
      ok: true,
      uid,
      matricule,
      accountCreated: created,
      emailSent,
      emailError,
      // Only useful when the account is new: lets the administrator pass the link on if the e-mail did not arrive.
      setupLink: created ? setupLink : "",
    });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Create student failed:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
