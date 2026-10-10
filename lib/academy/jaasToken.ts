import "server-only";
import jwt from "jsonwebtoken";

/**
 * Signs a JaaS (8x8) Jitsi JWT so moderator status is explicit in the
 * token instead of "whoever joins the room first" — JaaS's default
 * unauthenticated behavior, which let a student become moderator if
 * they joined before the teacher. Needs an API key pair generated in
 * the JaaS dashboard (API Keys → Add API Key): JAAS_API_KEY_ID (the
 * Key ID shown in that table) and JAAS_PRIVATE_KEY (the downloaded
 * RSA private key, pasted whole — PEM with real newlines or
 * base64-encoded, either works).
 */

export function isJaasAuthConfigured(): boolean {
  return Boolean(process.env.JAAS_API_KEY_ID && process.env.JAAS_PRIVATE_KEY);
}

function getPrivateKey(): string {
  let raw = (process.env.JAAS_PRIVATE_KEY || "").trim();
  if (!raw.includes("BEGIN")) {
    raw = Buffer.from(raw, "base64").toString("utf-8");
  }
  // Some env var UIs flatten real newlines into literal "\n" sequences.
  raw = raw.replace(/\\n/g, "\n");

  // Some env var UIs instead strip newlines entirely, collapsing the PEM
  // onto a single line — Node's crypto module rejects that (surfaces as
  // jsonwebtoken's generic "must be an asymmetric key" error). Detect it
  // and rebuild standard PEM line breaks (64-char body lines).
  if (!raw.includes("\n")) {
    const match = raw.match(/-----BEGIN ([A-Z ]+)-----(.*)-----END \1-----/);
    if (match) {
      const label = match[1];
      const body = match[2].replace(/\s+/g, "");
      const lines = body.match(/.{1,64}/g) || [];
      raw = `-----BEGIN ${label}-----\n${lines.join("\n")}\n-----END ${label}-----\n`;
    }
  }

  return raw;
}

export function generateJaasToken({
  appId,
  name,
  email,
  moderator,
}: {
  appId: string;
  name: string;
  email: string;
  moderator: boolean;
}): string {
  const keyId = process.env.JAAS_API_KEY_ID;
  if (!keyId) throw new Error("JAAS_API_KEY_ID is not set");

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    aud: "jitsi",
    iss: "chat",
    sub: appId,
    room: "*",
    exp: now + 2 * 60 * 60,
    nbf: now - 10,
    context: {
      user: {
        name,
        email,
        moderator: moderator ? "true" : "false",
      },
      features: {
        livestreaming: "false",
        recording: "false",
        transcription: "false",
        "outbound-call": "false",
      },
    },
  };

  return jwt.sign(payload, getPrivateKey(), { algorithm: "RS256", header: { alg: "RS256", kid: keyId } });
}
