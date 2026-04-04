import Link from "next/link";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#graph-demo", label: "Graph" },
  { href: "/register", label: "Get started" },
] as const;

export function Footer() {
  return (
    <footer
      className="px-4 py-8 sm:px-6"
      style={{
        borderTop: "1px solid var(--landing-border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--landing-bg) 78%, transparent), color-mix(in srgb, var(--landing-bg-2) 92%, transparent))",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[28px] border px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="rounded-full border px-4 py-2"
          style={{
            borderColor: "var(--landing-border)",
            background:
              "color-mix(in srgb, var(--landing-card) 86%, transparent)",
          }}
        >
          <BrandLockup compact />
        </div>

        <nav className="flex flex-wrap gap-3">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full border px-4 py-2 text-sm transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--landing-border)",
                background:
                  "color-mix(in srgb, var(--landing-surface) 88%, transparent)",
                color: "var(--landing-text-2)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span
            className="text-xs uppercase tracking-[0.24em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            © 2026 Nexus
          </span>
        </div>
      </div>
    </footer>
  );
}
