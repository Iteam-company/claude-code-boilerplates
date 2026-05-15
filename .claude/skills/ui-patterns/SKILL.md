---
name: ui-patterns
description: UI component structure, styling conventions, and theme usage. Custom components in components/, shadcn primitives in components/ui/ for form/interactive elements only. Loaded when creating or modifying components, themes, or styles.
---

# UI Patterns

## Structure

```
components/
├── ui/           ← shadcn primitives (form controls, dialogs) — never modify directly
├── header/       ← site header with nav + theme toggle
├── footer/       ← site footer (marketing footer with brand, nav, copyright)
├── landing/      ← marketing landing page sections
│   ├── Hero.tsx      ← full-width hero with headline, subtitle, dual CTAs
│   ├── Features.tsx  ← 6-card feature grid with Lucide icons
│   ├── Pricing.tsx   ← lightweight pricing teaser linking to /checkout
│   ├── FAQ.tsx       ← custom expand/collapse FAQ (no shadcn Accordion)
│   ├── CTA.tsx       ← bold bottom CTA with inverted bg-primary background
│   └── index.ts      ← barrel export
├── Container.tsx ← max-width wrapper
└── ThemeToggle.tsx ← light/dark mode toggle
app/
└── globals.css   ← CSS variables, theme, Tailwind config
```

## Custom components first

Build page-level UI (header, footer, hero, cards, sections) as plain custom components — not shadcn wrappers. Only reach for shadcn (`components/ui/`) for interactive form primitives: `Button`, `Input`, `Dialog`, `Select`, etc.

```tsx
// ✅ Custom component for layout/blog UI
export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="py-20">
      <Container>
        <h1 className="text-foreground text-4xl font-bold">{title}</h1>
        ...
      </Container>
    </section>
  );
}

// ✅ shadcn for form controls
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
```

## Creating custom components

- Named exports only — no default exports
- Always accept `className` prop and merge with `cn()`
- Server components by default — add `"use client"` only when needed
- Use `Container` for max-width + horizontal padding

```tsx
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

export function Section({ className, children }: SectionProps) {
  return (
    <section className={cn('py-16', className)}>
      <Container>{children}</Container>
    </section>
  );
}
```

## Available base components

| Component          | Usage                                               |
| ------------------ | --------------------------------------------------- |
| `Container`        | Max-width wrapper (`max-w-5xl`, horizontal padding) |
| `Header`           | Sticky nav with logo, links, theme toggle           |
| `Footer`           | Marketing footer with brand, nav columns, copyright |
| `landing/Hero`     | Full-width hero with headline, subtitle, dual CTAs  |
| `landing/Features` | 6-card feature grid with Lucide icons               |
| `landing/Pricing`  | Lightweight pricing teaser linking to `/checkout`   |
| `landing/FAQ`      | Custom expand/collapse FAQ (no shadcn Accordion)    |
| `landing/CTA`      | Bold bottom CTA with inverted `bg-primary` band     |
| `ThemeToggle`      | Light/dark toggle button (uses `resolvedTheme`)     |

## Dark mode

- `ThemeProvider` is in `app/layout.tsx` with `attribute="class"`
- `ThemeToggle` uses `useTheme()` from `next-themes`
- Always use CSS variables for colors — never hardcode values
- Test every component in both light and dark mode

## Theming — Tailwind v4

- Config is CSS-first — no `tailwind.config.ts` needed
- CSS variables defined in `app/globals.css`
- Use `@theme` to register CSS vars as Tailwind utilities
- Never use `@tailwind` directives — replaced by `@import "tailwindcss"`

## Rules

- **Pages compose, components render** — `page.tsx` files only import and arrange components; never write JSX markup or sections inline inside a page file
- **Split large components** — when a component exceeds ~150 lines or owns mixed concerns, extract pieces. See skill: `component-splitting`
- Extract every distinct section (Hero, Features, Pricing, CTA, etc.) into a named component in `components/`
- Use CSS variables for colors — never hardcode hex values
- Never use arbitrary Tailwind color values like `bg-[#fff]`
- Customize theme only in `app/globals.css`
- Use `cn()` from `lib/utils` for all className merging
- Never modify files in `components/ui/` directly
- Never use MUI, Ant Design, or other component libraries

## Page file structure

```tsx
// ✅ page.tsx — composes only
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { CTA } from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}

// ✕ page.tsx — markup inline (forbidden)
export default function Home() {
  return (
    <section className="py-24">
      <h1>Title</h1>
      ...
    </section>
  );
}
```
