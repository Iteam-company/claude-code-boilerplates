---
title: Pro Tips
description: Small habits that make Claude Code sessions faster -- compress context, audit the product, and clean up code quality with one command each.
order: 2
section: Getting Started
---

# Pro Tips

Small habits that make long Claude Code sessions significantly smoother.

---

## Compress context when conversations get long

After many messages, Claude's context window fills up and responses slow down. Run this to compress the conversation history without losing progress:

```
/compact
```

Claude summarises what happened and continues from where you left off. Do this after finishing a feature, or whenever you notice responses becoming slower or less accurate.

---

## Start fresh for a new task

When you finish one feature and move to something unrelated, clear the conversation entirely:

```
/clear
```

`CLAUDE.md` is still loaded -- your conventions carry over. The conversation history does not. This gives Claude a clean slate and keeps responses sharp.

---

## Audit the product before launch

Run a full review of your landing page copy, auth flow, API routes, pricing consistency, and UX gaps:

```
/product-review
```

Claude acts as two reviewers at once -- a sceptical potential customer and a growth-focused CEO. It produces a prioritised list of issues: Critical, High, Medium, and Low. At the end it offers to fix everything in one shot.

Good to run after the MVP is built, before you show it to anyone, and again before launch.

---

## Clean up code quality across the project

After building several features, the codebase accumulates debt: files grow too long, state ends up in the wrong component, logic that belongs in hooks stays inline. Run this to get a full audit and fix everything at once:

```
/refactor-project
```

It scans every component for size and complexity issues, finds `useEffect` blocks to extract into hooks, catches inline types that belong in `types/`, and flags unnecessary `"use client"` directives. It reports a prioritised list first, then applies all the changes and confirms the TypeScript build still passes.

Good to run every few weeks, or after a heavy sprint.
