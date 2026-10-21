import "server-only";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { createNotification } from "@/lib/notifications";
import { mailFrom } from "@/lib/mailFrom";
import { sendWithText } from "@/lib/mailText";
import { greeting } from "@/lib/salutation";
import { logActivitySafe, localDay } from "@/lib/activityLog";
import { findStuckQuizzes } from "@/lib/alerts";

const ADMIN_EMAIL = "brightenedmindcorporation@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bmcorporation-cd.com";
const DAY = 86_400_000;

export interface ReminderSettings {
  enabled: boolean;
  /** Days without any activity before a reminder is sent (typed freely by the administration: 1 to 365). */
  afterDays: number;
  /** Minimum days between two reminders to the same student (1 to 90). */
  repeatDays: number;
  /** Most reminders one student ever gets (1 to 30). */
  maxReminders: number;
}

const clamp = (value: unknown, min: number, max: number, fallback: number) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n > 0 ? Math.min(max, Math.max(min, n)) : fallback;
};

export async function getReminderSettings(): Promise<ReminderSettings> {
  const snap = await getAdminDb().collection("system").doc("reminders").get();
  const d = snap.data() || {};
  return {
    enabled: d.enabled !== false,
    afterDays: clamp(d.afterDays, 1, 365, 7),
    repeatDays: clamp(d.repeatDays, 1, 90, 7),
    maxReminders: clamp(d.maxReminders, 1, 30, 4),
  };
}

/** Normalises settings typed by the administration. */
export function cleanReminderSettings(input: { afterDays?: unknown; repeatDays?: unknown; maxReminders?: unknown }) {
  const out: Record<string, number> = {};
  if (input.afterDays !== undefined) out.afterDays = clamp(input.afterDays, 1, 365, 7);
  if (input.repeatDays !== undefined) out.repeatDays = clamp(input.repeatDays, 1, 90, 7);
  if (input.maxReminders !== undefined) out.maxReminders = clamp(input.maxReminders, 1, 30, 4);
  return out;
}

