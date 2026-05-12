---
name: drizzle-migrate
description: Run Drizzle ORM migrations — generate SQL migrations from schema changes and apply them to the database. Use this skill whenever the user changes a schema file, adds a new table, adds a column, or asks to run/apply/push migrations. Always use this skill before assuming the DB is in sync with the schema.
---

# Drizzle Migration Skill

## Commands

This project uses `npx drizzle-kit` directly. There are no npm scripts for migrations.

| Situation                                            | Command                    |
| ---------------------------------------------------- | -------------------------- |
| Changed a schema, need to apply it to DB             | `npx drizzle-kit push`     |
| Changed a schema, need a migration file (production) | `npx drizzle-kit generate` |

## Dev workflow (most common)

For local development, `push` is the standard command — it syncs the schema directly to the DB without creating migration files:

```bash
npx drizzle-kit push
```

Run this after any schema change:

- Adding a new table
- Adding or removing a column
- Changing a column type or constraint
- Adding an index or unique constraint

## Production workflow

For production, generate a migration file first so changes are tracked and reviewed:

```bash
# 1. Generate SQL migration from schema diff
npx drizzle-kit generate

# 2. Review the generated .sql file in migrations/
# Make sure it looks correct before applying

# 3. Apply to the database
npx drizzle-kit migrate
```

## Rules

- **Never assume the DB is in sync with the schema** — always run `push` or `migrate` after schema changes
- **Never skip `generate` in production** — `push` can drop columns without warning
- **Always run `push` after adding a new module** — new tables don't exist until you do
- `push` is safe for dev, not for production
- After adding relations (`*.relations.ts`), no migration is needed — relations are TypeScript-only and don't affect the DB schema

## Checklist after adding a new module

- [ ] `modules/[name]/[name].schema.ts` created
- [ ] `modules/[name]/[name].relations.ts` created
- [ ] Both registered in `db/drizzle.ts`
- [ ] Run `npx drizzle-kit push` (dev) or `generate` + `migrate` (prod)

## Common errors

| Error                                   | Cause                                       | Fix                                        |
| --------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| `Cannot find module` / connection error | `DATABASE_URL` not set                      | Check `.env` file                          |
| `relation already exists`               | Migration already applied                   | Check `__drizzle_migrations` table in DB   |
| Schema diff is empty                    | Schema file not picked up by drizzle config | Check `schema` glob in `drizzle.config.ts` |
| `referencedTable` error at runtime      | Relations not registered in `db/drizzle.ts` | See `drizzle-relations` skill              |
| Column missing at runtime               | Schema changed but push not run             | Run `npx drizzle-kit push`                 |

## `drizzle.config.ts` reference

```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/modules/*/*.schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

The `schema` glob must match all your `*.schema.ts` files. If it doesn't, `generate` and `push` will silently produce empty diffs.
