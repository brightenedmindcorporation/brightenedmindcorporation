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
    <section className="py-28 bg-[#f8f8f8]">

      <div className="max-w-7xl mx-auto px-8">

        {/* Title */}

        <div className="text-center mb-20">

          <p className="uppercase tracking-[4px] text-red-600 font-semibold">
            Nos Réalisations
          </p>

          <h2 className="text-5xl font-black mt-5 text-[#111111]">
            Solutions & Impact
          </h2>

        </div>

        {/* Grid */}

        <div className="grid md:grid-cols-2 gap-10">

          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3 group"
            >

              {/* IMAGE */}

              <div className="relative h-[260px]">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              {/* CONTENT */}

              <div className="p-8">

                <h3 className="text-2xl font-bold text-[#111111]">
                  {project.title}
                </h3>

                <p className="mt-5 text-gray-600 leading-8">
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