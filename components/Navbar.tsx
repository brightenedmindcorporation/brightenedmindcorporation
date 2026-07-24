"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo-bm.png"
            alt="BM Logo"
            width={55}
            height={55}
          />
          <span className="font-bold text-white text-lg">
            BM Corporation
          </span>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-10 text-white font-medium">
          <a href="#" className="hover:text-red-500 transition">
            Home
          </a>

          <a href="#about" className="hover:text-red-500 transition">
            About
          </a>

          <a href="#departments" className="hover:text-red-500 transition">
            Departments
          </a>

          {/* NOUVEAU LIEN VERS ACADEMY */}
          <Link href="/academy" className="hover:text-red-500 transition">
            Academy
          </Link>

          <a href="#contact" className="hover:text-red-500 transition">
            Contact
          </a>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black px-8 py-6 flex flex-col gap-6 text-white">
          <a href="#" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#departments" onClick={() => setMenuOpen(false)}>
            Departments
          </a>

          {/* NOUVEAU LIEN MOBILE VERS ACADEMY */}
          <Link href="/academy" onClick={() => setMenuOpen(false)}>
            Academy
          </Link>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </header>
  );
}