/* Almacenamiento de los comentarios públicos.
   - En producción (Vercel): Upstash Redis por su API REST. Se activa solo con las variables
     KV_REST_API_URL + KV_REST_API_TOKEN (o UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN),
     que crea la integración de Upstash del Marketplace de Vercel.
   - En local: un archivo JSON en data/testimonials.json. */
import { Injectable, Logger } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export interface PublicTestimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  createdAt: string;
}

const KEY = 'portfolio:testimonials';
const MAX = 500;

@Injectable()
export class TestimonialsStore {
  private readonly log = new Logger(TestimonialsStore.name);
  private readonly url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  private readonly token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  private readonly file = process.env.TESTIMONIALS_FILE || join(process.cwd(), 'data', 'testimonials.json');

  /** En Vercel el disco es temporal: sin Redis no se puede guardar de forma duradera. */
  get available(): boolean {
    return Boolean(this.url && this.token) || !process.env.VERCEL;
  }

  async list(): Promise<PublicTestimonial[]> {
    if (this.url && this.token) {
      const rows = (await this.redis(['LRANGE', KEY, '0', String(MAX - 1)])) as string[] | null;
      return (rows ?? []).flatMap((r) => { try { return [JSON.parse(r) as PublicTestimonial]; } catch { return []; } });
    }
    if (!this.available) return [];
    return this.readFile();
  }

  async add(t: PublicTestimonial): Promise<void> {
    if (this.url && this.token) {
      await this.redis(['LPUSH', KEY, JSON.stringify(t)]);
      await this.redis(['LTRIM', KEY, '0', String(MAX - 1)]);
      return;
    }
    const all = [t, ...(await this.readFile())].slice(0, MAX);
    await mkdir(dirname(this.file), { recursive: true });
    await writeFile(this.file, JSON.stringify(all, null, 2));
  }

  private async readFile(): Promise<PublicTestimonial[]> {
    try { return JSON.parse(await readFile(this.file, 'utf8')) as PublicTestimonial[]; } catch { return []; }
  }

  private async redis(cmd: string[]): Promise<unknown> {
    const res = await fetch(this.url!, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd),
    });
    if (!res.ok) {
      this.log.error(`Redis ${cmd[0]} respondió ${res.status}`);
      throw new Error('No se pudo acceder al almacenamiento');
    }
    return ((await res.json()) as { result: unknown }).result;
  }
}
