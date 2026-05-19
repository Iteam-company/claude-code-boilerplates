---
name: create-hook
description: Analyze a component or file and identify inline logic that can be extracted into a reusable React hook. Proposes the hook name, signature, and affected components -- then asks before writing any code. Use when a component mixes state + effects, when a pattern repeats across components, or when the user asks "can this be a hook?".
---

# Create Hook

Analyze a component or file and determine if any inline logic can be extracted into a reusable hook. Proposes the hook API and asks before implementing -- never writes code without confirmation.

## When to use this skill

Invoke when:

- A component feels too large or mixes concerns (state + effects + layout)
- You spot a pattern repeated across more than one component
- Inline `useEffect` + `useState` logic is complex enough to have a name
- The user asks "can this be a hook?" or "should I extract this?"

## Steps

1. Read the target file(s).

2. Identify extraction candidates -- inline logic blocks that:
   - Combine state + side effects (timers, listeners, observers, storage)
   - Access browser APIs (scroll, resize, matchMedia, localStorage, IntersectionObserver)
   - Would have a clear, reusable name independent of the component's UI

3. Check `hooks/` for existing hooks before proposing a new one:
   - `useDebounce<T>(value, delay)` -- debounces any value
   - `useClickOutside<T extends HTMLElement>(callback)` -- fires callback on outside click, returns ref
   - `useActiveSection(ids)` -- tracks which section id is centered in the viewport
   - `useAuth()` -- reads JWT token, exposes user + helpers
   - `useOrg()` -- current org from OrgProvider context
     If the existing hook already covers the case, suggest using it instead.

4. For each candidate, propose:
   - Hook name (`use` prefix, describes what it returns)
   - Signature: inputs and return value
   - Which component(s) would benefit
   - Whether it is worth extracting (skip trivial single-`useState` wrappers)

5. Ask the user: "Should I extract [hookName]?" before writing any code.
   Only implement after confirmation.

6. If confirmed, write the hook to `hooks/<hookName>.ts` and refactor the component to use it.

## Hook design rules (apply when implementing)

- Named export only, no default export
- `'use client';` at the top
- Generic when return type depends on input
- Clean up all effects (timers, listeners, observers)
- Wrap callback args in `useRef` so callers don't need `useCallback`
- No comments unless the WHY is non-obvious

## Usage

/create-hook <file or component path>

Examples:
/create-hook components/blog/BlogSearch.tsx
/create-hook components/layout/header.tsx
/create-hook app/(layout)/blog/page.tsx
