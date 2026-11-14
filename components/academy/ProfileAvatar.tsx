"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BmLogo from "@/components/BmLogo";

export interface ProfileBrief {
  loaded: boolean;
  photoUrl: string;
  displayName: string;
}

/** The student's own photo and chosen display name, for the dashboard (nothing is shown if the request fails). */
export function useProfileBrief(): ProfileBrief {
  const [brief, setBrief] = useState<ProfileBrief>({ loaded: false, photoUrl: "", displayName: "" });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const response = await fetch("/api/academy/profile", { headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
        const result = await response.json();
        if (response.ok) setBrief({ loaded: true, photoUrl: result.profile?.photoUrl || "", displayName: result.profile?.displayName || "" });
      } catch {
        // the dashboard simply keeps the BM logo
      }
    });
    return () => unsubscribe();
  }, []);
  return brief;
}

/** The round tile of the welcome card: the student's photo (a link to the profile page), or the BM logo until there is one. */
export default function ProfileAvatar({ photoUrl }: { photoUrl: string }) {
  if (photoUrl) {
    return (
      <Link href="/academia/profile" title="Mon profil" className="relative block w-14 h-14 shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-red-950/50 ring-2 ring-red-600/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoUrl} alt="Ma photo de profil" className="h-full w-full object-cover" />
      </Link>
    );
  }
  return (
    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-950/50 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-white/30">
      <BmLogo size={56} className="rounded-[14px]" />
    </div>
  );
}

/** Small invitation under the greeting while the student has no photo yet. */
export function AddPhotoHint({ brief }: { brief: ProfileBrief }) {
  if (!brief.loaded || brief.photoUrl) return null;
  return (
    <Link href="/academia/profile" className="inline-flex items-center min-h-[44px] text-sm font-bold text-red-700 dark:text-red-300 underline">
      Ajouter ma photo de profil
    </Link>
  );
}
