import "server-only";
import { google } from "googleapis";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const CONFIG_DOC = "gmail";
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];

export function isGmailOAuthConfigured(): boolean {
  return Boolean(process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REDIRECT_URI);
}

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
}

export function getAuthUrl(state: string): string {
  const client = getOAuthClient();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    state,
  });
}

/** Exchanges the OAuth callback `code` for tokens and persists the refresh
 * token in Firestore (config/gmail) — it's the only thing we need to keep;
 * access tokens are re-minted from it on every request. */
export async function connectGmailAccount(code: string): Promise<void> {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);
  if (!tokens.refresh_token) {
    throw new Error(
      "Google n'a pas renvoyé de refresh token — révoque l'accès existant sur myaccount.google.com/permissions puis réessaie (le consentement doit être redemandé pour en obtenir un nouveau)."
    );
  }
  const adminDb = getAdminDb();
  await adminDb.collection("config").doc(CONFIG_DOC).set(
    { refreshToken: tokens.refresh_token, connectedAt: new Date().toISOString() },
    { merge: true }
  );
}

export async function isGmailConnected(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const snap = await getAdminDb().collection("config").doc(CONFIG_DOC).get();
  return Boolean(snap.exists && snap.data()?.refreshToken);
}

async function getGmailClient() {
  const snap = await getAdminDb().collection("config").doc(CONFIG_DOC).get();
  const refreshToken = snap.data()?.refreshToken;
  if (!refreshToken) throw new Error("Gmail n'est pas connecté.");

  const client = getOAuthClient();
  client.setCredentials({ refresh_token: refreshToken });
  return google.gmail({ version: "v1", auth: client });
}

function decodeBase64Url(data: string): string {
  return Buffer.from(data, "base64url").toString("utf-8");
}

function extractBody(payload: any): string {
  if (!payload) return "";
  if (payload.body?.data) return decodeBase64Url(payload.body.data);
  if (payload.parts) {
    const htmlPart = payload.parts.find((p: any) => p.mimeType === "text/html");
    const textPart = payload.parts.find((p: any) => p.mimeType === "text/plain");
    const chosen = htmlPart || textPart;
    if (chosen?.body?.data) return decodeBase64Url(chosen.body.data);
    for (const part of payload.parts) {
      const nested = extractBody(part);
      if (nested) return nested;
    }
  }
  return "";
}

function headerValue(headers: any[], name: string): string {
  return headers?.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || "";
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
}

export async function listInboxMessages(maxResults = 25): Promise<GmailMessageSummary[]> {
  const gmail = await getGmailClient();
  const list = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    labelIds: ["INBOX"],
  });

  const messages = list.data.messages || [];
  const details = await Promise.all(
    messages.map((m) =>
      gmail.users.messages.get({
        userId: "me",
        id: m.id!,
        format: "metadata",
        metadataHeaders: ["From", "Subject", "Date"],
      })
    )
  );

  return details.map((res) => {
    const headers = res.data.payload?.headers || [];
    return {
      id: res.data.id!,
      threadId: res.data.threadId!,
      from: headerValue(headers, "From"),
      subject: headerValue(headers, "Subject") || "(sans sujet)",
      snippet: res.data.snippet || "",
      date: headerValue(headers, "Date"),
      unread: (res.data.labelIds || []).includes("UNREAD"),
    };
  });
}

export interface GmailMessageDetail extends GmailMessageSummary {
  to: string;
  body: string;
}

export async function getMessageDetail(id: string): Promise<GmailMessageDetail> {
  const gmail = await getGmailClient();
  const res = await gmail.users.messages.get({ userId: "me", id, format: "full" });
  const headers = res.data.payload?.headers || [];

  // Viewing a message marks it read, same as opening it in Gmail itself.
  if ((res.data.labelIds || []).includes("UNREAD")) {
    await gmail.users.messages.modify({ userId: "me", id, requestBody: { removeLabelIds: ["UNREAD"] } });
  }

  return {
    id: res.data.id!,
    threadId: res.data.threadId!,
    from: headerValue(headers, "From"),
    to: headerValue(headers, "To"),
    subject: headerValue(headers, "Subject") || "(sans sujet)",
    snippet: res.data.snippet || "",
    date: headerValue(headers, "Date"),
    unread: false,
    body: extractBody(res.data.payload),
  };
}

export interface GmailAttachment {
  filename: string;
  mimeType: string;
  content: Buffer;
}

function buildRawMessage(opts: {
  to: string;
  subject: string;
  body: string;
  inReplyToMessageId?: string;
  references?: string;
  attachments?: GmailAttachment[];
}): string {
  const headers = [`From: ${ADMIN_EMAIL}`, `To: ${opts.to}`, `Subject: ${opts.subject}`, "MIME-Version: 1.0"];
  if (opts.inReplyToMessageId) headers.push(`In-Reply-To: ${opts.inReplyToMessageId}`);
  if (opts.references) headers.push(`References: ${opts.references}`);

  const htmlBody = `<div style="white-space: pre-wrap; font-family: sans-serif;">${opts.body.replace(/\n/g, "<br/>")}</div>`;

  if (!opts.attachments?.length) {
    headers.push("Content-Type: text/html; charset=UTF-8");
    const raw = [...headers, "", htmlBody].join("\r\n");
    return Buffer.from(raw).toString("base64url");
  }

  const boundary = `bm_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

  const parts = [
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    htmlBody,
    "",
    ...opts.attachments.flatMap((att) => [
      `--${boundary}`,
      `Content-Type: ${att.mimeType}; name="${att.filename}"`,
      `Content-Disposition: attachment; filename="${att.filename}"`,
      "Content-Transfer-Encoding: base64",
      "",
      att.content.toString("base64"),
      "",
    ]),
    `--${boundary}--`,
  ];

  const raw = [...headers, "", ...parts].join("\r\n");
  return Buffer.from(raw).toString("base64url");
}

/** Sends a reply within an existing Gmail thread, so it appears correctly
 * threaded both in the recipient's inbox and in the BM Corporation Sent
 * folder — unlike a Resend-sent email, this really is sent from Gmail. */
export async function sendGmailReply(opts: {
  threadId: string;
  to: string;
  subject: string;
  body: string;
  inReplyToMessageId?: string;
  references?: string;
  attachments?: GmailAttachment[];
}): Promise<void> {
  const gmail = await getGmailClient();
  const raw = buildRawMessage(opts);
  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw, threadId: opts.threadId },
  });
}

/** Sends a brand-new (non-reply) email from the BM Corporation Gmail account. */
export async function sendGmailMessage(opts: {
  to: string;
  subject: string;
  body: string;
  attachments?: GmailAttachment[];
}): Promise<void> {
  const gmail = await getGmailClient();
  const raw = buildRawMessage(opts);
  await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
}
