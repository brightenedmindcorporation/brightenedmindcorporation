import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * Certificate numbers are their own sequence, distinct from the Student ID
 * (enrolment number): e.g. CERT-EN-2026-0007. One counter per language in
 * counters/CERT-{langCode}, bumped inside a transaction so two certificates
 * can never share a number.
 */
export async function nextCertificateNumber(langCode?: string | null): Promise<string> {
  const lang = (langCode || "GEN").toUpperCase().replace(/[^A-Z0-9]/g, "") || "GEN";
  const year = new Date().getFullYear();
  const adminDb = getAdminDb();
  const counterRef = adminDb.collection("counters").doc(`CERT-${lang}`);

  const seq = await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);
    const next = (snap.exists ? (snap.data()!.lastSeq as number) : 0) + 1;
    tx.set(counterRef, { lastSeq: next }, { merge: true });
    return next;
  });

  return `CERT-${lang}-${year}-${String(seq).padStart(4, "0")}`;
}

/**
 * A student's number for a given language + level is reserved once and then
 * reused, so reopening the certificate page (or downloading twice) never
 * burns a new number.
 */
export async function reserveCertificateNumber(uid: string, langCode: string, level: number): Promise<string> {
  const adminDb = getAdminDb();
  const reservationRef = adminDb.collection("certificateReservations").doc(`${uid}_${langCode}_${level}`);
  const existing = await reservationRef.get();
  if (existing.exists && existing.data()?.certificateId) return existing.data()!.certificateId as string;

  const certificateId = await nextCertificateNumber(langCode);
  // create() fails if a concurrent request reserved first — then reuse theirs.
  try {
    await reservationRef.create({ certificateId, uid, langCode, level, createdAt: new Date().toISOString() });
    return certificateId;
  } catch {
    const again = await reservationRef.get();
    return (again.data()?.certificateId as string) || certificateId;
  }
}
