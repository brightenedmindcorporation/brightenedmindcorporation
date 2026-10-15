"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * The student's enrolments (status, study plan, Student ID…) are copied to
 * localStorage at login. When the admin changes something later (e.g. 3 → 5
 * study days) that copy goes stale, so the dashboard and level pages call
 * this to pull the current values and merge them back. Never throws: on any
 * failure the existing local copy simply stays.
 */
export async function refreshLoggedStudent(): Promise<any | null> {
  try {
    const raw = localStorage.getItem("loggedStudent");
    if (!raw) return null;
    const stored = JSON.parse(raw);

    const user = await new Promise<import("firebase/auth").User | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        unsubscribe();
        resolve(u);
      });
    });
    if (!user) return null;

    const idToken = await user.getIdToken();
    const response = await fetch("/api/academy/my-enrollments", { headers: { Authorization: `Bearer ${idToken}` } });
    if (!response.ok) return null;
    const { enrollments } = await response.json();
    if (!Array.isArray(enrollments)) return null;

    const updated = { ...stored, enrollments };
    localStorage.setItem("loggedStudent", JSON.stringify(updated));
    return updated;
  } catch {
    return null;
  }
}
