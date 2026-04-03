# CLAUDE.md — Nexus

> Plataforma local-first para orquestração de agentes de código com contexto compartilhado.
> Leia este arquivo integralmente antes de qualquer ação.

---

## IDENTIDADE DO PROJETO

**Nome:** Nexus
**Tagline:** "Where your agents think together."
**Tipo:** Web app local-first — não é SaaS, roda na máquina do usuário
**Fase atual:** 0 — Landing page + Auth
**Usuários:** Uso pessoal + times pequenos por convite

---

## REGRAS ABSOLUTAS — NUNCA VIOLE

1. **Package manager é `pnpm` exclusivamente.** Nunca escrever `npm install`, `npm run`, `yarn add` ou qualquer variante. Todo comando usa `pnpm`.
2. **TypeScript strict em tudo.** Nunca usar `any` implícito, `// @ts-ignore` ou `as unknown as X` como atalho. Se o tipo não fecha, corrija a causa raiz.
3. **Nunca commitar segredos.** `.env.local` está no `.gitignore`. Usar `.env.example` com valores placeholder.
4. **Server Components por padrão.** Adicionar `'use client'` somente quando há hooks, eventos do browser ou APIs client-side. Justificar no comentário.
5. **Zod valida todo input externo** — API routes, forms, mensagens WebSocket, variáveis de ambiente. Sem exceções.
6. **Sem `console.log` em produção.** Usar `console.error` apenas em catch blocks. Remover logs de debug antes de finalizar.
7. **Sem TODOs sem issue.** Se algo está incompleto, criar um comentário `// TODO(fase-N): descrição` referenciando a fase do roadmap.
8. **`pnpm typecheck` deve passar sem erros** antes de reportar qualquer tarefa como concluída.

---

## STACK — REFERÊNCIA RÁPIDA

| Categoria | Tecnologia | Versão/Notas |
|-----------|-----------|--------------|
| Framework | Next.js | 15, App Router, Turbopack em dev |
| Linguagem | TypeScript | strict + noUncheckedIndexedAccess |
| Package manager | pnpm | 9.x — OBRIGATÓRIO |
| Estilização | Tailwind CSS | v4, darkMode: ['class'] |
| Componentes | shadcn/ui | Radix UI base, acessível |
| Tema | next-themes | defaultTheme: 'dark', enableSystem |
| Animações | Framer Motion | v11 |
| 3D | Three.js + R3F + Drei | Hero apenas, ssr: false |
| Terminal UI | @xterm/xterm | + addon-fit, addon-web-links |
| Grafo | react-force-graph-2d | Workspace view |
| Estado global | Zustand | Mínimo — só sessões ativas e UI state |
| Forms | React Hook Form + Zod | |
| HTTP/cache | TanStack Query | v5 |
| Auth | next-auth | v5 beta, credentials provider |
| Banco | Turso (libSQL) | file:./nexus.db em dev |
| ORM | Drizzle ORM | + @libsql/client |
| WS Server | ws | Processo standalone porta 3001 |
| PTY | node-pty | Processo standalone |
| AI extraction | @anthropic-ai/sdk | claude-sonnet-4-6, fase 3+ |
| Ícones | lucide-react | |
| Fonts | geist | GeistSans + GeistMono |
| Utilitários | clsx + tailwind-merge | via cn() |

---

## ESTRUTURA DE PASTAS