/** Sends the "we miss you" reminders to inactive students (at most 25 per run, 4 per student, one a week). */
async function sendReminders(settings: ReminderSettings): Promise<{ sent: number; skipped: number }> {
  const db = getAdminDb();
  const now = Date.now();
  const [enrollSnap, studentsSnap] = await Promise.all([db.collection("enrollments").where("status", "==", "Approved").get(), db.collection("students").get()]);
  const students = new Map(studentsSnap.docs.map((d) => [d.id, d.data()]));
  // One reminder per student: the oldest approval gives the "never came" baseline.
  const baseline = new Map<string, number>();
  for (const d of enrollSnap.docs) {
    const e = d.data();
    const t = new Date(e.approvedAt || e.createdAt || now).getTime();
    baseline.set(e.uid, Math.min(baseline.get(e.uid) ?? Infinity, t));
  }
  const uids = Array.from(baseline.keys());
  const lastSignIn = new Map<string, number>();
  for (let i = 0; i < uids.length; i += 100) {
    try {
      const res = await getAdminAuth().getUsers(uids.slice(i, i + 100).map((uid) => ({ uid })));
      for (const u of res.users) if (u.metadata.lastSignInTime) lastSignIn.set(u.uid, new Date(u.metadata.lastSignInTime).getTime());
    } catch (error) {
      console.error("Sign-in lookup failed (non-fatal):", error);
    }
  }

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  let sent = 0;
  let skipped = 0;
  for (const uid of uids) {
    if (sent >= 25) break;
    const s = students.get(uid);
    if (!s?.email) continue;
    const seen = Math.max(s.lastSeenAt ? new Date(s.lastSeenAt).getTime() : 0, lastSignIn.get(uid) ?? 0);
    const inactiveDays = (now - (seen || baseline.get(uid)!)) / DAY;
    const neverCame = seen === 0;
    if (inactiveDays < (neverCame ? Math.min(3, settings.afterDays) : settings.afterDays)) continue;
    const lastReminder = s.lastReminderAt ? new Date(s.lastReminderAt).getTime() : 0;
    if (now - lastReminder < (settings.repeatDays - 0.5) * DAY || (s.reminderCount || 0) >= settings.maxReminders) {
      skipped++;
      continue;
    }

    const days = Math.floor(inactiveDays);
    const subject = neverCame ? "Votre espace BM Academia vous attend" : "Votre formation BM Academia vous attend";
    const body = neverCame
      ? "Votre inscription est validée, mais vous ne vous êtes pas encore connecté. Votre premier cours est prêt : il suffit de vous connecter avec l'adresse e-mail de votre inscription."
      : `Cela fait ${days} jours que nous ne vous avons pas vu sur BM Academia. Votre progression est sauvegardée : vous pouvez reprendre exactement là où vous vous êtes arrêté.`;
    try {
      if (resend) {
        const { error } = await sendWithText(resend, {
          from: mailFrom("BM Academia"),
          to: String(s.email),
          replyTo: "info@bmcorporation-cd.com",
          subject,
          html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
            <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(s.name, s.gender)}</h2>
            <p>${body}</p>
            <p>Quelques minutes par jour suffisent. Si quelque chose vous bloque (accès, rythme, leçon difficile), répondez simplement à ce message : nous sommes là pour vous aider.</p>
            <p style="margin: 24px 0;"><a href="${SITE_URL}/academia/dashboard" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Reprendre ma formation</a></p>
          </div>`,
        });
        if (error) {
          console.error("Reminder e-mail refused (non-fatal):", error);
          continue;
        }
        await new Promise((r) => setTimeout(r, 600)); // below the provider's rate limit
      }
      await createNotification({ audience: uid, type: "reminder", title: "Votre formation vous attend", message: body, link: "/academia/dashboard" });
      await logActivitySafe(uid, "reminder", neverCame ? "Rappel automatique : première connexion" : `Rappel automatique : inactif depuis ${days} jours`, {});
      await db.collection("students").doc(uid).set({ lastReminderAt: new Date().toISOString(), reminderCount: FieldValue.increment(1) }, { merge: true });
      sent++;
    } catch (error) {
      console.error("Reminder failed (non-fatal):", error);
    }
  }
  return { sent, skipped };
}

/** Monday morning summary for the administration. */
async function sendWeeklyReport(): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;
  const db = getAdminDb();
  const now = Date.now();
  const weekAgo = new Date(now - 7 * DAY).toISOString();
  const days = Array.from({ length: 7 }, (_, i) => localDay(now - i * DAY));

  const [studentsSnap, enrollSnap, activityDays, visitDays, stuck] = await Promise.all([
    db.collection("students").get(),
    db.collection("enrollments").get(),
    Promise.all(days.map((d) => db.collection("activity_days").doc(d).get())),
    Promise.all(days.map((d) => db.collection("analytics_days").doc(d).get())),
    findStuckQuizzes(),
  ]);

  const sum = (docs: FirebaseFirestore.DocumentSnapshot[], field: string) => docs.reduce((n, d) => n + (Number(d.data()?.[field]) || 0), 0);
  const newStudents = studentsSnap.docs.filter((d) => String(d.data().createdAt || "") >= weekAgo);
  const pending = enrollSnap.docs.filter((d) => d.data().status === "Pending").length;
  const approved = new Set(enrollSnap.docs.filter((d) => d.data().status === "Approved").map((d) => d.data().uid));
  const active = studentsSnap.docs.filter((d) => approved.has(d.id) && String(d.data().lastSeenAt || "") >= weekAgo);
  const inactive = Array.from(approved).length - active.length;

  const row = (label: string, value: string | number) =>
    `<tr><td style="padding:6px 12px;color:#555;">${label}</td><td style="padding:6px 12px;font-weight:bold;text-align:right;">${value}</td></tr>`;
  const stuckList = stuck
    .slice(0, 10)
    .map((s) => `<li>${s.name || s.email} — ${s.quiz} (${s.score})</li>`)
    .join("");

  const html = `<div style="font-family: sans-serif; max-width: 600px; color:#333;">
    <h2 style="color:#7a1f2b;margin:0 0 4px;">Rapport de la semaine</h2>
    <p style="color:#777;margin:0 0 16px;">BM Academia — du ${days[6]} au ${days[0]}</p>
    <table style="border-collapse:collapse;width:100%;border:1px solid #e6ded4;">
      ${row("Nouveaux inscrits", newStudents.length)}
      ${row("Inscriptions en attente de validation", pending)}
      ${row("Étudiants actifs cette semaine", active.length)}
      ${row("Étudiants approuvés inactifs (+ 7 jours)", inactive)}
      ${row("Leçons ouvertes", sum(activityDays, "lesson_open"))}
      ${row("Quiz réussis / échoués", `${sum(activityDays, "quizPassed")} / ${sum(activityDays, "quizFailed")}`)}
      ${row("Cours en direct suivis", sum(activityDays, "live_join"))}
      ${row("Certificats obtenus", sum(activityDays, "certificate"))}
      ${row("Visiteurs du site / pages vues", `${sum(visitDays, "visitors")} / ${sum(visitDays, "views")}`)}
    </table>
    ${stuck.length ? `<h3 style="color:#7a1f2b;margin:20px 0 6px;">Étudiants bloqués après un quiz échoué (${stuck.length})</h3><ul style="color:#555;">${stuckList}</ul>` : ""}
    <p style="margin-top:20px;"><a href="${SITE_URL}/admin?tab=activity" style="color:#7a1f2b;font-weight:bold;">Ouvrir le suivi dans l'administration</a></p>
  </div>`;
  const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
    from: mailFrom("BM Academia"),
    to: ADMIN_EMAIL,
    subject: `Rapport de la semaine — ${newStudents.length} inscrit(s), ${active.length} actif(s)`,
    html,
    signature: false,
  });
  if (error) console.error("Weekly report refused (non-fatal):", error);
  return !error;
}

export interface DailyResult {
  ran: boolean;
  reason?: string;
  reminders?: { sent: number; skipped: number };
  weeklyReport?: boolean;
}

/**
 * Runs the daily maintenance once per day: reminders to inactive students and,
 * on Mondays, the weekly report. Called lazily from the visit counter (so no
 * external scheduler is required) and by /api/cron/daily for one that is.
 * A lock in Firestore keeps two servers from running it twice.
 */
export async function runDailyJob(force = false): Promise<DailyResult> {
  if (!isAdminConfigured()) return { ran: false, reason: "not-configured" };
  const db = getAdminDb();
  const ref = db.collection("system").doc("dailyJob");
  const today = localDay();

  const locked = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const d = snap.data() || {};
    if (!force && d.lastRunDay === today) return false;
    if (d.lockUntil && new Date(d.lockUntil).getTime() > Date.now()) return false;
    tx.set(ref, { lockUntil: new Date(Date.now() + 10 * 60_000).toISOString() }, { merge: true });
    return true;
  });
  if (!locked) return { ran: false, reason: "already-done-or-running" };

  const result: DailyResult = { ran: true };
  try {
    const settings = await getReminderSettings();
    if (settings.enabled) result.reminders = await sendReminders(settings);

    const localDate = new Date(Date.now() + 2 * 3600_000);
    const isMonday = localDate.getUTCDay() === 1;
    const last = (await ref.get()).data()?.lastWeeklyReport as string | undefined;
    if ((isMonday && last !== today) || (force && !last)) {
      result.weeklyReport = await sendWeeklyReport();
      if (result.weeklyReport) await ref.set({ lastWeeklyReport: today }, { merge: true });
    }
  } finally {
    await ref.set({ lastRunDay: today, lastRunAt: new Date().toISOString(), lockUntil: null, lastResult: result }, { merge: true });
  }
  return result;
}

let checkedDay = "";
/**
 * Called from the visit counter: starts the daily maintenance on the first
 * visit of the day (after 08:00 local time, so reminders never arrive at
 * night). Cheap — one comparison — after the first call of the day.
 */
export function maybeRunDailyJob(): void {
  const today = localDay();
  if (checkedDay === today) return;
  const localHour = new Date(Date.now() + 2 * 3600_000).getUTCHours();
  if (localHour < 8) return;
  checkedDay = today;
  void runDailyJob(false).catch((error) => console.error("Daily job failed (non-fatal):", error));
}

/**
 * Follows up ONE student right now (the "Relancer" button): an e-mail and a notification, whatever the
 * automatic rules say. The administration can add a personal message.
 */
export async function sendFollowUp(uid: string, opts: { message?: string; by?: string } = {}): Promise<{ emailSent: boolean; emailError: string }> {
  const db = getAdminDb();
  const profile = (await db.collection("students").doc(uid).get()).data();
  if (!profile) throw new Error("Étudiant introuvable.");
  const email = String(profile.email || "");
  let seen = profile.lastSeenAt ? new Date(profile.lastSeenAt).getTime() : 0;
  try {
    const u = await getAdminAuth().getUser(uid);
    if (u.metadata.lastSignInTime) seen = Math.max(seen, new Date(u.metadata.lastSignInTime).getTime());
  } catch {
    // the sign-in date is optional
  }
  const days = seen ? Math.floor((Date.now() - seen) / DAY) : null;
  const custom = (opts.message || "").trim().slice(0, 1500);
  const body =
    custom ||
    (days === null
      ? "Votre inscription est validée, mais vous ne vous êtes pas encore connecté. Votre premier cours est prêt : il suffit de vous connecter avec l'adresse e-mail de votre inscription."
      : `Cela fait ${days} jour${days > 1 ? "s" : ""} que nous ne vous avons pas vu sur BM Academia. Votre progression est sauvegardée : vous pouvez reprendre exactement là où vous vous êtes arrêté.`);

  let emailSent = false;
  let emailError = "";
  if (email && process.env.RESEND_API_KEY) {
    const { error } = await sendWithText(new Resend(process.env.RESEND_API_KEY), {
      from: mailFrom("BM Academia"),
      to: email,
      replyTo: "info@bmcorporation-cd.com",
      subject: "Votre formation BM Academia vous attend",
      html: `<div style="font-family: sans-serif; max-width: 560px; color: #333;">
        <h2 style="color: #7a1f2b; margin: 0 0 12px;">${greeting(profile.name, profile.gender)}</h2>
        <p style="white-space: pre-line;">${body.replace(/</g, "&lt;")}</p>
        <p style="margin: 24px 0;"><a href="${SITE_URL}/academia/dashboard" style="background: #7a1f2b; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">Reprendre ma formation</a></p>
        <p style="font-size: 13px; color: #666;">Si quelque chose vous bloque, répondez simplement à ce message : nous sommes là pour vous aider.</p>
      </div>`,
    });
    emailSent = !error;
    if (error) emailError = String((error as any).message || error);
  } else {
    emailError = email ? "Envoi d'e-mails non configuré." : "Cet étudiant n'a pas d'adresse e-mail.";
  }

  await createNotification({ audience: uid, type: "reminder", title: "Votre formation vous attend", message: body, link: "/academia/dashboard" });
  await logActivitySafe(uid, "reminder", `Relance manuelle${opts.by ? ` par ${opts.by}` : ""}${custom ? " (message personnel)" : ""}`, {});
  await db.collection("students").doc(uid).set({ lastReminderAt: new Date().toISOString(), reminderCount: FieldValue.increment(1) }, { merge: true });
  return { emailSent, emailError };
}
