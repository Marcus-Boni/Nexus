import { Orbit } from "lucide-react";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
};

type BrandLockupProps = {
  className?: string;
  subtitle?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  markClassName?: string;
  iconClassName?: string;
  compact?: boolean;
};

export function BrandMark({ className, iconClassName }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_18px_42px_-28px_var(--landing-shadow)]",
        className,
      )}
      style={{
        borderColor: "var(--landing-border)",
        background:
          "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--landing-glow) 65%, transparent), transparent 62%), color-mix(in srgb, var(--landing-card-strong) 92%, transparent)",
      }}
    >
      <span
        className="absolute inset-[3px] rounded-full border"
        style={{
          borderColor: "var(--landing-border-hover)",
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--landing-surface-strong) 92%, transparent), color-mix(in srgb, var(--landing-surface) 78%, transparent))",
        }}
      />
      <Orbit
        className={cn("relative z-10 h-4.5 w-4.5", iconClassName)}
        style={{ color: "var(--landing-accent-2)" }}
        aria-hidden="true"
      />
    </span>
  );
}

export function BrandLockup({
  className,
  subtitle = "Where agents think together",
  subtitleClassName,
  titleClassName,
  markClassName,
  iconClassName,
  compact = false,
}: BrandLockupProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark className={markClassName} iconClassName={iconClassName} />
      <div className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "truncate font-semibold tracking-[0.02em]",
            compact ? "text-sm" : "text-base",
            titleClassName,
          )}
          style={{ color: "var(--landing-text-1)" }}
        >
          Nexus
        </span>
        {!compact ? (
          <span
            className={cn(
              "truncate text-[10px] uppercase tracking-[0.32em]",
              subtitleClassName,
            )}
            style={{ color: "var(--landing-text-3)" }}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}
