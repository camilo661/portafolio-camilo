import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller.js';
import { TestimonialsStore } from './testimonials.store.js';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsStore],
})
export class TestimonialsModule {}
