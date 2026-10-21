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
    <section className="py-28 bg-page text-ink">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[4px] text-red-500 font-semibold text-sm">
            Pourquoi Nous Choisir
          </p>

          <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-black mt-5">
            Ce qui nous distingue
          </h2>

          <div className="divider-red w-16 mx-auto mt-6" />

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group border border-line bg-surface/40 rounded-[25px] p-8 hover:border-red-600/40 hover:bg-surface transition duration-500"
            >

              <span className="text-3xl text-red-700/70 group-hover:text-red-500 transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-2xl font-bold mt-4">
                {reason.title}
              </h3>

              <p className="mt-4 text-ink-soft leading-8 font-sans">
                {reason.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}