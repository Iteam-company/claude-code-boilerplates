---
name: component-splitting
description: Split large React components into focused, performant pieces. Use when a component exceeds ~150 lines, owns mixed concerns, or causes unnecessary re-renders. Covers extraction patterns, state isolation, and co-location conventions.
---

# Component Splitting

## When to split

Split a component when **any** of these are true:

- File exceeds ~150 lines
- Component owns unrelated concerns (e.g. data fetching + animation + layout)
- A chunk of state only affects a subtree — it belongs in a child, not the parent
- You find yourself scrolling to remember what a variable does
- The same logical block appears in two places

Do **not** split just to hit a line count. A 200-line component with one clear job is fine. A 60-line component doing three things should be split.

## Extraction patterns

### 1. Isolate stateful logic into a leaf component

Moving state down prevents the parent from re-rendering when it changes.

```tsx
// ✕ Parent re-renders on every keystroke
export function Page() {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultsList results={results} />
      <HeavyStaticSection /> {/* re-renders unnecessarily */}
    </>
  );
}

// ✅ State lives in the leaf — HeavyStaticSection is unaffected
export function Page() {
  return (
    <>
      <SearchBox /> {/* owns query state */}
      <HeavyStaticSection />
    </>
  );
}
```

### 2. Extract a self-contained feature into its own file

When a block has its own state, effects, and handlers, move it to `ComponentName.tsx` next to its parent.

```
components/header/
├── index.tsx          ← shell: logo, nav links, auth button
└── ProductDropdown.tsx ← owns: scroll tracking, hover open/close, label animation
```

The child component calls its own hooks (`usePathname`, `useTranslations`, etc.) — the parent passes nothing.

### 3. Extract presentational pieces inline only when they're truly reusable

If a chunk of JSX is repeated or complex but has no state, extract it as a small function **in the same file** only if it won't be used elsewhere. Move it to its own file as soon as a second consumer appears.

```tsx
// Same file — not exported, not reused elsewhere
function DropdownItem({
  icon: Icon,
  label,
  description,
  active,
  onClick,
}: DropdownItemProps) {
  return (
    <button onClick={onClick} className={cn('...', active && 'bg-muted')}>
      <Icon className="h-4 w-4 shrink-0" />
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-muted-foreground text-xs">{description}</div>
      </div>
    </button>
  );
}
```

### 4. Extract custom hooks for logic that doesn't return JSX

Any `useEffect` + related state that could stand alone belongs in `hooks/`.

```tsx
// hooks/useActiveSection.ts
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  // scroll listener...
  return active;
}
```

## Performance rules

**Isolate state to the lowest owner.** Re-renders ripple down from where state lives. The lower the state, the smaller the blast radius.

**Don't reach for `useMemo` / `useCallback` first.** Extract a child component instead — that's both cleaner and faster than memoizing inside a fat component.

**Lazy-load heavy sections** that aren't visible on initial paint.

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div className="bg-muted h-64 animate-pulse rounded-lg" />,
});
```

**Server components are free.** Anything without interactivity should be a server component — no JS bundle cost at all.

## File and naming conventions

- One component per file (exceptions: tiny private helpers used only in that file)
- File name = component name: `ProductDropdown.tsx` exports `ProductDropdown`
- Co-locate siblings in a folder when they form a unit:
  ```
  components/header/
  ├── index.tsx
  └── ProductDropdown.tsx
  ```
- Never put a child component in the parent's file if it will grow or be reused

## Anti-patterns

| Pattern                                      | Problem                                   | Fix                                  |
| -------------------------------------------- | ----------------------------------------- | ------------------------------------ |
| 300-line page component with inline sections | Hard to read, hard to change              | Extract each section                 |
| State high in the tree "just in case"        | Causes whole-tree re-renders              | Move state to the leaf that needs it |
| `useMemo` on everything                      | Premature, adds noise                     | Split the component first            |
| Splitting by line count alone                | Creates tiny files with no clear boundary | Split by responsibility              |
| Passing 8+ props to a child                  | Signals the child owns too little         | Let the child call its own hooks     |
