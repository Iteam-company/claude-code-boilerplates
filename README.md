# Claude Code Boilerplate

**The Next.js starter built for Claude Code — ship full-stack SaaS products by just writing in chat.**

Most boilerplates give you code. This one gives you a complete AI-assisted development workflow. Every architectural decision, every file convention, every pattern is documented so Claude understands your codebase from day one and generates code that works without manual fixes.

---

## Why this boilerplate exists

Building with Claude Code breaks down when the AI doesn't understand your project structure. It generates code that conflicts with your conventions, puts logic in the wrong layer, or skips validation. You spend more time correcting Claude than writing code.

This boilerplate solves that. It ships with 13 Claude Code skills — reusable instruction sets that teach Claude exactly how to add features to *this* project. You describe what you want in plain language. Claude generates the full stack: database schema, migrations, API route, service, validation, SWR hook, and UI component — all following the same patterns, all wiring together correctly.

---

## What's included

### Application foundation

- **Next.js 16** with App Router — server components by default, client boundary only where needed
- **React 19 + TypeScript** — strict types, no `any`, full type inference from the database layer up
- **Tailwind CSS v4 + Shadcn UI** — 20+ components ready to use, theming via CSS variables, dark/light mode
- **Neon DB** — serverless PostgreSQL, free tier available, scales automatically
- **Drizzle ORM** — type-safe queries, auto-generated migrations, visual Studio UI
- **JWT authentication** — register, login, protected routes, Bearer token pattern
- **SWR** — client-side data fetching with automatic cache invalidation
- **React Hook Form + Zod** — validated forms with type inference from schemas
- **Sonner** — toast notifications
- **Recharts** — charts and analytics dashboards
- **Cloudinary** — file and image uploads via server-side API route

### Architecture

The codebase follows a strict layered pattern. Every feature lives in `modules/` as a self-contained unit:

```
modules/
└── post/
    ├── post.schema.ts       ← Drizzle table definition
    ├── post.relations.ts    ← foreign key relationships
    ├── post.types.ts        ← TypeScript interfaces (inferred from DB)
    ├── post.validation.ts   ← Zod schemas for API input
    ├── post.repo.ts         ← database queries only, no business logic
    ├── post.service.ts      ← business logic, throws HttpError
    └── index.ts             ← public exports
```

API routes are thin: validate input → call service → return response. Business logic never leaks into routes. Database queries never appear in components.

This separation exists for Claude, not just for cleanliness. When every feature follows the same 7-file pattern, Claude can generate a complete new module in one pass without guessing where things go.

### Claude Code skills

Skills are pre-written instruction sets that Claude loads when you ask for a specific task. Instead of describing your conventions every time, the skill file does it for you.

| Skill | What it does |
|---|---|
| `drizzle-module` | Scaffolds a complete module: schema, relations, types, validation, repo, service, index |
| `nextjs-api-route` | Generates a thin App Router API route with validation and error handling |
| `drizzle-migrate` | Generates SQL migration from schema changes and applies it |
| `drizzle-relations` | Defines Drizzle relations correctly for `db.query.*` with `with` |
| `swr-hooks` | Generates `useSWR` and `useSWRMutation` hooks following the fetcher pattern |
| `auth-patterns` | Adds protected routes using `getUserFromRequest()` from `lib/auth.ts` |
| `ui-patterns` | Builds UI components with Shadcn primitives and Tailwind conventions |
| `dto-patterns` | Creates types in `*.types.ts` and Zod schemas in `*.validation.ts` |
| `api-patterns` | Enforces REST structure, error handling, and response shape |
| `db-patterns` | Writes queries, repositories, and migrations following Drizzle conventions |
| `cloudinary-upload` | Integrates image uploads: lib setup, API route, hook, and UI component |
| `nextjs-mdx-blog` | Adds MDX blog: posts stored as strings in DB, rendered with next-mdx-remote |
| `vercel-deploy` | Sets up Vercel: CLI link, GitHub integration, env vars, production deploys |

### Claude Code agents

Three specialized agents available via `claude --agent`:

- **`db-agent`** — database schema design, query optimization, migration planning
- **`review-agent`** — code review against project conventions
- **`security-agent`** — security audit of routes, auth, and data handling

### MCP servers

Direct tool access from Claude Code to your infrastructure — no copy-pasting IDs or switching tabs:

