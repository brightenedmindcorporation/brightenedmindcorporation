import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-2 text-center">Inscription Étudiant</h1>
      <p className="text-sm text-slate-500 mb-6 text-center">
        Créez votre compte. Un administrateur devra valider votre inscription pour vous attribuer votre matricule BMCA.
      </p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Jean Dupont"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Adresse email
          </label>
          <input
            type="email"
            required
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
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Soumettre la demande d'inscription
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Déjà inscrit ?{" "}
        <Link href="/academy/login" className="text-blue-600 font-medium hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}