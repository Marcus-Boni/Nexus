"use client";
// Needed for client-side locale switching with next-intl navigation.

import { Check, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
};

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("label")}
          className={cn(
            "relative rounded-full border border-[var(--landing-border)] bg-[color:var(--landing-surface)] text-[color:var(--landing-text-2)] shadow-[0_16px_40px_-28px_var(--landing-shadow)] transition-[border-color,background-color,color,transform] hover:-translate-y-0.5 hover:border-[var(--landing-border-hover)] hover:bg-[color:var(--landing-card-strong)] hover:text-[color:var(--landing-text-1)]",
            className,
          )}
        >
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-[var(--landing-border)] bg-[color:var(--landing-surface-strong)] text-[color:var(--landing-text-1)] backdrop-blur-xl"
      >
        {routing.locales.map((nextLocale) => (
          <DropdownMenuItem
            key={nextLocale}
            onClick={() => router.replace(pathname, { locale: nextLocale })}
            className="flex items-center justify-between gap-3"
          >
            <span>{t(`localeNames.${nextLocale}`)}</span>
            {locale === nextLocale ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
