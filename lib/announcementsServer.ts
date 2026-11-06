import "server-only";
import { isAdminConfigured, getAdminDb } from "@/lib/firebase-admin";
import { visibleNow, type Announcement } from "@/lib/announcements";

/** Every announcement the public may see right now (published, started, not ended), pinned first. Never throws. */
export async function listPublicAnnouncements(): Promise<Announcement[]> {
  try {
    if (!isAdminConfigured()) return [];
    const snap = await getAdminDb().collection("announcements").where("active", "==", true).get();
    return visibleNow(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Announcement));
  } catch (error) {
    console.error("Error listing announcements:", error);
    return [];
  }
}

/** One announcement if the public may see it, otherwise null. */
export async function getPublicAnnouncement(id: string): Promise<Announcement | null> {
  try {
    if (!isAdminConfigured()) return null;
    const snap = await getAdminDb().collection("announcements").doc(id).get();
    if (!snap.exists) return null;
    const a = { id: snap.id, ...snap.data() } as Announcement;
    return visibleNow([a]).length ? a : null;
  } catch {
    return null;
  }
}
