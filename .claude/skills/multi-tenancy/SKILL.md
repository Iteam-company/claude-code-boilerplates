---
name: multi-tenancy
description: Add multi-tenancy to the app — organizations with owner/admin/member roles, invite-by-email flow, and org context via localStorage + X-Org-Id header. Use this skill whenever the user asks to add organizations, teams, workspaces, multi-tenancy, or member management.
---

# Multi-Tenancy Skill

## Architecture

Three modules: `organization`, `orgMember`, `invitation`. Each follows the standard 7-file DDD-lite pattern.

```
modules/
  organization/   — org CRUD, auto-slug from name
  orgMember/      — membership + role enum
  invitation/     — token-based email invites
```

---

## Role hierarchy

```
owner > admin > member
```

- **owner**: full control, cannot be removed or have role changed
- **admin**: can invite, manage members (except owner), update org settings
- **member**: read access only

Business rules enforced in services (never routes):

- Only admins/owners can send invitations and change roles
- `owner` role cannot be assigned via API — only set on org creation
- Users cannot change their own role
- Owner cannot be removed from org

---

## DB schema essentials

Define `orgRoleEnum` once in `orgMember.schema.ts` and import it in `invitation.schema.ts` — never redefine.

```ts
export const orgRoleEnum = pgEnum('org_role', ['owner', 'admin', 'member']);
export type OrgRole = (typeof orgRoleEnum.enumValues)[number];
```

Key columns:

- `organizationTable`: `id`, `name`, `slug` (unique), timestamps
- `orgMemberTable`: `orgId → organizations cascade`, `userId → users cascade`, `role`
- `invitationTable`: `orgId`, `email`, `role` (reuse `orgRoleEnum`), `token` (unique text), `invitedByUserId`, `status` (`pending|accepted`), `expiresAt`

Always define relations for all three tables and register in `db/drizzle.ts`.

---

## API surface

```
POST   /api/organizations                             create org → creator becomes owner
GET    /api/organizations                             list user's orgs (includes role)
GET/PUT/DELETE /api/organizations/[id]               CRUD (delete owner-only)

GET    /api/organizations/[id]/members               list members
PUT    /api/organizations/[id]/members/[memberId]    change role (not owner, not self)
DELETE /api/organizations/[id]/members/[memberId]    remove (not owner)

GET    /api/organizations/[id]/invitations           list pending (admin/owner)
POST   /api/organizations/[id]/invitations           send invite email
DELETE /api/organizations/[id]/invitations/[id]      cancel

GET    /api/invitations/[token]                      public — get invite details + isNewUser
POST   /api/invitations/[token]/accept               public — accept; creates user if new
```

Public invitation routes have no auth. All others use `const { id: userId } = getUserFromRequest(req)`.

---

## Invitation accept flow

`GET /api/invitations/[token]` returns `InvitationDetails`:

```ts
{ id, email, role, status, expiresAt, organization: { id, name }, isNewUser: boolean }
```

`POST /api/invitations/[token]/accept`:

- Token possession = proof of email ownership — no additional auth needed
- If `isNewUser`: require `password` in body, hash with bcrypt, create user
- If existing user: add to org directly (no password needed)
- Mark invitation `accepted`, return `{ token, user }` (JWT + safe user)

Send invitation email via `React.createElement(InvitationEmail, props)` from service — never JSX in service files. Requires `@react-email/render` installed.

---

## Org context strategy

Store selected org in localStorage as `current_org_id`. Send it on API requests as `X-Org-Id` header alongside `Authorization`.

Use a React **Context** (not plain `useState`) so all layout components share one org state. A plain hook gives each component independent state — org switches won't propagate.

```
hooks/useOrg.ts          — createContext + useOrg() hook
components/OrgProvider.tsx — 'use client', holds useState, reads localStorage on mount
app/demo/layout.tsx       — wraps children with <OrgProvider>
```

On sign-out: call `clearOrg()` explicitly in addition to `clearToken()` — clearing the JWT does not update the OrgContext state.

---

## Auth-aware fetcher

Add `authFetcher`/`authPoster`/`authPutter` to `lib/fetcher.ts` that auto-inject headers from localStorage:

```ts
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  const orgId = localStorage.getItem('current_org_id');
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(orgId ? { 'X-Org-Id': orgId } : {}),
  };
};
```

Base `fetcher` must handle 204: `if (res.status === 204) return undefined as T` before calling `res.json()`.

---

## Key gotchas

- `getUserFromRequest` returns `{ id }` — destructure as `const { id: userId } = getUserFromRequest(req)`
- Never use a route group `(demo)` as the top-level wrapper — `(group)/page.tsx` resolves to `/` and conflicts with other groups. Use a real path segment (`demo/`)
- `orgRoleEnum` defined in `orgMember.schema.ts`, imported (not redefined) in `invitation.schema.ts`
- `useOrg` must be Context-based — plain hook gives each component its own independent state
- Install `@react-email/render` — Resend requires it at runtime to render React email templates
