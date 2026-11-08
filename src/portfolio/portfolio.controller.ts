import { Controller, Get, Header, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';

@Controller('api/portfolio')
export class PortfolioController {
  constructor(private readonly portfolio: PortfolioService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60')
  findAll() {
    return this.portfolio.findAll();
  }

  @Get('sections/:key')
  findSection(@Param('key') key: string) {
    return this.portfolio.findSection(key);
  }
}
