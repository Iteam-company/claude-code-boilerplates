---
name: pwa
description: Progressive Web App setup for Next.js using @ducanh2912/next-pwa. Covers manifest.json, icons, service worker config, viewport/metadata, .gitignore entries, and how to replace placeholder icons. Use when adding PWA support, adjusting caching strategy, or customizing the web app manifest.
---

# PWA Skill

The boilerplate ships with PWA support pre-configured using `@ducanh2912/next-pwa` (the actively maintained App Router fork of `next-pwa`).

## What's already set up

| File                            | Purpose                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| `next.config.ts`                | Wraps with `withPWA` — generates `sw.js` + workbox files on `npm run build` |
| `public/manifest.json`          | Web app manifest — name, icons, display mode, theme color                   |
| `public/icons/icon-192x192.svg` | Placeholder icon (replace with your brand)                                  |
| `public/icons/icon-512x512.svg` | Placeholder icon (replace with your brand)                                  |
| `app/layout.tsx`                | `viewport` export for `themeColor`, `metadata.manifest`, `appleWebApp`      |
| `.gitignore`                    | Ignores generated `sw.js` and `workbox-*.js` files                          |

## next.config.ts setup

```ts
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public', // output sw.js into public/
  disable: process.env.NODE_ENV === 'development', // skip SW in dev
  register: true, // auto-register service worker
});

export default withPWA(withNextIntl(nextConfig));
```

Service workers are disabled in development to avoid stale-cache confusion. They activate on `npm run build` + `npm start` (or any production build).

## Replacing icons

The boilerplate ships with SVG placeholder icons (black square + letter "A"). Replace with your brand assets:

**Option A — Keep SVG** (recommended for simple logos):

- Replace `public/icons/icon-192x192.svg` and `public/icons/icon-512x512.svg`
- Keep `manifest.json` as-is

**Option B — Use PNG** (required for full iOS support):
Generate PNGs at these sizes: `192×192`, `512×512` (minimum). Also recommended: `48`, `72`, `96`, `128`, `144`, `152`, `384`.

```bash
# Using sharp (install once)
npx sharp-cli --input icon-source.png --output public/icons/ resize 192 192
npx sharp-cli --input icon-source.png --output public/icons/ resize 512 512
```

Update `manifest.json` icons array:

```json
{
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## manifest.json fields to customize

| Field              | What to change                                            |
| ------------------ | --------------------------------------------------------- |
| `name`             | Full app name shown on install prompt                     |
| `short_name`       | Name on home screen (≤12 chars recommended)               |
| `description`      | App description                                           |
| `background_color` | Splash screen background (match your brand)               |
| `theme_color`      | Browser UI accent color (also in `layout.tsx` `viewport`) |
| `start_url`        | URL opened when launched from home screen (default `/`)   |
| `display`          | `standalone` (no browser chrome) or `browser`             |

## Viewport + metadata in layout.tsx

```ts
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'App Name',
  },
};
```

`themeColor` is in `viewport` (not `metadata`) — required by Next.js 14+. Two entries handle light/dark system preference. Match them to your `background_color` in `manifest.json`.

## Caching strategy

`@ducanh2912/next-pwa` uses Workbox under the hood. Default caching:

- JS/CSS/fonts: `StaleWhileRevalidate`
- Images: `CacheFirst`
- API routes: not cached by default

To customize, pass a `workboxOptions` to `withPWAInit`:

```ts
const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
    ],
  },
});
```

## .gitignore entries

The build generates these files in `public/` — they're ignored:

```
public/sw.js
public/sw.js.map
public/workbox-*.js
public/workbox-*.js.map
```

Never commit these — they're regenerated on every build and contain hashed filenames.

## Testing PWA locally

Service workers don't run in dev mode. To test the full PWA:

```bash
npm run build
npm start
# open http://localhost:3000 in Chrome
# DevTools → Application → Service Workers → verify sw.js is registered
# DevTools → Application → Manifest → check installability
```

Chrome's Lighthouse (DevTools → Lighthouse → PWA) gives a full installability audit.
