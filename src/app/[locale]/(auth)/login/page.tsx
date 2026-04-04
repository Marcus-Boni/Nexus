"use client";

import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type FieldErrors, type Resolver, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/navigation";

type LoginForm = {
  email: string;
  password: string;
};

function createLoginResolver(messages: {
  email: string;
  password: string;
}): Resolver<LoginForm> {
  return async (values) => {
    const loginSchema = z.object({
      email: z.string().email({ error: messages.email }),
      password: z.string().min(8, { error: messages.password }),
    });

    const parsed = loginSchema.safeParse(values);

    if (parsed.success) {
      return {
        values: parsed.data,
        errors: {},
      };
    }

    const flattened = parsed.error.flatten().fieldErrors;
    const errors: FieldErrors<LoginForm> = {};

    if (flattened.email?.[0]) {
      errors.email = { type: "manual", message: flattened.email[0] };
    }

    if (flattened.password?.[0]) {
      errors.password = { type: "manual", message: flattened.password[0] };
    }

    return {
      values: {},
      errors,
    };
  };
}

export default function LoginPage() {
  const t = useTranslations("Auth.Login");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const resolver = createLoginResolver({
    email: t("validation.email"),
    password: t("validation.password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver,
  });

  const onSubmit = async (data: LoginForm) => {
    setAuthError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError(t("invalidCredentials"));
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <div
      className="overflow-hidden rounded-[32px] border p-6 sm:p-8"
      style={{
        borderColor: "var(--landing-border)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--landing-card-strong) 94%, transparent), color-mix(in srgb, var(--landing-surface) 92%, transparent))",
        boxShadow: "0 34px 90px -54px var(--landing-shadow)",
      }}
    >
      <div className="mb-8">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em]"
          style={{
            borderColor: "var(--landing-border)",
            background:
              "color-mix(in srgb, var(--landing-surface) 88%, transparent)",
            color: "var(--landing-text-2)",
          }}
        >
          <span className="h-2 w-2 rounded-full bg-[color:var(--landing-accent-2)]" />
          {t("badge")}
        </div>
        <h1
          className="text-3xl font-semibold tracking-[-0.04em]"
          style={{ color: "var(--landing-text-1)" }}
        >
          {t("title")}
        </h1>
        <p
          className="mt-3 text-sm leading-6"
          style={{ color: "var(--landing-text-2)" }}
        >
          {t("description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            {t("email")}
          </Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--landing-text-3)" }}
            />
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
              className="h-12 rounded-2xl border-[var(--landing-border)] bg-[color:var(--landing-surface)] pl-11 text-[color:var(--landing-text-1)] placeholder:text-[color:var(--landing-text-3)] focus-visible:border-[var(--landing-border-hover)] focus-visible:ring-[color:var(--landing-accent-soft)]"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email ? (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            {t("password")}
          </Label>
          <div className="relative">
            <LockKeyhole
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--landing-text-3)" }}
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              autoComplete="current-password"
              className="h-12 rounded-2xl border-[var(--landing-border)] bg-[color:var(--landing-surface)] pl-11 pr-11 text-[color:var(--landing-text-1)] placeholder:text-[color:var(--landing-text-3)] focus-visible:border-[var(--landing-border-hover)] focus-visible:ring-[color:var(--landing-accent-soft)]"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--landing-text-3)" }}
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          ) : null}
        </div>

        {authError ? (
          <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {authError}
          </p>
        ) : null}

        <Button
          type="submit"
          className="mt-2 h-12 rounded-2xl border border-[var(--landing-border-hover)] bg-[color:var(--landing-text-1)] text-[color:var(--landing-bg)] hover:bg-[color:var(--landing-text-1)]/95"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {t("submit")}
        </Button>
      </form>

      <div
        className="mt-6 flex flex-col gap-3 text-center text-sm"
        style={{ color: "var(--landing-text-2)" }}
      >
        <button
          type="button"
          className="cursor-not-allowed opacity-50"
          disabled
        >
          {t("forgotPassword")}
        </button>
        <p>
          {t("registerPrompt")}{" "}
          <Link
            href="/register"
            className="font-medium underline underline-offset-4"
            style={{ color: "var(--landing-text-1)" }}
          >
            {t("registerCta")}
          </Link>
        </p>
      </div>
    </div>
  );
}
