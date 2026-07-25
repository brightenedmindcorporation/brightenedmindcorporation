"use client";

import React, { useState } from "react";

interface StudentRequest {
  id: string;
  fullName: string;
  email: string;
  date: string;
  status: "PENDING" | "APPROVED";
  matricule?: string;
}

export default function AdminDashboard() {
  // Simulation de demandes d'étudiants en attente
  const [students, setStudents] = useState<StudentRequest[]>([
    { id: "1", fullName: "Marc Kabamba", email: "marc@example.com", date: "2026-07-24", status: "PENDING" },
    { id: "2", fullName: "Sarah Luvumbu", email: "sarah@example.com", date: "2026-07-25", status: "APPROVED", matricule: "BMCA-2026-001" },
  ]);

  const approveStudent = (id: string) => {
    setStudents((prev) =>
      prev.map((student, index) => {
        if (student.id === id) {
          // Génération du matricule au format BMCA-2026-000
          const sequenceNumber = String(index + 1).padStart(3, "0");
          const generatedMatricule = `BMCA-2026-${sequenceNumber}`;
          return {
            ...student,
            status: "APPROVED",
            matricule: generatedMatricule,
          };
        }
        return student;
      })
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-xl">
        <div>
          <h1 className="text-2xl font-bold">Espace Administration BMCA</h1>
          <p className="text-sm text-slate-400">Gestion des accès et validation des matricules</p>
        </div>
        <span className="px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full uppercase">
          Accès Sécurisé Admin
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-bold mb-4">Demandes d'inscription en attente</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 uppercase text-xs">
              <tr>
                <th className="p-3">Nom complet</th>
                <th className="p-3">Email</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Matricule Attribué</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="p-3 font-medium">{student.fullName}</td>
                  <td className="p-3 text-slate-600">{student.email}</td>
                  <td className="p-3">
                    {student.status === "PENDING" ? (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
                        En attente
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                        Approuvé
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-blue-600 font-bold">
                    {student.matricule || "—"}
                  </td>
                  <td className="p-3 text-right">
                    {student.status === "PENDING" && (
                      <button
                        onClick={() => approveStudent(student.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                      >
                        Approuver & Générer Matricule
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}