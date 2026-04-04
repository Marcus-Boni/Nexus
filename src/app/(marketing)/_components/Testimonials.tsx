"use client";
// Needed for the section reveal animation.

import { motion, useReducedMotion } from "motion/react";

const testimonials = [
  {
    quote:
      "We cut our AI handoff time from twenty minutes to zero. Nexus made the workspace feel coordinated instead of chaotic.",
    name: "Sarah Chen",
    role: "Staff Engineer, Vercel",
    initials: "SC",
  },
  {
    quote:
      "For the first time, my Claude and Gemini sessions actually feel like they are participating in the same project instead of competing for context.",
    name: "Marcus Webb",
    role: "Lead Developer, Linear",
    initials: "MW",
  },
  {
    quote:
      "The graph gives us memory without adding process overhead. That is the rare kind of UX improvement teams notice immediately.",
    name: "Ana Souza",
    role: "CTO, Fathom",
    initials: "AS",
  },
] as const;

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

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
            Team signal
          </p>
          <h2
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            style={{ color: "var(--landing-text-1)" }}
          >
            Small teams feel faster when the interface keeps everyone in
            context.
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
                “{testimonial.quote}”
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
