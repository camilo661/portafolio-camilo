import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { HealthModule } from './health/health.module.js';
import { PortfolioModule } from './portfolio/portfolio.module.js';
import { TestimonialsModule } from './testimonials/testimonials.module.js';

@Module({
  imports: [
    // Sirve el frontend (HTML + Tailwind + JS) desde /public
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/{*rest}'],
    }),
    PortfolioModule,
    TestimonialsModule,
    HealthModule,
  ],
})
export class AppModule {}
