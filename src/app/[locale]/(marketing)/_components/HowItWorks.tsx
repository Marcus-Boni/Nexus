"use client";

// Needed for localized copy and reveal animations on the process timeline.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Landing.HowItWorks");

  const steps = [
    {
      number: t("step1.number"),
      title: t("step1.title"),
      description: t("step1.description"),
      tag: t("step1.tag"),
    },
    {
      number: t("step2.number"),
      title: t("step2.title"),
      description: t("step2.description"),
      tag: t("step2.tag"),
    },
    {
      number: t("step3.number"),
      title: t("step3.title"),
      description: t("step3.description"),
      tag: t("step3.tag"),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-4 py-24 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--landing-bg-2) 92%, transparent), color-mix(in srgb, var(--landing-bg) 88%, transparent))",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 18% 24%, color-mix(in srgb, var(--landing-accent-soft) 84%, transparent), transparent 36%), radial-gradient(circle at 84% 18%, color-mix(in srgb, var(--landing-glow) 72%, transparent), transparent 32%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.34em]"
              style={{ color: "var(--landing-text-3)" }}
            >
              {t("eyebrow")}
            </p>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
              style={{ color: "var(--landing-text-1)" }}
            >
              {t("title")}
            </h2>
          </div>
          <p
            className="max-w-xl text-base leading-7"
            style={{ color: "var(--landing-text-2)" }}
          >
            {t("description")}
          </p>
        </div>

        <div className="relative grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[28px] border p-6"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--landing-card-strong) 90%, transparent), color-mix(in srgb, var(--landing-surface) 90%, transparent))",
                boxShadow: "0 32px 90px -64px var(--landing-shadow)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--landing-accent), transparent)",
                  opacity: 0.7,
                }}
              />
              <div className="mb-8 flex items-center justify-between">
                <span
                  className="inline-flex rounded-full border px-3 py-1 font-mono text-xs"
                  style={{
                    borderColor: "var(--landing-border)",
                    background:
                      "color-mix(in srgb, var(--landing-card) 88%, transparent)",
                    color: "var(--landing-text-2)",
                  }}
                >
                  {step.tag}
                </span>
                <span
                  className="text-4xl font-semibold tracking-[-0.08em]"
                  style={{
                    color:
                      "color-mix(in srgb, var(--landing-text-1) 18%, transparent)",
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-xl font-semibold tracking-[-0.02em]"
                style={{ color: "var(--landing-text-1)" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 text-sm leading-7 sm:text-[0.95rem]"
                style={{ color: "var(--landing-text-2)" }}
              >
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
