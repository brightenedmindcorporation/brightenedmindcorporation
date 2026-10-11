import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * Shared notification writer used by the various creation/approval routes
 * (new enrollment, new job application, new project/devis request, new
 * student complaint, enrollment approved/rejected...) to populate the
 * admin and per-student notification bells. Callers should never let a
 * notification failure break the real action it's attached to — wrap in
 * try/catch and swallow, same as the existing non-fatal email sends.
 */
export async function createNotification(opts: {
  audience: "admin" | string; // "admin" or a student uid
  type: string;
  title: string;
  message: string;
  link?: string;
}): Promise<void> {
  await getAdminDb().collection("notifications").add({
    audience: opts.audience,
    type: opts.type,
    title: opts.title,
    message: opts.message,
    link: opts.link || null,
    read: false,
    createdAt: new Date().toISOString(),
  });
}
