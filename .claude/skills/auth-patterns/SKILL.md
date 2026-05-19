---
name: auth-patterns
description: Authentication and authorization patterns for this project. JWT-based auth via getUserFromRequest() called in route handlers, not middleware. Loaded when touching protected routes, token handling, or user session logic.
---

# Auth Patterns

## How auth works in this project

Auth is **JWT-based**. Protected routes call `getUserFromRequest(req)` from `lib/auth.ts` at the top of the handler — it verifies the token and returns `{ id }`, or throws an `HttpError(401)` which `handleError` maps to a 401 response.

There is no Next.js middleware doing auth globally. Each route is explicitly protected.

```ts
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req); // throws 401 if invalid/missing
    // ...
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

## Optional auth (public route with user context)

```ts
let userId: string | undefined;
try {
  const user = getUserFromRequest(req);
  userId = user.id;
} catch {
  // unauthenticated — proceed without userId
}
```

## Authorization (ownership checks)

Ownership checks live in the **service layer**, not in routes:

```ts
// service
const post = await postRepo.findById(id);
if (!post) throw new HttpError(404, 'Post not found');
if (post.authorId !== userId) throw new HttpError(403, 'Forbidden');
```

- Never trust client-supplied IDs for ownership — always verify in DB
- 401 = unauthenticated (no/invalid token), 403 = unauthorized (wrong owner)
- Never return 404 to hide existence of a resource from an authenticated user

## Tokens & secrets

- JWTs signed with `JWT_SECRET` environment variable
- Never log tokens, passwords, or session IDs
- Never store sensitive fields (e.g. `passwordHash`) in responses — strip before returning
- Passwords hashed with `bcryptjs` — never store or compare plain text

## Rules

- Every protected route calls `getUserFromRequest(req)` before `req.json()`
- Ownership checks always in service, never in routes or repos
- Never expose `passwordHash` or internal IDs in API responses
