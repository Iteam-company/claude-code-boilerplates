const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const fetcher = async (url: string) => {
  const fullUrl =
    url.startsWith("http") || url.startsWith("https")
      ? url
      : `${BASE_URL}${url}`;

  const res = await fetch(fullUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};
