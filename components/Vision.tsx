"use client";

import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section
      id="vision"
      className="py-32 bg-[#f8f8f8]"
    >

      <div className="max-w-6xl mx-auto px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >

          <p className="uppercase text-red-600 tracking-[4px] font-semibold">
            Notre vision
          </p>

          <h2 className="text-5xl font-bold mt-6 text-[#111111] leading-tight">

            Éclairer les esprits.
            <br />

            Développer les talents.
            <br />

            <span className="text-red-600">
              Créer un impact durable.
            </span>

          </h2>

          <p className="mt-10 max-w-3xl mx-auto text-gray-600 leading-9 text-lg">

            Nous croyons qu’un monde meilleur se construit
            lorsque les individus, les entreprises et les communautés
            disposent des outils, des compétences et des solutions
            nécessaires pour évoluer durablement.

          </p>

        </motion.div>

        {/* Vision cards */}

        <div className="grid md:grid-cols-3 gap-10 mt-20">

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold text-red-600">
              Innovation
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              Concevoir des solutions modernes
              adaptées aux défis actuels.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold text-red-600">
              Excellence
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              Offrir des services à forte valeur
              ajoutée avec professionnalisme.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold text-red-600">
              Impact
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              Générer des résultats concrets
              et durables pour tous.
            </p>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