```
nexus/
├── app/
│   ├── (marketing)/          # Landing — público, SSR, sem auth
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── _components/      # Componentes privados da landing
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx       # Importa TerminalCanvas com dynamic ssr:false
│   │       ├── TerminalCanvas.tsx  # 'use client' — Three.js
│   │       ├── LogoBar.tsx
│   │       ├── FeaturesScroll.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── GraphDemo.tsx
│   │       ├── Testimonials.tsx
│   │       └── Footer.tsx
│   ├── (auth)/               # Login/registro — público
│   │   ├── layout.tsx        # Layout split: branding | form
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/                # Área autenticada — middleware protege
│   │   ├── layout.tsx        # Shell: sidebar + topbar
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── error.tsx
│   │   ├── workspace/
│   │   │   └── [projectId]/
│   │   │       ├── page.tsx
│   │   │       └── error.tsx
│   │   └── graph/
│   │       └── page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── register/route.ts
│       ├── projects/route.ts
│       ├── sessions/route.ts
│       ├── nodes/route.ts
│       └── extract/route.ts   # Fase 3+
├── server/                    # Processo Node standalone — NÃO é Next.js
│   ├── index.ts               # Entry: pnpm server (porta 3001)
│   ├── processManager.ts
│   ├── contextInjector.ts     # Fase 4+
│   └── adapters/
│       ├── index.ts           # getAdapter(agentId) + registry
│       ├── claudeCode.ts
│       ├── geminiCli.ts
│       ├── codexCli.ts
│       ├── antigravity.ts
│       └── copilot.ts
├── lib/
│   ├── db/
│   │   ├── schema.ts          # Fonte da verdade — tipos inferidos daqui
│   │   ├── index.ts           # Cliente Drizzle+libSQL singleton
│   │   └── migrations/        # Gerado por drizzle-kit — nunca editar manualmente
│   ├── auth.ts                # NextAuth config + handlers
│   ├── anthropic.ts           # SDK client singleton (fase 3+)
│   ├── env.ts                 # Zod parse de process.env — importar em vez de process.env direto
│   └── utils.ts               # cn(), formatDate()
├── components/
│   ├── ui/                    # shadcn/ui — gerado, não editar diretamente
│   ├── theme/
│   │   ├── ThemeProvider.tsx  # 'use client' — wraps next-themes
│   │   └── ThemeToggle.tsx    # 'use client' — dropdown Light/Dark/System
│   ├── terminal/              # Fase 1+
│   │   ├── TerminalPane.tsx
│   │   └── TerminalToolbar.tsx
│   ├── graph/                 # Fase 3+
│   │   ├── GraphCanvas.tsx
│   │   └── NodeCard.tsx
│   └── workspace/             # Fase 2+
│       ├── WorkspaceLayout.tsx
│       └── SessionSidebar.tsx
├── hooks/
│   ├── useTerminal.ts         # Fase 1+
│   ├── useWebSocket.ts        # Fase 1+
│   ├── useGraph.ts            # Fase 3+
│   └── useTheme.ts            # Wrapper useTheme do next-themes
├── types/
│   ├── agent.ts               # AgentId, AgentAdapter
│   ├── node.ts                # NodeType, LinkRelation (re-exporta tipos do schema)
│   └── ws.ts                  # WSMessage union type
├── styles/
│   └── globals.css            # CSS variables + Tailwind directives
├── middleware.ts              # Proteção de rotas via NextAuth
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json               # packageManager: "pnpm@9.15.0"
```

---

## BANCO DE DADOS

### Conexão

```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN, // undefined em dev — ok
})

export const db = drizzle(client, { schema })
```

### Schema — tabelas e tipos

```typescript
// lib/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: text('role', { enum: ['admin', 'member'] }).notNull().default('member'),
  theme: text('theme', { enum: ['dark', 'light', 'system'] }).default('dark'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  rootPath: text('root_path').notNull(),
  color: text('color').default('#6366f1'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const agentSessions = sqliteTable('agent_sessions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id),
  agentId: text('agent_id').notNull(),
  status: text('status', { enum: ['active', 'idle', 'terminated'] }).notNull().default('idle'),
  pid: integer('pid'),
  startedAt: integer('started_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  endedAt: integer('ended_at', { mode: 'timestamp' }),
})

export const contextNodes = sqliteTable('context_nodes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').references(() => agentSessions.id, { onDelete: 'set null' }),
  agentId: text('agent_id').notNull(),
  type: text('type', { enum: ['decision', 'artifact', 'insight', 'file-change', 'error'] }).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  rawOutput: text('raw_output'),
  tags: text('tags', { mode: 'json' }).$type<string[]>().default([]),
  importance: integer('importance').default(1), // 1–5
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const nodeLinks = sqliteTable('node_links', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  sourceNodeId: text('source_node_id').notNull().references(() => contextNodes.id, { onDelete: 'cascade' }),
  targetNodeId: text('target_node_id').notNull().references(() => contextNodes.id, { onDelete: 'cascade' }),
  relation: text('relation', {
    enum: ['related', 'depends-on', 'conflicts-with', 'extends', 'supersedes'],
  }).notNull().default('related'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Tipos inferidos — SEMPRE usar estes, nunca criar interfaces duplicadas
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type AgentSession = typeof agentSessions.$inferSelect
export type ContextNode = typeof contextNodes.$inferSelect
export type NodeLink = typeof nodeLinks.$inferSelect
```

### Regras do banco

