import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          success: false,
          error: "RESEND_API_KEY is missing",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();

    const { email, matricule, name, langLabel, level, studyDays } = body;

    const studyDaysLine =
      studyDays === 3 || studyDays === 5
        ? `<p><b>Rythme d'étude :</b> ${studyDays} jours / semaine</p>`
        : "";

    const result = await resend.emails.send({
      from: "Brightened Mind <onboarding@resend.dev>",
      to: email,
      subject: "Inscription confirmée — Brightened Mind Academia",
      html: `
        <h2>Bienvenue ${name},</h2>
        <p>Votre inscription a été approuvée. Voici le récapitulatif de votre inscription :</p>
        <p><b>Langue :</b> ${langLabel ?? "—"}</p>
        <p><b>Niveau :</b> ${level ?? "—"}</p>
        ${studyDaysLine}
        <h3>Votre matricule : <b>${matricule}</b></h3>
        <p>Conservez-le précieusement, il vous sera demandé pour toute communication avec l'administration.</p>
        <p>Vous pouvez dès maintenant vous connecter à votre espace d'apprentissage avec l'email et le mot de passe utilisés lors de votre inscription.</p>
      `,
    });

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
