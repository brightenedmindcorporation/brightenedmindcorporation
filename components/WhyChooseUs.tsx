const reasons = [
  {
    title: "Expertise Professionnelle",
    description:
      "Une équipe engagée et qualifiée capable de répondre aux besoins modernes des particuliers et des organisations.",
  },

  {
    title: "Solutions Innovantes",
    description:
      "Nous développons des approches innovantes en communication, formation et services adaptés au monde actuel.",
  },

  {
    title: "Capital Humain",
    description:
      "Notre priorité est de valoriser les compétences humaines et accompagner le développement durable des talents.",
  },

  {
    title: "Engagement & Confiance",
    description:
      "Nous bâtissons des relations durables fondées sur la confiance, le professionnalisme et la qualité.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-black text-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[4px] text-red-500 font-semibold">
            Pourquoi Nous Choisir
          </p>

          <h2 className="text-5xl font-black mt-5">
            Ce qui nous distingue
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="border border-gray-800 rounded-[25px] p-8 hover:border-red-500 transition duration-500"
            >

              <h3 className="text-2xl font-bold">
                {reason.title}
              </h3>

              <p className="mt-5 text-gray-400 leading-8">
                {reason.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}