export type HealthCheckType = {
  status: "ok";
  service: "api";
  uptime: number | Date;
  memory: NodeJS.MemoryUsage;
  timestamp: string | Date;
};
