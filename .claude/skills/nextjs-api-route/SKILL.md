---
name: nextjs-api-route
description: Generate Next.js App Router API route files (route.ts) following the project's thin-route pattern. Use this skill whenever the user asks to add an endpoint, create a route, add an API, or implement a new HTTP handler. Triggers on phrases like "add a route for", "create an endpoint", "I need a POST/GET/PUT/DELETE for", or any request that implies a new app/api/ file. Always use this skill even for simple routes — it enforces the correct pattern.
---

# Next.js API Route Skill

Generates `route.ts` files that follow the project's established pattern: validate → call service → return response → handle error.

## Pattern

```ts
import { someService, someSchema } from '@/modules/some';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth'; // only if protected

export async function POST(req: Request) {
  try {
    // 1. Auth (if protected)
    const { userId } = getUserFromRequest(req);

    // 2. Parse + validate body
    const body = await req.json();
    const parsed = someSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // 3. Call service
    const result = await someService.method({ ...parsed.data, userId });

    // 4. Return response
    return Response.json(result, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

## Rules

- Routes are THIN — no business logic, no DB queries
- Always import from the module barrel (`@/modules/name`)
- Always use `safeParse` — never `parse` (which throws)
- Always type catch as `unknown`
- Always delegate to `handleError` in catch
- Never access `req.json()` before auth check
- For `DELETE` and `GET` with no body, skip parse step
- For `GET` with query params, use `new URL(req.url).searchParams`

## Status codes

| Situation               | Status                                      |
| ----------------------- | ------------------------------------------- |
| Successful create       | 201                                         |
| Successful read/update  | 200                                         |
| Successful delete       | 204 + `new Response(null, { status: 204 })` |
| Validation error        | 400                                         |
| Unauthorized            | 401 (thrown by `getUserFromRequest`)        |
| Forbidden (wrong owner) | 403                                         |
| Not found               | 404 (thrown by service)                     |
| Conflict (duplicate)    | 409 (thrown by service)                     |

## Route params

```ts
type Params = { params: Promise<{ id: string }> }

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params
    // ...
  }
}
```

## Query params (GET with filters)

```ts
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const self = searchParams.get('self') === 'true'
    // ...
  }
}
```

## Auth — optional token (public route that benefits from user context)

```ts
let userId: string | undefined;
try {
  const user = getUserFromRequest(req);
  userId = user.userId;
} catch {
  // not logged in — proceed without userId
}
```

## File location

```
app/api/
├── [resource]/
│   ├── route.ts                  ← collection: GET list, POST create
│   └── [id]/
│       ├── route.ts              ← item: GET one, PUT update, DELETE
│       └── [action]/
│           └── route.ts          ← sub-action: POST toggle, etc.
```

## Example outputs

### Protected POST (create)

```ts
import { postService, createPostSchema } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { userId } = getUserFromRequest(req);
    const body = await req.json();

    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const post = await postService.create({ ...parsed.data, authorId: userId });
    return Response.json(post, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

### Public GET list with optional auth

```ts
import { postService } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const self = searchParams.get('self') === 'true';

    let authorId: string | undefined;
    if (self) {
      const user = getUserFromRequest(req);
      authorId = user.userId;
    }

    const posts = await postService.getAll({
      authorId,
      published: self ? undefined : true,
    });

    return Response.json(posts);
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

### DELETE with ownership

```ts
import { postService } from '@/modules/post';
import { handleError } from '@/lib/errors';
import { getUserFromRequest } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  try {
    getUserFromRequest(_req);
    const { id } = await params;
    await postService.delete(id);
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```
