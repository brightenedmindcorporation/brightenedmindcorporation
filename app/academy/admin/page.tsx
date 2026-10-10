"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const dynamic = "force-dynamic";

import { collection, getDocs } from "firebase/firestore";

export default function AdminPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));

    setStudents(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("ADMIN USER:", user?.email);

      if (user && user.email === "brightenedmindcorporation@gmail.com") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setChecking(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchStudents();
    }
  }, [authorized]);

  const sendEmail = async (
  email: string,
  name: string,
  matricule: string
  ) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      matricule,
    }),
  });

  const result = await response.json();

  console.log(result);

  if (!response.ok) {
    throw new Error(result.error || "Email failed");
  }

  return result;
  };

  // Both actions go through server routes using the Admin SDK (see
  // app/api/admin/{approve,reject}-student/route.ts) instead of writing
  // directly to Firestore from the browser. The previous client-side
  // writes silently failed or got stuck whenever the project's Firestore
  // rules didn't grant the admin account write access to another user's
  // students/{uid} doc (a common and correct rule for "users can only
  // write their own document") — and that client-side email check was
  // never real security anyway, just a UI gate. The server route verifies
  // the caller's ID token server-side instead.
  const approveStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;
    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/approve-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, studentId: student.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur serveur inconnue");
      }

      try {
        await sendEmail(student.email, student.name, result.matricule);
        alert("Approved + Email sent!");
      } catch (emailError) {
        console.error("EMAIL ERROR:", emailError);
        alert("Student approved but email failed");
      }

      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Error approving student: ${error.message || error}`);
      fetchStudents();
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  const rejectStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;
    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/reject-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, studentId: student.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur serveur inconnue");
      }

      alert("Rejected!");
      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Error rejecting student: ${error.message || error}`);
      fetchStudents();
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  if (checking) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-surface-sunken text-ink-soft">
        Loading...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-surface-sunken">
        <h1 className="text-3xl font-bold text-red-600">
          Access Denied
        </h1>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-10 min-h-screen bg-surface-sunken text-ink">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black tracking-tight text-ink mb-6">
          Admin Panel
        </h1>

        {students.length === 0 ? (
          <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
            No students found in Firestore
          </div>
        ) : (
          students.map((s, index) => (
            <div
              key={s.id}
              className="p-5 mb-4 rounded-2xl border border-line bg-surface shadow-xl"
            >
              <p className="text-ink"><b className="text-ink">Name:</b> {s.name}</p>
              <p className="text-ink"><b className="text-ink">Email:</b> {s.email}</p>
              <p className="text-ink"><b className="text-ink">Language:</b> {s.langCode || "EN (legacy)"}</p>
              <p className="text-ink"><b className="text-ink">Level:</b> {s.level}</p>
              <p className="text-ink"><b className="text-ink">Status:</b> {s.status}</p>
              <p className="text-ink"><b className="text-ink">Matricule:</b> {s.matricule || "-"}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => approveStudent(s)}
                  disabled={processingIds.has(s.id) || s.status === "Approved" || s.status === "Rejected"}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {processingIds.has(s.id) ? "Processing..." : "Approve"}
                </button>

                <button
                  onClick={() => rejectStudent(s)}
                  disabled={processingIds.has(s.id) || s.status === "Approved" || s.status === "Rejected"}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}