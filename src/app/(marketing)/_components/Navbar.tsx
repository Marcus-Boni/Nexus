"use client";

// Needed for the mobile sheet state and client-side navigation affordances.

import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#graph-demo", label: "Graph" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className="relative mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-full border px-3 py-2 shadow-[0_24px_80px_-42px_var(--landing-shadow)] backdrop-blur-xl"
        style={{
          borderColor: "var(--landing-border)",
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--landing-surface-strong) 90%, transparent), color-mix(in srgb, var(--landing-surface) 78%, transparent))",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-65"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--landing-border) 64%, transparent), transparent 18%, transparent 82%, color-mix(in srgb, var(--landing-border) 64%, transparent))",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-72"
          style={{
            background:
              "radial-gradient(circle at 22% 50%, color-mix(in srgb, var(--landing-glow) 42%, transparent), transparent 72%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-64"
          style={{
            background:
              "radial-gradient(circle at 78% 40%, color-mix(in srgb, var(--landing-accent-soft) 44%, transparent), transparent 72%)",
          }}
        />
        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3 font-medium">
            <BrandLockup />
          </Link>

          <div
            className="hidden items-center gap-2 rounded-full border px-3 py-1 lg:flex"
            style={{
              borderColor: "var(--landing-border)",
              background:
                "color-mix(in srgb, var(--landing-card) 56%, transparent)",
            }}
          >
            <Sparkles
              className="h-3.5 w-3.5"
              style={{ color: "var(--landing-accent-2)" }}
            />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.28em]"
              style={{ color: "var(--landing-text-2)" }}
            >
              Local-first orchestration
            </span>
          </div>
        </div>

        <nav className="relative z-10 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm transition-[transform,color,background-color] duration-300 hover:-translate-y-0.5"
              style={{
                color: "var(--landing-text-2)",
                background: "transparent",
              }}
            >
              <span className="rounded-full px-1 py-0.5 transition-colors hover:text-[var(--landing-text-1)]">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="relative z-10 hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full border border-transparent bg-transparent text-[color:var(--landing-text-2)] hover:border-[var(--landing-border)] hover:bg-[color:var(--landing-card)] hover:text-[color:var(--landing-text-1)]"
            asChild
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full border border-[var(--landing-border-hover)] bg-[color:var(--landing-text-1)] text-[color:var(--landing-bg)] shadow-[0_18px_40px_-28px_var(--landing-shadow)] hover:-translate-y-0.5 hover:bg-[color:var(--landing-text-1)]/95"
            asChild
          >
            <Link href="/register">Get started</Link>
          </Button>
        </div>

        <div className="relative z-10 flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="rounded-full border border-[var(--landing-border)] bg-[color:var(--landing-surface)] text-[color:var(--landing-text-2)] hover:border-[var(--landing-border-hover)] hover:bg-[color:var(--landing-card)] hover:text-[color:var(--landing-text-1)]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-[var(--landing-border)] bg-[color:var(--landing-surface-strong)] text-[color:var(--landing-text-1)]"
            >
              <div className="flex flex-col gap-8 pt-10">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <BrandLockup
                    subtitle="Local-first agent workspace"
                    subtitleClassName="tracking-[0.24em]"
                  />
                </Link>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl border px-4 py-3 text-sm transition-colors"
                      style={{
                        borderColor: "var(--landing-border)",
                        background:
                          "color-mix(in srgb, var(--landing-card) 84%, transparent)",
                        color: "var(--landing-text-2)",
                      }}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="rounded-full border border-[var(--landing-border)] bg-transparent text-[color:var(--landing-text-2)] hover:bg-[color:var(--landing-card)] hover:text-[color:var(--landing-text-1)]"
                    asChild
                  >
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    className="rounded-full border border-[var(--landing-border-hover)] bg-[color:var(--landing-text-1)] text-[color:var(--landing-bg)]"
                    asChild
                  >
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Get started
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
