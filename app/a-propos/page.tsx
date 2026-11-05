import type { Metadata } from "next";
import Slogan from "@/components/Slogan";
import Identity from "@/components/Identity";
import Departments from "@/components/Departments";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Vision from "@/components/Vision";
import News from "@/components/News";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "À propos de Brightened Mind Corporation",
  description:
    "Qui nous sommes : Brightened Mind Corporation, ses trois départements (Academia, Communication, Domestica), sa vision, ses réalisations et ses actualités à Lubumbashi.",
};

// Everything that tells the company's story lives here, so the home page can stay short and go straight to the point.
export default function AboutPage() {
  return (
    <div className="pt-20">
      <Slogan />
      <Identity />
      <Departments />
      <WhyChooseUs />
      <About />
      <Vision />
      <News />
      <Projects />
      <CTA />
    </div>
  );
}
