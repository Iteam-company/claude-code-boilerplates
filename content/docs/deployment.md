---
title: Deployment
description: Deploy to Vercel, manage environment variables, and configure CI/CD.
order: 6
---

# Deployment

The project deploys to Vercel. Pushing to `main` triggers a production deployment automatically. Any other branch gets a preview deployment.

## Initial setup

```bash
vercel link
```

Then add each environment variable:

```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add ANTHROPIC_API_KEY
vercel env add RESEND_API_KEY
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME
vercel env add NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION
vercel env add NEXT_PUBLIC_BASE_URL
```

See the `/vercel-deploy` skill for a guided walkthrough inside Claude Code.

## Deploy flow

| Action                   | Result                   |
| ------------------------ | ------------------------ |
| Push to `main`           | Production deployment    |
| Push to any other branch | Preview deployment       |
| `vercel --prod`          | Manual production deploy |

## MCP servers

Configured in `.mcp.json`. The Vercel MCP server lets Claude Code interact with your deployments, logs, and projects directly. Add the token to `.env`:

| Server     | Variable                                                               |
| ---------- | ---------------------------------------------------------------------- |
| Neon       | `NEON_API_KEY`                                                         |
| Vercel     | `VERCEL_TOKEN`                                                         |
| Cloudinary | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| Resend     | `RESEND_API_KEY`                                                       |

## Stripe webhooks

After deploying, register your production URL with Stripe:

```bash
stripe listen --forward-to https://yourapp.vercel.app/api/webhooks/stripe
```

Or add `https://yourapp.vercel.app/api/webhooks/stripe` in the Stripe dashboard under Webhooks. Set `STRIPE_WEBHOOK_SECRET` to the signing secret Stripe provides.

## Database migrations on deploy

Run migrations against your production database before or after each deploy:

```bash
DATABASE_URL=<production-url> npm run db:migrate
```

Or add a `postbuild` script to `package.json` to run migrations automatically on every Vercel build.
