export default function News() {
  return (
    <section id="news" className="py-28 bg-neutral-950">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase text-gold-500 tracking-[4px] font-semibold text-sm">
            Actualités
          </p>

          <h2 className="text-5xl font-bold mt-5 text-white">
            Nos dernières initiatives
          </h2>

          <div className="divider-gold w-16 mx-auto mt-6" />

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="bg-neutral-900/60 border border-neutral-800 hover:border-gold-700/30 p-10 rounded-3xl shadow-lg shadow-black/20 transition-colors">
            <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">Academia</span>
            <h3 className="text-2xl font-bold text-white mt-2">
              BM Academy
            </h3>
            <p className="mt-5 text-neutral-400 leading-8 font-sans">
              Déploiement de nouveaux programmes
              de formation linguistique.
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 hover:border-gold-700/30 p-10 rounded-3xl shadow-lg shadow-black/20 transition-colors">
            <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">Communication</span>
            <h3 className="text-2xl font-bold text-white mt-2">
              BM Communication
            </h3>
            <p className="mt-5 text-neutral-400 leading-8 font-sans">
              Accompagnement stratégique de marques
              en pleine croissance.
            </p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 hover:border-gold-700/30 p-10 rounded-3xl shadow-lg shadow-black/20 transition-colors">
            <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">Domestica</span>
            <h3 className="text-2xl font-bold text-white mt-2">
              BM Domestica
            </h3>
            <p className="mt-5 text-neutral-400 leading-8 font-sans">
              Développement de solutions domestiques
              modernes et durables.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
