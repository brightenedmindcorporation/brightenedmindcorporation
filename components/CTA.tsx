"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-32 bg-black text-white relative overflow-hidden"
    >

      {/* Decorative circle */}

      <div className="absolute left-[-120px] bottom-[-120px] w-[350px] h-[350px] border-[60px] border-red-600 rounded-full opacity-10"></div>

      <div className="max-w-6xl mx-auto px-8 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >

          <p className="uppercase text-red-500 tracking-[4px] font-semibold">
            Collaborons ensemble
          </p>

          <h2 className="text-5xl md:text-6xl font-black mt-6 leading-tight">

            Construisons quelque chose
            <br />

            <span className="text-red-600">
              d’exception ensemble.
            </span>

          </h2>

          <p className="mt-10 max-w-3xl mx-auto text-gray-400 text-lg leading-9">

            Brightened Mind Corporation accompagne les individus,
            les entreprises et les communautés dans leur évolution
            grâce à des solutions innovantes, éducatives et stratégiques.

          </p>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">

            <Link
              href="mailto:brightenedmindcorporation@gmail.com"
              className="bg-red-600 px-10 py-5 rounded-2xl font-semibold hover:bg-white hover:text-black transition duration-300"
            >
              Nous contacter
            </Link>

            <Link
              href="#departments"
              className="border border-gray-600 px-10 py-5 rounded-2xl hover:bg-white hover:text-black transition duration-300"
            >
              Explorer nos branches
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}