---
name: product-review
description: Review the entire project from the perspective of a potential customer and a growth-focused CEO. Scans landing copy, product UX, API routes, DB schema, auth flow, pricing, email, and configuration — reporting specific conversion blockers, trust issues, UX problems, security gaps, and missing elements. Each finding has a severity label and a concrete fix. Use whenever the user asks for a customer review, growth review, conversion audit, or "what can be improved."
---

# Product Review Skill

You are reviewing this project through two lenses:

1. **Potential customer** — someone who just discovered this product. Sceptical, busy, comparison-shopping. If something is confusing, broken, or raises a red flag, you leave.
2. **Growth-focused CEO** — someone who has shipped SaaS products. Looking at the full funnel: first impression → value prop → trust → onboarding → core product → retention.

Every finding must reference a specific file, key, or line. No generic advice.

---

## Step 1 — Discover what exists

The project uses Next.js App Router, Drizzle ORM, Tailwind CSS, next-intl (messages/en.json), and Shadcn UI. Run these to find what has been built:

```bash
# Landing & marketing pages
find ./components/landing -type f | sort
find "./app/(layout)" -type f | sort

# Product / app pages
find "./app/(main)" -type f | sort

# API surface
find ./app/api -type f -name "route.ts" | sort

# Feature modules
find ./modules -type f | sort

# Email templates
find ./emails -type f | sort 2>/dev/null

# DB schema
find ./modules -name "*.schema.ts" | sort
find ./db -type f | sort

# Auth & middleware
ls lib/auth.ts middleware.ts 2>/dev/null

# Env template
cat .env.example 2>/dev/null || cat .env.local.example 2>/dev/null

# Package scripts and deps
cat package.json
```

Then read the files that matter for each dimension. Read in parallel where possible.

---

## Step 2 — Analyse across 7 dimensions

### A. First impression & landing (0–5 seconds)

Read: `messages/en.json` (landing.\* keys), `components/landing/Hero.tsx`, `components/landing/Features.tsx`, `components/landing/Pricing.tsx`, `components/landing/FAQ.tsx`, `components/landing/HowItWorks.tsx`, any SocialProof or Comparison components.

- Does the headline say what this product is in one sentence?
- Is the value prop specific (numbers, outcomes) or vague ("powerful", "modern", "seamless")?
- Are there contradictions between sections — refund periods, feature limits, pricing?
- Does social proof look real and believable?
- Does the FAQ answer actual buyer objections or just marketing questions?

### B. Trust & credibility

Read: FAQ copy in `messages/en.json`, footer, any testimonials, `lib/constants.ts` for repo/pricing URLs.

- Are claims verifiable or do they require blind trust?
- Does any copy imply endorsement that isn't accurate?
- Is pricing fully transparent — no hidden upsells?
- Are all prices, refund terms, and feature limits consistent across every section they appear?

### C. Onboarding & auth flow

Read: login/register pages under `app/(layout)/`, `lib/auth.ts`, email templates in `emails/`, any redirect logic post-auth or post-purchase.

- How many steps from landing to the first value moment inside the product?
- Are error messages on auth forms helpful or cryptic?
- Is email verification blocking access unnecessarily?
- Does the post-purchase or post-register redirect make sense?
- Are welcome/verification emails set up and the copy clear?

### D. Core product UX

Read: pages under `app/(main)/`, key feature components, dashboard if it exists.

- Are loading and error states handled in key components?
- Are empty states handled (first visit, no data yet)?
- Is there any dead-end navigation — pages with no clear next action?
- Are forms using consistent Zod validation with clear inline errors?

### E. API & backend quality

Read: all `app/api/**/route.ts` files, `lib/errors/`, service files in `modules/`.

- Are any routes missing auth (`getUserFromRequest`) where they should have it?
- Are there routes doing business logic directly instead of calling a service?
- Is error handling consistent — all routes using `handleError()`?
- Do module schemas have `createdAt`/`updatedAt` timestamps?
- Are there any obvious missing indexes on frequently queried columns?

### F. Payments & monetisation

Read: `app/(layout)/checkout/`, any Stripe webhook handler in `app/api/`, pricing constants, `messages/en.json` pricing.\* keys.

- Is free vs paid differentiation clear at every decision point?
- Is the Stripe webhook handler idempotent?
- Is there a clear upgrade path from free to paid inside the product?
- Is the refund policy stated consistently everywhere it appears?

### G. Configuration & ops hygiene

Read: `.env.example`, `next.config.ts`, `middleware.ts` (if exists), `package.json`.

- Are all required env vars in `.env.example` with a comment explaining where to get them?
- Are there hardcoded URLs, magic strings, or secrets that should be in `lib/constants.ts`?
- Does `next.config.ts` have dangerous flags like `ignoreBuildErrors: true`?
- Are there leftover `console.log` debug calls in production code paths?

---

## Step 3 — Output format

```
# Product Review

## Critical (fix before launch)

### [Short title] — [file path or en.json key]
**Issue:** [One sentence — exactly what is wrong and where]
**Impact:** [One sentence — what does the customer experience?]
**Fix:** [Specific: exact copy, file, key, or code snippet]

---

## High (fix this week)

[same format]

---

## Medium (next sprint)

[same format]

---

## Low (polish)

[same format]

---

## What's working well

[3–5 bullets — genuine strengths to preserve]
```

Rules:

- Severity = impact on conversion, trust, or retention
- "Fix:" must be specific — never "consider improving"
- Every finding references an exact file, key, or line
- Skip any dimension that is clean — do not manufacture findings
- "What's working well" is mandatory

---

## Step 4 — After the report

Ask:

> "Found X critical and Y high-priority issues. Want me to fix all of them now?"

If yes: implement all Critical + High fixes. Edit `messages/en.json`, components, API routes, or config as needed. Run `npx tsc --noEmit` after. Report each change.
