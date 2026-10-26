"use client";

/**
 * Identifies the signed-in student on this device. Progress, quiz drafts and written work are kept in the browser
 * per student: without this, two students using the same browser would read and overwrite each other's progress
 * (and the sync would then copy one student's results into the other's record on the server).
 */
export function userScope(): string {
  try {
    const raw = window.localStorage.getItem("loggedStudent");
    const uid = raw ? JSON.parse(raw)?.uid : null;
    return typeof uid === "string" && uid ? uid : "anon";
  } catch {
    return "anon";
  }
}
