export function validateEmail(v: string): string {
  if (!v) return 'emailRequired';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'emailInvalid';
  return '';
}

export function validateGithub(v: string): string {
  if (!v) return 'githubRequired';
  if (v.length > 39) return 'githubTooLong';
  if (!/^[a-zA-Z0-9-]+$/.test(v)) return 'githubInvalidChars';
  if (v.startsWith('-') || v.endsWith('-')) return 'githubHyphenStart';
  if (/--/.test(v)) return 'githubConsecutiveHyphens';
  return '';
}
