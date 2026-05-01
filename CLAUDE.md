# Project

Turborepo monorepo with Next.js (frontend) and NestJS (backend API).
Frontend: TypeScript, Tailwind CSS, SWR for data fetching, shadcn-ui, lucide-react icons.
Backend: TypeScript, NestJS, TypeORM, Strapi for CMS.

# Structure

- apps/web — Next.js frontend
- apps/api — NestJS backend
- packages/ui — shared component library
- packages/types — shared TypeScript types
- packages/typescript-config — tsconfig
- packages/eslint-config - shared eslint

# Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — lint check
- `npm run check-types` — tsc check types

# Conventions

<!-- DTO validation and types -->

- Shared types live in packages/types, never defined locally in apps
- packages/types exports two surfaces:
  - class-validator DTOs (used by NestJS for validation)
  - plain TypeScript interfaces derived from DTOs (used by Next.js frontend)
- Never import class-validator directly in apps/web — use packages/types interfaces only
- Never duplicate DTO definitions in apps/api — always import from packages/types

- Never commit to main directly
- Conventional commits: feat/fix/chore/docs
- Never hardcode secrets; reference env vars by name only
- Auth lives in middleware only, never in route handlers

- Never import directly between apps (apps/web must never import from apps/api)
- Always use packages/ for shared code between apps
- Cross-app communication via API calls only, never direct imports

- Shared types in src/types/, never colocated with components
