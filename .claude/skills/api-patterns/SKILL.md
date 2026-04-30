---
name: api-patterns
description: REST API structure, error handling, and response shapes. Loaded when writing or reviewing API route handlers.
---

# API Patterns

## Structure

- One responsibility per route handler
- Route: validate → authorize → execute → respond
- Never business logic in route handlers, use service functions

## Errors

- Always return { error: string, code: string }
- 400 bad input, 401 unauthenticated, 403 unauthorized, 404 not found, 500 unexpected
- Never expose raw error messages to client

## Response shape

- Success: { data: T, meta?: {} }
- List: { data: T[], meta: { total, page, limit } }
- Never return naked arrays

## Rules

- Validate input at route boundary (zod)
- Never trust client-provided IDs for ownership — verify in DB
