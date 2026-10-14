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

/** Sends through Resend with an automatic plain-text part next to the HTML. */
export function sendWithText(
  resend: { emails: { send: (payload: any) => Promise<any> } },
  payload: { html?: string; text?: string; [key: string]: unknown }
) {
  return resend.emails.send({ ...payload, text: payload.text ?? (payload.html ? htmlToText(payload.html) : undefined) });
}
