import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-6 text-center">Connexion Étudiant / Admin</h1>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Adresse email
          </label>
          <input
            type="email"
            placeholder="votre.email@exemple.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Pas encore de compte ?{" "}
        <Link href="/academy/register" className="text-blue-600 font-medium hover:underline">
          S'inscrire
        </Link>
      </div>
    </div>
  );
}