"use client";

/**
 * Anonymous content statistics from the browser (announcement views/clicks, video playback).
 * Same rules as the visit counter: nothing is sent for the administrator's own browser or when the
 * browser asks not to be tracked; the visitor is only a random id (see /api/track/event).
 */

export type TrackedType = "ann" | "lesson";

export interface ContentEvent {
  type: TrackedType;
  key: string;
  title?: string;
  event: "view" | "click" | "play" | "progress";
  where?: "list" | "page";
  kind?: "detail" | "apply" | "apply_page" | "register";
  seconds?: number;
  milestones?: number[];
  exit?: number;
  duration?: number;
}

function visitorId(): string | null {
  try {
    if (localStorage.getItem("bm_no_track") === "1") return null;
    if (navigator.doNotTrack === "1") return null;
    let vid = localStorage.getItem("bm_vid");
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem("bm_vid", vid);
    }
    return vid;
  } catch {
    return null;
  }
}

export function trackContent(event: ContentEvent) {
  try {
    const vid = visitorId();
    if (!vid) return;
    const payload = JSON.stringify({ ...event, vid });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track/event", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track/event", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
  } catch {
    // never break the page for statistics
  }
}

/**
 * Turns "the player is at second X of Y" into statistics: plays, time watched, the quarters of the
 * video reached, and where the viewer left. Works for any player that can report its position.
 */
export class VideoMeter {
  private played = false;
  private ended = false;
  private left = false;
  private pending = 0;
  private lastTick = 0;
  private pos = 0;
  private duration = 0;
  private reached = new Set<number>();
  private sentMilestones = new Set<number>();

  constructor(private type: TrackedType, private key: string, private title: string) {}

  /** The viewer pressed play (or resumed). */
  start() {
    if (!this.played) {
      this.played = true;
      trackContent({ type: this.type, key: this.key, title: this.title, event: "play" });
    }
    this.ended = false;
    this.lastTick = Date.now();
  }

  /** Call about once a second while the video plays. */
  tick(position: number, duration: number) {
    if (!this.played) this.start();
    const now = Date.now();
    this.pending += Math.min(3, (now - this.lastTick) / 1000);
    this.lastTick = now;
    this.pos = position;
    if (duration > 0) {
      this.duration = duration;
      const pct = (position / duration) * 100;
      for (const m of [25, 50, 75]) if (pct >= m) this.reached.add(m);
    }
    if (this.pending >= 15) this.flush();
  }

  /** The video reached its end. */
  finish() {
    this.ended = true;
    this.reached.add(100);
    this.flush();
  }

  /** Sends what is pending. `leaving` also records where the viewer stopped (if they did not finish). */
  flush(leaving = false) {
    if (!this.played) return;
    if (leaving) {
      if (this.left) return;
      this.left = true;
    }
    const milestones = Array.from(this.reached).filter((m) => !this.sentMilestones.has(m));
    const exit = leaving && !this.ended && this.duration > 0 ? Math.min(9, Math.floor((this.pos / this.duration) * 10)) : undefined;
    if (this.pending < 1 && milestones.length === 0 && exit === undefined) return;
    milestones.forEach((m) => this.sentMilestones.add(m));
    trackContent({
      type: this.type,
      key: this.key,
      event: "progress",
      seconds: Math.round(this.pending),
      milestones,
      exit,
      duration: Math.round(this.duration),
    });
    this.pending = 0;
  }
}
