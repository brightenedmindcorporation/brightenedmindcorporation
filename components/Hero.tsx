"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function Hero() {
  return (
    <FadeIn>
    <section className="relative pt-44 pb-32 bg-page overflow-hidden">

      {/* Decorative background */}

      <div className="absolute inset-0 radial-fade pointer-events-none" />

      <div className="absolute top-10 md:top-20 right-[-120px] md:right-[-150px]
      w-[250px] md:w-[450px] h-[250px] md:h-[450px]
      border-[40px] md:border-[70px]
      border-red-600 rounded-full opacity-[0.07] blur-[2px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <Image
            src="/logo-bm.png"
            alt="BM Logo"
            width={90}
            height={90}
            className="md:w-[110px] md:h-[110px]"
          />

          <span className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-700/40 bg-red-500/5 text-red-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Groupe multidisciplinaire
          </span>

          <h1 className="mt-6 text-6xl lg:text-7xl font-black leading-[1.05] text-ink">
  FORMER.
  <br />
  <span className="text-gradient-red">
    CONNECTER.
  </span>
  <br />
  VALORISER.
</h1>

          <p className="mt-8 text-ink-soft leading-9 text-lg max-w-xl font-sans">
  Brightened Mind Corporation développe le capital humain
  en proposant des solutions innovantes en communication,
  placement de personnel domestique et formation professionnelle.
</p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">

            <Link
              href="#departments"
              className="glow-accent bg-gradient-to-br from-red-600 to-red-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-red-500 hover:to-red-800 transition duration-300 text-center font-semibold"
            >
              Nos départements
            </Link>

            <Link
              href="#contact-form"
              className="border border-line text-ink px-6 md:px-8 py-3 md:py-4 rounded-xl hover:border-red-500/60 hover:text-red-400 transition text-center font-semibold"
            >
              Contact
            </Link>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >

          <div className="relative h-[320px] sm:h-[420px] lg:h-[600px] rounded-[25px] lg:rounded-[40px] overflow-hidden shadow-2xl shadow-black/60 group ring-1 ring-red-700/20">

            <Image
              src="/hero-business.png"
              alt="Corporate Business"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10">
              <div className="glass-panel rounded-2xl px-6 py-5 inline-block">
                <h3 className="text-xl md:text-2xl font-bold text-ink leading-snug">
                  Vision. Leadership.
                  <br />
                  <span className="text-gradient-red">Transformation.</span>
                </h3>
              </div>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
    </FadeIn>
  );
}