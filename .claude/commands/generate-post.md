Generate a blog post and save it to the database.

Supports two modes:

- **Auto:** `/generate-post` with no arguments -- AI picks a novel topic; post is published immediately
- **Manual:** `/generate-post <title> -- <topic or one-line brief>` -- drafts the post (unpublished); add `--publish` to publish immediately

---

## Remote execution overrides

When invoked by the scheduler or with explicit overrides in the prompt context, these values take precedence over local defaults:

- `BASE_URL` -- replaces `http://localhost:3000` in all API calls
- `AI_API_KEY` -- replaces the value read from `.env`

If no overrides are present, fall back to `http://localhost:3000` and `.env`.

---

## Steps

### 1. Parse arguments

**Auto mode** (no arguments):

- `mode = auto`, `publish = true`

**Manual mode** (`<title> -- <brief> [--publish]`):

- Split on `--` to get title and brief (brief may contain `--publish`)
- Strip `--publish` from the brief if present; set `publish = true` if found, otherwise `publish = false`
- `mode = manual`

### 2. Read the style guide

Read the "Blog Style Guide" section from `CLAUDE.md` to understand theme, voice, keywords, and stop words.

### 3. Fetch existing posts for deduplication

GET {BASE_URL}/api/posts?includeUnpublished=true
Headers: X-Api-Key: <resolved AI_API_KEY>

Returns PostSummary[] (id, slug, title, description, published -- no full content).
This is intentionally lightweight to stay within token limits.

### 4. Resolve the topic

**Manual mode:** use the supplied title and brief directly. Skip to step 5.

**Auto mode:**

- Review existing post titles and descriptions from step 3.
- Pick a topic that:
  - Fits the style guide (theme, keywords, avoids stop words)
  - Has NOT been covered by any existing post (published or draft)
  - Is specific and actionable -- not generic
  - Matches what a potential customer would actually type into Google -- think search-intent first. The reader may be a technical founder, a non-technical founder who wants to launch a product with AI help, or anyone curious about building a SaaS faster.
  - Examples of good search-intent titles: "best Next.js SaaS boilerplate 2025", "how to launch a SaaS without a development team", "build a web app with Claude Code", "ship a SaaS in a weekend", "Next.js starter kit with payments and auth"
- Derive a working title from the chosen topic. Prefer titles that include high-value search terms (e.g. "Next.js", "SaaS", "boilerplate", "starter kit", "Claude Code", "build a web app") when natural.

### 5. Deduplicate (manual mode only)

Review existing post titles and descriptions. If a similar post already exists, meaningfully differentiate the angle or reference it inline by title.

### 6. Generate the full post following the style guide

- `slug`: lowercase, hyphens only, URL-safe (derived from title). Include high-value keywords naturally (e.g. `nextjs-saas-boilerplate-with-auth`, `ship-saas-app-weekend`).
- `title`: clear, specific, and search-intent-driven. Write it the way a potential customer would search for it -- including non-technical ones. Include at least one of: "Next.js", "SaaS", "boilerplate", "starter kit", "Claude Code", "build a web app", or the core outcome the post is about.
- `description`: one sentence that answers "what does the reader gain?" -- frame it as a customer outcome, not a feature description. This appears in Google results so make it compelling even to a non-developer.
- `content`: full MDX -- use headings and prose as the default. Add a code block only when it directly shows the reader something that saves them real time. Write for people evaluating whether to use this boilerplate -- they may or may not be developers. Address the reader as "you". Lead with the pain (time, cost, complexity), show how the boilerplate removes it, end with a concrete CTA. Never assume the reader knows what Drizzle, JWT, or Zod is unless the post is explicitly technical. Keep under 1000 words.
- `tags`: 2-5 lowercase tags. Use short words or hyphenated phrases (e.g. `nextjs`, `drizzle-orm`, `auth`, `stripe`, `claude-code`). Derive from post content -- do not copy style guide keywords verbatim if they do not apply.
- **Never put multi-item lists inside a single inline code tag.** File trees, directory structures, and lists of items must use a fenced code block (each item on its own line) or a markdown list.
- **ASCII only**: replace em dashes with `--`, curly/smart quotes with straight quotes, ellipsis with `...`, and any other non-ASCII character with its closest ASCII equivalent. Never output Unicode beyond U+007F.

### 7. Resolve the API key

Use the `AI_API_KEY` override from invocation context if provided. Otherwise read it from `.env`.

### 8. Create the post via the API

POST {BASE_URL}/api/posts
Headers:
X-Api-Key: <resolved AI_API_KEY>
Content-Type: application/json
Body: { slug, title, description, content, tags, published: <true|false> }

Expect HTTP 201. If the request fails, report the status and body -- do not retry silently.

### 9. Confirm

Report back:

- Post title and slug
- Source: "auto-generated" | "manual"
- Published: yes / no

---

## Usage

```
/generate-post                                                        # auto -- AI picks topic, publishes immediately
/generate-post Server Actions vs API Routes -- when to use each       # manual draft
/generate-post Server Actions vs API Routes -- when to use each --publish  # manual, publish immediately
```

## Additional Instructions

**Audience:** The reader can be anyone -- a technical founder, a non-technical founder who wants to launch with AI help, or someone who just googled "how to build a SaaS fast". Write so all three can follow. Do not assume coding knowledge unless the post topic is explicitly technical.

**Voice:** Address the reader as "you". Lead with a problem they feel, not a feature list. The boilerplate is the enabler, not the hero. Show the outcome first, then explain what makes it possible.

**SEO:** Titles, descriptions, and H2 headings should include terms people google: "SaaS boilerplate", "Next.js starter kit", "build a web app with Claude Code", "ship a SaaS fast", or the specific pain point the post covers. One or two natural placements per heading level -- no keyword stuffing.

**Product link:** When mentioning the product by name, always hyperlink it using the `NEXT_PUBLIC_BASE_URL` env variable as the URL (e.g. `[Next.js Boilerplate](${NEXT_PUBLIC_BASE_URL})`). In the generated MDX content use the literal URL value read from `.env`. Do not repeat the link more than twice per post -- first mention and the call to action only.
