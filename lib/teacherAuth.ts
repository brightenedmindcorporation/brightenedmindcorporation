import "server-only";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/** A teacher teaches some levels of a language/program. */
export interface Assignment {
  langCode: string;
  levels: number[];
}

export type Caller =
  | { role: "admin"; uid: string; email: string; name: string }
  | { role: "teacher"; uid: string; email: string; name: string; assignments: Assignment[] };

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** Cleans untrusted assignment input: known shape, levels 1-3, no duplicates. */
export function normalizeAssignments(input: unknown): Assignment[] {
  if (!Array.isArray(input)) return [];
  const byLang = new Map<string, Set<number>>();
  for (const item of input) {
    const langCode = typeof item?.langCode === "string" ? item.langCode.trim().toUpperCase() : "";
    if (!langCode) continue;
    const levels = Array.isArray(item?.levels) ? item.levels : [];
    const set = byLang.get(langCode) ?? new Set<number>();
    for (const l of levels) {
      const n = Number(l);
      if (Number.isInteger(n) && n >= 1 && n <= 3) set.add(n);
    }
    byLang.set(langCode, set);
  }
  return Array.from(byLang, ([langCode, set]) => ({ langCode, levels: Array.from(set).sort() })).filter(
    (a) => a.levels.length > 0
  );
}

export function canTeach(assignments: Assignment[], langCode: string, level: number): boolean {
  return assignments.some((a) => a.langCode === langCode && a.levels.includes(Number(level)));
}

export function teachesLanguage(assignments: Assignment[], langCode: string): boolean {
  return assignments.some((a) => a.langCode === langCode);
}

/**
 * Does this enrolment belong to the teacher? An explicit attribution made by
 * the admin (`teacherUid`) wins: only that teacher sees the student. Students
 * who have not been attributed yet stay visible to every teacher of their
 * language, so nobody disappears before the admin has sorted them out.
 */
export function isTeachersStudent(
  teacher: { uid: string; assignments: Assignment[] },
  enrollment: { langCode?: string; teacherUid?: string | null }
): boolean {
  if (enrollment.teacherUid) return enrollment.teacherUid === teacher.uid;
  return Boolean(enrollment.langCode) && teachesLanguage(teacher.assignments, enrollment.langCode!);
}

/**
 * Verifies the Firebase ID token and works out who is calling: the admin
 * (by email) or an active teacher (a `teachers/{uid}` doc). Anyone else is
 * refused. Every teacher-facing route goes through this, so a student can
 * never reach teacher data.
 */
export async function getCaller(idToken: string | null | undefined, allow: Array<"admin" | "teacher"> = ["admin", "teacher"]): Promise<Caller> {
  if (!idToken) throw new AuthError("idToken requis.", 400);
  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken);
  } catch {
    throw new AuthError("Session expirée, reconnectez-vous.", 401);
  }

  if (decoded.email === ADMIN_EMAIL) {
    if (!allow.includes("admin")) throw new AuthError("Non autorisé.", 403);
    return { role: "admin", uid: decoded.uid, email: decoded.email, name: decoded.name || "Administrateur" };
  }

  if (allow.includes("teacher")) {
    const snap = await getAdminDb().collection("teachers").doc(decoded.uid).get();
    const data = snap.data();
    if (snap.exists && data?.active !== false) {
      return {
        role: "teacher",
        uid: decoded.uid,
        email: decoded.email || data?.email || "",
        name: data?.name || decoded.name || decoded.email || "Enseignant",
        assignments: normalizeAssignments(data?.assignments),
      };
    }
  }
  throw new AuthError("Non autorisé.", 403);
}

export function bearer(request: Request): string | undefined {
  return request.headers.get("authorization")?.replace(/^Bearer /, "");
}
