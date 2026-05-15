Generate a blog post and save it to the database.

## Steps

1. Read the "Blog Style Guide" section from CLAUDE.md to understand theme, voice, keywords, and stop words.

2. Fetch existing posts to check for overlap:
   GET http://localhost:3000/api/posts
   (returns PostSummary[]: id, slug, title, description — no full content)

3. Review existing post titles and descriptions. Note any closely related topics to the one you are about to write.

4. Generate the full post following the style guide:
   - `slug`: lowercase, hyphens only, URL-safe (derived from title)
   - `title`: from the user's input
   - `description`: one sentence capturing the post's value
   - `content`: full MDX — use headings, code blocks, and prose
   - If a similar post exists, meaningfully differentiate or reference it inline by title
   - **ASCII only**: use only ASCII characters in all fields. Replace em dashes with `--`, curly/smart quotes with straight quotes (`"`/`'`), ellipsis with `...`, and any other non-ASCII character with its closest ASCII equivalent. Never output Unicode beyond U+007F.

5. Read `AI_API_KEY` from `.env` (do not hardcode it).

6. Create the post via the API:
   POST http://localhost:3000/api/posts
   Headers:
   X-Api-Key: <AI_API_KEY value>
   Content-Type: application/json
   Body: { slug, title, description, content }

7. Confirm the post was created (expect 201) and report the slug and title back to the user.

## Usage

/generate-post <title> — <topic or one-line brief>

Example:
/generate-post Server Actions vs API Routes — when to use each in Next.js App Router
