"use client";

import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function Home() {
  const { data, error, isLoading } = useSWR("/health-check", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          {key}: {JSON.stringify(value)}
        </p>
      ))}
    </div>
  );
}