- **Nunca editar arquivos em `lib/db/migrations/`** — são gerados por `pnpm db:generate`
- **Migrations em produção:** `pnpm db:migrate`
- **Inspecionar dados localmente:** `pnpm db:studio`
- **Alterar schema:** editar `schema.ts` → `pnpm db:generate` → revisar migration gerada → `pnpm db:migrate`
- **Nunca usar `db.run()` com SQL raw** para DDL — sempre via Drizzle schema
- **`onDelete: 'cascade'`** em todas as foreign keys filho → pai

---

## AUTENTICAÇÃO

### Configuração NextAuth v5

```typescript
// lib/auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({ ... })

// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth'
export const { GET, POST } = handlers
```

### Middleware de proteção

```typescript
// middleware.ts
import { auth } from '@/lib/auth'

export default auth((req) => {
  const protectedPrefixes = ['/dashboard', '/projects', '/workspace', '/graph']
  const isProtected = protectedPrefixes.some(p => req.nextUrl.pathname.startsWith(p))
  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### Acessar sessão

```typescript
// Server Component / Route Handler:
import { auth } from '@/lib/auth'
const session = await auth()
if (!session) return redirect('/login') // ou NextResponse 401

// Client Component:
import { useSession } from 'next-auth/react'
const { data: session } = useSession()
```

### Registro de usuário

- Endpoint: `POST /api/register`
- Validar com Zod: `name` (2–60), `email` (email), `password` (min 8), `confirmPassword`
- Hash: `bcryptjs` com salt `12`
- Verificar email duplicado antes de inserir
- Após inserir, chamar `signIn('credentials', ...)` automaticamente

---

## VARIÁVEIS DE AMBIENTE

Sempre importar de `lib/env.ts`, nunca de `process.env` diretamente.

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
  WS_SERVER_PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export const env = envSchema.parse(process.env)
```

```env
# .env.local (não commitar)
NEXTAUTH_SECRET=         # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=file:./nexus.db
# DATABASE_AUTH_TOKEN=   # só para Turso cloud
WS_SERVER_PORT=3001
```

---

## DARK/LIGHT MODE

### Regras

- **`suppressHydrationWarning`** no `<html>` — obrigatório, evita erro de hidratação do next-themes
- **`defaultTheme="dark"`** — Nexus é dark por padrão
- **`disableTransitionOnChange`** — evita FOUC na troca de tema
- **CSS variables** para todas as cores — nunca hardcodar `#000` em componentes
- **Tailwind:** usar `dark:` prefix + variáveis, não condicionais JS para cor

### Variáveis CSS

```css
/* :root = light, .dark = dark */
--landing-bg, --landing-bg-2, --landing-card
--landing-border, --landing-border-hover
--landing-text-1, --landing-text-2, --landing-text-3
--landing-grid
--node-decision, --node-artifact, --node-insight, --node-error
/* shadcn/ui vars: --background, --foreground, --card, --muted, --border, --primary */
```

### ThemeToggle

Sempre usar o componente `<ThemeToggle />` de `components/theme/ThemeToggle.tsx`.
Não reimplementar toggle de tema em nenhum outro lugar.

---

## COMPONENTES — PADRÕES

### Server Component (padrão)

```typescript
// Sem 'use client' — é Server Component por padrão
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()
  const data = await db.query.projects.findMany({ where: ... })
  return <div>...</div>
}
```

### Client Component

```typescript
'use client' // Necessário: [motivo — ex: useState, useEffect, event handlers]

import { useState } from 'react'
```

### Loading e Error

Criar `loading.tsx` e `error.tsx` em cada rota de `(app)/`:

```typescript
// loading.tsx
import { Skeleton } from '@/components/ui/skeleton'
export default function Loading() {
  return <Skeleton className="h-48 w-full" />
}

// error.tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  )
}
```

### Componentes Three.js / xterm.js

**Sempre** carregar com `dynamic` e `ssr: false`:

```typescript
import dynamic from 'next/dynamic'
const TerminalCanvas = dynamic(() => import('./_components/TerminalCanvas'), { ssr: false })
const GraphCanvas = dynamic(() => import('@/components/graph/GraphCanvas'), { ssr: false })
```

---

## API ROUTES — PADRÕES

