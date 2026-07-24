"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function Hero() {
  return (
    <FadeIn>
    <section className="relative pt-44 pb-32 bg-white overflow-hidden">

      {/* Decorative background */}

      <div className="absolute top-10 md:top-20 right-[-120px] md:right-[-150px] 
      w-[250px] md:w-[450px] h-[250px] md:h-[450px]
      border-[40px] md:border-[70px]
      border-red-600 rounded-full opacity-10"></div>

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

          <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-[#111111]">
  FORMER.
  <br />
  <span className="text-red-600">
    CONNECTER.
  </span>
  <br />
  VALORISER.
</h1>

          <p className="mt-8 text-gray-600 leading-9 text-lg max-w-xl">
  Brightened Mind Corporation développe le capital humain
  en proposant des solutions innovantes en communication,
  placement de personnel domestique et formation professionnelle.
</p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">

            <Link
              href="#departments"
              className="bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-black transition duration-300 text-center"
            >
              Nos départements
            </Link>

            <Link
              href="#contact"
              className="border border-gray-300 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-black hover:text-white transition text-center"
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

          <div className="relative h-[320px] sm:h-[420px] lg:h-[600px] rounded-[25px] lg:rounded-[40px] overflow-hidden shadow-2xl group">

            <Image
              src="/hero-business.png"
              alt="Corporate Business"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/25"></div>

            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white">

              <h3 className="text-xl md:text-3xl font-bold">
                Vision.
              </h3>

              <h3 className="text-xl md:text-3xl font-bold mt-2">
                Leadership.
              </h3>

              <h3 className="text-xl md:text-3xl font-bold mt-2">
                Transformation.
              </h3>

            </div>

          </div>

        </motion.div>

      </div>
    
    </section>
    </FadeIn>
  );
}