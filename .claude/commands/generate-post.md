Generate a blog post and save it to the database.

Supports two modes:

- **Manual:** `/generate-post <title> -- <topic or one-line brief>`
- **Auto (scheduler):** `/generate-post` with no arguments -- picks next topic from the queue

---

## Remote execution overrides

When invoked by the scheduler or with explicit overrides in the prompt context, these values take precedence over local defaults:

- `BASE_URL` — replaces `http://localhost:3000` in all API calls
- `AI_API_KEY` — replaces the value read from `.env`

If no overrides are present, fall back to `http://localhost:3000` and `.env`.

---

## Steps

### 1. Resolve the topic

**If arguments were provided** (manual mode):

- Use the supplied title and brief directly. Skip to step 2.

**If no arguments were provided** (auto mode):

- Read `content/topics-queue.md`.
- Find the first line matching `- [ ] ...` (unchecked item).
- Extract the topic text after `- [ ] `.
- If no unchecked items exist, fall back to auto-generating a topic:
  - Read the "Blog Style Guide" section from CLAUDE.md (theme, voice, keywords, stop words).
  - Fetch existing posts (step 2) first, then pick a topic that fits the style guide and has not been covered yet.
- Remember the chosen topic line so you can mark it done in step 7.

### 2. Read the style guide

Read the "Blog Style Guide" section from CLAUDE.md to understand theme, voice, keywords, and stop words.

### 3. Fetch existing posts to check for overlap

GET {BASE_URL}/api/posts
(BASE_URL = override if provided, otherwise http://localhost:3000)
(returns PostSummary[]: id, slug, title, description -- no full content)

### 4. Deduplicate

Review existing post titles and descriptions. Note any closely related topics to the one you are about to write. If a similar post already exists, meaningfully differentiate or reference it inline by title.

### 5. Generate the full post following the style guide

- `slug`: lowercase, hyphens only, URL-safe (derived from title)
- `title`: clear and specific, derived from the topic
- `description`: one sentence capturing the post's value
- `content`: full MDX -- use headings, code blocks, and prose
- `tags`: 2-5 lowercase tags describing the post's main topics. Use short words or hyphenated phrases (e.g. `nextjs`, `drizzle-orm`, `auth`, `stripe`, `claude-code`). Derive from the post content -- do not copy keywords verbatim from the style guide if they don't apply.
- **Never put multi-item lists inside a single inline code tag.** File trees, directory structures, and lists of items must use a fenced code block (each item on its own line) or a markdown list -- never a long `` `item1 item2 item3...` `` string.
- **ASCII only**: use only ASCII characters in all fields. Replace em dashes with `--`, curly/smart quotes with straight quotes (`"`/`'`), ellipsis with `...`, and any other non-ASCII character with its closest ASCII equivalent. Never output Unicode beyond U+007F.

### 6. Resolve the API key

Use the `AI_API_KEY` override from invocation context if provided. Otherwise read it from `.env`.

### 7. Create the post via the API

POST {BASE_URL}/api/posts
(BASE_URL = override if provided, otherwise http://localhost:3000)
Headers:
X-Api-Key: <resolved AI_API_KEY>
Content-Type: application/json
Body: { slug, title, description, content, tags }

Expect HTTP 201. If the request fails, report the status and body -- do not retry silently.

### 8. Mark the topic as done (auto mode only)

If a topic was consumed from `content/topics-queue.md` in step 1:

- Edit that file: change `- [ ] <topic>` to `- [x] <topic>` for the line that was used.
- Do not modify any other lines.

### 9. Confirm

Report back:

- Post title and slug
- Source: "from queue" | "auto-generated" | "manual"
- Remaining unchecked topics in the queue (count only, e.g. "14 topics remaining")

---

## Usage

```
/generate-post                                      # auto mode -- picks next from queue
/generate-post Server Actions vs API Routes -- when to use each in Next.js App Router
```
