---
name: vercel-deploy
description: Set up and manage Vercel deployments for a Next.js project — initial CLI setup, Git integration for automatic deploys on push, environment variables sync, and production deploys. Use this skill whenever the user wants to deploy to Vercel, set up automatic deployments, run `vercel` for the first time, connect a GitHub repo to Vercel, or manage environment variables on Vercel. Always use this skill for any Vercel-related task.
---

# Vercel Deploy Skill

Sets up Vercel with Git integration so every `git push` triggers an automatic deployment.

## How deployments work

- Push to `main` → **production deployment** (your live site)
- Push to any other branch → **preview deployment** (unique URL per branch)
- Vercel builds automatically — no manual deploy commands needed after setup

---

## Initial setup (run once)

### Step 1 — Install Vercel CLI

```bash
npm install -g vercel@latest
```

### Step 2 — Login

```bash
vercel login
```

Opens browser for authentication. Supports GitHub, GitLab, email.

### Step 3 — Link project to Vercel

Run from the project root. If a git remote exists (recommended):

```bash
vercel link --repo
```

This reads your git remote URL, matches or creates a Vercel project, and creates `.vercel/repo.json`. More reliable than plain `vercel link`.

If no git remote yet:

```bash
vercel link
```

### Step 4 — Connect Git repository

```bash
vercel git connect
```

This connects your GitHub/GitLab/Bitbucket repo to the Vercel project and enables automatic deployments on every push.

Verify the connection:

```bash
vercel git ls
```

### Step 5 - Add environment

Add all environment to Vercel

### Step 5 — First production deploy

```bash
git add .
git commit -m "chore: initial deployment setup"
git push origin main
```

Vercel detects the push and builds automatically. Check progress at https://vercel.com/dashboard or:

```bash
vercel inspect --wait
```

---

## Day-to-day workflow

After setup, deploying is just a normal git push — no Vercel commands needed:

```bash
git add .
git commit -m "feat: add comments"
git push origin main        # → triggers production deploy
git push origin feature/x   # → triggers preview deploy
```

---

## Useful CLI commands

```bash
# Check recent deployments
vercel ls

# Inspect a specific deployment
vercel inspect [deployment-url]

# View live logs
vercel logs [deployment-url] --follow

# Promote a preview to production
vercel promote [deployment-url]

# Rollback to previous deployment
vercel rollback

# Open project dashboard in browser
vercel open

# List environment variables
vercel env ls

# Remove an environment variable
vercel env rm JWT_SECRET
```

---

## `.vercel` folder

After linking, Vercel creates a `.vercel/` folder. Add it to `.gitignore`:

```
.vercel
```

---

## `vercel.json` (optional config)

For Next.js projects, Vercel auto-detects settings. Only add `vercel.json` if you need overrides:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "regions": ["fra1"]
}
```

---

## Environment variable environments

| Environment | When used                 |
| ----------- | ------------------------- |
| Production  | `main` branch deploys     |
| Preview     | All other branch deploys  |
| Development | `vercel dev` local server |

When adding vars with `vercel env add`, select all three unless the value differs per environment.

---

## Vercel MCP tools

The project has a Vercel MCP server configured (`.mcp.json`). Use its tools to inspect deployments without leaving the session:

- `list_deployments` — check recent deployment status
- `get_deployment` — inspect a specific deployment
- `get_deployment_build_logs` — debug a failed build
- `get_runtime_logs` — tail live logs
- `get_project` — view project settings

These are read-only monitoring tools. Deploys are still triggered by `git push`.

---

## Checklist for initial setup

- [ ] `npm install -g vercel@latest`
- [ ] `vercel login`
- [ ] `vercel link --repo`
- [ ] `vercel git connect`
- [ ] Add all env vars with `vercel env add`
- [ ] Add `.vercel` to `.gitignore`
- [ ] `git push origin main` to trigger first deploy
- [ ] Verify at https://vercel.com/dashboard
