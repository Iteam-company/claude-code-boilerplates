import { getBaseUrl } from '@/lib/utils';

export async function submitUrl(path: string): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return;

  const base = getBaseUrl();
  const url = `${base}${path}`;
  const keyLocation = `${base}/${key}.txt`;

  try {
    await fetch(
      `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}&keyLocation=${encodeURIComponent(keyLocation)}`,
    );
  } catch {}
}
