"use client";

import { GitBranchPlus, Orbit, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLockup } from "@/components/brand/BrandLockup";

const quotes = [
  {
    text: "Where your agents think together.",
    author: "Nexus tagline",
  },
  {
    text: "Context is the new code.",
    author: "Team Nexus",
  },
  {
    text: "One platform. Every agent.",
    author: "Nexus",
  },
] as const;

const authHighlights = [
  {
    icon: Orbit,
    label: "Shared context",
    description: "Every session starts with the reasoning that already exists.",
  },
  {
    icon: GitBranchPlus,
    label: "Structured handoffs",
    description:
      "Work moves between agents without losing intent or artifacts.",
  },
  {
    icon: ShieldCheck,
    label: "Local-first control",
    description:
      "Your workspace stays on your machine while the interface stays polished.",
  },
] as const;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((index) => (index + 1) % quotes.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[quoteIndex] ?? quotes[0];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--landing-bg)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
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

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] lg:grid-cols-[minmax(440px,620px)_minmax(420px,520px)] lg:justify-center lg:gap-12 xl:gap-20">
        <div className="hidden flex-col justify-between px-10 py-10 lg:flex xl:px-14">
          <div className="flex items-start justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <BrandLockup />
            </Link>

            <div
              className="rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em]"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  "color-mix(in srgb, var(--landing-surface) 84%, transparent)",
                color: "var(--landing-text-2)",
              }}
            >
              Secure access
            </div>
          </div>

          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quote.text}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <p
                  className="max-w-lg text-4xl font-semibold leading-[1.08] tracking-[-0.04em]"
                  style={{ color: "var(--landing-text-1)" }}
                >
                  {quote.text}
                </p>
                <footer
                  className="mt-5 text-sm uppercase tracking-[0.24em]"
                  style={{ color: "var(--landing-text-3)" }}
                >
                  {quote.author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 grid gap-3">
              {authHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border px-5 py-4"
                  style={{
                    borderColor: "var(--landing-border)",
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--landing-card-strong) 92%, transparent), color-mix(in srgb, var(--landing-surface) 88%, transparent))",
                    boxShadow: "0 24px 70px -52px var(--landing-shadow)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: "var(--landing-border)",
                        background:
                          "color-mix(in srgb, var(--landing-accent-soft) 74%, transparent)",
                      }}
                    >
                      <item.icon
                        className="h-4.5 w-4.5"
                        style={{ color: "var(--landing-accent-2)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--landing-text-1)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="mt-1 text-sm leading-6"
                        style={{ color: "var(--landing-text-2)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            className="text-xs uppercase tracking-[0.24em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            © 2026 Nexus
          </p>
        </div>

        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-0">
          <div className="w-full max-w-md lg:max-w-[500px]">
            <Link href="/" className="mb-6 flex items-center gap-3 lg:hidden">
              <BrandLockup compact={false} />
            </Link>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