```typescript
// app/api/[recurso]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { db } from '@/lib/db'

const bodySchema = z.object({ ... })

export async function POST(req: NextRequest) {
  // 1. Autenticação
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 2. Validação
  const body = await req.json()
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
  }

  // 3. Lógica
  try {
    const result = await db.insert(...).values(parsed.data).returning()
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('[POST /api/recurso]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### Convenções HTTP

| Operação | Método | Status sucesso |
|----------|--------|----------------|
| Listar | GET | 200 |
| Criar | POST | 201 |
| Atualizar parcial | PATCH | 200 |
| Deletar | DELETE | 200 `{ success: true }` |
| Não autenticado | — | 401 |
| Sem permissão | — | 403 |
| Não encontrado | — | 404 |
| Input inválido | — | 400 |
| Conflito (ex: email duplicado) | — | 409 |

---

## TIPOS — AGENTES

```typescript
// types/agent.ts
export type AgentId =
  | 'claude-code'
  | 'gemini-cli'
  | 'codex-cli'
  | 'antigravity'
  | 'copilot'

export interface AgentAdapter {
  id: AgentId
  label: string
  command: string         // ex: 'claude'
  args: string[]          // ex: ['--dangerously-skip-permissions']
  contextFile: string     // ex: 'CLAUDE.md'
  injectViaStdin: boolean
  color: string           // hex — usado em badges e grafo
  icon: string            // nome do ícone lucide-react
}
```

```typescript
// server/adapters/index.ts — registry completo
export const adapters: Record<AgentId, AgentAdapter> = {
  'claude-code':  { command: 'claude',  args: ['--dangerously-skip-permissions'], contextFile: 'CLAUDE.md',  color: '#f97316', ... },
  'gemini-cli':   { command: 'gemini',  args: ['--yolo'],                         contextFile: 'GEMINI.md',  color: '#3b82f6', ... },
  'codex-cli':    { command: 'codex',   args: ['--full-auto'],                    contextFile: 'AGENTS.md',  color: '#10b981', ... },
  'antigravity':  { command: 'antigravity', args: [],                             contextFile: 'CLAUDE.md',  color: '#8b5cf6', ... },
  'copilot':      { command: 'gh',      args: ['copilot', 'suggest', '-t', 'shell'], contextFile: 'AGENTS.md', injectViaStdin: true, color: '#6366f1', ... },
}
```

## TIPOS — WEBSOCKET

```typescript
// types/ws.ts — discriminated union — SEMPRE usar switch(msg.type)
export type WSMessage =
  | { type: 'spawn';  sessionId: string; agentId: AgentId; projectPath: string; cols: number; rows: number }
  | { type: 'input';  sessionId: string; data: string }
  | { type: 'resize'; sessionId: string; cols: number; rows: number }
  | { type: 'kill';   sessionId: string }
  | { type: 'data';   sessionId: string; data: string }
  | { type: 'exit';   sessionId: string; code: number }
  | { type: 'error';  sessionId: string; message: string }
```

---

## WEBSOCKET SERVER

Arquivo: `server/index.ts` — processo Node standalone, não Next.js.
Rodar com: `pnpm server` (usa `tsx watch`).
Porta: `env.WS_SERVER_PORT` (default 3001).

```typescript
// server/index.ts
import { WebSocketServer } from 'ws'
import * as pty from 'node-pty'
import { getAdapter } from './adapters'
import type { WSMessage } from '../types/ws'

const wss = new WebSocketServer({ port: Number(process.env.WS_SERVER_PORT ?? 3001) })
const processes = new Map<string, pty.IPty>()

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    const msg: WSMessage = JSON.parse(raw.toString())
    switch (msg.type) {
      case 'spawn': { /* pty.spawn + onData + onExit */ break }
      case 'input':  { processes.get(msg.sessionId)?.write(msg.data); break }
      case 'resize': { processes.get(msg.sessionId)?.resize(msg.cols, msg.rows); break }
      case 'kill':   { processes.get(msg.sessionId)?.kill(); processes.delete(msg.sessionId); break }
    }
  })
})
```

**Regras do WS server:**
- Matar processo PTY quando WebSocket desconectar
- Usar `xterm-256color` como `name` no `pty.spawn`
- Passar `TERM: 'xterm-256color'` nas env vars do processo
- Validar `msg.agentId` contra o registry antes de fazer spawn

---

## LANDING PAGE

### Seções (ordem obrigatória)

```
Navbar → Hero → LogoBar → FeaturesScroll → HowItWorks → GraphDemo → Testimonials → Footer
```

### Hero — regras Three.js

- Componente `TerminalCanvas.tsx` com `'use client'`
- Importado via `dynamic(() => import('./TerminalCanvas'), { ssr: false })` no `Hero.tsx`
- Canvas R3F: terminal 3D flutuando + rotação suave em Y via `useFrame`
- Partículas de fundo: `Points` + `LineSegments`, opacidade 0.15
- Typewriter: loop entre frases técnicas relevantes ao projeto
- Altura: 380px desktop / 240px mobile
- **Não** usar `useTheme()` dentro do canvas — passar cor como prop do Hero

### Navbar

- `sticky top-0` com `backdrop-blur-md`
- `suppressHydrationWarning` não é necessário aqui — só no `<html>`
- ThemeToggle sempre visível
- Em mobile: links colapsam em Sheet (`pnpm dlx shadcn@latest add sheet`)

### Animações com Framer Motion

```typescript
// Padrão para scroll reveal (FeaturesScroll, HowItWorks)
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

