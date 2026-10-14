import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, teachesLanguage, canTeach } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

/**
 * The teacher's students: approved enrolments in the languages they teach,
 * with their progress on the levels they teach. Nothing else leaks — no
 * payments, no other languages, no contact data beyond name/e-mail.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["teacher"]);
    if (caller.role !== "teacher") return NextResponse.json({ error: "Non autorisé." }, { status: 403 });

    const db = getAdminDb();
    const [enrollSnap, legacySnap, progressSnap] = await Promise.all([
      db.collection("enrollments").where("status", "==", "Approved").get(),
      db.collection("students").where("status", "==", "Approved").get(),
      db.collection("progress").get(),
    ]);

    const students = new Map<string, any>(); // key: uid_langCode
    for (const d of enrollSnap.docs) {
      const e = d.data();
      if (!teachesLanguage(caller.assignments, e.langCode)) continue;
      students.set(`${e.uid}_${e.langCode}`, {
        uid: e.uid,
        name: e.name,
        email: e.email,
        langCode: e.langCode,
        studentId: e.matricule || "",
        levels: {},
      });
    }
    for (const d of legacySnap.docs) {
      const s = d.data();
      if (!s.langCode || !teachesLanguage(caller.assignments, s.langCode)) continue;
      const key = `${d.id}_${s.langCode}`;
      if (!students.has(key)) {
        students.set(key, {
          uid: d.id,
          name: s.name,
          email: s.email,
          langCode: s.langCode,
          studentId: s.matricule || "",
          levels: {},
        });
      }
    }

    for (const d of progressSnap.docs) {
      const p = d.data();
      const row = students.get(`${p.uid}_${p.langCode}`);
      if (!row || !canTeach(caller.assignments, p.langCode, Number(p.level))) continue;
      row.levels[p.level] = {
        completedLessons: (p.completedLessons || []).length,
        completedQuizzes: (p.completedQuizzes || []).length,
        finalQuizPassed: Boolean(p.finalQuizPassed),
        finalQuizScore: p.finalQuizScore ?? null,
        updatedAt: p.updatedAt || null,
      };
    }

    return NextResponse.json({ students: Array.from(students.values()) });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error fetching teacher students:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
