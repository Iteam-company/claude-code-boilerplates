"use client";

import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/health-check", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>Hello {data.name}!</div>;
}
