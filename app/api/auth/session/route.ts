import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE } from "@/lib/academy/session";
import { isAdminConfigured } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return Response.json(
      {
        success: false,
        error:
          "Firebase Admin n'est pas configuré (FIREBASE_SERVICE_ACCOUNT_KEY manquant).",
      },
      { status: 501 }
    );
  }

  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return Response.json(
        { success: false, error: "idToken manquant" },
        { status: 400 }
      );
    }

    const sessionCookie = await createSessionCookie(idToken);
    const jar = await cookies();
    jar.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 14 * 24 * 60 * 60,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("SESSION ERROR:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return Response.json({ success: true });
}
