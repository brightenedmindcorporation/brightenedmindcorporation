import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * Server-only counterpart to lib/academy/matricule.ts's generateMatricule,
 * using the Admin SDK so it can run from a route with no signed-in user
 * (e.g. the payment webhook). Shares the same counters/{langCode}
 * sequence so numbers never collide between the two code paths.
 *
 * This lives in its own file (not matricule.ts) because that file is
 * imported by the client-side admin dashboard — pulling firebase-admin
 * into that import chain breaks the client bundle (it depends on Node
 * built-ins like net/fs that don't exist in the browser).
 */
export async function generateMatriculeAdmin(langCode: string): Promise<string> {
  const year = new Date().getFullYear();
  const adminDb = getAdminDb();
  const counterRef = adminDb.collection("counters").doc(langCode);

  const nextSeq = await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);
    const lastSeq = snap.exists ? (snap.data()!.lastSeq as number) : 0;
    const seq = lastSeq + 1;
    tx.set(counterRef, { lastSeq: seq }, { merge: true });
    return seq;
  });

  return `BMCA-${langCode}-${year}-${String(nextSeq).padStart(3, "0")}`;
}
