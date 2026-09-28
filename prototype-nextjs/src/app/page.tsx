import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ProblemSection from "@/components/sections/ProblemSection";
import ScaleSection from "@/components/sections/ScaleSection";
import MethodSection from "@/components/sections/MethodSection";
import DelegableSection from "@/components/sections/DelegableSection";
import HowWeHelpSection from "@/components/sections/HowWeHelpSection";
import FitSection from "@/components/sections/FitSection";
import NotForEveryoneSection from "@/components/sections/NotForEveryoneSection";
import AboutSection from "@/components/sections/AboutSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ScaleSection />
        <MethodSection />
        <DelegableSection />
        <HowWeHelpSection />
        <FitSection />
        <NotForEveryoneSection />
        <AboutSection />
        <FaqSection />
        <FinalCtaSection />
        <NewsletterSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
