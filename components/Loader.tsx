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
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">

        <div className="flex flex-col items-center">

          <Image
            src="/logo-bm.png"
            alt="BM Logo"
            width={130}
            height={130}
            className="animate-pulse"
          />

          <p className="text-white mt-6 text-lg tracking-[4px]">
            BRIGHTENED MIND CORPORATION
          </p>

        </div>

      </div>
    );
  }

  return <>{children}</>;
}