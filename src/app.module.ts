import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    // Sirve el frontend (HTML + Tailwind + JS) desde /public
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/{*rest}'],
    }),
  ],
})
export class AppModule {}
