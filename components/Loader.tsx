"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-[9999] overflow-hidden">

        <div className="absolute inset-0 radial-fade" />

        <div className="flex flex-col items-center relative">

          <Image
            src="/logo-bm.png"
            alt="BM Logo"
            width={130}
            height={130}
            className="animate-float-logo drop-shadow-[0_0_30px_rgba(179,46,68,0.35)]"
          />

          <p className="text-gradient-gold mt-6 text-lg tracking-[4px] font-semibold">
            BRIGHTENED MIND CORPORATION
          </p>

          <div className="divider-gold w-24 mt-4" />

        </div>

      </div>
    );
  }

  return <>{children}</>;
}