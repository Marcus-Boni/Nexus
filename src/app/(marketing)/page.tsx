import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { LogoBar } from "./_components/LogoBar";
import { FeaturesScroll } from "./_components/FeaturesScroll";
import { HowItWorks } from "./_components/HowItWorks";
import { GraphDemo } from "./_components/GraphDemo";
import { Testimonials } from "./_components/Testimonials";
import { Footer } from "./_components/Footer";

export default function LandingPage() {
  return (
    <div
      style={{
        background: "var(--landing-bg)",
        color: "var(--landing-text-1)",
      }}
    >
      <Navbar />
      <Hero />
      <LogoBar />
      <FeaturesScroll />
      <HowItWorks />
      <GraphDemo />
      <Testimonials />
      <Footer />
    </div>
  );
}
