import { withSignatureHtml, withSignatureText, type SignatureOption } from "./mailSignature";

/** Plain-text twin of an HTML e-mail. Messages with only an HTML part are a
 * classic spam signal; sending both parts helps inbox placement. */
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Sends through Resend with an automatic plain-text part next to the HTML,
 * and the BM Corporation signature appended (pass `signature: false` to skip
 * it, or a person — e.g. a teacher — to sign with their name). */
export function sendWithText(
  resend: { emails: { send: (payload: any) => Promise<any> } },
  payload: { html?: string; text?: string; signature?: SignatureOption; [key: string]: unknown }
) {
  const { signature, ...rest } = payload;
  const html = rest.html ? withSignatureHtml(rest.html, signature) : undefined;
  const text = rest.text !== undefined ? withSignatureText(rest.text, signature) : html ? htmlToText(html) : undefined;
  const out: Record<string, unknown> = { ...rest };
  if (html !== undefined) out.html = html;
  if (text !== undefined) out.text = text;
  return resend.emails.send(out);
}
