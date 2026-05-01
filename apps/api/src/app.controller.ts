import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponse } from '@repo/dtos';

@Controller()
export class AppController {
  @Get('health-check')
  healthCheck(): HealthCheckResponse {
    return {
      status: 'ok',
      service: 'api',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    };
  }
}
