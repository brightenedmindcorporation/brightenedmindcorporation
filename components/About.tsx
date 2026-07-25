"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function About() {
  return (
    <FadeIn>
    <section
      id="about"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >

          <div className="relative h-[520px] rounded-[35px] overflow-hidden shadow-2xl">

            <Image
              src="/about-business.png"
              alt="About BM Corporation"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

          </div>

        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: true }}
        >

          <p className="uppercase tracking-[4px] text-red-600 font-semibold">
            À propos
          </p>

          <h2 className="text-5xl font-black mt-6 text-[#111111] leading-tight">

            Construire un avenir
            <span className="text-red-600"> durable</span>

          </h2>

          <p className="mt-8 text-gray-600 leading-9 text-lg">

            Brightened Mind Corporation est un groupe
            multidisciplinaire engagé dans le développement
            des entreprises, des communautés et des individus.

            Nous agissons à travers trois piliers :
            communication stratégique, solutions pratiques
            et développement des compétences.

          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">

            <div>
              <h3 className="text-4xl font-black text-red-600">3</h3>
              <p className="text-gray-600 mt-2">
                Branches
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-red-600">1</h3>
              <p className="text-gray-600 mt-2">
                Vision
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-red-600">100%</h3>
              <p className="text-gray-600 mt-2">
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