export default function News() {
  return (
    <section id="news" className="py-28 bg-surface-sunken">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase text-red-500 tracking-[4px] font-semibold text-sm">
            Actualités
          </p>

          <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-bold mt-5 text-ink">
            Nos dernières initiatives
          </h2>

          <div className="divider-red w-16 mx-auto mt-6" />

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="bg-surface/60 border border-line hover:border-red-700/30 p-10 rounded-3xl shadow-lg shadow-black/20 transition-colors">
            <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">Academia</span>
            <h3 className="text-2xl font-bold text-ink mt-2">
              BM Academia
            </h3>
            <p className="mt-5 text-ink-soft leading-8 font-sans">
              Déploiement de nouveaux programmes
              de formation linguistique.
            </p>
          </div>

          <div className="bg-surface/60 border border-line hover:border-red-700/30 p-10 rounded-3xl shadow-lg shadow-black/20 transition-colors">
            <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">Communication</span>
            <h3 className="text-2xl font-bold text-ink mt-2">
              BM Communication
            </h3>
            <p className="mt-5 text-ink-soft leading-8 font-sans">
              Accompagnement stratégique de marques
              en pleine croissance.
            </p>
          </div>

          <div className="bg-surface/60 border border-line hover:border-red-700/30 p-10 rounded-3xl shadow-lg shadow-black/20 transition-colors">
            <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">Domestica</span>
            <h3 className="text-2xl font-bold text-ink mt-2">
              BM Domestica
            </h3>
            <p className="mt-5 text-ink-soft leading-8 font-sans">
              Développement de solutions domestiques
              modernes et durables.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
