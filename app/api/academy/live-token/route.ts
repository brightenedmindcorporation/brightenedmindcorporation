import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { generateJaasToken, isJaasAuthConfigured } from "@/lib/academy/jaasToken";
import { getJaasAppId, getLiveRoomName, isJitsiConfigured } from "@/lib/academy/liveRooms";
import { isSessionOpenNow, type LiveSession } from "@/lib/academy/liveSessions";

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

    const { idToken, langCode, level } = await request.json();
    if (!idToken || !langCode || !level) {
      return NextResponse.json({ error: "idToken, langCode et level sont requis." }, { status: 400 });
    }

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const isAdmin = decoded.email === ADMIN_EMAIL;

    if (!isAdmin) {
      const adminDb = getAdminDb();
      const enrollmentSnap = await adminDb.collection("enrollments").doc(`${decoded.uid}_${langCode}`).get();
      let approved = enrollmentSnap.exists && enrollmentSnap.data()?.status === "Approved";

      if (!approved) {
        // Legacy accounts created before multi-enrollment support.
        const studentSnap = await adminDb.collection("students").doc(decoded.uid).get();
        const student = studentSnap.data();
        approved = Boolean(student && student.langCode === langCode && student.status === "Approved");
      }

      if (!approved) {
        return NextResponse.json({ error: "Non autorisé pour cette langue." }, { status: 403 });
      }

      // Students only get a token once the teacher has opened the room —
      // enforced here, not just in the UI, so nobody can slip in early.
      const sessionsSnap = await adminDb
        .collection("liveSessions")
        .where("langCode", "==", langCode)
        .where("level", "==", Number(level))
        .get();
      const roomOpen = sessionsSnap.docs.some((d) => isSessionOpenNow(d.data() as LiveSession));
      if (!roomOpen) {
        return NextResponse.json(
          { error: "Le cours n'a pas encore été ouvert par l'enseignant.", code: "not-open" },
          { status: 403 }
        );
      }
    }

    const appId = getJaasAppId()!;
    const roomName = getLiveRoomName(langCode, Number(level));
    const token = generateJaasToken({
      appId,
      name: decoded.name || decoded.email || (isAdmin ? "Enseignant" : "Étudiant"),
      email: decoded.email || "",
      moderator: isAdmin,
    });

    return NextResponse.json({ token, appId, roomName });
  } catch (error: any) {
    console.error("Error generating JaaS token:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
