import { doc, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { shortCode } from "@/lib/academy/shortCode";

/**
 * Generates the next sequential matricule for a given language code,
 * e.g. generateMatricule("EN") -> "BMCA-EN-2026-004".
 *
 * Uses a Firestore transaction on counters/{langCode} so concurrent
 * approvals never hand out the same number twice (the old code counted
 * already-approved students on each click, which races under concurrent
 * admin approvals).
 */
export async function generateMatricule(langCode: string): Promise<string> {
  const year = new Date().getFullYear();
  const counterRef = doc(db, "counters", langCode);

  const nextSeq = await runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef);
    const lastSeq = snap.exists() ? (snap.data().lastSeq as number) : 0;
    const seq = lastSeq + 1;
    tx.set(counterRef, { lastSeq: seq }, { merge: true });
    return seq;
  });

  return `BMCA-${shortCode(langCode)}-${year}-${String(nextSeq).padStart(3, "0")}`;
}
