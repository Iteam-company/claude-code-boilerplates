import { HealthCheckType } from "@repo/types";
import {
  IsDateString,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from "class-validator";

export class HealthCheckResponse implements HealthCheckType {
  @IsString()
  status: "ok";

  @IsString()
  service: "api";

  @IsDateString()
  uptime: number | Date;

  @IsObject()
  @IsNotEmptyObject()
  memory: NodeJS.MemoryUsage;

  @IsDateString()
  timestamp: string | Date;
}
