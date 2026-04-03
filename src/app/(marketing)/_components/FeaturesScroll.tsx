'use client'
import { motion } from 'motion/react'
import { GitGraph, Terminal, Zap, Network } from 'lucide-react'

const features = [
  {
    icon: GitGraph,
    title: 'Shared knowledge graph',
    description:
      'Every decision, artifact, and insight captured and connected. Agents build on each other\'s work automatically.',
  },
  {
    icon: Terminal,
    title: 'Native terminal sessions',
    description:
      'Full PTY terminal sessions for every agent. Real CLI, real output, real integration.',
  },
  {
    icon: Zap,
    title: 'Automatic context injection',
    description:
      'Context from previous sessions injected automatically into each new agent. No copy-pasting.',
  },
  {
    icon: Network,
    title: 'Multi-project connections',
    description:
      'Knowledge flows across projects. Insights from one codebase inform work in another.',
  },
]

export function FeaturesScroll() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 text-3xl font-semibold tracking-tight"
            style={{ color: 'var(--landing-text-1)' }}
          >
            Everything your agents need to work together
          </h2>
          <p className="text-base" style={{ color: 'var(--landing-text-2)' }}>
            Built for teams shipping with multiple AI coding agents.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border p-6 transition-colors"
              style={{
                background: 'var(--landing-card)',
                borderColor: 'var(--landing-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--landing-border-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--landing-border)'
              }}
            >
              <feature.icon
                className="mb-4 h-5 w-5"
                style={{ color: 'var(--landing-text-2)' }}
              />
              <h3
                className="mb-2 font-semibold"
                style={{ color: 'var(--landing-text-1)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--landing-text-2)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
