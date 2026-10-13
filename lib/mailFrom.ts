// Sender address for every outgoing Resend email. Until the site's domain is
// verified in Resend (resend.com/domains), emails can only be sent from
// Resend's shared sandbox address — and only delivered to the account owner.
// Once bmcorporation-cd.com is verified, set RESEND_FROM_DOMAIN=bmcorporation-cd.com
// on Render and every email switches to noreply@ that domain, no code change.
export function mailFrom(displayName: string): string {
  const domain = process.env.RESEND_FROM_DOMAIN?.trim();
  return domain ? `${displayName} <noreply@${domain}>` : `${displayName} <onboarding@resend.dev>`;
}
