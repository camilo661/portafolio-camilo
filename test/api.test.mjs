/* Pruebas de extremo a extremo: levanta el servidor compilado (dist/) y consulta la API. */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const PORT = 3917;
const BASE = `http://localhost:${PORT}`;
let server;

before(async () => {
  server = spawn(process.execPath, ['dist/main.js'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'pipe' });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`${BASE}/api/health`)).ok) return; } catch { /* aún arrancando */ }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('El servidor no arrancó');
});
after(() => server?.kill());

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

test('GET /api/portfolio/sections/proyectos incluye Turbo Ratas', async () => {
  const res = await fetch(`${BASE}/api/portfolio/sections/proyectos`);
  assert.equal(res.status, 200);
  const section = await res.json();
  assert.equal(section.data.items[0].title, 'Turbo Ratas');
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
