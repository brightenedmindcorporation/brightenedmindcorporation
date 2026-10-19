"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { mergeServerProgress, type LevelProgress } from "./progress";

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

/**
 * Pulls the saved progress of a level from the server into this device (other devices, decisions of the
 * administration such as an unlocked lesson). Never throws and never waits long: offline, the pages simply
 * work from what the device already has.
 */
export async function pullProgress(langSlug: string, langCode: string | undefined, level: number): Promise<void> {
  if (!langCode) return;
  try {
    const run = async () => {
      const user =
        auth.currentUser ??
        (await new Promise<User | null>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (u) => {
            unsubscribe();
            resolve(u);
          });
        }));
      const idToken = await user?.getIdToken();
      if (!idToken) return;
      const response = await fetch(`/api/academy/progress?langCode=${encodeURIComponent(langCode)}&level=${level}`, {
        headers: { Authorization: `Bearer ${idToken}` },
        cache: "no-store",
      });
      if (!response.ok) return;
      const { progress } = await response.json();
      if (progress) mergeServerProgress(langSlug, level, progress);
    };
    await Promise.race([run(), new Promise((resolve) => setTimeout(resolve, 3000))]);
  } catch {
    // offline or signed out: carry on with local progress
  }
}

/** Hands the written part of a quiz to the teachers for correction (first attempt only). Fire-and-forget. */
export async function submitWritingForReview(opts: {
  langCode: string;
  level: number;
  key: number | "final";
  items: { kind: string; prompt: string; expected?: string; text: string }[];
}) {
  try {
    const user =
      auth.currentUser ??
      (await new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          unsubscribe();
          resolve(u);
        });
      }));
    if (!user || opts.items.length === 0) return;
    const idToken = await user.getIdToken();
    await fetch("/api/academy/writing/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ ...opts, key: String(opts.key) }),
      keepalive: true,
    });
  } catch (error) {
    console.error("Writing submission failed (non-fatal):", error);
  }
}
