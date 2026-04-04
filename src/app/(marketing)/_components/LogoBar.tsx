const agents = [
  "claude code",
  "gemini cli",
  "codex cli",
  "antigravity",
  "gh copilot",
] as const;

export function LogoBar() {
  return (
    <section
      className="relative px-4 py-6 sm:px-6"
      style={{
        borderTop: "1px solid var(--landing-border)",
        borderBottom: "1px solid var(--landing-border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--landing-bg) 70%, transparent), color-mix(in srgb, var(--landing-bg-2) 84%, transparent))",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <span
          className="shrink-0 text-xs font-medium uppercase tracking-[0.34em]"
          style={{ color: "var(--landing-text-3)" }}
        >
          Works with
        </span>

        <div className="flex flex-1 flex-wrap gap-2">
          {agents.map((agent, index) => (
            <span
              key={agent}
              className="rounded-full border px-4 py-2 font-mono text-xs transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  index % 2 === 0
                    ? "color-mix(in srgb, var(--landing-card) 88%, transparent)"
                    : "color-mix(in srgb, var(--landing-surface) 92%, transparent)",
                color: "var(--landing-text-2)",
                boxShadow: "0 18px 50px -42px var(--landing-shadow)",
              }}
            >
              {agent}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
