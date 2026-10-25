import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";

/** What the administration decided for each program (settings/programs): closed to new requests, approved at once. */
export interface ProgramSettings {
  closed: string[];
  autoApprove: string[];
}

export async function getProgramSettings(): Promise<ProgramSettings> {
  const snap = await getAdminDb().collection("settings").doc("programs").get();
  const d = snap.data() ?? {};
  const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  return { closed: list(d.closed), autoApprove: list(d.autoApprove) };
}
