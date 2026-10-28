"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { auth } from "@/lib/firebase";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  createdAt: string;
}

/** Shared bell for both the admin panel and the student dashboard — which
 * endpoint it talks to is the only thing that differs between the two. */
export default function NotificationBell({ scope }: { scope: "admin" | "student" }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const base = scope === "admin" ? "/api/admin/notifications" : "/api/academy/notifications";

  const fetchNotifications = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) return;
      const response = await fetch(base, { headers: { Authorization: `Bearer ${idToken}` } });
      const result = await response.json();
      if (response.ok) setNotifications(result.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openNotification = async (n: Notification) => {
    if (!n.read) {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        await fetch(`${base}/${n.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
        setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      } catch (error) {
        console.error("Error marking notification read:", error);
      }
    }
    setOpen(false);
    if (!n.link) return;

    // A full navigation (not router.push) on purpose: the admin bell is
    // rendered on the admin page itself, so clicking a notification while
    // already there is the common case — a Next.js client-side push to
    // the same route with a different ?tab= doesn't remount the page, so
    // the tab never actually switched. A full load always picks it up.
    if (window.location.pathname === n.link.split("?")[0]) {
      window.location.href = n.link;
    } else {
      router.push(n.link);
    }
  };

  const markAllRead = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      await fetch(`${base}/mark-all-read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all notifications read:", error);
    }
  };

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-line bg-surface hover:bg-surface-alt text-ink-soft hover:text-ink transition"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 text-[10px] font-black bg-red-600 text-white rounded-full min-w-[17px] h-[17px] px-1 inline-flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto mt-2 sm:w-80 max-h-[70vh] sm:max-h-96 overflow-y-auto bg-surface border border-line rounded-2xl shadow-2xl z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line sticky top-0 bg-surface">
            <p className="text-sm font-bold text-ink">Notifications</p>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs font-semibold text-red-500 hover:text-red-400">
                Tout marquer lu
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-ink-soft">Aucune notification.</div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => openNotification(n)}
                className={`w-full text-left px-4 py-3 border-b border-line/60 transition hover:bg-surface-alt ${!n.read ? "bg-red-950/5" : ""}`}
              >
                <div className="flex items-start gap-2">
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />}
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${!n.read ? "font-bold text-ink" : "font-semibold text-ink-soft"}`}>{n.title}</p>
                    <p className="text-xs text-ink-faint mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-ink-faint mt-1">{formatTime(n.createdAt)}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
