"use client";

import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { type FieldErrors, type Resolver, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters" })
      .max(60),
    email: z.string().email({ error: "Enter a valid email" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(/[0-9]/, { error: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const registerResolver: Resolver<RegisterForm> = async (values) => {
  const parsed = registerSchema.safeParse(values);

  if (parsed.success) {
    return {
      values: parsed.data,
      errors: {},
    };
  }

  const flattened = parsed.error.flatten().fieldErrors;
  const errors: FieldErrors<RegisterForm> = {};

  if (flattened.name?.[0]) {
    errors.name = { type: "manual", message: flattened.name[0] };
  }

  if (flattened.email?.[0]) {
    errors.email = { type: "manual", message: flattened.email[0] };
  }

  if (flattened.password?.[0]) {
    errors.password = { type: "manual", message: flattened.password[0] };
  }

  if (flattened.confirmPassword?.[0]) {
    errors.confirmPassword = {
      type: "manual",
      message: flattened.confirmPassword[0],
    };
  }

  return {
    values: {},
    errors,
  };
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: registerResolver,
  });

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setServerError(body.error ?? "Registration failed");
      return;
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    window.location.href = "/dashboard";
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
          Create your workspace
        </div>
        <h1
          className="text-3xl font-semibold tracking-[-0.04em]"
          style={{ color: "var(--landing-text-1)" }}
        >
          Create your account
        </h1>
        <p
          className="mt-3 text-sm leading-6"
          style={{ color: "var(--landing-text-2)" }}
        >
          Start orchestrating your agents with a workspace that already speaks
          the same language as the rest of the system.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="name"
            className="text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            Name
          </Label>
          <div className="relative">
            <UserRound
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--landing-text-3)" }}
            />
            <Input
              id="name"
              placeholder="Your name"
              autoComplete="name"
              className="h-12 rounded-2xl border-[var(--landing-border)] bg-[color:var(--landing-surface)] pl-11 text-[color:var(--landing-text-1)] placeholder:text-[color:var(--landing-text-3)] focus-visible:border-[var(--landing-border-hover)] focus-visible:ring-[color:var(--landing-accent-soft)]"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
          </div>
          {errors.name ? (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--landing-text-3)" }}
          >
            Email
          </Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--landing-text-3)" }}
            />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--landing-text-3)" }}
            >
              Password
            </Label>
            <div className="relative">
              <LockKeyhole
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--landing-text-3)" }}
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 chars"
                autoComplete="new-password"
                className="h-12 rounded-2xl border-[var(--landing-border)] bg-[color:var(--landing-surface)] pl-11 pr-11 text-[color:var(--landing-text-1)] placeholder:text-[color:var(--landing-text-3)] focus-visible:border-[var(--landing-border-hover)] focus-visible:ring-[color:var(--landing-accent-soft)]"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--landing-text-3)" }}
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="confirmPassword"
              className="text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--landing-text-3)" }}
            >
              Confirm password
            </Label>
            <div className="relative">
              <LockKeyhole
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--landing-text-3)" }}
              />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat password"
                autoComplete="new-password"
                className="h-12 rounded-2xl border-[var(--landing-border)] bg-[color:var(--landing-surface)] pl-11 text-[color:var(--landing-text-1)] placeholder:text-[color:var(--landing-text-3)] focus-visible:border-[var(--landing-border-hover)] focus-visible:ring-[color:var(--landing-accent-soft)]"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
              />
            </div>
            {errors.confirmPassword ? (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
        </div>

        {serverError ? (
          <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {serverError}
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
          Create account
        </Button>
      </form>

      <p
        className="mt-6 text-center text-sm"
        style={{ color: "var(--landing-text-2)" }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4"
          style={{ color: "var(--landing-text-1)" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