---

## SCRIPTS E COMANDOS

```bash
pnpm dev          # Next.js com Turbopack
pnpm server       # WebSocket server (tsx watch)
pnpm dev:all      # Ambos em paralelo (concurrently)
pnpm build        # Build de produção
pnpm typecheck    # tsc --noEmit — rodar antes de reportar conclusão
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm db:generate  # Gerar migration após alterar schema.ts
pnpm db:migrate   # Aplicar migrations pendentes
pnpm db:studio    # Interface visual do banco (Drizzle Studio)
pnpm db:seed      # Criar usuário admin inicial
```

---

## TSCONFIG

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./*"] }
  }
}
```

---

## QUALIDADE E TOOLING

### Prettier (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### ESLint

Usar `eslint-config-next`. Não desabilitar regras sem justificativa documentada.

### Husky + lint-staged

```json
// package.json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

### Acessibilidade

- Todos os botões interativos: `aria-label` descritivo
- Imagens: `alt` text sempre
- Componentes shadcn/ui já são acessíveis — não sobrescrever `role` ou `aria-*` sem necessidade
- Terminal xterm: `aria-label="Terminal — [nome do agente]"`
- Grafo: `aria-label="Knowledge graph"` no container

---

## ERROS COMUNS — EVITAR

| Erro | Causa | Solução |
|------|-------|---------|
| Hydration mismatch no tema | `<html>` sem `suppressHydrationWarning` | Adicionar ao `<html>` no root layout |
| Three.js SSR error | Importar sem `dynamic ssr:false` | Sempre usar `dynamic()` para canvas |
| xterm.js SSR error | Mesmo problema | `dynamic()` com `ssr: false` |
| `Cannot find module 'node-pty'` no Next.js | node-pty é para o server/, não app/ | Nunca importar node-pty em app/ |
| Tipo `any` no Drizzle | Usar `db.query` sem schema | Passar `{ schema }` no `drizzle()` |
| FOUC no dark mode | ThemeProvider não envolvendo app | Verificar root layout |
| Foreign key constraint | SQLite desabilita FK por padrão | Já habilitado pelo libSQL/Turso |
| Env var undefined em runtime | Importar process.env direto | Sempre importar de `lib/env.ts` |
| `pnpm dlx` vs `npx` | Usar errado | Sempre `pnpm dlx` para executáveis |

---

## ROADMAP DE FASES

| Fase | Status | Foco | Entregável |
|------|--------|------|-----------|
| **0** | 🔄 Atual | Landing + Auth | Landing dark/light, login/registro, middleware |
| **1** | ⏳ | Terminal vivo | node-pty + WebSocket + xterm.js |
| **2** | ⏳ | Multi-terminal + Projetos | N terminais, Turso persistindo sessões |
| **3** | ⏳ | Grafo de contexto | Extração via Claude API, Graph View |
| **4** | ⏳ | Injeção de contexto | Nós → CLAUDE.md / GEMINI.md |
| **5** | ⏳ | Multi-usuário | Workspaces compartilhados, convites |

**Não implementar funcionalidades de fases futuras** sem instrução explícita.
Criar stubs/placeholders com `// TODO(fase-N): descrição` quando necessário.

---

## CHECKLIST ANTES DE REPORTAR CONCLUSÃO

- [ ] `pnpm typecheck` passa sem erros
- [ ] `pnpm build` conclui sem erros ou warnings críticos
- [ ] `pnpm lint` sem erros (warnings aceitáveis se documentados)
- [ ] Sem `console.log` de debug no código
- [ ] Sem `any` explícito ou implícito novo
- [ ] Sem `// @ts-ignore` sem comentário explicativo
- [ ] Dark mode testado visualmente (tanto light quanto dark)
- [ ] `suppressHydrationWarning` presente no `<html>` do root layout
- [ ] `.env.example` atualizado se novas vars foram adicionadas
- [ ] Migrations geradas e aplicadas se schema mudou

---

*CLAUDE.md — Nexus v1.0 | Fase 0 | Atualizar ao avançar de fase*