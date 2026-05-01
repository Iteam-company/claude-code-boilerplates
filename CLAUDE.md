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

- Never commit to main directly
- Conventional commits: feat/fix/chore/docs
- Never hardcode secrets; reference env vars by name only
- Auth lives in middleware only, never in route handlers

- Never import directly between apps (apps/web must never import from apps/api)
- Always use packages/ for shared code between apps
- Cross-app communication via API calls only, never direct imports

- Shared types in src/types/, never colocated with components

<!-- DTO validation and types -->

- Plain TS interfaces live in packages/types — shared across all apps
- Zod schemas live in packages/validators — apps/web only
- class-validator DTOs live in packages/dtos — apps/api only
- Never use zod in apps/api, never use class-validator in apps/web
- Types in packages/types are the contract — validators and DTOs must match them
- Never define types locally in apps/ — always import from packages/types
- react-hook-form + zodResolver used in apps/web only
- NestJS uses ValidationPipe with class-validator DTOs from packages/dtos
