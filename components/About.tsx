"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <FadeIn>
    <section
      id="about"
      className="py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >

          <div className="relative h-[520px] rounded-[35px] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-gold-700/20">

            <Image
              src="/about-business.png"
              alt="About BM Corporation"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          </div>

        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[4px] text-gold-500 font-semibold text-sm">
            À propos
          </p>

          <h2 className="text-5xl font-black mt-6 text-white leading-tight">

            Construire un avenir
            <span className="text-gradient-gold"> durable</span>

          </h2>

          <p className="mt-8 text-neutral-400 leading-9 text-lg font-sans">

            Brightened Mind Corporation est un groupe
            multidisciplinaire engagé dans le développement
            des entreprises, des communautés et des individus.

            Nous agissons à travers trois piliers :
            communication stratégique, solutions pratiques
            et développement des compétences.

          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-neutral-800">

            <div>
              <h3 className="text-4xl font-black text-gradient-gold">3</h3>
              <p className="text-neutral-400 mt-2 font-sans text-sm">
                Branches
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-gradient-gold">1</h3>
              <p className="text-neutral-400 mt-2 font-sans text-sm">
                Vision
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-gradient-gold">100%</h3>
              <p className="text-neutral-400 mt-2 font-sans text-sm">
                Engagement
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
    </FadeIn>
  );
}