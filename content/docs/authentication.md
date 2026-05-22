---
title: Authentication
description: JWT-based auth, registration, login, and protected routes.
order: 2
---

# Authentication

Authentication uses JWTs issued on login/register and sent as a `Bearer` token on subsequent requests. There is no session store -- the token is the session.

## How it works

1. User registers or logs in via `POST /api/auth/register` or `POST /api/auth/login`
2. The response body contains a `token` string
3. The client stores the token (localStorage or memory) and sends it as `Authorization: Bearer <token>` on every authenticated request
4. API routes call `getUserFromRequest(req)` to extract and verify the token

## getUserFromRequest

```ts
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await getUserFromRequest(req); // throws HttpError(401) if invalid
  return Response.json({ user });
}
```

`getUserFromRequest` throws `HttpError(401)` if the token is missing or invalid. The `handleError` helper in routes catches this and returns the correct status.

## Protecting a route

```ts
import { getUserFromRequest } from '@/lib/auth';
import { handleError } from '@/lib/errors';

export async function POST(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    // user.id is available here
    const body = await req.json();
    // ... business logic
    return Response.json({ ok: true });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

## Passwords

Passwords are hashed with `bcryptjs` before storage. The plain password is never stored.

Always strip `passwordHash` before returning a user object:

```ts
const { passwordHash: _, ...safeUser } = user;
return Response.json({ user: safeUser });
```

## Multi-tenant context

When building multi-tenant features, the current organization is sent as `X-Org-Id` in the request header. Extract it alongside the JWT user:

```ts
const user = await getUserFromRequest(req);
const orgId = req.headers.get('X-Org-Id');
```

Ownership and role checks happen in the service layer, not in routes.
