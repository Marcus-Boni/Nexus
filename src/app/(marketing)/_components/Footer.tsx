import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function Footer() {
  return (
    <footer
      className="py-8 px-4"
      style={{ borderTop: '1px solid var(--landing-border)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-semibold" style={{ color: 'var(--landing-text-1)' }}>
          ⬡ Nexus
        </Link>

        <nav className="flex gap-6">
          {['Features', 'Docs', 'GitHub'].map((label) => (
            <Link
              key={label}
              href="#"
              className="text-sm transition-opacity hover:opacity-100"
              style={{ color: 'var(--landing-text-3)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xs" style={{ color: 'var(--landing-text-3)' }}>
            © 2026 Nexus
          </span>
        </div>
      </div>
    </footer>
  )
}
