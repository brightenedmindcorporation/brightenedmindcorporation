"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const dynamic = "force-dynamic";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  runTransaction,
} from "firebase/firestore";
import { generateMatricule } from "@/lib/academy/matricule";

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

  const approveStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;
    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      // Claim the student atomically before generating a matricule, so two
      // admins (or a double-click) can never both pass the "Pending" check
      // and each generate a separate matricule for the same student.
      const studentRef = doc(db, "students", student.id);
      const claimed = await runTransaction(db, async (tx) => {
        const snap = await tx.get(studentRef);
        if (!snap.exists() || snap.data().status !== "Pending") return false;
        tx.update(studentRef, { status: "Approving" });
        return true;
      });

      if (!claimed) {
        alert("This student was already processed (by you or another admin).");
        fetchStudents();
        return;
      }

      const matricule = await generateMatricule(student.langCode || "EN");

      await updateDoc(studentRef, {
        status: "Approved",
        matricule,
      });

      try {
        await sendEmail(student.email, student.name, matricule);
        alert("Approved + Email sent!");
      } catch (emailError) {
        console.error("EMAIL ERROR:", emailError);
        alert("Student approved but email failed");
      }

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error approving student");
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
      await updateDoc(doc(db, "students", student.id), {
        status: "Rejected",
      });

      alert("Rejected!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error rejecting student");
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
      <main className="flex items-center justify-center min-h-screen bg-white text-black">
        Loading...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-white text-black">
        <h1 className="text-3xl font-bold text-red-600">
          Access Denied
        </h1>
      </main>
    );
  }

  return (
    <main className="p-10 min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Admin Panel
      </h1>

      {students.length === 0 ? (
        <div className="p-4 border bg-white text-black">
          No students found in Firestore
        </div>
      ) : (
        students.map((s, index) => (
          <div
            key={s.id}
            className="p-5 mb-4 border bg-white text-black"
          >
            <p><b>Name:</b> {s.name}</p>
            <p><b>Email:</b> {s.email}</p>
            <p><b>Language:</b> {s.langCode || "EN (legacy)"}</p>
            <p><b>Level:</b> {s.level}</p>
            <p><b>Status:</b> {s.status}</p>
            <p><b>Matricule:</b> {s.matricule || "-"}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => approveStudent(s)}
                disabled={processingIds.has(s.id) || s.status !== "Pending"}
                className="bg-green-600 text-white px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {processingIds.has(s.id) ? "Processing..." : "Approve"}
              </button>

              <button
                onClick={() => rejectStudent(s)}
                disabled={processingIds.has(s.id) || s.status !== "Pending"}
                className="bg-red-600 text-white px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}