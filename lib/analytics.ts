type EventProperties = Record<string, unknown>;

export function trackEvent(event: string, properties?: EventProperties): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      JSON.stringify({
        event,
        properties,
        timestamp: new Date().toISOString(),
      }),
    );
  }
  // Swap in Posthog / Segment / Vercel Analytics custom events here
}
