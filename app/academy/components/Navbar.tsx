"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b border-neutral-800/80">
        {/* Glow doux en arrière-plan (Rouge atténué pour ne pas fatiguer les yeux) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Badge de présentation */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-red-400 text-xs font-semibold mb-8 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-neutral-300">Brightened Mind Platform</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] max-w-4xl">
            Master English with <br className="hidden sm:inline" />
            <span className="text-red-500">
              Brightened Mind Academy
            </span>
          </h1>

          {/* Description à fort contraste mais doux */}
          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Elevate your speaking, grammar, and professional fluency through 
            structured lessons, interactive quizzes, and real-time tracking.
          </p>

          {/* Boutons d'action CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href="/dashboard"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-red-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
            >
              <span>Go to Student Portal</span>
              <span className="text-xl">➔</span>
            </Link>

            <Link
              href="/login"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-base px-8 py-4 rounded-xl transition flex items-center justify-center"
            >
              Student Login
            </Link>
          </div>

          {/* STATISTIQUES EN ROUGE, BLANC, NOIR */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-3xl font-black text-white">12+</p>
              <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider">
                Guided Lessons
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-3xl font-black text-red-500">3</p>
              <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider">
                Skill Levels
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider">
                Interactive Quizzes
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
              <p className="text-3xl font-black text-red-500">24/7</p>
              <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider">
                Online Access
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION NIVEAUX DE FORMATION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
            Structured Learning Path
          </h2>
          <h3 className="text-3xl sm:text-4xl font-black text-white">
            Curriculum Overview
          </h3>
          <p className="text-neutral-400 text-sm mt-2 max-w-lg mx-auto">
            Access to each level is managed and granted directly by our instructors based on your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Level 1 Card */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 text-red-500 flex items-center justify-center font-black text-lg mb-6">
                01
              </div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Beginner
              </span>
              <h4 className="text-2xl font-bold text-white mt-1 mb-3">Level 1: Foundations</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Essential vocabulary, simple grammar rules, daily conversations, and confidence building.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-400">
              <span className="flex items-center gap-1.5">
                🔒 Access granted upon enrollment
              </span>
            </div>
          </div>

          {/* Level 2 Card */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center font-black text-lg mb-6">
                02
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Intermediate
              </span>
              <h4 className="text-2xl font-bold text-white mt-1 mb-3">Level 2: Fluency</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Complex sentence structures, listening comprehension, reading passages, and dialogue practice.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-400">
              <span className="flex items-center gap-1.5">
                🔒 Level 1 completion required
              </span>
            </div>
          </div>

          {/* Level 3 Card */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 text-red-500 flex items-center justify-center font-black text-lg mb-6">
                03
              </div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Advanced
              </span>
              <h4 className="text-2xl font-bold text-white mt-1 mb-3">Level 3: Business English</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Professional communication, email writing, job interview prep, and corporate presentation skills.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-400">
              <span className="flex items-center gap-1.5">
                🔒 Admin permission required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION AVANTAGES */}
      <section className="py-20 bg-neutral-900/50 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
              Why Learn With Us
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              Designed for Accelerated Progress
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-lg font-bold text-white mb-2">Interactive Quizzes</h4>
              <p className="text-neutral-400 text-sm">
                Test your knowledge at the end of every lesson with instant feedback and score tracking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="text-3xl mb-4">📈</div>
              <h4 className="text-lg font-bold text-white mb-2">Personal Progress Bar</h4>
              <p className="text-neutral-400 text-sm">
                Keep track of your completed modules and pick up exactly where you left off.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="text-3xl mb-4">📱</div>
              <h4 className="text-lg font-bold text-white mb-2">Mobile Friendly</h4>
              <p className="text-neutral-400 text-sm">
                Fully responsive design allows you to practice on your phone, tablet, or desktop anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-neutral-800 bg-neutral-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-red-900 p-0.5 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Brightened Mind Academy"
                width={32}
                height={32}
                className="object-cover rounded-[10px]"
                unoptimized
              />
            </div>
            <span className="font-extrabold text-white text-sm">
              Brightened Mind <span className="text-red-500">Academy</span>
            </span>
          </div>

          <p className="text-xs text-neutral-400 font-medium text-center">
            © {new Date().getFullYear()} Brightened Mind Academy. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-neutral-400 font-medium">
            <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link href="/login" className="hover:text-white transition">Login</Link>
          </div>

        </div>
      </footer>
    </div>
  );
}