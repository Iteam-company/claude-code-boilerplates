---
name: drizzle-migrate
description: Run Drizzle ORM migrations — generate a SQL migration from schema changes and apply it to the database. Use this skill whenever the user changes a schema file, adds a new table, or asks to run/apply migrations.
---

# Drizzle Migration Skill

## When to use which command

| Situation                                          | Command            |
| -------------------------------------------------- | ------------------ |
| Changed a schema file, need a migration file       | `pnpm db:generate` |
| Apply pending migration files to the DB            | `pnpm db:migrate`  |
| Dev only — sync schema directly, no migration file | `pnpm db:push`     |
| Inspect DB data visually                           | `pnpm db:studio`   |

**Production workflow:** always `generate` → review → `migrate`  
**Dev shortcut:** `push` syncs schema instantly, no migration file created

## Full workflow after a schema change

```bash
# 1. Generate migration SQL from schema diff
pnpm db:generate

# 2. Review the generated file in migrations/
# Check it looks correct before applying

# 3. Apply the migration
pnpm db:migrate
```

## What each command does

### `pnpm db:generate`

Reads all `modules/**/*.schema.ts` files, diffs against the last migration snapshot, and writes a new `.sql` file to `migrations/`. Does NOT touch the database.

Run this whenever you:

- Add a new table (`pgTable`)
- Add/rename/remove a column
- Change a column type or constraint
- Add an index

### `pnpm db:migrate`

Reads pending migration files from `migrations/` and applies them to the database in order. Safe for production — only runs migrations that haven't been applied yet.

### `pnpm db:push`

Directly syncs the current schema to the database without creating migration files. Fast for local dev iteration but **not safe for production** — it can drop columns without warning.

### `pnpm db:studio`

Opens Drizzle Studio at `https://local.drizzle.studio` to browse and edit data in the browser.

## Checklist after adding a new module

- [ ] Schema file created: `modules/[name]/[name].schema.ts`
- [ ] Relations file created: `modules/[name]/[name].relations.ts`
- [ ] Both registered in `db/drizzle.ts` (table + relations)
- [ ] Table exported from `db/schema.ts`
- [ ] Run `pnpm db:generate`
- [ ] Review migration file in `migrations/`
- [ ] Run `pnpm db:migrate`

## Common errors

| Error                              | Cause                                       | Fix                                         |
| ---------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `Cannot find module`               | `DATABASE_URL` not set                      | Check `.env` file                           |
| `relation already exists`          | Migration already applied                   | Check `__drizzle_migrations` table          |
| Schema diff is empty               | Schema file not matched by glob             | Confirm file is in `modules/**/*.schema.ts` |
| `referencedTable` error at runtime | Relations not registered in `db/drizzle.ts` | See `drizzle-relations` skill               |
