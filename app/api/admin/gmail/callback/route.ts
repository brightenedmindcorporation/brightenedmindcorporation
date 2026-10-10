import { NextResponse } from "next/server";
import { connectGmailAccount } from "@/lib/gmail";

/**
 * OAuth redirect target — Google sends the browser here after the admin
 * consents. No Firebase idToken is available on this hop (it's a plain
 * browser redirect from Google), so request authenticity instead relies on
 * the `state` value matching the short-lived httpOnly cookie set when the
 * flow started, plus the `code` itself only being usable with our client
 * secret. Redirects back into the admin panel with a query flag either way
 * so the UI can show success/failure without needing its own API call.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("gmail_oauth_state="))
    ?.split("=")[1];

  const redirect = (status: "success" | "error", message?: string) => {
    const dest = new URL("/academy/admin", url.origin);
    dest.searchParams.set("gmail", status);
    if (message) dest.searchParams.set("gmail_error", message);
    const response = NextResponse.redirect(dest);
    response.cookies.delete("gmail_oauth_state");
    return response;
  };

  if (!code || !state || !expectedState || state !== expectedState) {
    return redirect("error", "Requête invalide ou expirée, réessaie.");
  }

  try {
    await connectGmailAccount(code);
    return redirect("success");
  } catch (error: any) {
    console.error("Error connecting Gmail account:", error);
    return redirect("error", error.message || "Erreur serveur.");
  }
}
