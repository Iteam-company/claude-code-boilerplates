---
name: api-patterns
description: REST API structure, error handling, and response shapes for Next.js App Router routes. Loaded when writing or reviewing API route handlers.
---

# API Patterns

## Route structure

Routes follow: **auth → parse → validate → service → respond**

```ts
export async function POST(req: Request) {
  try {
    const { userId } = getUserFromRequest(req); // 1. auth
    const body = await req.json(); // 2. parse
    const parsed = schema.safeParse(body); // 3. validate
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await someService.method({ ...parsed.data, userId }); // 4. service
    return Response.json(result, { status: 201 }); // 5. respond
  } catch (error: unknown) {
    return handleError(error); // centralized error handling
  }
}
```

- Routes are thin — no business logic, no DB queries
- Always import from module barrel (`@/modules/name`)

## Response shapes

Routes return data **directly** — no `{ data: T }` wrapper:

```ts
// single resource
return Response.json(post, { status: 200 });

// list
return Response.json(posts, { status: 200 });

// created
return Response.json(post, { status: 201 });

// deleted
return new Response(null, { status: 204 });

// error
return Response.json({ error: parsed.error.flatten() }, { status: 400 });
```

## Error responses

`handleError` in `lib/errors/` maps `HttpError` instances to JSON responses:

```ts
// thrown from service
throw new HttpError(404, 'Post not found');
throw new HttpError(403, 'Forbidden');
throw new HttpError(409, 'Slug already exists');

// route catch block always delegates:
} catch (error: unknown) {
  return handleError(error);
}
```

| Status | Meaning                                          |
| ------ | ------------------------------------------------ |
| 400    | Validation error (Zod)                           |
| 401    | Unauthenticated (thrown by `getUserFromRequest`) |
| 403    | Wrong owner / forbidden                          |
| 404    | Resource not found                               |
| 409    | Conflict (duplicate)                             |
| 500    | Unexpected (caught by `handleError`)             |

## Rules

- Never trust client-provided IDs for ownership — verify in DB via service
- Always use `safeParse` — never `parse` (which throws)
- Always type catch as `unknown`
- Never access `req.json()` before auth check
