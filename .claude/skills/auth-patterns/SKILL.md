---
name: auth-patterns
description: Authentication and authorization boundaries, token handling, and session rules. Loaded when touching auth middleware, protected routes, or user session logic.
---

# Auth Patterns

## Boundaries

- Auth lives in middleware only, never in route handlers or components
- Session validation on every protected request, no exceptions
- Never pass raw user object from client — always re-fetch from DB

## Authorization

- Distinguish authn (who are you) from authz (what can you do)
- Check resource ownership in DB, never trust client claims
- Role checks in a single authorize() utility, never inline

## Tokens & secrets

- Never log tokens, passwords, or session IDs
- Never store sensitive data in localStorage — use httpOnly cookies
- Short-lived access tokens + refresh token rotation

## Rules

- Public routes explicitly allowlisted, everything else protected by default
- On auth failure: 401 if unauthenticated, 403 if unauthorized — never 404 to hide existence
- Always invalidate sessions server-side on logout
