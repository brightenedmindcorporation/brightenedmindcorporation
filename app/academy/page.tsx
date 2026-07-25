import Link from "next/link";

export default function AcademyHome() {
  return (
    <div className="py-12 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Bienvenue sur Brighter Mind Academy
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Développez vos compétences avec nos modules de formation interactifs.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/academy/courses/lesson-1"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Commencer la Leçon 1
        </Link>
        <Link
          href="/academy/dashboard"
          className="px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition"
        >
          Voir mes progrès
        </Link>
      </div>
    </div>
  );
}