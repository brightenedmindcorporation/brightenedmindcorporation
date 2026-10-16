import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { requiresEmailVerification } from "@/lib/emailVerificationPolicy";

// GET routes are cached by Next.js by default unless marked dynamic — this
// serves live admin data and must never be stale.
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";

/**
 * Lists every student row for the admin panel: new-style `enrollments`
 * docs (one per uid+language/program) plus any legacy `students/{uid}`
 * doc that still carries its langCode/level/status directly (accounts
 * created before multi-enrollment support).
 *
 * Goes through the Admin SDK instead of the client SDK reading
 * `enrollments`/`students` directly in the browser. The client-side read
 * depends on Firestore security rules being configured for both
 * collections — `enrollments` is new and has no rule yet, so that read
 * was throwing permission-denied and (via Promise.all) taking the whole
 * admin student list down to zero, including the otherwise-fine
 * `students` read. This route sidesteps that entirely, the same reasoning
 * as every other admin route in this app.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    }

    const idToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!idToken) return NextResponse.json({ error: "idToken requis." }, { status: 400 });

    const decoded = await getAdminAuth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const [enrollmentsSnap, studentsSnap] = await Promise.all([
      adminDb.collection("enrollments").get(),
      adminDb.collection("students").get(),
    ]);

    const enrollmentRows = enrollmentsSnap.docs.map((doc) => ({
      id: doc.id,
      kind: "enrollment" as const,
      ...doc.data(),
    }));

    const legacyRows = studentsSnap.docs
      .filter((doc) => doc.data().langCode && doc.data().status)
      .map((doc) => ({
        id: doc.id,
        kind: "legacyStudent" as const,
        ...doc.data(),
      }));

    const rows: any[] = [...enrollmentRows, ...legacyRows];

    // Flag accounts whose e-mail address was never confirmed (new accounts only).
    const uids = Array.from(new Set(rows.map((r) => r.uid || r.id?.split("_")[0]).filter(Boolean))) as string[];
    const unverified = new Set<string>();
    const accounts = new Map<string, { email?: string; name?: string; lastSignIn?: string }>();
    try {
      for (let i = 0; i < uids.length; i += 100) {
        const res = await getAdminAuth().getUsers(uids.slice(i, i + 100).map((uid) => ({ uid })));
        for (const u of res.users) {
          accounts.set(u.uid, {
            email: u.email || undefined,
            name: u.displayName || undefined,
            lastSignIn: u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).toISOString() : undefined,
          });
          if (requiresEmailVerification(u.metadata.creationTime) && !u.emailVerified) unverified.add(u.uid);
        }
      }
    } catch (verifyError) {
      console.error("Could not check e-mail verification (non-fatal):", verifyError);
    }
    for (const r of rows) r.emailUnverified = unverified.has(r.uid || r.id?.split("_")[0]);

    // A dossier must always show who the student is: when its own name/e-mail
    // is empty, take them from the student profile or the sign-in account.
    const profiles = new Map(studentsSnap.docs.map((d) => [d.id, d.data()]));
    for (const r of rows) {
      const uid = r.uid || r.id?.split("_")[0];
      const profile = profiles.get(uid);
      const account = accounts.get(uid);
      if (!String(r.name || "").trim()) r.name = profile?.name || account?.name || "(nom non renseigné)";
      if (!String(r.email || "").trim()) r.email = profile?.email || account?.email || "";
      // When the student last came (from the sign-in service, plus tracked activity).
      r.lastSignInAt = account?.lastSignIn || null;
      r.lastSeenAt = profile?.lastSeenAt || null;
    }

    return NextResponse.json({ students: rows });
  } catch (error: any) {
    console.error("Error fetching admin students:", error);
    return NextResponse.json({ error: error.message || "Erreur serveur." }, { status: 500 });
  }
}
