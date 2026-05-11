# Roadmap & Improvements

Список покращень для перетворення бойлерплейту на конкурентний продукт. Базується на аналізі ринку (ShipFast, Supastarter, AnotherWrapper) та обговорених ідеях.

---

## 🔴 Must Have (P0)

### 1. Payments — Stripe

Топ-1 запит від indie founders. Жоден безплатний бойлерплейт не має цього вбудованим.

**Що додати:**
- Stripe Checkout (one-time payment)
- Stripe Subscriptions (recurring billing)
- Webhooks обробка `/api/webhooks/stripe`
- Credit system — купівля і списання кредитів
- `subscription` модуль (schema → service → route)
- Skill `/stripe-setup`

**Конкурент для порівняння:** ShipFast ($199) має Stripe, але без Claude Code skills.

---

### 2. Email Provider — Resend

Transactional emails потрібні будь-якому SaaS. Зараз в репо відсутні.

**Що додати:**
- Resend SDK інтеграція (`lib/email.ts`)
- Welcome email при реєстрації
- Password reset flow (email з токеном)
- Generic `sendEmail()` helper
- React Email шаблони
- Skill `/email-setup`

---

## 🟡 Should Have (P1)

### 3. Landing Page Skill

ShipFast продає себе саме тим що hero + features + pricing section генеруються одразу. Зараз бойлерплейт не включає маркетингову сторінку.

**Що додати:**
- Skill `/landing-page`
- Компоненти: Hero, Features, Pricing, FAQ, CTA, Footer
- Shadcn-сумісні, темна/світла тема
- SEO metadata з коробки

---

### 4. Multi-tenancy / Organizations

Потрібна для будь-якого B2B SaaS. Supastarter продає це як головну фічу за $349+.

**Що додати:**
- `organization` модуль з invite system
- `membership` модуль (roles: owner, admin, member)
- Organization context в JWT або окремий header
- `/api/organizations` CRUD
- UI: org switcher в header
- Skill `/org-setup`

---

### 5. Claude API Skill — AI Features in Product

Унікальний диференціатор. Конкуренти будують традиційний SaaS і додають AI після. Ми робимо навпаки — skill для вбудовування Claude прямо в продукт.

**Що додати:**
- Skill `/claude-feature` — додає AI endpoint зі streaming
- `lib/claude.ts` — Anthropic SDK client
- Streaming route (`/api/ai/chat`)
- Tool use патерн
- Prompt caching для зниження costs
- Credit deduction per AI call

---

## 🟢 Nice to Have (P2)

### 6. Mobile — PWA Skill

Найпростіший шлях до мобайлу. Робить додаток installable, підтримує офлайн та push-нотифікації. Один кодбейс, 1-2 дні роботи.

**Що додати:**
- Skill `/pwa-setup`
- `next-pwa` або `@ducanh2912/next-pwa` інтеграція
- Service worker конфіг
- Web App Manifest
- Push notifications через Web Push API

---

### 7. Mobile — Capacitor Skill

Для публікації в App Store / Play Store без окремого React Native проекту.

**Що додати:**
- Skill `/capacitor-setup`
- `@capacitor/core`, `@capacitor/ios`, `@capacitor/android`
- Build pipeline для iOS та Android
- Доступ до нативних API (камера, файли, GPS)
- Інструкція для Xcode / Android Studio

---

### 8. Living CLAUDE.md Generator

При старті нового проекту — Claude сам заповнює CLAUDE.md контекстом конкретного продукту замість генеричного шаблону.

**Що додати:**
- Skill `/init-project` — задає питання про продукт і генерує персоналізований CLAUDE.md
- Питання: назва, опис, бізнес-модель, модулі, обмеження
- Результат: готовий CLAUDE.md з доменним контекстом

---

## 📊 Пріоритизація

| # | Фіча | Вплив | Зусилля | Пріоритет |
|---|------|-------|---------|----------|
| 1 | Stripe Payments | Дуже високий | Середній | 🔴 P0 |
| 2 | Email (Resend) | Високий | Низький | 🔴 P0 |
| 3 | Landing Page Skill | Високий | Низький | 🟡 P1 |
| 4 | Multi-tenancy | Високий | Високий | 🟡 P1 |
| 5 | Claude API Skill | Середній | Середній | 🟡 P1 |
| 6 | PWA Skill | Середній | Низький | 🟢 P2 |
| 7 | Capacitor Skill | Середній | Високий | 🟢 P2 |
| 8 | Living CLAUDE.md | Низький | Низький | 🟢 P2 |

---

## 🎯 Конкурентна позиція після імплементації

- **vs ShipFast** — все що є у ShipFast ($199) + нативна Claude Code інтеграція
- **vs Supastarter** — схожий feature set за $0 замість $349
- **vs AnotherWrapper** — Claude API skill як унікальний диференціатор
- **Головний UVP:** Єдиний безплатний бойлерплейт де Claude Code знає конвенції і генерує повний стек без виправлень
