"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function AcademyHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("loggedStudent");
      router.replace("/academy/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const isDashboard = pathname === "/academy/dashboard";

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* CÔTÉ GAUCHE */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition"
            title="Retour au site principal"
          >
            ← Site Général
          </Link>

          {!isDashboard && (
            <>
              <span className="text-neutral-700">|</span>
              <Link
                href="/academy/dashboard"
                className="text-sm font-semibold text-red-500 hover:text-red-400 transition flex items-center gap-1"
              >
                📊 Mon Dashboard
              </Link>
            </>
          )}
        </div>

        {/* CÔTÉ DROIT */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-white hover:bg-red-600 border border-red-900/50 hover:border-red-600 px-4 py-2 rounded-xl transition-all duration-200 bg-red-950/30"
          >
            🚪 Déconnexion
          </button>
        </div>

      </div>
    </header>
  );
}