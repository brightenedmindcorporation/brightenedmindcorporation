"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const router = useRouter();

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      const snap = await getDoc(doc(db, "students", user.uid));

      if (!snap.exists()) {
        alert("Student not found");
        return;
      }

      const data = snap.data();

      if (data.status !== "Approved") {
        alert("Account not approved yet");
        return;
      }

      // ✅ SAVE USER LOCAL
      localStorage.setItem(
        "loggedStudent",
        JSON.stringify({
          uid: user.uid,
          ...data,
        })
      );

      // 🚀 REDIRECT DASHBOARD
      router.replace("/dashboard");

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 FORGOT PASSWORD
  const handleForgotPassword = async () => {
    try {
      if (!email) {
        alert("Enter your email first");
        return;
      }

      setResetLoading(true);

      await sendPasswordResetEmail(auth, email);

      alert("Password reset email sent!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-4">

      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md text-black">

        <h1 className="text-2xl font-bold text-red-800 text-center mb-6">
          Student Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-red-700 text-white p-3 rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FORGOT PASSWORD */}
        <button
          onClick={handleForgotPassword}
          disabled={resetLoading}
          className="mt-4 text-sm text-red-700 underline w-full"
        >
          {resetLoading ? "Sending email..." : "Forgot password?"}
        </button>

      </div>
    </main>
  );
}