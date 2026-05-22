---
title: Deployment
description: Deploy your app to Vercel using Claude Code.
order: 5
---

# Deployment

The boilerplate deploys to Vercel. You don't need to know any CLI commands -- just ask Claude Code and it handles everything.

## Deploy for the first time

Open Claude Code and say:

> "Deploy my app to Vercel"

Claude will use the `/vercel-deploy` skill to:

1. Link your project to Vercel
2. Ask you for each environment variable and add it securely
3. Push your code and trigger the first deployment

That's it. You'll get a live URL when it's done.

## After that -- automatic deployments

Once connected, deployments are fully automatic:

| What you do              | What happens                    |
| ------------------------ | ------------------------------- |
| Push to `main`           | Production deployment           |
| Push to any other branch | Preview deployment (unique URL) |

No manual steps needed. Every push deploys.

## Adding or updating environment variables

Ask Claude Code:

> "Add my Stripe keys to Vercel"

or

> "Update the ANTHROPIC_API_KEY on Vercel"

Claude will add or update the variable without you needing to touch the Vercel dashboard.

## Running database migrations on production

Ask Claude Code:

> "Run migrations on my production database"

Claude will connect to your production `DATABASE_URL` and apply any pending migrations.

## Checking your deployment status

Ask Claude Code:

> "What's the status of my latest deployment?"

The Vercel MCP server (configured in `.mcp.json`) gives Claude direct access to your deployment logs, status, and project settings.
