import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { generateJaasToken, isJaasAuthConfigured } from "@/lib/academy/jaasToken";
import { getJaasAppId, getLiveRoomName, isJitsiConfigured } from "@/lib/academy/liveRooms";
import { isSessionOpenNow, type LiveSession } from "@/lib/academy/liveSessions";
import { canTeach } from "@/lib/teacherAuth";
import { getStudentStanding, sessionOpenToStudent } from "@/lib/academy/liveAccess";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Issues a JaaS JWT for the live-class room of a given language/level.
 * The admin always gets moderator: true; a student only gets a token
 * (moderator: false) if they hold an approved enrollment for that
 * language — otherwise anyone could request a token for any room.
 */
export async function POST(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }
    if (!isJitsiConfigured() || !getJaasAppId()) {
      return NextResponse.json({ error: "Service de visioconférence non configuré." }, { status: 503 });
    }
    if (!isJaasAuthConfigured()) {
      return NextResponse.json(
        { error: "Clé JaaS non configurée côté serveur (JAAS_API_KEY_ID / JAAS_PRIVATE_KEY)." },
        { status: 503 }
      );
    }

    const { idToken, langCode, level, sessionId } = await request.json();
    if (!idToken || !langCode || !level) {
      return NextResponse.json({ error: "idToken, langCode et level sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const adminDb = getAdminDb();
    let isAdmin = decoded.email === ADMIN_EMAIL;
    let teacherName: string | null = null;

    // The room belongs to one scheduled session, so two teachers giving the
    // same language/level at the same time never share a room.
    const sessionSnap = sessionId ? await adminDb.collection("liveSessions").doc(String(sessionId)).get() : null;
    const session = sessionSnap?.exists ? ({ id: sessionSnap.id, ...sessionSnap.data() } as LiveSession) : null;
    if (session && (session.langCode !== langCode || Number(session.level) !== Number(level))) {
      return NextResponse.json({ error: "Session invalide." }, { status: 400 });
    }

    // An active teacher assigned to this language/level hosts the room as
    // moderator, exactly like the admin — but only for their own sessions.
    if (!isAdmin) {
      const teacherSnap = await adminDb.collection("teachers").doc(decoded.uid).get();
      const t = teacherSnap.data();
      if (teacherSnap.exists && t?.active !== false && canTeach(t?.assignments || [], String(langCode), Number(level))) {
        if (session?.teacherUid && session.teacherUid !== decoded.uid) {
          return NextResponse.json({ error: "Cette session appartient à un autre enseignant." }, { status: 403 });
        }
        isAdmin = true;
        teacherName = t?.name || null;
      }
    }

    if (!isAdmin) {
      const standing = await getStudentStanding(adminDb, decoded.uid, String(langCode));
      if (!standing.approved) {
        return NextResponse.json({ error: "Non autorisé pour cette langue." }, { status: 403 });
      }
      if (!session) {
        return NextResponse.json({ error: "Session introuvable.", code: "not-open" }, { status: 403 });
      }
      // A teacher's class is only for that teacher's students.
      if (!sessionOpenToStudent(session, standing, decoded.uid)) {
        return NextResponse.json({ error: "Ce cours est réservé aux étudiants d'un autre professeur." }, { status: 403 });
      }

      // Students only get a token once the teacher has opened the room —
      // enforced here, not just in the UI, so nobody can slip in early.
      if (!isSessionOpenNow(session)) {
        return NextResponse.json(
          { error: "Le cours n'a pas encore été ouvert par l'enseignant.", code: "not-open" },
          { status: 403 }
        );
      }
    }

    const appId = getJaasAppId()!;
    const roomName = getLiveRoomName(langCode, Number(level), session?.id);
    const token = generateJaasToken({
      appId,
      name: teacherName || decoded.name || decoded.email || (isAdmin ? "Enseignant" : "Étudiant"),
      email: decoded.email || "",
      moderator: isAdmin,
    });

    return NextResponse.json({ token, appId, roomName });
  } catch (error: any) {
    console.error("Error generating JaaS token:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
