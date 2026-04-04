import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { isValidLocale } from "@/i18n/messages";
import { FeaturesScroll } from "./_components/FeaturesScroll";
import { Footer } from "./_components/Footer";
import { GraphDemo } from "./_components/GraphDemo";
import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { LogoBar } from "./_components/LogoBar";
import { Navbar } from "./_components/Navbar";
import { Testimonials } from "./_components/Testimonials";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div
      style={{
        background: "var(--landing-bg)",
        color: "var(--landing-text-1)",
      }}
    >
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--landing-bg)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(var(--landing-grid) 1px, transparent 1px),
              linear-gradient(90deg, var(--landing-grid) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="pointer-events-none absolute left-0 top-0 h-[42rem] w-[42rem]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--landing-glow) 34%, transparent), transparent 68%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--landing-surface) 54%, transparent), transparent)",
          }}
        />
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </section>
      <LogoBar />
      <FeaturesScroll />
      <HowItWorks />
      <GraphDemo />
      <Testimonials />
      <Footer />
    </div>
  );
}
