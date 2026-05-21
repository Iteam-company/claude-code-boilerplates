export function validateEmail(v: string): string {
  if (!v) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email.';
  return '';
}

export function validateGithub(v: string): string {
  if (!v) return 'GitHub username is required.';
  if (v.length > 39) return 'Maximum 39 characters.';
  if (!/^[a-zA-Z0-9-]+$/.test(v))
    return 'Only letters, numbers, and hyphens allowed.';
  if (v.startsWith('-') || v.endsWith('-'))
    return 'Cannot start or end with a hyphen.';
  if (/--/.test(v)) return 'Cannot contain consecutive hyphens.';
  return '';
}
