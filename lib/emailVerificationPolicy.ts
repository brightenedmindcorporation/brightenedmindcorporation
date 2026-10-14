// New student accounts must prove they own their e-mail address (click the
// link Firebase sends at registration) before the administration can approve
// them. Accounts created before this date are grandfathered in so existing
// students are never locked out.
export const EMAIL_VERIFICATION_REQUIRED_AFTER_MS = Date.parse("2026-10-14T00:00:00Z");

export function requiresEmailVerification(creationTime?: string | null): boolean {
  if (!creationTime) return false;
  const created = Date.parse(creationTime);
  return Number.isFinite(created) && created >= EMAIL_VERIFICATION_REQUIRED_AFTER_MS;
}
