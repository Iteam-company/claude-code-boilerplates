"use client";

import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { HealthCheckType } from "@repo/types/health-check.types";

export default function Home() {
  const { data, error, isLoading } = useSWR<HealthCheckType, { qq: number }>(
    "/health-check",
    fetcher,
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  return (
    <div>
      {Object.entries(data || {}).map(([key, value]) => (
        <p key={key}>
          {key}: {JSON.stringify(value)}
        </p>
      ))}
    </div>
  );
}
