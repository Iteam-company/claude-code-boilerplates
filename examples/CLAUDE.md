# Project

<2-3 sentence description of what this project does and its main stack>

# Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — lint check
- `npm run format` — prettier format

# Conventions

- Never commit to main directly
- Conventional commits: feat/fix/chore/docs
- Never hardcode secrets; reference env vars by name only
- Auth lives in middleware only, never in route handlers
- Never import across `apps/` boundaries in monorepo
- Shared types in src/types/, never colocated with components
