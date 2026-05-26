import useSWR from 'swr';

interface SpotsData {
  taken: number;
  remaining: number;
  total: number;
  subscribers: number;
}

export function useProSpots() {
  const { data, isLoading } = useSWR<SpotsData>('/api/spots', (url: string) =>
    fetch(url).then((r) => r.json()),
  );
  return {
    isFreeProPlan: data ? data.remaining > 0 : true,
    remaining: data?.remaining ?? 0,
    total: data?.total ?? 100,
    isLoading,
  };
}
