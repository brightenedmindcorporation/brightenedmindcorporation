import { NextResponse } from "next/server";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { AuthError, bearer, getCaller, isTeachersStudent } from "@/lib/teacherAuth";

export const dynamic = "force-dynamic";

/**
 * The teacher's mailbox:
 *  - received: messages written by students enrolled in a language the
 *    teacher teaches (the "Message à l'administration" form on the student
 *    dashboard is shared with them);
 *  - sent: the messages this teacher sent to their own students.
 */
export async function GET(request: Request) {
  try {
    if (!isAdminConfigured()) return NextResponse.json({ error: "Serveur non configuré." }, { status: 503 });
    const caller = await getCaller(bearer(request), ["teacher"]);
    if (caller.role !== "teacher") return NextResponse.json({ error: "Non autorisé." }, { status: 403 });

    const db = getAdminDb();
    const [requestsSnap, enrollSnap, sentSnap] = await Promise.all([
      db.collection("studentRequests").orderBy("createdAt", "desc").limit(300).get(),
      db.collection("enrollments").where("status", "==", "Approved").get(),
      db.collection("adminMessages").where("senderUid", "==", caller.uid).get(),
    ]);

    // uid -> languages the student is approved in (only the ones this teacher teaches)
    const myStudents = new Map<string, string[]>();
    for (const d of enrollSnap.docs) {
      const e = d.data();
      if (!isTeachersStudent(caller, e as any)) continue;
      myStudents.set(e.uid, [...(myStudents.get(e.uid) ?? []), e.langCode]);
    }

    const received = requestsSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as any)
      .filter((r) => myStudents.has(r.uid))
      .map((r) => ({
        id: r.id,
        uid: r.uid,
        name: r.name,
        email: r.email,
        type: r.type,
        subject: r.subject,
        message: r.message,
        attachmentNames: r.attachmentNames || [],
        createdAt: r.createdAt,
        langCodes: myStudents.get(r.uid),
      }));

    const sent = sentSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as any)
      .map((m) => ({
        id: m.id,
        subject: m.subject,
        body: m.body,
        recipients: (m.recipients || []).map((r: any) => ({ uid: r.uid, email: r.email })),
        attachmentNames: m.attachmentNames || [],
        createdAt: m.createdAt,
      }))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

    return NextResponse.json({ received, sent });
  } catch (error: any) {
    const status = error instanceof AuthError ? error.status : 500;
    console.error("Error fetching teacher messages:", error);
    return NextResponse.json({ error: error?.message || "Erreur serveur." }, { status });
  }
}
