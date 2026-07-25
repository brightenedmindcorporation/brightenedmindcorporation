"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("Level 1");

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      await setDoc(doc(db, "students", user.uid), {
        uid: user.uid,
        name,
        email,
        level,
        status: "Pending",
        matricule: "",
        createdAt: new Date(),
      });

      alert("Account created!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="bg-white p-6 rounded-xl shadow w-96 border">

        <h1 className="text-xl font-bold mb-4 text-black">
          Student Register
        </h1>

        <input
          placeholder="Full name"
          className="w-full border p-2 mb-2 text-black bg-white"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-2 text-black bg-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2 text-black bg-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-3 text-black bg-white"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="Level 1">Level 1</option>
          <option value="Level 2">Level 2</option>
          <option value="Level 3">Level 3</option>
        </select>

        <button
          onClick={handleRegister}
          className="bg-red-600 text-white w-full p-2"
        >
          Register
        </button>

      </div>
    </main>
  );
}