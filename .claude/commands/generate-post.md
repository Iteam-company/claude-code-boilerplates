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
- Derive a working title from the chosen topic.

### 5. Deduplicate (manual mode only)

Review existing post titles and descriptions. If a similar post already exists, meaningfully differentiate the angle or reference it inline by title.

### 6. Generate the full post following the style guide

- `slug`: lowercase, hyphens only, URL-safe (derived from title)
- `title`: clear and specific
- `description`: one sentence capturing the post's value
- `content`: full MDX -- use headings, code blocks, and prose
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

When mentioning the product by name, always hyperlink it to the product URL.
Use the format [product name](https://yourproducturl.com). Do not repeat the
link more than twice per post -- first mention and the call to action only.
