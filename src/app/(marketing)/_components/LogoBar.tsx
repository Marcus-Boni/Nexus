const agents = ['claude code', 'gemini cli', 'codex cli', 'antigravity', 'gh copilot']

export function LogoBar() {
  return (
    <div
      className="py-6"
      style={{
        borderTop: '1px solid var(--landing-border)',
        borderBottom: '1px solid var(--landing-border)',
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 sm:px-6">
        <span
          className="shrink-0 text-xs uppercase tracking-widest"
          style={{ color: 'var(--landing-text-3)' }}
        >
          Works with
        </span>
        {agents.map((agent) => (
          <span
            key={agent}
            className="rounded border px-3 py-1 font-mono text-xs"
            style={{
              borderColor: 'var(--landing-border)',
              color: 'var(--landing-text-2)',
              background: 'var(--landing-card)',
            }}
          >
            {agent}
          </span>
        ))}
      </div>
    </div>
  )
}
