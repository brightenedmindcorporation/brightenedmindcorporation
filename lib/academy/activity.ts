"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export type ClientActivity = "login" | "session" | "lesson_open" | "quiz" | "final_quiz" | "live_join";

/**
 * Tells the server what the student just did (shown to the administration).
 * Fire-and-forget: it never blocks the page and never shows an error.
 */
export async function logActivity(
  type: ClientActivity,
  label: string,
  meta: { langCode?: string; level?: number; lessonId?: number; score?: number; total?: number; passed?: boolean } = {}
) {
  try {
    const user =
      auth.currentUser ??
      (await new Promise<import("firebase/auth").User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          unsubscribe();
          resolve(u);
        });
      }));
    if (!user) return;
    const idToken = await user.getIdToken();
    await fetch("/api/academy/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ type, label, meta }),
      keepalive: true,
    });
  } catch {
    // reporting is best-effort
  }
}

/** Reports a chunk of active time (seconds) spent on a page. */
export async function reportTime(key: string, seconds: number) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const idToken = await user.getIdToken();
    await fetch("/api/academy/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ type: "time", key, seconds }),
      keepalive: true,
    });
  } catch {
    // best-effort
  }
}
