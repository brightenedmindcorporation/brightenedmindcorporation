export default function News() {
  return (
    <section id="news" className="py-28 bg-neutral-950">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase text-red-600 tracking-[4px] font-semibold">
            Actualités
          </p>

          <h2 className="text-5xl font-bold mt-5 text-white">
            Nos dernières initiatives
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-3xl shadow-lg shadow-black/20">
            <h3 className="text-2xl font-bold text-white">
              BM Academy
            </h3>
            <p className="mt-5 text-neutral-400 leading-8">
              Déploiement de nouveaux programmes
              de formation linguistique.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-3xl shadow-lg shadow-black/20">
            <h3 className="text-2xl font-bold text-white">
              BM Communication
            </h3>
            <p className="mt-5 text-neutral-400 leading-8">
              Accompagnement stratégique de marques
              en pleine croissance.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-3xl shadow-lg shadow-black/20">
            <h3 className="text-2xl font-bold text-white">
              BM Domestica
            </h3>
            <p className="mt-5 text-neutral-400 leading-8">
              Développement de solutions domestiques
              modernes et durables.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