| Server | Capabilities |
|---|---|
| **Neon** | Create databases, manage branches, run queries, inspect schemas |
| **Vercel** | Deploy, manage env vars, check deployment status, configure domains |
| **Cloudinary** | Upload media, apply transformations, manage assets |

---

## How development works

You describe a feature in plain language. Claude uses the relevant skills, generates the full implementation, and runs any needed database migrations.

**Example: adding a posts feature**

```
You:    Add a post module with title, content, author.
        Authors can publish and unpublish posts.

Claude: [runs /drizzle-module]
        → creates post.schema.ts with the table definition
        → creates post.relations.ts linking to userTable
        → creates post.types.ts with Post and SafePost interfaces
        → creates post.validation.ts with createPostSchema
        → creates post.repo.ts with findById, findAll, create, update
        → creates post.service.ts with create, publish, unpublish
        → creates index.ts with public exports
        → runs db:generate and db:migrate
        → creates POST /api/posts route
        → creates usePosts() and useCreatePost() hooks
        → creates PostForm component with React Hook Form + Zod
```

One message. Full stack. No follow-up corrections needed.

---

## Competitive advantages

**vs. ShipFast / SaaSBold**
These sell code. You still write features manually. No Claude Code integration, no skills, no agents. Claude will generate inconsistent code because it has no project-specific instructions.

**vs. Supastarter ($349+)**
Supastarter added AGENTS.md recently as a marketing feature. This boilerplate was designed from the ground up around Claude Code — the skills, the module structure, the CLAUDE.md documentation all exist specifically to make AI generation reliable. Also: no $349 price tag.

**vs. AnotherWrapper ($249+)**
AnotherWrapper focuses on shipping AI-powered apps (chat, image generation). This focuses on shipping any SaaS product *using* AI as a development tool. Different problem, different tool.

**vs. generic Claude Code boilerplates on GitHub**
Most are CLAUDE.md templates or coding standards documents. This is a complete production application with working auth, database, UI, and deployment pipeline — not just instructions.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| UI | React 19, Tailwind CSS v4, Shadcn UI |
| Forms | React Hook Form + Zod |
| Data fetching | SWR 2 |
| Database | Neon (serverless PostgreSQL) |
| ORM | Drizzle ORM + Drizzle Kit |
| Auth | JWT + bcryptjs |
| Media | Cloudinary |
| Notifications | Sonner |
| Charts | Recharts |
| Themes | next-themes (dark/light) |
| Deployment | Vercel |
| AI tooling | Claude Code (skills + agents + MCP) |

---

## Who this is for

**Indie hackers and solo founders** who want to move fast without hiring a team. Describe your product in Claude, get working code back.

**Developers learning full-stack** who want to see clean architecture in practice — layered modules, type-safe queries, validated APIs — with an AI that explains and extends it.

**Agencies building client products** who need consistent code quality across projects without writing conventions from scratch each time.

**Anyone building a SaaS, admin tool, internal dashboard, content platform, or marketplace** on the Next.js + PostgreSQL stack.

---

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/your-username/claude-code-boilerplate my-project
cd my-project
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

```env
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://...   # from console.neon.tech
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 3. Set up MCP tokens (for Claude Code)

```env
NEON_API_KEY=...      # console.neon.tech → Account → API Keys
VERCEL_TOKEN=...      # vercel.com → Settings → Tokens
```

### 4. Run migrations and start

```bash
pnpm db:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Start building with Claude

```bash
claude
```

Describe your first feature. Claude knows your stack.

---

## Database commands

```bash
pnpm db:generate   # generate SQL migration from schema changes
pnpm db:migrate    # apply pending migrations
pnpm db:push       # sync schema directly (dev only, no migration file)
pnpm db:studio     # open Drizzle Studio to inspect data visually
```

---

## Project structure

```
app/                    ← Next.js App Router pages and API routes
components/
├── ui/                 ← Shadcn components (never modify directly)
└── layout/             ← header, footer, sidebar
db/
├── drizzle.ts          ← DB client, schema and relations registered here
└── schema.ts           ← re-exports all table schemas
modules/                ← feature modules (one folder per entity)
lib/
├── auth.ts             ← getUserFromRequest(), JWT helpers
├── fetcher.ts          ← client-side fetch utilities
├── routes.ts           ← route path constants
├── utils.ts            ← cn() and shared utilities
└── errors/             ← HttpError class + handleError()
hooks/api/              ← SWR hooks
.claude/
├── skills/             ← 13 Claude Code skills
└── agents/             ← 3 specialized agents
```

---

## License

MIT
