"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import NotificationBell from "@/components/academy/NotificationBell";

export default function AcademyHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("loggedStudent");
      router.replace("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const isDashboard = pathname === "/academy/dashboard";

  return (
    <header className="bg-surface/90 border-b border-line sticky top-0 z-40 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-sans">

        {/* CÔTÉ GAUCHE */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-ink transition"
            title="Retour au site principal"
          >
            ← Site Général
          </Link>

          {!isDashboard && (
            <>
              <span className="text-ink-faint">|</span>
              <Link
                href="/academy/dashboard"
                className="text-sm font-semibold text-red-500 hover:text-red-400 transition flex items-center gap-1.5"
              >
                <LayoutDashboard size={15} /> Mon Dashboard
              </Link>
            </>
          )}
        </div>

        {/* CÔTÉ DROIT */}
        <div className="flex items-center gap-3">
          <NotificationBell scope="student" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-white hover:bg-red-600 border border-red-900/50 hover:border-red-600 px-4 py-2 rounded-xl transition-all duration-200 bg-red-950/30"
          >
            <LogOut size={15} /> Déconnexion
          </button>
        </div>

      </div>
    </header>
  );
}