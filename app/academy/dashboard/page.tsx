export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord de l'étudiant</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Cours suivis</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Progression</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">85%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium">Certificats obtenus</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">1</p>
        </div>
      </div>
    </div>
  );
}