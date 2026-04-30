"use client";

import useSWR from "swr";

export default function Home() {
  const { data, isLoading } = useSWR("/api/test");
  return <div></div>;
}
