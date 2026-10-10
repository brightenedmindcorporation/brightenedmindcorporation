import FadeIn from "./FadeIn";

export default function Identity() {
  return (
    <FadeIn>
    <section className="py-28 bg-surface-sunken">

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12">

        <div className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-900 to-neutral-950 text-white p-10 rounded-[30px] border border-red-800/40 shadow-2xl shadow-red-950/40">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-red-500/10 blur-3xl" />

          <p className="uppercase tracking-[3px] text-white/80 text-xs font-semibold mb-4 relative">Vision</p>

          <h2 className="text-4xl font-bold mb-6 relative">
            Notre Vision
          </h2>

          <p className="leading-8 text-red-50/90 font-sans relative">
            Devenir une référence incontournable dans le développement
            du capital humain en offrant des solutions innovantes en
            communication, en placement de personnel domestique
            et en formation professionnelle.
          </p>

        </div>

        <div className="relative overflow-hidden bg-surface text-ink p-10 rounded-[30px] border border-gold-700/20 shadow-2xl shadow-black/40">
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-gold-500/5 blur-3xl" />

          <p className="uppercase tracking-[3px] text-gold-500 text-xs font-semibold mb-4 relative">Mission</p>

          <h2 className="text-4xl font-bold mb-6 relative">
            Notre Mission
          </h2>

          <p className="leading-8 text-ink-soft font-sans relative">
            Accompagner les particuliers, les familles et les organisations
            en proposant des services de communication de qualité,
            un personnel domestique compétent et fiable,
            ainsi que des formations adaptées aux exigences du monde moderne.
          </p>

        </div>

      </div>

    </section>
    </FadeIn>
  );
}