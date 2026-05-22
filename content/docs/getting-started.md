---
title: Getting Started
description: Get access, create your repo from the template, and run /init-project.
order: 1
---

# Getting Started

After purchase you'll receive an email with a GitHub repository invite. From there, setup takes about 5 minutes -- one command does everything.

## 1. Accept the repository invite

Check your inbox for an invite from GitHub. Accept it to get access to the private boilerplate repository.

## 2. Create your repo from the template

On the repository page, click **Use this template** → **Create a new repository**.

Give it a name, set visibility to private, and click **Create repository**.

> This creates your own copy of the boilerplate. You own it -- all code is yours.

## 3. Clone your new repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## 4. Open Claude Code

```bash
claude
```

Claude loads `CLAUDE.md` automatically and knows the full stack conventions.

## 5. Run /init-project

```
/init-project
```

This single command handles everything:

- Installs npm dependencies
- Asks 5 questions about your project
- Walks you through `.env` setup for each service you need
- Generates a secure `JWT_SECRET` automatically
- Runs database migrations
- Writes a project-specific `CLAUDE.md` tailored to what you're building

Follow the prompts -- the whole process takes about 5 minutes.

## 6. Start building

Once `/init-project` finishes:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start describing features to Claude.

---

## What /init-project sets up

| What              | How                                                                   |
| ----------------- | --------------------------------------------------------------------- |
| Dependencies      | `npm install`                                                         |
| `JWT_SECRET`      | Generated automatically with `crypto.randomBytes`                     |
| `DATABASE_URL`    | You paste your Neon (or any Postgres) connection string               |
| Optional services | Stripe, Resend, Cloudinary, Anthropic -- configure only what you need |
| Database          | `npm run db:migrate` creates all tables                               |
| `CLAUDE.md`       | Rewritten with your project name, modules, and constraints            |

You can always add more services later by editing `.env` and running `/init-project` again, or by editing the file manually.

---

## Useful commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check

npm run db:generate  # Generate migration from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:push      # Sync schema directly (dev only)
npm run db:studio    # Open Drizzle Studio
```

When you're ready to deploy, run `/vercel-deploy` inside Claude Code for a guided walkthrough.
