---
name: ui-patterns
description: UI component structure, styling conventions, and theme usage. shadcn components in components/ui/, custom components in components/, Tailwind v4 CSS-first config. Loaded when creating or modifying components, themes, or styles.
---

# UI Patterns

## Structure

```
components/
├── ui/         ← shadcn components — never modify directly
└── layout/     ← header, footer, sidebar
    ├── header.tsx
    ├── footer.tsx
    └── sidebar.tsx
app/
└── globals.css ← CSS variables, theme, Tailwind config
```

## Importing components

```ts
// shadcn components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// custom components
import { Header } from '@/components/layout/header';
```

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

Never copy shadcn source manually — always use the CLI. Never modify files inside `components/ui/` directly.

## Creating custom components

- Named exports only — no default exports
- Always accept `className` prop and merge with `cn()`
- Keep in `components/` (or a subdirectory for grouping)
- Server components by default — add `"use client"` only when needed

```tsx
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function MyCard({ className, children }: CardProps) {
  return (
    <div className={cn('bg-card rounded-lg border p-4', className)}>
      {children}
    </div>
  );
}
```

## Theming — Tailwind v4

- Config is CSS-first — no `tailwind.config.ts` needed
- CSS variables defined in `app/globals.css`
- Use `@theme` to register CSS vars as Tailwind utilities
- Use `@layer base` for CSS variable definitions
- Never use `@tailwind` directives — replaced by `@import "tailwindcss"`
- Dark/light mode via `next-themes`

## Rules

- Use CSS variables for colors — never hardcode hex values
- Never use arbitrary Tailwind color values like `bg-[#fff]`
- Customize theme only in `app/globals.css`
- Use `cn()` from `lib/utils` for all className merging
- Never use MUI, Ant Design, or other component libraries
