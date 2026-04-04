import type { LucideIcon } from "lucide-react";
import { FolderOpen, GitGraph, LayoutDashboard, Terminal } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { isValidLocale } from "@/i18n/messages";
import { Link, redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";

interface NavItem {
  href: "/dashboard" | "/projects" | "/workspace" | "/graph";
  label: string;
  icon: LucideIcon;
}

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations("App.Layout");

  setRequestLocale(locale);

  if (!session) {
    redirect({ href: "/login", locale });
  }

  const navItems: NavItem[] = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/projects", label: t("nav.projects"), icon: FolderOpen },
    { href: "/workspace", label: t("nav.workspace"), icon: Terminal },
    { href: "/graph", label: t("nav.graph"), icon: GitGraph },
  ];

  return (
    <div className="flex min-h-screen">
      <aside
        className="hidden w-56 flex-col justify-between border-r p-4 lg:flex"
        style={{
          borderColor: "var(--landing-border)",
          background: "var(--landing-bg)",
        }}
      >
        <div>
          <Link
            href="/dashboard"
            className="mb-8 flex items-center gap-2 font-semibold"
          >
            <BrandLockup compact />
          </Link>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                style={{ color: "var(--landing-text-2)" }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
            style={{
              background: "var(--landing-border)",
              color: "var(--landing-text-1)",
            }}
          >
            {(session?.user?.name ?? session?.user?.email ?? "U")
              .slice(0, 1)
              .toUpperCase()}
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header
          className="flex h-14 items-center justify-between border-b px-6"
          style={{ borderColor: "var(--landing-border)" }}
        >
          <h1
            className="text-sm font-medium"
            style={{ color: "var(--landing-text-2)" }}
          >
            {t("headerTitle")}
          </h1>

          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
