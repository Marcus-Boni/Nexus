"use client";

// Needed for localized content and section reveal animation.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const testimonialNames = ["Sarah Chen", "Marcus Webb", "Ana Souza"] as const;
const testimonialInitials = ["SC", "MW", "AS"] as const;

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Landing.Testimonials");

  const testimonials = [
    {
      quote: t("testimonial1.quote"),
      name: testimonialNames[0],
      role: t("testimonial1.role"),
      initials: testimonialInitials[0],
    },
    {
      quote: t("testimonial2.quote"),
      name: testimonialNames[1],
      role: t("testimonial2.role"),
      initials: testimonialInitials[1],
    },
    {
      quote: t("testimonial3.quote"),
      name: testimonialNames[2],
      role: t("testimonial3.role"),
      initials: testimonialInitials[2],
    },
  ];

  return (
    <section
      id="testimonials"
      className="px-4 py-24 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--landing-bg-2) 90%, transparent), color-mix(in srgb, var(--landing-bg) 82%, transparent))",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
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

        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
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
                boxShadow: "0 28px 90px -64px var(--landing-shadow)",
              }}
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--landing-glow) 72%, transparent), transparent 70%)",
                  opacity: 0.55,
                }}
              />
              <p
                className="relative text-sm leading-7 sm:text-[0.95rem]"
                style={{ color: "var(--landing-text-2)" }}
              >
                "{testimonial.quote}"
              </p>

              <div className="relative mt-8 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold"
                  style={{
                    borderColor: "var(--landing-border)",
                    background:
                      "color-mix(in srgb, var(--landing-accent-soft) 72%, transparent)",
                    color: "var(--landing-text-1)",
                  }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--landing-text-1)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: "var(--landing-text-3)" }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
