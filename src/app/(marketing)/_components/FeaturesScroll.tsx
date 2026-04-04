"use client";
// Needed for scroll-triggered reveal animations.

import { GitGraph, Network, Terminal, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const features = [
  {
    icon: GitGraph,
    title: "Shared knowledge graph",
    description:
      "Every decision, artifact, and insight is captured as reusable project memory, so the next agent starts informed instead of blind.",
    accent: "var(--node-decision)",
  },
  {
    icon: Terminal,
    title: "Native terminal sessions",
    description:
      "Full PTY sessions keep commands, output, and intent in the same place. No iframe toy terminals or fake command previews.",
    accent: "var(--node-artifact)",
  },
  {
    icon: Zap,
    title: "Automatic context injection",
    description:
      "Relevant session history, extracted decisions, and linked artifacts flow into each new run automatically and at the right time.",
    accent: "var(--node-insight)",
  },
  {
    icon: Network,
    title: "Multi-project continuity",
    description:
      "Patterns discovered in one codebase can inform another. Nexus keeps agent work connected at the level teams actually think.",
    accent: "var(--node-error)",
  },
] as const;

export function FeaturesScroll() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="features" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.34em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            System personality
          </p>
          <h2
            className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            style={{ color: "var(--landing-text-1)" }}
          >
            A workspace that feels intentional, readable, and deeply alive.
          </h2>
          <p
            className="mt-4 max-w-xl text-base leading-7"
            style={{ color: "var(--landing-text-2)" }}
          >
            Rich visuals only matter when they improve clarity. Each surface
            below is designed to make agent orchestration easier to scan and
            easier to trust.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] border p-7"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--landing-card-strong) 88%, transparent), color-mix(in srgb, var(--landing-surface) 94%, transparent))",
                boxShadow: "0 32px 90px -60px var(--landing-shadow)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--landing-accent-2), transparent)",
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute -right-14 -bottom-14 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, color-mix(in srgb, ${feature.accent} 80%, transparent), transparent 70%)`,
                  opacity: 0.45,
                }}
              />

              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: "var(--landing-border)",
                  background: `color-mix(in srgb, ${feature.accent} 68%, var(--landing-card))`,
                }}
              >
                <feature.icon
                  className="h-5 w-5"
                  style={{ color: "var(--landing-text-1)" }}
                />
              </div>

              <h3
                className="text-xl font-semibold tracking-[-0.02em]"
                style={{ color: "var(--landing-text-1)" }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-3 max-w-xl text-sm leading-7 sm:text-[0.95rem]"
                style={{ color: "var(--landing-text-2)" }}
              >
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
