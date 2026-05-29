---
title: Getting Started
description: Install Claude Code, clone your repo from the template, configure environment variables, and run /init-project to have a working app in under 5 minutes.
order: 1
section: Getting Started
---

# Getting Started -- Set Up Your Boilerplate in 5 Minutes

After purchase you'll receive an email with a GitHub repository invite. From there, setup takes about 5 minutes -- one command does everything.

## 1. Accept the repository invite

Check your inbox for an invite from GitHub. Accept it to get access to the private boilerplate repository.

## 2. Create your repo from the template

On the repository page, click **Use this template** -> **Create a new repository**.

Give it a name, set visibility to private, and click **Create repository**.

> This creates your own copy of the boilerplate. You own it -- all code is yours.

## 3. Clone your new repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## 4. Install Claude Code

Check if it's already installed:

```bash
claude --version
```

If the command is not found, install it globally:

```bash
npm install -g @anthropic-ai/claude-code
```

> You need Node.js 18 or higher. Run `node --version` to check.

**First-time sign-in**

After installing, run `claude` once to authenticate:

```bash
claude
```

It will open a browser window and ask you to log in with your Anthropic account. If you don't have one, create a free account at [claude.ai](https://claude.ai). After signing in, return to the terminal -- authentication is saved and you won't be prompted again.

**Already installed but outdated?**

```bash
npm update -g @anthropic-ai/claude-code
```

## 5. Open Claude Code

```bash
claude
```

Claude loads `CLAUDE.md` automatically and knows the full stack conventions.

## 6. Run /init-project

```
/init-project
```

This single command handles everything. It will ask you 5 questions:

1. **Name** -- what is your project called?
2. **Description** -- what does it do? (1-3 sentences)
3. **Business model** -- how does it make money? (SaaS, one-time, marketplace, etc.)
4. **Modules** -- what are the main features you're building? (e.g. tasks, orders, comments)
5. **Constraints** -- anything Claude must not do, or rules to keep in mind?

Then it automatically:

- Installs npm dependencies
- Walks you through `.env` setup for each service you need
- Generates a secure `JWT_SECRET`
- Runs database migrations
- Writes a project-specific `CLAUDE.md` tailored to what you're building

Follow the prompts -- the whole process takes about 5 minutes.

## 7. Start building

Once `/init-project` finishes:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see the landing page. From there, `/login` and `/register` are ready to use, and `/dashboard` is your starting point for building features.

Describe what you want to Claude and it will build it.

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

When you're ready to deploy, see the [Deployment](./deployment) doc.
