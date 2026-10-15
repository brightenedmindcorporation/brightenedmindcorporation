"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { LiveSession } from "./liveSessions";

/**
 * The next live class for this student in a language/level. The server only
 * returns classes the student is entitled to (a teacher's class is for that
 * teacher's students), so the request has to carry the student's identity.
 * Resolves null on any failure.
 */
export async function fetchLiveSession(langCode: string, level: number | string): Promise<LiveSession | null> {
  try {
    const user =
      auth.currentUser ??
      (await new Promise<import("firebase/auth").User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          unsubscribe();
          resolve(u);
        });
      }));
    if (!user) return null;
    const idToken = await user.getIdToken();
    const res = await fetch(`/api/live-sessions?langCode=${encodeURIComponent(langCode)}&level=${level}`, {
      headers: { Authorization: `Bearer ${idToken}` },
      cache: "no-store",
    });
    const data = await res.json();
    return data.session ?? null;
  } catch {
    return null;
  }
}
