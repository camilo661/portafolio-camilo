import {
  BadRequestException, Body, Controller, Get, Header, Headers, HttpCode, HttpException, HttpStatus, Ip, Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { TestimonialsStore, type PublicTestimonial } from './testimonials.store.js';

/** Límite sencillo por IP: 3 comentarios cada 10 minutos. */
const WINDOW = 10 * 60 * 1000;
const LIMIT = 3;
const hits = new Map<string, number[]>();

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim().slice(0, max) : '';

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private readonly store: TestimonialsStore) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async list() {
    return { open: this.store.available, items: await this.store.list() };
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: Record<string, unknown>, @Ip() remote: string, @Headers('x-forwarded-for') fwd?: string) {
    const ip = fwd?.split(',')[0]?.trim() || remote;
    // Campo trampa: las personas no lo ven, los bots lo llenan
    if (clean(body?.website, 200)) return { ok: true };
    if (!this.store.available) throw new ServiceUnavailableException('Los comentarios aún no están habilitados.');

    const name = clean(body?.name, 60);
    const role = clean(body?.role, 80);
    const text = clean(body?.text, 600);
    const rating = Number(body?.rating);
    if (name.length < 2) throw new BadRequestException('Escribe tu nombre.');
    if (text.length < 10) throw new BadRequestException('El comentario debe tener al menos 10 caracteres.');
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new BadRequestException('Elige una calificación de 1 a 5.');

    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
    if (recent.length >= LIMIT) throw new HttpException('Has enviado varios comentarios seguidos. Intenta más tarde.', HttpStatus.TOO_MANY_REQUESTS);
    hits.set(ip, [...recent, now]);

    const item: PublicTestimonial = { id: randomUUID(), name, role, text, rating, createdAt: new Date(now).toISOString() };
    await this.store.add(item);
    return { ok: true, item };
  }
}
