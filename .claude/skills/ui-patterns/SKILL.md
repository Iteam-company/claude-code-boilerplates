---
name: ui-patterns
description: UI component structure, styling conventions, and theme usage for packages/ui with shadcn/ui Nova preset and Tailwind v4. Loaded when creating or modifying components, themes, or styles.
---

# UI Patterns

## Structure

- All components live in packages/ui/src/components/
- All components exported from packages/ui/src/index.ts
- Themes live in packages/ui/src/themes/
- Base CSS vars live in packages/ui/src/styles/globals.css

## Importing components

```ts
// correct — JS/TS imports use package name
import { Button } from '@repo/ui/components/button';
```

## Importing CSS

```css
/* correct — CSS imports must use relative paths, never @repo/ui */
@import '../../../packages/ui/src/styles/globals.css';
@import '../../../packages/ui/src/themes/brand.css';

/* never — Tailwind v4 PostCSS cannot resolve package CSS exports */
@import '@repo/ui/styles/globals.css';
```

## Components

- Use shadcn/ui Nova preset as base
- Copy component source from shadcn docs into packages/ui/src/components/
- Never modify shadcn internals — extend via className + cva variants
- Use cn() utility for all className merging
- All components must accept className prop and forward refs

## Theming

- Themes are CSS variable overrides in packages/ui/src/themes/
- Switch themes by importing a different theme file in globals.css
- Never hardcode colors — always use CSS variables
- Add new theme by creating a new file in packages/ui/src/themes/

## Tailwind v4

- No tailwind.config.ts needed — config is CSS-first
- Use @theme in globals.css to register CSS vars as Tailwind utilities
- Use @layer base for CSS variable definitions
- Never use @tailwind directives — replaced by @import "tailwindcss"

## Rules

- Never use MUI, Ant Design, or other component libraries in apps/web
- Never define components locally in apps/ — always add to packages/ui
- Never import class-validator or class-transformer in apps/web
- Server components by default — add "use client" only when needed
- Never use arbitrary Tailwind values if a CSS variable exists
