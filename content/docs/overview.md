---
title: Overview
description: What this boilerplate includes and how it works.
order: 0
section: Getting Started
---

# Overview

This boilerplate is a complete starting point for a SaaS product. You get a working app on day one -- pre-built pages, a database, and a full set of Claude Code instructions so you can describe features in plain English and have them built for you.

## What you get

**Pre-built pages**

- Landing page with pricing and email capture
- Login and Register pages
- Dashboard shell (ready for your features)

**Everything wired up**

- User accounts with secure login (no third-party auth service needed)
- Postgres database hosted on Neon -- no setup, just paste a connection string
- Dark and light mode
- Deployed to Vercel with one command

**Integrations ready to activate**

You only set up what you need. Each service is optional:

| Integration | What it does                                        |
| ----------- | --------------------------------------------------- |
| Stripe      | Payments -- one-time or subscriptions               |
| Resend      | Transactional email (welcome, reset password, etc.) |
| Cloudinary  | File and image uploads                              |
| Claude AI   | Add AI features to your app                         |

## How it works

You describe what you want to build. Claude Code builds it.

> "Add a comments feature to posts"

Claude scaffolds the database table, the API route, the data hooks, and a working UI -- all following the conventions already set up in your project.

No boilerplate hunting. No wiring things together manually. You focus on your product.

## Tech stack

Built on the same tools used by the companies whose products you use every day:

- **Next.js 16** -- the React framework (App Router)
- **Neon** -- serverless Postgres database
- **Drizzle ORM** -- type-safe database queries
- **Tailwind CSS** -- styling
- **Vercel** -- hosting and deployments

You own 100% of the code. MIT license.
