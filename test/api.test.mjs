/* Pruebas de extremo a extremo: levanta el servidor compilado (dist/) y consulta la API. */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = 3917;
const BASE = `http://localhost:${PORT}`;
let server;
const DATA_DIR = mkdtempSync(join(tmpdir(), 'portafolio-test-'));

before(async () => {
  server = spawn(process.execPath, ['dist/main.js'], { env: { ...process.env, PORT: String(PORT), TESTIMONIALS_FILE: join(DATA_DIR, 't.json'), VERCEL: '', KV_REST_API_URL: '', UPSTASH_REDIS_REST_URL: '' }, stdio: 'pipe' });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`${BASE}/api/health`)).ok) return; } catch { /* aún arrancando */ }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('El servidor no arrancó');
});
after(() => { server?.kill(); rmSync(DATA_DIR, { recursive: true, force: true }); });

test('GET /api/health responde ok', async () => {
  const res = await fetch(`${BASE}/api/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, 'ok');
});

test('GET /api/portfolio devuelve el propietario y las 10 secciones', async () => {
  const res = await fetch(`${BASE}/api/portfolio`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.owner.name, 'Camilo Andrés Castro Acosta');
  assert.equal(data.sections.length, 10);
  assert.deepEqual(
    data.sections.map((s) => s.hs),
    ['display', 'cpu', 'ram', 'nand', 'frame', 'battery', 'taptic', 'camera', 'vapor', 'modem'],
  );
});

test('GET /api/portfolio/sections/proyectos: proyectos principales y otros proyectos', async () => {
  const res = await fetch(`${BASE}/api/portfolio/sections/proyectos`);
  assert.equal(res.status, 200);
  const { data } = await res.json();
  assert.deepEqual(data.items.map((p) => p.title), ['Conclave', 'TuControl', 'Traduya', 'Turbo Ratas']);
  assert.ok(data.others.length > 0);
  for (const p of data.items) assert.ok(p.images.length > 0, `${p.title} no tiene capturas`);
  // Los otros proyectos solo llevan imagen si tienen demo publicada
  for (const p of data.others) {
    if (p.images.length) assert.ok(p.links.some((l) => l.kind === 'demo'), `${p.title} tiene imagen sin demo`);
  }
});

test('el instalador de Conclave se puede descargar', async () => {
  const res = await fetch(`${BASE}/downloads/Conclave-1.0.0.dmg`, { method: 'HEAD' });
  assert.equal(res.status, 200);
});

test('una sección inexistente responde 404', async () => {
  const res = await fetch(`${BASE}/api/portfolio/sections/no-existe`);
  assert.equal(res.status, 404);
});

test('sirve el frontend y los estilos de Tailwind', async () => {
  const html = await fetch(`${BASE}/`);
  assert.equal(html.status, 200);
  assert.match(await html.text(), /<title>Camilo Castro/);
  const css = await fetch(`${BASE}/css/styles.css`);
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /text\/css/);
});

test('la animación del teléfono no choca con la animación spin de Tailwind', async () => {
  const css = await (await fetch(`${BASE}/css/styles.css`)).text();
  assert.match(css, /@keyframes phone-spin\{to\{--spin:360deg\}\}/);
  assert.match(css, /\.rig\.spin\{[^}]*phone-spin/);
});

test('comentarios públicos: se publican y se listan', async () => {
  const empty = await (await fetch(`${BASE}/api/testimonials`)).json();
  assert.equal(empty.open, true);
  assert.deepEqual(empty.items, []);
  const res = await fetch(`${BASE}/api/testimonials`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Ana Pérez', role: 'Cliente', text: 'Reparó mi teléfono en un día, excelente.', rating: 5 }),
  });
  assert.equal(res.status, 201);
  const { items } = await (await fetch(`${BASE}/api/testimonials`)).json();
  assert.equal(items.length, 1);
  assert.equal(items[0].name, 'Ana Pérez');
  assert.equal(items[0].rating, 5);
});

test('comentarios públicos: rechaza datos incompletos y no guarda bots', async () => {
  const bad = await fetch(`${BASE}/api/testimonials`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'A', text: 'corto', rating: 9 }),
  });
  assert.equal(bad.status, 400);
  const bot = await fetch(`${BASE}/api/testimonials`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bot', text: 'Spam spam spam spam', rating: 5, website: 'http://spam' }),
  });
  assert.equal(bot.status, 201);
  const { items } = await (await fetch(`${BASE}/api/testimonials`)).json();
  assert.ok(!items.some((t) => t.name === 'Bot'));
});
