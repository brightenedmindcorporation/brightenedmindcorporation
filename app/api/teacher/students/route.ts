import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, isTeachersStudent, canTeach } from "@/lib/teacherAuth";
import { loadWritingMarks } from "@/lib/academy/writingMarks";

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

    const marks = await loadWritingMarks(db).catch(() => new Map<string, Record<string, number>>());
    const students = new Map<string, any>(); // key: uid_langCode
    for (const d of enrollSnap.docs) {
      const e = d.data();
      if (!isTeachersStudent(caller, e as any)) continue;
      students.set(`${e.uid}_${e.langCode}`, {
        uid: e.uid,
        name: e.name,
        email: e.email,
        langCode: e.langCode,
        studentId: e.matricule || "",
        attributed: Boolean(e.teacherUid),
        levels: {},
      });
    }
    for (const d of legacySnap.docs) {
      const s = d.data();
      if (!s.langCode || !isTeachersStudent(caller, s as any)) continue;
      const key = `${d.id}_${s.langCode}`;
      if (!students.has(key)) {
        students.set(key, {
          uid: d.id,
          name: s.name,
          email: s.email,
          langCode: s.langCode,
          studentId: s.matricule || "",
          attributed: Boolean(s.teacherUid),
          levels: {},
        });
      }
    }

    for (const d of progressSnap.docs) {
      const p = d.data();
      const row = students.get(`${p.uid}_${p.langCode}`);
      // Students the admin attributed to this teacher show every level; the
      // others only the levels the teacher teaches.
      if (!row || (!row.attributed && !canTeach(caller.assignments, p.langCode, Number(p.level)))) continue;
      row.levels[p.level] = {
        // A passed quiz means its lesson was studied, even for progress saved before lessons were tracked.
        completedLessons: new Set([...(p.studiedLessons || []), ...(p.completedQuizzes || [])]).size,
        completedQuizzes: (p.completedQuizzes || []).length,
        finalQuizPassed: Boolean(p.finalQuizPassed),
        finalQuizScore: p.finalQuizScore ?? null,
        updatedAt: p.updatedAt || null,
        // The full saved progress, for the student's file (quiz scores etc.).
        doc: {
          studiedLessons: p.studiedLessons || [],
          completedQuizzes: p.completedQuizzes || [],
          quizScores: p.quizScores || {},
          finalQuizScore: p.finalQuizScore ?? null,
          finalQuizPassed: Boolean(p.finalQuizPassed),
          certificateId: p.certificateId || null,
          unlockedLessons: p.unlockedLessons || [],
          adminScored: p.adminScored || [],
          quizAttempts: p.quizAttempts || {},
          practiceBest: p.practiceBest || {},
          quizParts: p.quizParts || {},
          adminPercent: p.adminPercent || {},
          writingMarks: marks.get(d.id) || {},
          updatedAt: p.updatedAt || null,
        },
      };
    }

    // When each student last came, and how long they have worked (see lib/activityLog.ts).
    const rows = Array.from(students.values());
    const uids = Array.from(new Set(rows.map((r) => r.uid as string)));
    const profiles = new Map<string, any>();
    const lastSignIn = new Map<string, number>();
    try {
      const docs = await db.getAll(...uids.map((u) => db.collection("students").doc(u)));
      for (const d of docs) if (d.exists) profiles.set(d.id, d.data());
      for (let i = 0; i < uids.length; i += 100) {
        const res = await getAdminAuth().getUsers(uids.slice(i, i + 100).map((uid) => ({ uid })));
        for (const u of res.users) if (u.metadata.lastSignInTime) lastSignIn.set(u.uid, new Date(u.metadata.lastSignInTime).getTime());
      }
    } catch (activityError) {
      console.error("Activity lookup failed (non-fatal):", activityError);
    }
    for (const r of rows) {
      const seen = Math.max(profiles.get(r.uid)?.lastSeenAt ? new Date(profiles.get(r.uid).lastSeenAt).getTime() : 0, lastSignIn.get(r.uid) ?? 0);
      r.lastActiveAt = seen ? new Date(seen).toISOString() : null;
      r.activeSeconds = profiles.get(r.uid)?.activityStats?.seconds || 0;
    }

    return NextResponse.json({ students: rows });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error fetching teacher students:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
