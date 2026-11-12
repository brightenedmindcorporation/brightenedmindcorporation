"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Megaphone, Home } from "lucide-react";
import FadeIn from "./FadeIn";
import BmLogo from "./BmLogo";

// The three doors of the company: the visitor must see them within five seconds, without scrolling.
const ENTRIES = [
  { href: "/academia", title: "Apprendre", sub: "BM Academia : langues, bureautique, logiciels", Icon: GraduationCap },
  { href: "/communication", title: "Communiquer", sub: "BM Communication : image, vidéo, digital", Icon: Megaphone },
  { href: "/domestica", title: "Recruter", sub: "BM Domestica : personnel domestique qualifié", Icon: Home },
];

export default function Hero() {
  return (
    <FadeIn>
      <section className="relative pt-28 md:pt-40 pb-14 md:pb-24 bg-page overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 radial-fade pointer-events-none" />

        <div
          className="absolute top-10 md:top-20 right-[-120px] md:right-[-150px]
      w-[250px] md:w-[450px] h-[250px] md:h-[450px]
      border-[40px] md:border-[70px]
      border-red-600 rounded-full opacity-[0.07] blur-[2px]"
        ></div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10 [&>*]:min-w-0">
          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-300">
              <BmLogo size={36} />
              Brightened Mind Corporation · Lubumbashi
            </p>

            <h1 className="mt-5 text-[2rem] min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-ink break-words">
              Apprenez, communiquez,
              <br />
              <span className="text-gradient-red">recrutez avec confiance.</span>
            </h1>

            <p className="mt-5 text-ink-soft leading-relaxed text-base md:text-lg max-w-xl font-sans">
              Cours en ligne en six langues et en informatique, services de communication, et placement de personnel domestique qualifié.
            </p>

            {/* One main action, one quieter one */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/register"
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 text-white px-7 min-h-[52px] inline-flex items-center justify-center rounded-xl hover:from-red-500 hover:to-red-800 transition text-center font-bold"
              >
                S&apos;inscrire à l&apos;Academia
              </Link>
              <a
                href="https://wa.me/243988830799?text=Bonjour%20Brightened%20Mind%20Corporation%2C%20je%20souhaite%20avoir%20des%20informations."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line text-ink px-7 min-h-[52px] inline-flex items-center justify-center rounded-xl hover:border-emerald-600/60 transition text-center font-semibold"
              >
                Poser une question sur WhatsApp
              </a>
            </div>

            {/* The three doors */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {ENTRIES.map(({ href, title, sub, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex sm:flex-col lg:flex-row xl:flex-col items-center sm:items-start lg:items-center xl:items-start gap-3 min-h-[64px] h-full rounded-2xl border border-line bg-surface p-4 hover:border-red-600/50 transition"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-red-600/10 text-red-600 dark:text-red-300 inline-flex items-center justify-center">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-bold text-ink">{title}</span>
                      <span className="block text-sm text-ink-soft leading-snug">{sub}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT: photo, only on large screens (on a phone it only pushes the content down) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="hidden lg:block"
          >
            <div className="relative h-[560px] rounded-[40px] overflow-hidden shadow-2xl shadow-black/40 group ring-1 ring-red-700/20">
              <Image
                src="/hero-bm-blur.webp"
                alt="Équipe de professionnels en réunion"
                fill
                sizes="(max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              {/* The photo is softly blurred on purpose: it is a backdrop, the BM identity is what stands out. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-10 text-center">
                <Image src="/logo-bm.png" alt="Brightened Mind Corporation" width={150} height={131} className="rounded-3xl bg-white p-3 shadow-xl" />
                <p className="text-4xl font-bold leading-snug font-serif text-white">
                  Former. Connecter.
                  <br />
                  <span className="text-[#ffb3bd]">Valoriser.</span>
                </p>
                <ul className="flex flex-wrap justify-center gap-2" aria-label="Nos activités">
                  {["Formation", "Recrutement", "Communication"].map((t) => (
                    <li key={t} className="rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold tracking-wide text-white/85">Lubumbashi · bmcorporation-cd.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </FadeIn>
  );
}
