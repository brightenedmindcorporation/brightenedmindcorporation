/**
 * The signature appended to every e-mail the site sends (Resend and Gmail).
 *
 * Three ready-made styles; change SIGNATURE_STYLE to switch. Messages written
 * by a teacher are signed with the teacher's own name instead (see `person`).
 */
export type SignatureStyle = "simple" | "pro" | "warm";
export const SIGNATURE_STYLE: SignatureStyle = "pro";

const SITE = "bmcorporation-cd.com";
const MAIL = "info@bmcorporation-cd.com";
const PHONE = "+243 988 830 799";
const WINE = "#7a1f2b";

/** A named person signing instead of "L'administration" (e.g. a teacher). */
export interface SignaturePerson {
  name: string;
  title?: string;
  /** Shown under the name so the reader knows where to answer. */
  email?: string;
}
export type SignatureOption = SignaturePerson | false | undefined;

export const SIGNATURE_MARK = "data-bm-signature";

function lines(person?: SignaturePerson): { who: string[]; closing: string } {
  const style = SIGNATURE_STYLE;
  if (person) {
    return {
      who: [person.name, person.title, "BM Corporation"].filter((l): l is string => Boolean(l)),
      closing: style === "warm" ? "Bien cordialement," : "Cordialement,",
    };
  }
  if (style === "warm") return { who: ["L'équipe BM Corporation"], closing: "Avec toute notre considération," };
  return { who: ["L'administration", "BM Corporation"], closing: "Cordialement," };
}

export function signatureHtml(person?: SignaturePerson): string {
  const { who, closing } = lines(person);
  const style = SIGNATURE_STYLE;
  const whoHtml = who
    .map((l, i) => `<p style="margin:0;${i === 0 ? `font-weight:bold;color:${WINE};` : "font-weight:bold;"}">${l}</p>`)
    .join("");
  const personMail = person?.email
    ? `<p style="margin:4px 0 0;font-size:13px;"><a href="mailto:${person.email}" style="color:${WINE};text-decoration:none;">${person.email}</a></p>`
    : "";
  const details =
    style === "simple"
      ? ""
      : `<p style="margin:8px 0 0;font-size:13px;color:#555;line-height:1.5;">Brightened Mind Corporation<br/><a href="https://${SITE}" style="color:${WINE};text-decoration:none;">${SITE}</a> · ${MAIL} · ${PHONE}</p>` +
        `<p style="margin:6px 0 0;font-size:12px;font-style:italic;color:${WINE};">Éclairer les esprits. Développer les talents.</p>`;
  const rule = style === "simple" ? "" : `border-top:3px solid ${WINE};padding-top:14px;`;
  return (
    `<div ${SIGNATURE_MARK}="1" style="margin-top:28px;${rule}font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">` +
    `<p style="margin:0 0 6px;">${closing}</p>${whoHtml}${personMail}${details}</div>`
  );
}

export function signatureText(person?: SignaturePerson): string {
  const { who, closing } = lines(person);
  const details =
    SIGNATURE_STYLE === "simple"
      ? ""
      : `\nBrightened Mind Corporation\n${SITE} · ${MAIL} · ${PHONE}\nÉclairer les esprits. Développer les talents.`;
  return `\n\n${closing}\n${who.join("\n")}${person?.email ? `\n${person.email}` : ""}${details}`;
}

/** Appends the signature to an HTML body, once. */
export function withSignatureHtml(html: string, option?: SignatureOption): string {
  if (option === false || html.includes(SIGNATURE_MARK)) return html;
  return html + signatureHtml(option || undefined);
}
export function withSignatureText(text: string, option?: SignatureOption): string {
  if (option === false) return text;
  return text + signatureText(option || undefined);
}
