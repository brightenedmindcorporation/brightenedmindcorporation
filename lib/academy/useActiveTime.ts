"use client";

import { useEffect } from "react";
import { reportTime } from "./activity";

/**
 * Counts the time the student is really working on a page: tab visible and
 * some mouse / keyboard / scroll / touch activity in the last 90 seconds.
 * Reported in chunks (every minute and when leaving), never the page content.
 */
export function useActiveTime(key: string | null) {
  useEffect(() => {
    if (!key) return;
    let pending = 0;
    let lastInteraction = Date.now();
    const touch = () => {
      lastInteraction = Date.now();
    };
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"] as const;
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }));

    const send = () => {
      while (pending >= 10) {
        const chunk = Math.min(pending, 120);
        pending -= chunk;
        reportTime(key, chunk);
      }
    };
    const tick = setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - lastInteraction < 90_000) pending += 10;
    }, 10_000);
    const flush = setInterval(send, 60_000);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") send();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(tick);
      clearInterval(flush);
      document.removeEventListener("visibilitychange", onVisibility);
      events.forEach((e) => window.removeEventListener(e, touch));
      send();
    };
  }, [key]);
}
