import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, canTeach, getCaller } from "@/lib/teacherAuth";
import { cleanAudience } from "@/lib/academy/liveAccess";

// GET routes are cached by Next.js by default unless marked dynamic — this
// serves live admin data and must never be stale.
export const dynamic = "force-dynamic";

function fail(error: any) {
  const status = error instanceof AuthError ? error.status : 500;
  return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
}

// Lists scheduled live sessions. The admin sees every session (past ones
// included); a teacher only sees the sessions they own.
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const caller = await getCaller(bearer(request));

    const adminDb = getAdminDb();
    const query =
      caller.role === "admin"
        ? adminDb.collection("liveSessions").orderBy("scheduledAt", "desc")
        : adminDb.collection("liveSessions").where("teacherUid", "==", caller.uid);
    const snap = await query.get();
    let sessions = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];
    if (caller.role === "teacher") {
      sessions = sessions.sort((a, b) => String(b.scheduledAt).localeCompare(String(a.scheduledAt)));
    }

    return NextResponse.json({ sessions });
  } catch (error) {
    return fail(error);
  }
}

// Schedules a session. A teacher can only schedule for a language/level
// they are assigned to, and the session is theirs; the admin may optionally
// attach a teacher.
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    const caller = await getCaller(bearer(request) ?? (await request.clone().json()).idToken);
    const body = await request.json();
    const { langCode, level, scheduledAt, durationMinutes, title } = body;

    if (!langCode || !level || !scheduledAt) {
      return NextResponse.json({ error: "langCode, level et scheduledAt sont requis." }, { status: 400 });
    }

    let teacherUid: string | null = null;
    let teacherName: string | null = null;
    const adminDb = getAdminDb();

    if (caller.role === "teacher") {
      if (!canTeach(caller.assignments, String(langCode), Number(level))) {
        return NextResponse.json({ error: "Vous n'enseignez pas ce niveau." }, { status: 403 });
      }
      teacherUid = caller.uid;
      teacherName = caller.name;
    } else if (body.teacherUid) {
      const t = await adminDb.collection("teachers").doc(String(body.teacherUid)).get();
      if (t.exists) {
        teacherUid = t.id;
        teacherName = t.data()?.name || null;
      }
    }

    // Optional hand-picked list of students (otherwise: every student concerned).
    const studentUids = await cleanAudience(adminDb, caller, String(langCode), body.studentUids);
    if (studentUids && studentUids.length === 0) {
      return NextResponse.json({ error: "Choisissez au moins un étudiant, ou ouvrez le cours à tous." }, { status: 400 });
    }

    const docRef = await adminDb.collection("liveSessions").add({
      ...(studentUids ? { studentUids } : {}),
      langCode,
      level: Number(level),
      scheduledAt,
      durationMinutes: Number(durationMinutes) || 60,
      title: title || null,
      teacherUid,
      teacherName,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: "success", id: docRef.id });
  } catch (error) {
    return fail(error);
  }
}
