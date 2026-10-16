"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reports each page view anonymously to /api/track (see that route for what is
 * kept). Skipped for the admin/teacher areas, when the browser asks not to be
 * tracked, and for the administrator's own browser once they have opened /admin.
 */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    try {
      if (/^\/(admin|teacher)(\/|$)/.test(pathname)) {
        localStorage.setItem("bm_no_track", "1"); // the admin's own visits are not counted
        return;
      }
      if (localStorage.getItem("bm_no_track") === "1") return;
      if (navigator.doNotTrack === "1") return;

      let vid = localStorage.getItem("bm_vid");
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem("bm_vid", vid);
      }
      const entry = sessionStorage.getItem("bm_session") !== "1";
      if (entry) sessionStorage.setItem("bm_session", "1");

      // Campaign link (?src=tiktok or ?utm_source=…): remembered so that a later sign-up is credited to it.
      const params = new URLSearchParams(window.location.search);
      const found = (params.get("src") || params.get("utm_source") || "").toLowerCase();
      if (/^[a-z0-9_-]{1,30}$/.test(found)) localStorage.setItem("bm_src", found);
      const src = /^[a-z0-9_-]{1,30}$/.test(found) ? found : "";

      const payload = JSON.stringify({ path: pathname, vid, entry, ref: entry ? document.referrer : "", w: window.innerWidth, src: entry ? src : "" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
      }
    } catch {
      // storage or beacon unavailable: never break the page
    }
  }, [pathname]);

  return null;
}
