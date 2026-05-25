---
title: Claude Code
description: How Claude Code reads your codebase, follows your conventions, and builds full-stack features from plain English -- skills, agents, and hooks included.
order: 5
section: For Developers
---

# How Claude Code Works with This Boilerplate

Claude Code is a CLI that runs inside your project directory. It reads your codebase, follows your conventions, and builds features when you describe them in plain English.

## CLAUDE.md

`CLAUDE.md` at the project root is what makes Claude Code project-aware. It documents:

- Folder structure and where things belong
- Naming conventions for DB tables, exports, and files
- Architecture rules (thin routes, service layer, repository pattern)
- Anti-patterns to avoid
- The full tech stack and available libraries

Claude loads it at the start of every session. You never need to re-explain your conventions -- they are always in context.

After `/init-project` runs, `CLAUDE.md` is rewritten with your specific project name, modules, and any constraints you defined during setup.

## How to use it

Open Claude Code in your project directory:

```bash
claude
```

Then describe what you want to build:

```
Add a comments feature to posts
Build a dashboard page showing recent signups
Add email notifications when a user is invited to an org
```

Claude reads the codebase, follows the established patterns, and builds the feature -- database schema, API route, data hooks, and UI.

## Typical dev session

Start the dev server in one terminal, open Claude Code in another:

```bash
npm run dev
# in a separate terminal:
claude
```

Describe a feature. Claude scaffolds the module files, adds the route, generates data hooks, and writes the UI using your existing shadcn components and layout. Run migrations when the schema changes:

```bash
npm run db:generate && npm run db:migrate
```

Then describe the next feature.

## Safety hooks

A pre-tool-use hook runs before every tool call Claude makes and blocks dangerous commands:

- `DROP TABLE` and other destructive SQL
- `rm -rf` and similar destructive shell commands
- Force push to `main`/`master`

You can inspect and modify the hook at `.claude/hooks/pre-tool-use.sh`.
