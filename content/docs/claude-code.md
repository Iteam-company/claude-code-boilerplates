---
title: Claude Code Skills
description: The 22 built-in skills and how to use them in your dev sessions.
order: 4
---

# Claude Code Skills

Skills are markdown files in `.claude/skills/` that Claude Code reads and executes as multi-step instruction sets. Running `/feature-module task` tells Claude to read the `feature-module` skill and scaffold all 7 module files following your project conventions.

## How to use a skill

Inside Claude Code, type `/skill-name` followed by optional arguments:

```
/feature-module categories
/nextjs-api-route POST /api/posts/:id/publish
/swr-hooks post
```

## Available skills

| Skill                 | What it does                                                                            |
| --------------------- | --------------------------------------------------------------------------------------- |
| `feature-module`      | Scaffold all 7 module files: schema, relations, types, validation, repo, service, index |
| `nextjs-api-route`    | Add a thin API route wired to the service layer                                         |
| `drizzle-relations`   | Add Drizzle `relations()` block and register in `db/drizzle.ts`                         |
| `drizzle-migrate`     | Generate and apply a migration after schema changes                                     |
| `swr-hooks`           | Generate `useSWR` read hooks and `useSWRMutation` write hooks for a module              |
| `claude-feature`      | Add a streaming AI chat endpoint + `useAiChat` hook                                     |
| `stripe-setup`        | Wire up Stripe checkout, webhooks, and subscription sync                                |
| `email-setup`         | Add Resend + react-email transactional email for a flow                                 |
| `cloudinary-upload`   | Add file upload route + client hook via Cloudinary                                      |
| `vercel-deploy`       | Guided Vercel deploy walkthrough with env vars                                          |
| `multi-tenancy`       | Add org, orgMember, and invitation modules with role-based access                       |
| `nextjs-mdx-blog`     | Add MDX blog (file-based or DB-based) with Tailwind typography                          |
| `auth-patterns`       | JWT auth patterns: registration, login, protected routes                                |
| `api-patterns`        | API route conventions: validation, error handling, response shape                       |
| `db-patterns`         | Drizzle ORM patterns: queries, relations, migrations                                    |
| `ui-patterns`         | Component conventions: server vs client, shadcn usage, theming                          |
| `component-splitting` | Extract oversized components into co-located subfolders                                 |
| `dto-patterns`        | DTO conventions: Omit, never return passwordHash, layer boundaries                      |
| `landing-page`        | Scaffold a marketing landing page with sections and CTAs                                |
| `pwa`                 | Add PWA manifest and service worker                                                     |
| `i18n`                | Add next-intl with locale routing and translation files                                 |
| `init-project`        | First-run setup: env vars, DB, and Vercel link                                          |

## Typical dev session

```bash
# 1. Start the dev server
npm run dev

# 2. Open Claude Code in the same directory
claude
```

Add a new `task` feature:

```
/feature-module task
```

Claude scaffolds 7 files in `modules/task/` -- schema, relations, types, validation, repo, service, index -- and registers the table in `db/drizzle.ts`.

```
/nextjs-api-route GET /api/tasks
/nextjs-api-route POST /api/tasks
```

Claude adds thin route handlers following the validate -> service -> respond pattern.

```bash
npm run db:generate && npm run db:migrate
```

```
/swr-hooks task
```

Claude generates `hooks/api/useTask.ts` with `useTasks()`, `useCreateTask()`, `useUpdateTask()`, `useDeleteTask()` -- all calling `mutate()` on success.

Then describe the UI in plain English and Claude builds it using your existing shadcn components and layout conventions.

## Safety hooks

The `.claude/hooks/pre-tool-use.sh` script runs before every tool call and blocks dangerous commands:

- `DROP TABLE` and other destructive SQL
- `rm -rf` and similar destructive shell commands
- Force push to main/master

You can inspect and modify the hook at `.claude/hooks/pre-tool-use.sh`.

## CLAUDE.md

`CLAUDE.md` at the project root documents all conventions Claude follows automatically -- folder structure, naming rules, architecture patterns, anti-patterns to avoid, and the full tech stack. Claude loads it at session start; you never need to repeat your conventions.
