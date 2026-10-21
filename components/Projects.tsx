import Image from "next/image";
import FadeIn from "./FadeIn";

const projects = [
  {
    title: "Corporate Branding",
    description:
      "Développement d’identités de marque fortes pour entreprises et organisations.",
    image: "/project1.png",
  },
  {
    title: "Education Platform",
    description:
      "Conception de plateformes modernes de formation et développement des compétences.",
    image: "/project2.png",
  },
  {
    title: "Digital Solutions",
    description:
      "Création de solutions numériques innovantes adaptées aux besoins actuels.",
    image: "/project3.png",
  },
  {
    title: "Community Development",
    description:
      "Accompagnement des communautés vers une croissance durable et structurée.",
    image: "/project4.png",
  },
];

export default function Projects() {
  return (
    <FadeIn>
    <section className="py-28 bg-page">

      <div className="max-w-7xl mx-auto px-8">

        {/* Title */}

        <div className="text-center mb-20">

          <p className="uppercase tracking-[4px] text-red-500 font-semibold text-sm">
            Nos Réalisations
          </p>

          <h2 className="text-3xl min-[400px]:text-4xl md:text-5xl font-black mt-5 text-ink">
            Solutions & Impact
          </h2>

          <div className="divider-red w-16 mx-auto mt-6" />

        </div>

        {/* Grid */}

        <div className="grid md:grid-cols-2 gap-10">

          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-surface border border-line hover:border-red-700/40 rounded-[30px] overflow-hidden shadow-lg shadow-black/20 hover:shadow-2xl transition duration-500 hover:-translate-y-3 group"
            >

              {/* IMAGE */}

              <div className="relative h-[260px]">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <h3 className="text-2xl font-bold text-ink">
                  {project.title}
                </h3>

                <p className="mt-5 text-ink-soft leading-8 font-sans">
                  {project.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
    </FadeIn>
  );
}