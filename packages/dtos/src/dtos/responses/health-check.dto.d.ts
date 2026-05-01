import { HealthCheckType } from "@repo/types";
export declare class HealthCheckResponse implements HealthCheckType {
    status: "ok";
    service: "api";
    uptime: number | Date;
    memory: NodeJS.MemoryUsage;
    timestamp: string | Date;
}
