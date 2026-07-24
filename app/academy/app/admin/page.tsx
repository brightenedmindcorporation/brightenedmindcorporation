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
} from "firebase/firestore";

export default function AdminPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

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

  const generateMatricule = (index: number) => {
    const year = new Date().getFullYear();
    const number = String(index + 1).padStart(3, "0");
    return `BMCA-${year}-${number}`;
  };

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
  try {
    const snapshot = await getDocs(collection(db, "students"));

    const approvedStudents = snapshot.docs.filter(
      (d) => d.data().status === "Approved"
    );

    const nextNumber = approvedStudents.length + 1;

    const matricule = `BMCA-${new Date().getFullYear()}-${String(
      nextNumber
    ).padStart(3, "0")}`;

    await updateDoc(doc(db, "students", student.id), {
      status: "Approved",
      matricule,
    });

    try {
      await sendEmail(
        student.email,
        student.name,
        matricule
      );

      alert("Approved + Email sent!");
    } catch (emailError) {
      console.error("EMAIL ERROR:", emailError);

      alert("Student approved but email failed");
    }

    fetchStudents();
  } catch (error) {
    console.error(error);
    alert("Error approving student");
  }
};

  const rejectStudent = async (student: any) => {
    try {
      await updateDoc(doc(db, "students", student.id), {
        status: "Rejected",
      });

      alert("Rejected!");
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error rejecting student");
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
            <p><b>Level:</b> {s.level}</p>
            <p><b>Status:</b> {s.status}</p>
            <p><b>Matricule:</b> {s.matricule || "-"}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => approveStudent(s)}
                className="bg-green-600 text-white px-4 py-2"
              >
                Approve
              </button>

              <button
                onClick={() => rejectStudent(s)}
                className="bg-red-600 text-white px-4 py-2"
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