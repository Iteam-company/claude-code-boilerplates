---
name: analytics
description: Analytics event tracking in this Next.js project — trackEvent() stub in lib/analytics.ts, Vercel Analytics auto-pageviews already wired in app/layout.tsx, and how to swap in a real provider (PostHog, Mixpanel). Use this skill whenever the user asks about analytics, tracking custom events, replacing the analytics stub, or measuring user behaviour.
---

# Analytics Skill

This project ships a lightweight `trackEvent` stub in `lib/analytics.ts`. Vercel Analytics auto-pageviews are already wired in `app/layout.tsx`. Custom events are called from services — no code changes needed in routes or components when you swap providers.

---

## Current implementation — `lib/analytics.ts`

```ts
type EventProperties = Record<string, unknown>;

export function trackEvent(event: string, properties?: EventProperties): void {
  console.log(
    JSON.stringify({ event, properties, timestamp: new Date().toISOString() }),
  );
}
```

Safe to call from server-side code. Currently logs to console — replace the body to send to a real provider.

---

## Vercel Analytics (auto-pageviews)

`<Analytics />` from `@vercel/analytics/next` is already mounted in `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// inside RootLayout return:
<Analytics />
<SpeedInsights />
```

No extra code is needed for page-view tracking. Enable the integration in your Vercel dashboard → Analytics.

---

## Calling `trackEvent` from services

Call `trackEvent` only from **service files** — never from routes or UI components.

```ts
import { trackEvent } from '@/lib/analytics';

// inside a service method:
trackEvent('free_signup_created', { email });
trackEvent('pro_repo_invited', { githubUsername });
trackEvent('pro_checkout_completed', { githubUsername });
```

Events already in use across the codebase:

| Event                    | Where                                                            |
| ------------------------ | ---------------------------------------------------------------- |
| `free_signup_created`    | `leadService.addEmail`                                           |
| `pro_repo_invited`       | `leadService.addGithubUsername`, `leadService.handleProCheckout` |
| `pro_checkout_completed` | `leadService.handleProCheckout`                                  |

---

## Swapping in a real provider

Replace the body of `trackEvent` in `lib/analytics.ts`. Call sites in services don't change.

### PostHog (server-side)

```bash
npm install posthog-node
```

```ts
import { PostHog } from 'posthog-node';

const posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
  host: 'https://app.posthog.com',
});

export function trackEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  posthog.capture({
    distinctId: (properties?.userId as string) ?? 'anonymous',
    event,
    properties,
  });
}
```

Add `POSTHOG_API_KEY` to `.env`.

### Mixpanel (server-side)

```bash
npm install mixpanel
```

```ts
import Mixpanel from 'mixpanel';

const mp = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

export function trackEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  mp.track(event, properties);
}
```

Add `MIXPANEL_TOKEN` to `.env`.

---

## Conventions

- Call `trackEvent` only from **services** — not routes, not UI components
- Event names must be `snake_case` (e.g. `pro_checkout_completed`, not `ProCheckoutCompleted`)
- Properties must be JSON-serialisable — no class instances, no circular references
- Never log PII (email, full name) in properties sent to third-party providers
- Vercel Analytics handles page views automatically — no manual `page` event needed
