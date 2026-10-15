import { mailFrom } from "@/lib/mailFrom";
import { Resend } from "resend";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { greeting } from "@/lib/salutation";
import { AuthError, bearer, getCaller } from "@/lib/teacherAuth";
import { sendWithText } from "@/lib/mailText";

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Sends the "inscription confirmée" e-mail (with the Student ID) after the
 * admin approves a student. Admin-only: it used to be open to anyone, which
 * would have let strangers send arbitrary e-mails from our domain.
 *
 * Resend does NOT throw when it refuses a message (unverified domain,
 * rejected recipient…) — it returns { error }. That error is checked here
 * and reported honestly, instead of answering "success" for an e-mail that
 * never left.
 */
export async function POST(req: Request) {
  try {
    if (!isAdminConfigured()) {
      return Response.json({ success: false, error: "Serveur non configuré." }, { status: 503 });
    }
    await getCaller(bearer(req), ["admin"]);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ success: false, error: "RESEND_API_KEY is missing" }, { status: 500 });
    }

    const { email, matricule, name, langLabel, level, studyDays } = await req.json();
    if (!email || !matricule) {
      return Response.json({ success: false, error: "email et Student ID requis." }, { status: 400 });
    }

    const studyDaysLine =
      studyDays === 3 || studyDays === 5 ? `<p><b>Rythme d'étude :</b> ${studyDays} jours / semaine</p>` : "";

    // Civility (Monsieur / Madame), when the student gave it at registration.
    let gender: unknown;
    try {
      const snap = await getAdminDb().collection("students").where("email", "==", String(email).trim()).limit(1).get();
      gender = snap.docs[0]?.data().gender;
    } catch {
      // the greeting falls back to the plain name
    }

    const resend = new Resend(apiKey);
    const { data, error } = await sendWithText(resend, {
      from: mailFrom("Brightened Mind Academia"),
      to: String(email).trim(),
      replyTo: "info@bmcorporation-cd.com",
      subject: "Inscription confirmée — Brightened Mind Academia",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #333;">
          <h2 style="color: #7a1f2b;">${esc(greeting(name, gender))}</h2>
          <p>Bienvenue chez BM Academia ! Votre inscription a été approuvée. Voici le récapitulatif :</p>
          <p><b>Langue / formation :</b> ${esc(langLabel ?? "—")}</p>
          <p><b>Niveau :</b> ${esc(level ?? "—")}</p>
          ${studyDaysLine}
          <p style="margin-top: 20px;">Votre Student ID :</p>
          <div style="background: #111; color: #ef4444; padding: 16px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; font-family: monospace; letter-spacing: 2px;">${esc(matricule)}</div>
          <p>Conservez-le précieusement, il vous sera demandé pour toute communication avec l'administration.</p>
          <p>Vous pouvez dès maintenant vous connecter à votre espace d'apprentissage avec l'e-mail et le mot de passe utilisés lors de votre inscription :
            <a href="https://bmcorporation-cd.com/login">bmcorporation-cd.com/login</a></p>
          <p style="font-size: 12px; color: #777;">Brightened Mind Corporation — BM Academia</p>
        </div>
      `,
    });

    if (error) {
      console.error("Approval e-mail refused by Resend:", error);
      return Response.json(
        { success: false, error: `${error.name || "Erreur"} : ${error.message}` },
        { status: 502 }
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("EMAIL ERROR:", error);
    return Response.json({ success: false, error: error?.message || String(error) }, { status });
  }
}
