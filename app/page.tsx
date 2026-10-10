import Hero from "@/components/Hero";
import AnnouncementsTicker from "@/components/AnnouncementsTicker";
import Announcements from "@/components/Announcements";
import Departments from "@/components/Departments";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Vision from "@/components/Vision";
import News from "@/components/News";
import CTA from "@/components/CTA";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Identity from "@/components/Identity";
import Slogan from "@/components/Slogan";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WhatsappFloat from "@/components/WhatsappFloat";

export default function Home() {
  return (
    <>
      <Hero />
      <AnnouncementsTicker />
      <Announcements />
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
      <WhatsappFloat />
    </>
  );
}
