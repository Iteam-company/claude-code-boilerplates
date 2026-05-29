---
name: refactor-project
description: Audit and refactor the entire codebase for code quality. Finds components that are too large or mix concerns, logic that belongs in custom hooks, inline types that should be extracted, and client components that could be server components. Produces a prioritised list of issues and fixes them all. Use when the user asks to clean up code, split components, improve code quality, or refactor the project.
---

# Refactor Project

You are doing a full code-quality pass on this codebase. The goal is clean, maintainable code that follows the project conventions already established in CLAUDE.md.

---

## Step 1 -- Discover what exists

Run these to build a picture of the codebase:

```bash
# All components with line counts
find ./components -type f -name "*.tsx" | sort | xargs wc -l | sort -rn | head -30

# All pages with line counts
find "./app" -type f -name "*.tsx" | sort | xargs wc -l | sort -rn | head -30

# All hooks
find ./hooks -type f | sort

# All types
find ./types -type f | sort

# Client components (may be candidates for server component conversion)
grep -rl '"use client"' ./components ./app --include="*.tsx" | sort
```

Read the largest files first. Skip `components/ui/` entirely -- never touch shadcn files.

---

## Step 2 -- Audit across 5 dimensions

### A. Oversized components (> 150 lines)

For each component over 150 lines:

- Does it own multiple unrelated concerns? (data fetching + animation + layout)
- Does it have state that only affects a subtree?
- Are there repeated JSX blocks that could be a sub-component?
- Are there `useEffect` + related state blocks that could be a hook?

Flag each issue with the file, line count, and what should be extracted.

### B. Mixed concerns

Look for components that do more than one of:

- Fetch data (should be server component or SWR hook)
- Own complex state machine logic (should be a hook)
- Render a large section of UI (should be split into sub-components)
- Handle both form logic AND display

### C. Logic that belongs in hooks

Flag any `useEffect` + `useState` pair that:

- Could be reused elsewhere
- Makes the component hard to read
- Represents a self-contained side effect (scroll tracking, intersection observer, debounce, polling)

Move these to `hooks/use<Name>.ts`.

### D. Type hygiene

Look for:

- Inline interface/type definitions inside component files that are used in more than one place
- Props interfaces that duplicate DB types -- should reference types from `modules/*/types.ts`
- Use of `any` or untyped function parameters
- Type assertions (`as SomeType`) that hide real type errors

### E. Server vs client component opportunities

For any `"use client"` component:

- Does it actually use hooks, event handlers, or browser APIs?
- If it only renders markup based on props, remove `"use client"` and make it a server component
- If only a small part needs interactivity, split out that leaf and keep the rest as server

---

## Step 3 -- Report before fixing

Output a prioritised list:

```
# Refactor Audit

## High priority (complexity or correctness risk)

### [ComponentName] -- components/path/to/file.tsx (X lines)
**Issue:** [What is wrong -- be specific]
**Fix:** [Exactly what to extract, rename, or move]

---

## Medium priority (maintainability)

[same format]

---

## Low priority (polish)

[same format]

---

## No changes needed

[List files that are clean -- confirm you checked them]
```

---

## Step 4 -- Fix everything

After reporting, ask:

> "Found X issues across Y files. Fix all of them now?"

If yes, work through the list top-to-bottom:

1. **Split large components** -- extract sections into named components, co-locate in a subfolder if they form a unit (`components/header/index.tsx` + `components/header/NavDropdown.tsx`)
2. **Extract hooks** -- move `useEffect` + state blocks to `hooks/use<Name>.ts`, export and import back
3. **Move types** -- put shared interfaces in `types/` or the relevant `modules/*/types.ts`
4. **Remove unnecessary `"use client"`** -- convert eligible components to server components
5. **Fix `any` types** -- narrow to `unknown` and add type guards where needed

Rules while fixing:

- Never modify files in `components/ui/`
- Preserve all existing behaviour -- this is a refactor, not a rewrite
- Keep components under ~150 lines after splitting
- Run `npx tsc --noEmit` after each file to catch regressions
- Update all import paths after moving files

After all changes, run:

```bash
npx tsc --noEmit
npm run lint
```

Report any errors and fix them before finishing.
