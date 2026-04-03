import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, parsed.data.email))
          .limit(1)

        const user = result[0]
        if (!user) return null

        const valid = await compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          role: user.role,
        } as { id: string; email: string; name: string | null; role: string }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/dashboard',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = ((user as { role?: 'admin' | 'member' }).role) ?? 'member'
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      ;(session.user as unknown as { role: 'admin' | 'member' }).role =
        ((token.role as 'admin' | 'member' | undefined) ?? 'member')
      return session
    },
  },
})
