"use client";
// Needed for pointer-driven background effects and reveal animations.

import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { PointerEvent } from "react";

import { Button } from "@/components/ui/button";

const TerminalCanvas = dynamic(
  () => import("./TerminalCanvas").then((module) => module.TerminalCanvas),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

const terminalPalettes = {
  dark: {
    accent: "#7c99ff",
    accentSecondary: "#47d6ff",
    shell: "#132240",
    shellEdge: "#0a1226",
    glow: "#1b3c71",
    point: "#8ab3ff",
    screenBackground: "#04101f",
    textPrimary: "#f5f8ff",
    textSecondary: "#99afd4",
  },
  light: {
    accent: "#2d6cdf",
    accentSecondary: "#0f9ed7",
    shell: "#dce8ff",
    shellEdge: "#b7c9ea",
    glow: "#79dfff",
    point: "#4774ca",
    screenBackground: "#08162d",
    textPrimary: "#eff7ff",
    textSecondary: "#9dc1f2",
  },
} as const;

const proofPoints = [
  "Shared context between agents",
  "Native terminal orchestration",
  "Readable project memory",
] as const;

const compactStats = [
  { label: "Agents online", value: "05" },
  { label: "Context links", value: "128" },
  { label: "Handoff delay", value: "0s" },
] as const;

export function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { resolvedTheme } = useTheme();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(34);
  const smoothX = useSpring(pointerX, {
    stiffness: 110,
    damping: 20,
    mass: 0.7,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 110,
    damping: 20,
    mass: 0.7,
  });
  const terminalPalette =
    resolvedTheme === "light" ? terminalPalettes.light : terminalPalettes.dark;

  const spotlight = useMotionTemplate`
    radial-gradient(26rem 26rem at ${smoothX}% ${smoothY}%,
      color-mix(in srgb, var(--landing-glow) 70%, transparent),
      transparent 70%)
  `;
  const aura = useMotionTemplate`
    radial-gradient(22rem 18rem at ${smoothX}% ${smoothY}%,
      color-mix(in srgb, var(--landing-accent-soft) 76%, transparent),
      transparent 74%)
  `;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  }

  function handlePointerLeave() {
    pointerX.set(50);
    pointerY.set(34);
  }

  return (
    <section
      className="relative isolate overflow-hidden px-4 pb-8 sm:px-6"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{ backgroundImage: spotlight }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{ backgroundImage: aura }}
      />

      <div className="relative mx-auto max-w-6xl pt-10 pb-8 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,480px)] lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em]"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  "color-mix(in srgb, var(--landing-surface) 88%, transparent)",
                color: "var(--landing-text-2)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full bg-[color:var(--landing-accent-2)]"
                style={{
                  animation: shouldReduceMotion
                    ? undefined
                    : "pulse-dot 2s ease-in-out infinite",
                }}
              />
              Local-first multi-agent workspace
            </div>

            <h1
              className="mt-6 max-w-3xl text-balance font-semibold tracking-[-0.05em]"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                lineHeight: 0.95,
                color: "var(--landing-text-1)",
              }}
            >
              Make agent handoffs feel structured, fast, and easy to trust.
            </h1>

            <p
              className="mt-5 max-w-xl text-pretty text-[1rem] leading-7 sm:text-[1.06rem]"
              style={{ color: "var(--landing-text-2)" }}
            >
              Nexus keeps terminals native, captures the context that matters,
              and turns scattered agent work into one coherent operating layer
              for your project.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="rounded-full border border-[var(--landing-border-hover)] bg-[color:var(--landing-text-1)] px-6 text-[color:var(--landing-bg)] shadow-[0_20px_50px_-30px_var(--landing-shadow)] hover:-translate-y-0.5 hover:bg-[color:var(--landing-text-1)]/95"
                asChild
              >
                <Link href="/register">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full border border-[var(--landing-border)] bg-[color:var(--landing-surface)] px-6 text-[color:var(--landing-text-1)] hover:-translate-y-0.5 hover:border-[var(--landing-border-hover)] hover:bg-[color:var(--landing-card-strong)]"
                asChild
              >
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {proofPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-full border px-3.5 py-2 text-sm"
                  style={{
                    borderColor: "var(--landing-border)",
                    background:
                      "color-mix(in srgb, var(--landing-card) 90%, transparent)",
                    color: "var(--landing-text-2)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {compactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border px-4 py-3"
                  style={{
                    borderColor: "var(--landing-border)",
                    background:
                      "color-mix(in srgb, var(--landing-card-strong) 86%, transparent)",
                    boxShadow: "0 18px 42px -34px var(--landing-shadow)",
                  }}
                >
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.24em]"
                    style={{ color: "var(--landing-text-3)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="mt-1 text-xl font-semibold"
                    style={{ color: "var(--landing-text-1)" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="w-full lg:ml-auto"
          >
            <div
              className="overflow-hidden rounded-[30px] border p-3 sm:p-4"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--landing-card-strong) 94%, transparent), color-mix(in srgb, var(--landing-surface) 92%, transparent))",
                boxShadow: "0 34px 90px -52px var(--landing-shadow)",
              }}
            >
              <div
                className="rounded-[22px] border px-4 py-3"
                style={{
                  borderColor: "var(--landing-border)",
                  background:
                    "color-mix(in srgb, var(--landing-surface) 82%, transparent)",
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.28em]"
                      style={{ color: "var(--landing-text-3)" }}
                    >
                      Live session preview
                    </p>
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: "var(--landing-text-1)" }}
                    >
                      Claude, Gemini and Codex aligned on the same context
                      layer.
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    {["claude-code", "gemini-cli", "codex-cli"].map((agent) => (
                      <span
                        key={agent}
                        className="rounded-full border px-3 py-1 font-mono text-[0.68rem]"
                        style={{
                          borderColor: "var(--landing-border)",
                          background:
                            "color-mix(in srgb, var(--landing-card) 86%, transparent)",
                          color: "var(--landing-text-2)",
                        }}
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="mt-3 overflow-hidden rounded-[24px] border"
                style={{
                  height: "clamp(260px, 34vw, 360px)",
                  borderColor: "var(--landing-border)",
                  background:
                    "radial-gradient(circle at top, color-mix(in srgb, var(--landing-accent-soft) 40%, transparent), transparent 58%), linear-gradient(180deg, color-mix(in srgb, var(--landing-bg) 82%, transparent), color-mix(in srgb, var(--landing-bg-2) 84%, transparent))",
                }}
              >
                <TerminalCanvas
                  palette={terminalPalette}
                  reduceMotion={shouldReduceMotion}
                />
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
