const steps = [
  {
    number: '01',
    title: 'Open a terminal session',
    description:
      'Launch any supported agent (Claude Code, Gemini CLI, Codex) from within Nexus. Full PTY terminal, real commands.',
    tag: 'PTY sessions',
  },
  {
    number: '02',
    title: 'Nexus captures and extracts',
    description:
      'As agents work, Nexus automatically extracts decisions, artifacts, and insights into the shared knowledge graph.',
    tag: 'Knowledge graph',
  },
  {
    number: '03',
    title: 'Every next agent starts informed',
    description:
      'When you open a new agent session, Nexus injects relevant context automatically. No manual handoffs.',
    tag: 'Context injection',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4"
      style={{ background: 'var(--landing-bg-2)' }}
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 text-3xl font-semibold tracking-tight"
            style={{ color: 'var(--landing-text-1)' }}
          >
            How it works
          </h2>
        </div>

        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-10 bottom-10 w-px"
            style={{ background: 'var(--landing-border)' }}
          />

          {steps.map((step) => (
            <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Number circle */}
              <div
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs"
                style={{
                  borderColor: 'var(--landing-border)',
                  background: 'var(--landing-bg)',
                  color: 'var(--landing-text-2)',
                }}
              >
                {step.number}
              </div>

              <div className="pt-1">
                <h3
                  className="mb-1 font-semibold"
                  style={{ color: 'var(--landing-text-1)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="mb-3 text-sm leading-relaxed"
                  style={{ color: 'var(--landing-text-2)' }}
                >
                  {step.description}
                </p>
                <span
                  className="rounded border px-2 py-0.5 font-mono text-xs"
                  style={{
                    borderColor: 'var(--landing-border)',
                    color: 'var(--landing-text-3)',
                  }}
                >
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
