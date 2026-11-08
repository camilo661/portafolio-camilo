import { Controller, Get } from '@nestjs/common';

@Controller('api/health')
export class HealthController {
  /** Estado del servidor: útil para monitoreo y para verificar el despliegue. */
  @Get()
  check() {
    return { status: 'ok', uptime: Math.round(process.uptime()), timestamp: new Date().toISOString() };
  }
}
