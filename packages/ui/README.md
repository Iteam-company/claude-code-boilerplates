# @repo/ui

Shared UI component library built on shadcn/ui (Nova preset), Radix primitives, and Tailwind CSS.

## Setup in apps/web

### 1. Add dependency

```json
// apps/web/package.json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

### 2. Update tailwind.config.ts

```ts
content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"];
```

### 3. Import styles in globals.css

```css
@import "@repo/ui/styles/globals.css";
```

### 4. Import a theme

```css
/* default, dark, or brand */
@import "@repo/ui/themes/default.css";
```

## Usage

```tsx
import { Button } from "@repo/ui/components/button";

export default function Page() {
  return <Button variant="default">Click me</Button>;
}
```

## Adding new shadcn components

Copy component source from https://ui.shadcn.com/docs/components into `src/components/` and export from `src/index.ts`.

## Themes

| File                 | Use                                |
| -------------------- | ---------------------------------- |
| `themes/default.css` | Light theme                        |
| `themes/dark.css`    | Dark theme                         |
| `themes/brand.css`   | Brand colors — customize variables |
