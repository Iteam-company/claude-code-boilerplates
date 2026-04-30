# Project

Turborepo monorepo with Next.js (frontend) and NestJS (backend API).
Frontend: TypeScript, Tailwind CSS, SWR for data fetching, lucide-react icons.
Backend: TypeScript, NestJS, TypeORM, Strapi for CMS.

# Structure

- apps/web — Next.js frontend
- apps/api — NestJS backend
- apps/cms — Strapi CMS
- packages/ui — shared component library
- packages/types — shared TypeScript types
- packages/typescript-config — tsconfig
- packages/eslint-config - shared eslint

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
