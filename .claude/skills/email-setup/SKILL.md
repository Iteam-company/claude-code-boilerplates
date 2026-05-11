---
name: email-setup
description: Set up and extend transactional email in this Next.js project using Resend and react-email. Covers lib/email.ts service, emails/ templates, feature flags, and calling emailService from a service layer. Use this skill whenever the user asks about sending email, adding a new email template, toggling email verification or welcome emails, or configuring Resend.
---

# Email Setup Skill

Transactional email is handled by **Resend** + **react-email**. The service lives in `lib/email.ts`; templates live in `emails/`.

## Dependencies

```bash
npm install resend @react-email/components
```

## Environment variable

```env
RESEND_API_KEY=re_...
```

Get it from resend.com → API Keys.

## `lib/email.ts`

This file is already in the project. It exports:

- `emailService.sendEmail()` — the single send function
- `ENABLE_WELCOME_EMAIL` — feature flag (default `false`)
- `ENABLE_EMAIL_VERIFICATION` — feature flag (default `false`)
- `APP_NAME` — used inside templates
- `BASE_URL` — derived from `NEXT_PUBLIC_BASE_URL` or `localhost:3000`

```ts
import React from 'react';
import { Resend } from 'resend';

export const ENABLE_WELCOME_EMAIL = false;
export const ENABLE_EMAIL_VERIFICATION = false;

const resend = new Resend(process.env.RESEND_API_KEY);

const RESEND_SANDBOX_FROM_EMAIL = 'onboarding@resend.dev';
export const APP_NAME = 'MyApp';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

interface SendEmailOptions {
  to: string;
  from?: string;
  subject: string;
  react: React.ReactNode;
}

export const emailService = {
  sendEmail: async ({ to, from = RESEND_SANDBOX_FROM_EMAIL, subject, react }: SendEmailOptions) => {
    const { error } = await resend.emails.send({ from, to, subject, react });
    if (error) throw new Error(`Failed to send email: ${error.message}`);
  },
};
```

In development, the default `from` is `onboarding@resend.dev` (Resend's sandbox address). For production, pass a verified sender domain.

## Existing templates (`emails/`)

| File | Component | Props |
|------|-----------|-------|
| `emails/welcome-email.tsx` | `WelcomeEmail` | `appName`, `dashboardUrl` |
| `emails/verify-email.tsx` | `VerifyEmail` | `appName`, `verifyUrl` |
| `emails/reset-password-email.tsx` | `ResetPasswordEmail` | `appName`, `resetUrl` |

## Calling `emailService` from a service

**Important:** Service files are plain TypeScript — they cannot use JSX syntax. Always use `React.createElement` to instantiate templates:

```ts
import React from 'react';
import { emailService, APP_NAME, BASE_URL } from '@/lib/email';
import { WelcomeEmail } from '@/emails/welcome-email';

await emailService.sendEmail({
  to: email,
  subject: `Welcome to ${APP_NAME}!`,
  react: React.createElement(WelcomeEmail, {
    appName: APP_NAME,
    dashboardUrl: `${BASE_URL}/dashboard`,
  }),
});
```

## Feature flags

Toggle email flows in `lib/email.ts` without touching service logic:

```ts
export const ENABLE_WELCOME_EMAIL = true;      // send welcome on register
export const ENABLE_EMAIL_VERIFICATION = true; // require email verify on login
```

The user service reads these flags and guards the relevant `emailService.sendEmail()` calls.

## Adding a new email template

1. Create `emails/my-email.tsx` using react-email components:

```tsx
import { Body, Button, Container, Head, Html, Preview, Text } from '@react-email/components';

interface MyEmailProps {
  appName: string;
  actionUrl: string;
}

export function MyEmail({ appName, actionUrl }: MyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Action required for {appName}</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', margin: '40px auto', maxWidth: '560px', padding: '40px' }}>
          <Text>Hi there,</Text>
          <Text>Click below to complete your action.</Text>
          <Button href={actionUrl} style={{ backgroundColor: '#0a0a0a', borderRadius: '6px', color: '#ffffff', padding: '12px 24px' }}>
            Take Action
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

2. Call it from a service using `React.createElement`:

```ts
import { MyEmail } from '@/emails/my-email';

await emailService.sendEmail({
  to: user.email,
  subject: `Action required — ${APP_NAME}`,
  react: React.createElement(MyEmail, { appName: APP_NAME, actionUrl: `${BASE_URL}/action?token=${token}` }),
});
```

## Auth email flows (already implemented)

| Flow | Trigger | Template | Feature flag |
|------|---------|----------|--------------|
| Register | `userService.register()` | `VerifyEmail` | `ENABLE_EMAIL_VERIFICATION` |
| Register | `userService.register()` | `WelcomeEmail` | `ENABLE_WELCOME_EMAIL` |
| Forgot password | `userService.forgotPassword()` | `ResetPasswordEmail` | always on |
| Login guard | `userService.login()` | — | `ENABLE_EMAIL_VERIFICATION` |

## Rules

- Never write JSX in service files — always `React.createElement`
- Never call `emailService` from API routes — only from services
- Always import `APP_NAME` and `BASE_URL` from `lib/email` — never hardcode
- Dev uses `onboarding@resend.dev` as sender; production requires a verified domain set as `from`
- Never expose `RESEND_API_KEY` to the client
