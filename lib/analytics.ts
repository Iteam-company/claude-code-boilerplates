type EventProperties = Record<string, unknown>;

export function trackEvent(event: string, properties?: EventProperties): void {
  console.log(
    JSON.stringify({ event, properties, timestamp: new Date().toISOString() }),
  );
}
