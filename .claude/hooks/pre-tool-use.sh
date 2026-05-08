#!/bin/bash

TOOL_INPUT=$(cat)

# ─── SQL ────────────────────────────────────────────────────────────────────

# DROP TABLE
if echo "$TOOL_INPUT" | grep -iE "DROP\s+TABLE"; then
  echo "Blocked: DROP TABLE is not allowed." >&2
  echo "Action: Create a migration file instead: migrations/YYYYMMDD_drop_tablename.sql" >&2
  exit 2
fi

# DROP DATABASE
if echo "$TOOL_INPUT" | grep -iE "DROP\s+DATABASE"; then
  echo "Blocked: DROP DATABASE requires manual execution." >&2
  echo "Action: Run manually after team review." >&2
  exit 2
fi

# TRUNCATE
if echo "$TOOL_INPUT" | grep -iE "TRUNCATE\s+TABLE"; then
  echo "Blocked: TRUNCATE requires manual execution." >&2
  echo "Action: Run manually: psql -c 'TRUNCATE TABLE name;'" >&2
  exit 2
fi

# DELETE without WHERE
if echo "$TOOL_INPUT" | grep -iE "DELETE\s+FROM\s+\w+\s*;" | grep -ivE "WHERE"; then
  echo "Blocked: DELETE without WHERE clause detected." >&2
  echo "Action: Add a WHERE clause or create a migration file." >&2
  exit 2
fi

# ALTER TABLE DROP COLUMN
if echo "$TOOL_INPUT" | grep -iE "ALTER\s+TABLE.+DROP\s+COLUMN"; then
  echo "Blocked: DROP COLUMN requires a migration." >&2
  echo "Action: Create a migration file: migrations/YYYYMMDD_drop_column_tablename.sql" >&2
  exit 2
fi

# ─── FILESYSTEM ─────────────────────────────────────────────────────────────

# rm -rf
if echo "$TOOL_INPUT" | grep -iE "rm\s+-rf|rm\s+-fr"; then
  echo "Blocked: rm -rf is not allowed." >&2
  echo "Action: Remove files manually or specify exact paths without -rf flag." >&2
  exit 2
fi

# ─── GIT ────────────────────────────────────────────────────────────────────

# git push --force
if echo "$TOOL_INPUT" | grep -iE "git\s+push.+--force|git\s+push.+-f\b"; then
  echo "Blocked: git push --force is not allowed." >&2
  echo "Action: Use --force-with-lease instead, or perform manually after review." >&2
  exit 2
fi

# git reset --hard
if echo "$TOOL_INPUT" | grep -iE "git\s+reset\s+--hard"; then
  echo "Blocked: git reset --hard requires manual execution." >&2
  echo "Action: Run manually after confirming no uncommitted work will be lost." >&2
  exit 2
fi

# git branch -D (force delete)
if echo "$TOOL_INPUT" | grep -iE "git\s+branch\s+-D"; then
  echo "Blocked: git branch -D requires manual execution." >&2
  echo "Action: Run manually after confirming the branch is no longer needed." >&2
  exit 2
fi

# git checkout -- (discard working tree changes)
if echo "$TOOL_INPUT" | grep -iE "git\s+checkout\s+--\s+"; then
  echo "Blocked: git checkout -- requires manual execution." >&2
  echo "Action: Run manually after confirming you want to discard changes." >&2
  exit 2
fi

# git clean -f (remove untracked files)
if echo "$TOOL_INPUT" | grep -iE "git\s+clean\s+.*-f"; then
  echo "Blocked: git clean -f requires manual execution." >&2
  echo "Action: Run manually after reviewing untracked files with: git clean -n" >&2
  exit 2
fi

exit 0