"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Level3Page() {
  const router = useRouter();
  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    const savedStudent =
      localStorage.getItem(
        "loggedStudent"
      );

    if (!savedStudent) {
      router.push("/login");
      return;
    }

    const student =
      JSON.parse(savedStudent);

    if (
      student.level !== "Level 3"
    ) {
      router.push("/dashboard");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Checking access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-red-800">
        Level 3 - Business English
      </h1>

      <p className="text-gray-600 mt-3">
        Welcome to Level 3 courses.
      </p>
    </main>
  );
}