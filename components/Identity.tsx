import FadeIn from "./FadeIn";

export default function Identity() {
  return (
    <FadeIn>
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12">

        <div className="bg-red-600 text-white p-10 rounded-[30px]">

          <h2 className="text-4xl font-bold mb-6">
            Notre Vision
          </h2>

          <p className="leading-8">
            Devenir une référence incontournable dans le développement
            du capital humain en offrant des solutions innovantes en
            communication, en placement de personnel domestique
            et en formation professionnelle.
          </p>

        </div>

        <div className="bg-black text-white p-10 rounded-[30px]">

          <h2 className="text-4xl font-bold mb-6">
            Notre Mission
          </h2>

          <p className="leading-8">
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