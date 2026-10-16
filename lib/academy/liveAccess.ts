import "server-only";
import type { Firestore } from "firebase-admin/firestore";
import { isTeachersStudent, type Caller } from "@/lib/teacherAuth";

/**
 * Who may attend a live class. A session scheduled by a teacher is only for
 * that teacher's students: a student the admin attributed to another teacher
 * never sees it. Students not attributed yet, and sessions scheduled by the
 * admin without a teacher, stay open to everyone enrolled in that language.
 */

export interface StudentStanding {
  approved: boolean;
  /** The teacher the admin attributed this student to, if any. */
  teacherUid: string | null;
}

/** The student's approved status and attributed teacher for one language. */
export async function getStudentStanding(db: Firestore, uid: string, langCode: string): Promise<StudentStanding> {
  const enrollment = await db.collection("enrollments").doc(`${uid}_${langCode}`).get();
  if (enrollment.exists) {
    const e = enrollment.data()!;
    if (e.status === "Approved") return { approved: true, teacherUid: (e.teacherUid as string) || null };
  }
  // Legacy accounts created before multi-enrollment support.
  const legacy = await db.collection("students").doc(uid).get();
  const s = legacy.data();
  if (s && s.langCode === langCode && s.status === "Approved") {
    return { approved: true, teacherUid: (s.teacherUid as string) || null };
  }
  return { approved: false, teacherUid: null };
}

export function sessionOpenToStudent(
  session: { teacherUid?: string | null; studentUids?: string[] | null },
  standing: StudentStanding,
  uid: string
): boolean {
  if (!standing.approved) return false;
  // A class with a hand-picked list is for those students only.
  if (Array.isArray(session.studentUids)) return session.studentUids.includes(uid);
  if (!session.teacherUid || !standing.teacherUid) return true;
  return session.teacherUid === standing.teacherUid;
}

/**
 * The hand-picked students of a class, cleaned: only students approved in that language, and — for a
 * teacher — only their own students. Returns null when no list was given (= everyone concerned).
 */
export async function cleanAudience(db: Firestore, caller: Caller, langCode: string, input: unknown): Promise<string[] | null> {
  if (!Array.isArray(input)) return null;
  const uids = Array.from(new Set(input.filter((u): u is string => typeof u === "string" && /^[A-Za-z0-9]{6,64}$/.test(u)))).slice(0, 500);
  if (uids.length === 0) return [];
  const snaps = await db.getAll(...uids.map((u) => db.collection("enrollments").doc(`${u}_${langCode}`)));
  const legacySnaps = await db.getAll(...uids.map((u) => db.collection("students").doc(u)));
  const ok: string[] = [];
  uids.forEach((uid, i) => {
    const e = snaps[i].exists ? snaps[i].data()! : null;
    const l = legacySnaps[i].exists ? legacySnaps[i].data()! : null;
    const enrollment = e && e.status === "Approved" ? e : l && l.langCode === langCode && l.status === "Approved" ? l : null;
    if (!enrollment) return;
    if (caller.role === "teacher" && !isTeachersStudent(caller, enrollment as any)) return;
    ok.push(uid);
  });
  return ok;
}
