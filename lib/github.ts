const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER!;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME!;

const githubHeaders = () => ({
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
});

export const githubService = {
  inviteCollaborator: async (username: string): Promise<void> => {
    const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/collaborators/${username}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: githubHeaders(),
      body: JSON.stringify({ permission: 'pull' }),
    });

    // 201 = invite sent, 204 = already a collaborator — both are success
    if (res.status !== 201 && res.status !== 204) {
      const body = await res.json().catch(() => ({}));
      throw new Error(
        `GitHub invite failed for ${username}: ${(body as { message?: string }).message ?? res.status}`,
      );
    }
  },
};
