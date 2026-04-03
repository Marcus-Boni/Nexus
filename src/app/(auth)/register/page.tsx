'use client'
import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerSchema = z
  .object({
    name: z.string().min(2, { error: 'Name must be at least 2 characters' }).max(60),
    email: z.string().email({ error: 'Enter a valid email' }),
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters' })
      .regex(/[0-9]/, { error: 'Password must contain at least one number' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: (zodResolver(registerSchema as unknown as Parameters<typeof zodResolver>[0]) as unknown) as Resolver<RegisterForm>,
  })

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
    })

    if (!res.ok) {
      const body = await res.json() as { error?: string }
      setServerError(body.error ?? 'Registration failed')
      return
    }

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    window.location.href = '/dashboard'
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1
          className="mb-2 text-2xl font-semibold"
          style={{ color: 'var(--landing-text-1)' }}
        >
          Create your account
        </h1>
        <p className="text-sm" style={{ color: 'var(--landing-text-2)' }}>
          Start orchestrating your agents
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 chars, 1 number"
              autoComplete="new-password"
              className="pr-10"
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--landing-text-3)' }}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && (
          <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {serverError}
          </p>
        )}

        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: 'var(--landing-text-2)' }}>
        Already have an account?{' '}
        <Link href="/login" className="font-medium underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  )
}
