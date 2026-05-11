---
name: i18n
description: Add translations to any page or component in this Next.js project using next-intl. All strings live in messages/en.json. Use getTranslations() in server components and useTranslations() in client components. Use this skill whenever the user asks about translations, i18n, adding a new language, moving text to translation files, or localizing any page or component. Always use this skill when adding visible text strings to new components.
---

# i18n (next-intl) Skill

This project uses [next-intl](https://next-intl.dev) in **without-routing mode** — no locale prefix in URLs. English only for now; new languages are added by dropping a new `messages/<locale>.json` and wiring locale detection.

## Setup (already done)

```bash
npm install next-intl
```

```
messages/
  en.json          ← all translations, namespaced
i18n/
  request.ts       ← locale + messages loader
next.config.ts     ← withNextIntl plugin
app/layout.tsx     ← NextIntlClientProvider wraps the tree
```

### `i18n/request.ts`

```ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = 'en';
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### `next.config.ts`

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const nextConfig: NextConfig = {};
export default withNextIntl(nextConfig);
```

### `app/layout.tsx`

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## Translating a server component

```tsx
import { getTranslations } from 'next-intl/server';

export async function MyComponent() {
  const t = await getTranslations('myNamespace');
  return <h1>{t('title')}</h1>;
}
```

Server components must be `async` to call `getTranslations`.

## Translating a client component

```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyClientComponent() {
  const t = useTranslations('myNamespace');
  return <button>{t('submit')}</button>;
}
```

## Dynamic metadata (generateMetadata)

```ts
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('myNamespace');
  return { title: t('metaTitle'), description: t('metaDescription') };
}
```

---

## `messages/en.json` structure

All text is organized by namespace (page or feature). Add new keys under the relevant namespace, or create a new one.

```json
{
  "nav": { "home": "Home" },
  "header": { "signIn": "Sign In" },
  "footer": { "info": "Footer info" },
  "signIn": {
    "title": "Sign In",
    "email": "Email",
    "password": "Password",
    "submit": "Sign In",
    "noAccount": "Don't have account?"
  },
  "signUp": {
    "title": "Sign Up",
    "email": "Email",
    "password": "Password",
    "repeatPassword": "Repeat password",
    "submit": "Sign Up",
    "haveAccount": "Already have account?",
    "passwordsMismatch": "Passwords do not match"
  },
  "resetPassword": {
    "title": "Reset Password",
    "newPassword": "New password",
    "submit": "Set New Password",
    "invalidLink": "Invalid link",
    "invalidLinkDescription": "This reset link is missing a token.",
    "updated": "Password updated!",
    "updatedDescription": "Your password has been reset. You can now sign in.",
    "signIn": "Sign In"
  },
  "verifyEmail": {
    "verifying": "Verifying…",
    "pleaseWait": "Please wait.",
    "verified": "Email verified!",
    "verifiedDescription": "Your email has been confirmed. You can now sign in.",
    "failed": "Verification failed",
    "missingToken": "Verification token is missing.",
    "signIn": "Sign In",
    "backToSignIn": "Back to Sign In"
  },
  "checkout": {
    "metaTitle": "Pricing",
    "metaDescription": "Choose a plan to get started.",
    "heading": "Simple pricing",
    "subheading": "Choose the plan that works for you.",
    "disclaimer": "All prices in USD. Subscriptions can be cancelled anytime.",
    "mostPopular": "Most popular",
    "subscribe": "Subscribe",
    "buyNow": "Buy Now",
    "redirecting": "Redirecting…",
    "checkoutError": "Could not start checkout. Please try again.",
    "manageBilling": "Manage Billing",
    "opening": "Opening…",
    "portalError": "Could not open billing portal. Please try again."
  },
  "checkoutSuccess": {
    "metaTitle": "Payment Successful",
    "metaDescription": "Your payment was processed successfully.",
    "heading": "Payment successful!",
    "description": "Thank you for your purchase. You'll receive a confirmation email shortly.",
    "backHome": "Back to home"
  },
  "pricing": {
    "proLicense": {
      "name": "Pro License",
      "description": "One-time purchase. Lifetime access.",
      "price": "$49",
      "feature1": "Full source code access",
      "feature2": "All current features",
      "feature3": "Lifetime updates",
      "feature4": "Community support",
      "cta": "Buy License"
    },
    "proPlan": {
      "name": "Pro Plan",
      "description": "Everything in Pro License, plus ongoing perks.",
      "price": "$19",
      "period": "month",
      "feature1": "Full source code access",
      "feature2": "All current + future features",
      "feature3": "100 AI credits / month",
      "feature4": "Priority support"
    }
  }
}
```

---

## Adding a new feature namespace

1. Add keys to `messages/en.json` under a new namespace:

   ```json
   {
     "dashboard": {
       "title": "Dashboard",
       "welcome": "Welcome back, {name}!"
     }
   }
   ```

2. Use in the component:

   ```tsx
   // Server component
   const t = await getTranslations('dashboard');
   t('welcome', { name: user.name });

   // Client component
   const t = useTranslations('dashboard');
   t('welcome', { name: user.name });
   ```

---

## Adding a new language (future)

1. Add `messages/<locale>.json` with all the same keys, translated.
2. In `i18n/request.ts`, detect the locale from the request (cookie, header, or URL segment) and load the matching file.
3. If URL-based routing is needed, follow the [next-intl routing docs](https://next-intl.dev/docs/routing) to add middleware and locale-prefixed routes.

---

## Conventions

- One namespace per page or feature area — never put everything in a single flat object
- Keys use `camelCase`: `'submitButton'`, not `'submit_button'`
- Use ICU message format for variables: `"welcome": "Hello, {name}!"`
- Never hardcode visible UI strings in components — always go through `t()`
- Placeholders (`placeholder=`) count as visible text — translate them
- Toast error messages count — translate them
- Page `<title>` and `<meta description>` go through `generateMetadata` + `getTranslations`
