'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '#features' as unknown as '/', label: 'Features' },
    { href: '#how-it-works' as unknown as '/', label: 'How it works' },
    { href: '#docs' as unknown as '/', label: 'Docs' },
  ]

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        borderBottom: '1px solid var(--landing-border)',
        background: 'color-mix(in oklch, var(--landing-bg) 80%, transparent)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span style={{ color: 'var(--landing-text-1)' }}>⬡ Nexus</span>
          <span
            className="h-1.5 w-1.5 rounded-full bg-green-500"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: 'var(--landing-text-2)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-8">
                <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                  ⬡ Nexus
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm"
                      style={{ color: 'var(--landing-text-2)' }}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register" onClick={() => setOpen(false)}>Get started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
