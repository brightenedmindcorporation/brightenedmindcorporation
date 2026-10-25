"use client";

import { useEffect } from "react";
import { refreshLoggedStudent } from "@/lib/academy/refreshEnrollments";

/**
 * The enrollments saved at login go stale when the administration suspends an access or its end date passes.
 * On a program's pages the current state is fetched and a student whose access is no longer approved goes back to the dashboard.
 */
export function useAccessGuard(langCode: string | undefined, router: { replace: (href: string) => void }) {
  useEffect(() => {
    if (!langCode) return;
    refreshLoggedStudent().then((updated) => {
      if (!updated || !Array.isArray(updated.enrollments)) return;
      const ok = updated.enrollments.some((e: any) => e.langCode === langCode && e.status === "Approved");
      if (!ok) router.replace("/academia/dashboard");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langCode]);
}
