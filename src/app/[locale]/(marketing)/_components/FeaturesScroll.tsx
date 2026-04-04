"use client";
// Needed for localized content and scroll-triggered reveal animations.

import { GitGraph, Network, Terminal, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const accents = [
  "var(--node-decision)",
  "var(--node-artifact)",
  "var(--node-insight)",
  "var(--node-error)",
] as const;

export function FeaturesScroll() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Landing.FeaturesScroll");

  const features = [
    {
      icon: GitGraph,
      title: t("feature1.title"),
      description: t("feature1.description"),
      accent: accents[0],
    },
    {
      icon: Terminal,
      title: t("feature2.title"),
      description: t("feature2.description"),
      accent: accents[1],
    },
    {
      icon: Zap,
      title: t("feature3.title"),
      description: t("feature3.description"),
      accent: accents[2],
    },
    {
      icon: Network,
      title: t("feature4.title"),
      description: t("feature4.description"),
      accent: accents[3],
    },
  ];

  return (
    <section id="features" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.34em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            style={{ color: "var(--landing-text-1)" }}
          >
            {t("title")}
          </h2>
          <p
            className="mt-4 max-w-xl text-base leading-7"
            style={{ color: "var(--landing-text-2)" }}
          >
            {t("description")}
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
