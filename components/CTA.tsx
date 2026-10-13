"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-32 bg-page text-ink relative overflow-hidden"
    >

      {/* Decorative glow */}

      <div className="absolute inset-0 radial-fade pointer-events-none" />
      <div className="absolute left-[-120px] bottom-[-120px] w-[350px] h-[350px] border-[60px] border-red-600 rounded-full opacity-[0.06] blur-[2px]"></div>

      <div className="max-w-6xl mx-auto px-8 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >

          <p className="uppercase text-red-500 tracking-[4px] font-semibold text-sm">
            Collaborons ensemble
          </p>

          <h2 className="text-5xl md:text-6xl font-black mt-6 leading-tight">

            Construisons quelque chose
            <br />

            <span className="text-gradient-red">
              dâ€™exception ensemble.
            </span>

          </h2>

          <p className="mt-10 max-w-3xl mx-auto text-ink-soft text-lg leading-9 font-sans">

            Brightened Mind Corporation accompagne les individus,
            les entreprises et les communautÃ©s dans leur Ã©volution
            grÃ¢ce Ã  des solutions innovantes, Ã©ducatives et stratÃ©giques.

          </p>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">

            <Link
              href="mailto:info@bmcorporation-cd.com"
              className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white px-10 py-5 rounded-2xl font-semibold transition duration-300"
            >
              Nous contacter
            </Link>

            <Link
              href="#departments"
              className="border border-line px-10 py-5 rounded-2xl hover:border-red-500/60 hover:text-red-400 transition duration-300"
            >
              Explorer nos branches
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}