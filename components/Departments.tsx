"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const departments = [
  {
    title: "BM Communication",
    description:
      "Valoriser l’image des particuliers, des entreprises et des institutions grâce à des services professionnels de communication visuelle, audiovisuelle et digitale.",
    image: "/communication.png",
    url: "/communication"
  },

  {
    title: "BM Academia",
    description:
      "Former et renforcer les compétences linguistiques, professionnelles et entrepreneuriales des apprenants pour favoriser leur insertion et leur réussite.",
    image: "/academy.png",
    url: "/academy"
  },

  {
    title: "BM Domestica",
    description:
      "Assurer le recrutement, la sélection, la formation et le placement du personnel domestique qualifié afin de répondre aux besoins des ménages avec professionnalisme, confiance et efficacité.",
    image: "/domestica.png",
    url: "/domestica"
  }
];

export default function Departments() {
  return (
    <FadeIn>
      <section
        id="departments"
        className="py-32 bg-black"
      >
        <div className="max-w-7xl mx-auto px-8">

          {/* TITLE */}
          <div className="text-center mb-20">
            <p className="uppercase tracking-[4px] text-gold-500 font-semibold text-sm">
              Nos Départements
            </p>

            <h2 className="text-5xl font-black mt-6 text-white leading-tight">
              Trois expertises.
              <br />
              <span className="text-gradient-gold">
                Une mission commune.
              </span>
            </h2>

            <div className="divider-gold w-24 mx-auto mt-8" />
          </div>

          {/* CARDS */}
          <div className="grid lg:grid-cols-3 gap-10">
            {departments.map((dep, index) => (
              <motion.div
                key={dep.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.02
                }}
                className="bg-neutral-900/80 border border-neutral-800 hover:border-gold-700/40 rounded-[30px] overflow-hidden shadow-xl shadow-black/30 group transition-all duration-500"
              >

                {/* IMAGE */}
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={dep.image}
                    alt={dep.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white">
                    {dep.title}
                  </h3>

                  <p className="mt-5 text-neutral-400 leading-8 font-sans">
                    {dep.description}
                  </p>

                  <Link
                    href={dep.url}
                    className="inline-flex items-center gap-2 mt-8 text-gold-400 font-semibold hover:text-gold-300 hover:gap-3 transition-all"
                  >
                    Accéder à la page →
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </FadeIn>
  );
}