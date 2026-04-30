# DB Patterns

## Structure

- All DB access in src/lib/db/ or src/repositories/
- Never query DB directly in route handlers or components
- One repository per domain entity (users, posts, etc.)

## Queries

- Always select only needed columns, never SELECT \*
- Always paginate list queries — default limit 20, max 100
- Never delete permanently unless explicitly required — use soft delete (deleted_at)

## Migrations

- Never edit existing migrations, always create new ones
- Migration names: YYYYMMDD_description.sql
- Always migration down script alongside up

## Rules

- All user-facing queries scoped by user/org ID
- Never raw SQL in application code — use query builder
- Index any column used in WHERE or JOIN
