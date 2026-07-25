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

    const { email, matricule, name } = body;

    const result = await resend.emails.send({
      from: "Brightened Mind <onboarding@resend.dev>",
      to: email,
      subject: "Your Student Matricule",
      html: `
        <h2>Welcome ${name}</h2>
        <p>Your registration has been approved.</p>
        <h3>Your Matricule: <b>${matricule}</b></h3>
        <p>Keep it safe.</p>
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