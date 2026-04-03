"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TerminalCanvas = dynamic(
  () => import("./TerminalCanvas").then((m) => m.TerminalCanvas),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 pt-24 pb-0"
      style={{ background: "var(--landing-bg)" }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--landing-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--landing-grid) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Beta badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
          style={{
            borderColor: "var(--landing-border)",
            color: "var(--landing-text-2)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full bg-green-500"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          Now in beta — open for teams
        </div>

        {/* Headline */}
        <h1
          className="mb-6 font-semibold leading-none tracking-tight"
          style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "var(--landing-text-1)", display: "block" }}>
            One platform.
          </span>
          <span
            style={{
              color: "var(--landing-text-1)",
              opacity: 0.5,
              display: "block",
            }}
          >
            Every agent.
          </span>
        </h1>

        {/* Subline */}
        <p
          className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed"
          style={{ color: "var(--landing-text-2)" }}
        >
          Connect Claude Code, Gemini CLI, Codex and more. Share context. Ship
          faster.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/register">Get started free</Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="#how-it-works">See how it works →</Link>
          </Button>
        </div>

        {/* Three.js canvas */}
        <div className="mt-16 h-[380px] w-full sm:h-[240px] md:h-[380px]">
          <TerminalCanvas />
        </div>
      </div>
    </section>
  );
}
