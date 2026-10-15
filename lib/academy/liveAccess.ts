import "server-only";
import type { Firestore } from "firebase-admin/firestore";

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

export function sessionOpenToStudent(session: { teacherUid?: string | null }, standing: StudentStanding): boolean {
  if (!standing.approved) return false;
  if (!session.teacherUid || !standing.teacherUid) return true;
  return session.teacherUid === standing.teacherUid;
}
