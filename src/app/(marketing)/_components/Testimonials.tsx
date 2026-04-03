const testimonials = [
  {
    quote:
      '"We cut our AI handoff time from 20 minutes to zero. Nexus just handles it."',
    name: "Sarah Chen",
    role: "Staff Engineer, Vercel",
    initials: "SC",
  },
  {
    quote:
      '"Finally, my Claude sessions and Gemini sessions actually know about each other."',
    name: "Marcus Webb",
    role: "Lead Developer, Linear",
    initials: "MW",
  },
  {
    quote: '"The knowledge graph is a game changer for multi-agent workflows."',
    name: "Ana Souza",
    role: "CTO, Fathom",
    initials: "AS",
  },
];

export function Testimonials() {
  return (
    <section
      className="py-24 px-4"
      style={{ background: "var(--landing-bg-2)" }}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-12 text-center text-3xl font-semibold tracking-tight"
          style={{ color: "var(--landing-text-1)" }}
        >
          Trusted by engineering teams
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-xl border p-6"
              style={{
                background: "var(--landing-card)",
                borderColor: "var(--landing-border)",
              }}
            >
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: "var(--landing-text-2)" }}
              >
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    background: "var(--landing-border)",
                    color: "var(--landing-text-1)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--landing-text-1)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--landing-text-3)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
