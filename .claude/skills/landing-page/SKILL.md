---
name: landing-page
description: Generate and customize marketing landing page sections for a Next.js project. Covers Hero, Features, Pricing teaser, FAQ (custom accordion), and CTA components in components/landing/, i18n integration, section background alternation, and connecting Pricing to Stripe checkout. Use this skill whenever the user asks to build or modify a landing page, add a new section, change copy, or connect the landing Pricing to Stripe.
---

# Landing Page Skill

The boilerplate ships with a complete marketing landing page at `app/(layout)/page.tsx` composed of 5 sections. All components live in `components/landing/`.

## Section anatomy

| #   | Component  | File                              | Background      | Client?        |
| --- | ---------- | --------------------------------- | --------------- | -------------- |
| 1   | `Hero`     | `components/landing/Hero.tsx`     | `bg-background` | No             |
| 2   | `Features` | `components/landing/Features.tsx` | `bg-muted`      | No             |
| 3   | `Pricing`  | `components/landing/Pricing.tsx`  | `bg-background` | No             |
| 4   | `FAQ`      | `components/landing/FAQ.tsx`      | `bg-muted`      | Yes (useState) |
| 5   | `CTA`      | `components/landing/CTA.tsx`      | `bg-primary`    | No             |

`page.tsx` only composes — no inline JSX:

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
```

## Background alternation pattern

Use CSS variable backgrounds — never hardcode colors:

- `bg-background` → default page background (white / dark)
- `bg-muted` → offset band (near-white / dark gray) — creates visual separation
- `bg-primary` → bold inversion for CTA — always high-contrast because `text-primary-foreground` is guaranteed to contrast with `bg-primary`

Hero and Pricing share `bg-background`; Features and FAQ share `bg-muted`; CTA uses `bg-primary`. This alternation works in both light and dark mode without any conditional logic.

## Adding a new section

1. Add translation keys to `messages/en.json` under `landing.<sectionName>`
2. Create `components/landing/NewSection.tsx` as a server component (add `"use client"` only if state is needed)
3. Use `Container` for max-width + padding, CSS variables for all colors
4. Export from `components/landing/index.ts`
5. Import and add to `app/(layout)/page.tsx` at the desired position
6. Assign the next background in the alternating sequence

```tsx
// components/landing/NewSection.tsx
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';

export async function NewSection() {
  const t = await getTranslations('landing.newSection');

  return (
    <section className="bg-muted py-20">
      <Container>
        <h2 className="text-foreground">{t('heading')}</h2>
      </Container>
    </section>
  );
}
```

## Removing a section

1. Remove the import from `app/(layout)/page.tsx`
2. Remove the export from `components/landing/index.ts`
3. Delete the component file
4. Remove its translation keys from `messages/en.json`
5. Recheck the background alternation pattern — reassign if needed

## Swapping copy

All visible strings live in `messages/en.json` under the `landing.*` namespace. Edit the JSON — nothing else needs to change. Sections and their keys:

| Section  | Keys                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Hero     | `landing.hero.headline`, `landing.hero.subheadline`, `landing.hero.ctaPrimary`, `landing.hero.ctaSecondary` |
| Features | `landing.features.heading`, `landing.features.subheading`, `landing.features.items.<key>.title/description` |
| Pricing  | `landing.pricing.heading`, `landing.pricing.subheading`, `landing.pricing.cta`                              |
| FAQ      | `landing.faq.heading`, `landing.faq.items.q1–q5.question/answer`                                            |
| CTA      | `landing.cta.heading`, `landing.cta.subheading`, `landing.cta.button`                                       |

The Pricing section also reads from the **existing** `pricing.proLicense.*` and `pricing.proPlan.*` keys — plan names, prices, and features are defined once and shared between the landing page and the checkout page.

## Connecting Pricing to Stripe

The landing `Pricing` component is a **read-only teaser** — it displays plan info and routes to `/checkout` for the actual purchase. Never add `CheckoutButton` or `useCheckout` to the landing Pricing.

**Why:** `CheckoutButton` uses `useSWRMutation` (client-side), requires an authenticated user, and triggers a Stripe Checkout session. Mixing this into the landing page breaks SSR and requires auth before the user can even see pricing.

**Pattern:**

```tsx
// ✅ Landing Pricing — pure display, links to checkout
<Link href={ROUTES.CHECKOUT}>View full pricing</Link>;

// ✕ Do NOT do this in components/landing/Pricing.tsx
import { CheckoutButton } from '@/components/checkout/CheckoutButton';
```

The full Stripe flow lives in `app/(layout)/checkout/` + `components/checkout/`.

## FAQ without shadcn Accordion

The FAQ uses a custom `useState` + CSS `max-h` pattern — no `shadcn` Accordion dependency needed:

```tsx
'use client';
import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const [open, setOpen] = useState<string | null>(null);
const toggle = (key: string) => setOpen(open === key ? null : key);

// Per item:
<button onClick={() => toggle(key)} className="flex w-full items-center justify-between py-5">
  <span>{question}</span>
  <ChevronDownIcon className={cn('transition-transform duration-200', open === key && 'rotate-180')} />
</button>
<div className={cn('overflow-hidden transition-all duration-200', open === key ? 'max-h-96 pb-5' : 'max-h-0')}>
  <p>{answer}</p>
</div>
```

## i18n pattern

Server components use `getTranslations`, client components use `useTranslations`. Dotted namespace syntax works for nested keys:

```tsx
// Server component (async)
const t = await getTranslations('landing.hero');
t('headline'); // → en.json["landing"]["hero"]["headline"]

// Client component
const t = useTranslations('landing.faq');
t('items.q1.question'); // → en.json["landing"]["faq"]["items"]["q1"]["question"]
```

Always add new keys to `messages/en.json` first, then consume them in the component.

## Customizing feature cards

Features are defined as a typed array in `components/landing/Features.tsx`. To add, remove, or reorder features:

1. Edit the `features` array (key + Lucide icon)
2. Add/remove the corresponding translation keys in `messages/en.json` under `landing.features.items`

```ts
const features: FeatureItem[] = [
  { key: 'auth', Icon: LockKeyholeIcon },
  { key: 'payments', Icon: CreditCardIcon },
  // add more here
];
```

Available Lucide icons: import from `lucide-react`. Browse at lucide.dev.
