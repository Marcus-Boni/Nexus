import Link from 'next/link'
import type { Route } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LayoutDashboard, FolderOpen, Terminal, GitGraph } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface NavItem {
  href: Route
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { href: '/dashboard' as Route, label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects' as Route, label: 'Projects', icon: FolderOpen },
  { href: '/workspace' as Route, label: 'Workspace', icon: Terminal },
  { href: '/graph' as Route, label: 'Graph', icon: GitGraph },
]

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="hidden w-56 flex-col justify-between border-r p-4 lg:flex"
        style={{ borderColor: 'var(--landing-border)', background: 'var(--landing-bg)' }}
      >
        <div>
          <Link href={'/dashboard' as Route} className="mb-8 flex items-center gap-2 font-semibold">
            ⬡ Nexus
          </Link>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                style={{ color: 'var(--landing-text-2)' }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
            style={{ background: 'var(--landing-border)', color: 'var(--landing-text-1)' }}
          >
            {(session.user?.name ?? session.user?.email ?? 'U').slice(0, 1).toUpperCase()}
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header
          className="flex h-14 items-center border-b px-6"
          style={{ borderColor: 'var(--landing-border)' }}
        >
          <h1 className="text-sm font-medium" style={{ color: 'var(--landing-text-2)' }}>
            Nexus
          </h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
