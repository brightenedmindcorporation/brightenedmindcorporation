"use client";

import { auth } from "@/lib/firebase";
import type { LevelProgress } from "./progress";

/**
 * Mirrors the (still client-authoritative, see progress.ts) localStorage
 * progress to Firestore, purely for admin visibility — the admin "Suivi
 * des étudiants" view has nothing to read otherwise, since progress.ts
 * never left the browser before this. This does NOT make grading
 * server-authoritative (a student could still edit localStorage before
 * this fires); that would need quiz answers to move server-side too,
 * a separate, larger change. Fire-and-forget: never blocks the UI and
 * never surfaces an error to the student if it fails.
 */
export async function syncProgress(langCode: string, level: number, progress: LevelProgress) {
  try {
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) return;
    await fetch("/api/academy/progress/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, langCode, level, progress }),
    });
  } catch (error) {
    console.error("Error syncing progress (non-fatal):", error);
  }
}

export async function syncCertificateIssued(opts: {
  langCode: string;
  level: number;
  levelTitle: string;
  studentName: string;
  average: number;
  certificateId: string;
  studentId?: string;
}) {
  try {
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) return;
    await fetch("/api/academy/certificates/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, ...opts }),
    });
  } catch (error) {
    console.error("Error recording certificate (non-fatal):", error);
  }
}
