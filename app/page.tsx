"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Departments from "@/components/Departments";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Vision from "@/components/Vision";
import News from "@/components/News";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact"; 
import Identity from "@/components/Identity";
import Slogan from "@/components/Slogan";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WhatsappFloat from "@/components/WhatsappFloat";

export default function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return ;
  }

  return (
    <>
    <Loader>

      <Navbar />

      <Hero />

      <Slogan />

      <Identity />

      <Departments />

      <WhyChooseUs />

      <Stats />

      <Testimonials />
      
      <About />

      <Vision />

      <News />

      <Projects />

      <CTA />

      <Contact />

      <Footer />

    </Loader>

    <WhatsappFloat />

    </>
  );
}