(() => {
  'use strict';

  const D = window.PORTFOLIO;
  const W = 280, H = 590, R = 46;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ACC = { teal: 'var(--teal)', steel: 'var(--steel)', sand: 'var(--sand)' };
  const pad2 = n => String(n).padStart(2, '0');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDay = d => {
    const t = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
    return t.charAt(0).toUpperCase() + t.slice(1).replace(',', '');
  };
  const fmtTime = d => `${d.getHours() % 12 || 12}:${pad2(d.getMinutes())}`;

  /* ───────────── Modelo ───────────── */
  const LAYERS = ['display', 'frame', 'board', 'vapor', 'battery', 'camera', 'back'];
  const HS_LAYER = {
    display: 'display', frame: 'frame', cpu: 'board', ram: 'board', nand: 'board', modem: 'board',
    vapor: 'vapor', battery: 'battery', taptic: 'battery', camera: 'camera',
  };
  const ROW = {
    display: 'top', cpu: 'top', modem: 'top', vapor: 'top', camera: 'top',
    frame: 'bottom', ram: 'bottom', nand: 'bottom', battery: 'bottom', taptic: 'bottom',
  };
  const SECTIONS = D.sections;
  const IDX = {};
  SECTIONS.forEach((s, i) => { IDX[s.hs] = i; });
  const sec = hs => SECTIONS[IDX[hs]];
  const acc = hs => ACC[sec(hs).accent] || ACC.teal;
  const shortName = s => (s.eyebrow === 'Trayectoria' ? s.title : s.eyebrow);

  const STATES = {
    assembled: { rx: 10, ry: -26, rz: -4, gap: 5 },
    overview: { rx: 9, ry: -50, rz: -2, gap: 150 },
    focus: { rx: 3, ry: -16, rz: 0, gap: 150, push: 360, lift: 30 },
  };
  const isMobile = () => innerWidth < 820;

  /* ───────────── Utilidades SVG ───────────── */
  function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
  const rr = (x, y, w, h, r) =>
    `M${x + r},${y}H${x + w - r}A${r},${r} 0 0 1 ${x + w},${y + r}V${y + h - r}A${r},${r} 0 0 1 ${x + w - r},${y + h}H${x + r}A${r},${r} 0 0 1 ${x},${y + h - r}V${y + r}A${r},${r} 0 0 1 ${x + r},${y}Z`;
  const svg = inner => `<svg class="art" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" overflow="visible" aria-hidden="true">${inner}</svg>`;
  const hsBtn = (id, x, y, w, h, r = 10) => {
    const s = sec(id);
    return `<button class="hs" data-hs="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;--ac:${acc(id)}" aria-label="${esc(s.part)}: ${esc(shortName(s))}"></button>`;
  };
  const anc = (id, x, y) => `<i class="anc" data-anc="${id}" style="left:${x}px;top:${y}px"></i>`;

  // Contorno de la placa lógica (forma de L alrededor del módulo de cámaras)
  const BOARD = 'M162,16H232A34,34 0 0 1 266,50V234A18,18 0 0 1 248,252H32A18,18 0 0 1 14,234V170A30,30 0 0 1 44,140H130A16,16 0 0 0 146,124V32A16,16 0 0 1 162,16Z';
  // Posición de las cámaras del 17 Pro (vista trasera)
  const LENSES = [[50, 52], [120, 96], [52, 134]];
  const LR = 29;

  const metalDefs = p => `
    <linearGradient id="${p}alu" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f4f5f6"/><stop offset=".3" stop-color="#dcdee1"/><stop offset=".55" stop-color="#eef0f1"/><stop offset=".8" stop-color="#cfd2d6"/><stop offset="1" stop-color="#e3e5e8"/>
    </linearGradient>
    <linearGradient id="${p}ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#b9bdc3"/><stop offset=".6" stop-color="#f3f4f5"/><stop offset="1" stop-color="#8f949b"/>
    </linearGradient>
    <radialGradient id="${p}glass" cx=".42" cy=".38" r=".75">
      <stop offset="0" stop-color="#30364a"/><stop offset=".45" stop-color="#11141c"/><stop offset="1" stop-color="#040506"/>
    </radialGradient>
    <linearGradient id="${p}brush" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#d6d9dd"/><stop offset=".25" stop-color="#f2f3f5"/><stop offset=".5" stop-color="#c7cbd0"/><stop offset=".75" stop-color="#eceef0"/><stop offset="1" stop-color="#cdd0d4"/>
    </linearGradient>
    <filter id="${p}soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4"/></filter>`;

  function lens(cx, cy, r, p, raised = true) {
    return `
      ${raised ? `<circle cx="${cx}" cy="${cy + 2.5}" r="${r + 1.5}" fill="rgba(30,40,50,.28)" filter="url(#${p}soft)"/>` : ''}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}ring)"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 0.6}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width=".8"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.84}" fill="#0b0c0f"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.7}" fill="url(#${p}glass)"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.56}" fill="none" stroke="rgba(255,255,255,.07)"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="none" stroke="rgba(150,160,255,.16)" stroke-width="1.2"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.24}" fill="#020203"/>
      <path d="M${cx - r * 0.5},${cy - r * 0.2} A${r * 0.55},${r * 0.55} 0 0 1 ${cx + r * 0.12},${cy - r * 0.54}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="${r * 0.08}" stroke-linecap="round"/>
      <circle cx="${cx + r * 0.22}" cy="${cy + r * 0.26}" r="${r * 0.05}" fill="rgba(255,255,255,.35)"/>`;
  }

  /* ───────────── Arte de cada capa ───────────── */
  const ART = {
    /* Pantalla frontal */
    display: () => `
      <div class="dsp">
        <div class="dsp-glass">
          <div class="dsp-scr">
            <div class="dsp-wall"><i class="w1"></i><i class="w2"></i><i class="w3"></i><i class="w4"></i></div>
            <div class="dsp-bar"><span data-clock>${fmtTime(new Date())}</span><span class="dsp-ic"><b></b><b></b><b></b><b></b><em></em></span></div>
            <div class="dsp-isl"></div>
            <div class="dsp-day" data-day>${esc(fmtDay(new Date()))}</div>
            <div class="dsp-time" data-clock>${fmtTime(new Date())}</div>
            <div class="dsp-wid">
              <span class="dsp-mono">${esc(D.owner.monogram)}</span>
              <span class="dsp-wtxt"><strong>${esc(D.owner.name)}</strong><em>${esc((D.owner.location || '').split(',').slice(0, 2).join(','))}</em></span>
            </div>
            <div class="dsp-qa"><i><svg viewBox="0 0 24 24"><path d="M9 2h6l-1 6h-4zM10 8h4v13a2 2 0 0 1-4 0z" fill="none" stroke="#fff" stroke-width="1.5"/></svg></i><i><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="3" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="13.5" r="3.5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M9 7l1.5-3h3L15 7" fill="none" stroke="#fff" stroke-width="1.5"/></svg></i></div>
            <div class="dsp-home"></div>
          </div>
        </div>
        <div class="sheen"></div>
      </div>
      ${hsBtn('display', 0, 0, W, H, R)}${anc('display', 150, 205)}`,

    /* Chasis: marco de aluminio + placa media */
    frame: p => {
      const ring = rr(0, 0, W, H, R) + rr(9, 9, W - 18, H - 18, R - 9);
      const plate = rr(9, 9, W - 18, H - 18, R - 9) + rr(18, 18, 132, 138, 28) + rr(22, 270, 236, 236, 14) + rr(162, 26, 92, 100, 10) + rr(30, 520, 92, 48, 8) + rr(176, 514, 78, 58, 10);
      const bands = [[66, 0, 4, 9], [210, 0, 4, 9], [66, H - 9, 4, 9], [210, H - 9, 4, 9], [0, 300, 9, 4], [W - 9, 470, 9, 4]]
        .map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#9aa0a7"/>`).join('');
      const bosses = [[30, 170], [250, 170], [30, 256], [250, 256], [140, 512], [30, 508], [250, 508]]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="url(#${p}ring)"/><circle cx="${x}" cy="${y}" r="2" fill="#7d838a"/>`).join('');
      const holes = Array.from({ length: 6 }, (_, i) => `<circle cx="${190 + i * 8}" cy="${H - 4.5}" r="1.7" fill="#3a3e44"/><circle cx="${50 + i * 8}" cy="${H - 4.5}" r="1.7" fill="#3a3e44"/>`).join('');
      return svg(`
        <defs>${metalDefs(p)}
          <linearGradient id="${p}mid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9cdd2"/><stop offset=".5" stop-color="#b3b8be"/><stop offset="1" stop-color="#c3c7cc"/></linearGradient>
        </defs>
        <rect x="-4" y="122" width="4" height="30" rx="2" fill="url(#${p}alu)"/>
        <rect x="-4" y="176" width="4" height="54" rx="2" fill="url(#${p}alu)"/>
        <rect x="-4" y="242" width="4" height="54" rx="2" fill="url(#${p}alu)"/>
        <rect x="${W}" y="196" width="4" height="84" rx="2" fill="url(#${p}alu)"/>
        <rect x="${W}" y="368" width="3.5" height="54" rx="1.75" fill="#8e949b"/>
        <path d="${plate}" fill="url(#${p}mid)" fill-rule="evenodd"/>
        <path d="${plate}" fill="none" stroke="rgba(60,70,80,.25)" stroke-width=".8"/>
        <path d="${ring}" fill="url(#${p}alu)" fill-rule="evenodd"/>
        <path d="${rr(9, 9, W - 18, H - 18, R - 9)}" fill="none" stroke="rgba(40,50,60,.35)" stroke-width="1.2"/>
        <path d="${rr(0.5, 0.5, W - 1, H - 1, R - 0.5)}" fill="none" stroke="rgba(255,255,255,.95)"/>
        ${bands}${bosses}
        <rect x="120" y="${H - 7}" width="40" height="7" rx="3.5" fill="#2a2d32"/>
        ${holes}
        <text x="${W / 2}" y="220" text-anchor="middle" class="svg-t" font-size="6" fill="rgba(60,70,80,.45)" letter-spacing="1.6">ALUMINIO SERIE 7000 · UNIBODY</text>
      `) +
        hsBtn('frame', 0, 0, W, 20, 14) + hsBtn('frame', 0, H - 20, W, 20, 14) +
        hsBtn('frame', 0, 0, 20, H, 14) + hsBtn('frame', W - 20, 0, 20, H, 14) +
        anc('frame', W - 5, 430);
    },

    /* Placa lógica */
    board: p => {
      const rand = rng(23);
      let parts = '';
      for (let i = 0; i < 150; i++) {
        const x = 16 + rand() * 248, y = 18 + rand() * 232, v = rand() > 0.5, c = rand();
        parts += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${v ? 1.8 : 3.6}" height="${v ? 3.6 : 1.8}" rx=".3" fill="${c > 0.55 ? '#c9b48c' : c > 0.25 ? '#2b2e33' : '#8d7a5c'}"/>`;
      }
      let traces = '';
      for (let i = 0; i < 26; i++) {
        const x = 20 + rand() * 236, y = 22 + rand() * 226;
        traces += `<path d="M${x.toFixed(1)},${y.toFixed(1)}h${(8 + rand() * 30).toFixed(1)}l${(6 + rand() * 10).toFixed(1)},${(6 + rand() * 10).toFixed(1)}h${(6 + rand() * 24).toFixed(1)}"/>`;
      }
      const pins = (x, y, w, n) => Array.from({ length: n }, (_, i) => `<rect x="${(x + 3 + i * ((w - 6) / n)).toFixed(1)}" y="${y + 3}" width="1.4" height="8" fill="#d6b56b"/>`).join('');
      const screw = (x, y) => `<circle cx="${x}" cy="${y}" r="4.6" fill="url(#${p}ring)"/><circle cx="${x}" cy="${y}" r="4.6" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".6"/><path d="M${x - 2},${y}h4M${x},${y - 2}v4" stroke="#6b7178" stroke-width="1"/>`;
      const pkg = (x, y, w, h, r) => `<rect x="${x}" y="${y + 1.5}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,.4)" filter="url(#${p}soft)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${p}epoxy)"/><rect x="${x + .5}" y="${y + .5}" width="${w - 1}" height="${h - 1}" rx="${r}" fill="none" stroke="rgba(255,255,255,.14)"/>`;
      return svg(`
        <defs>${metalDefs(p)}
          <linearGradient id="${p}pcb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2f35"/><stop offset="1" stop-color="#1a1d22"/></linearGradient>
          <linearGradient id="${p}epoxy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c2f35"/><stop offset=".5" stop-color="#151619"/><stop offset="1" stop-color="#22252a"/></linearGradient>
          <pattern id="${p}vias" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r=".75" fill="rgba(214,181,107,.22)"/></pattern>
          <clipPath id="${p}clip"><path d="${BOARD}"/></clipPath>
        </defs>
        <path d="M150,252 V520 q0,10 -6,14" fill="none" stroke="#c98a3a" stroke-width="12" opacity=".8"/>
        <path d="${BOARD}" fill="url(#${p}pcb)"/>
        <g clip-path="url(#${p}clip)">
          <rect width="${W}" height="260" fill="url(#${p}vias)"/>
          <g fill="none" stroke="#d6b56b" stroke-width=".6" opacity=".22">${traces}</g>
          ${parts}
        </g>
        <path d="${BOARD}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1"/>

        <path d="${rr(156, 26, 98, 104, 10)}" fill="rgba(0,0,0,.35)" transform="translate(0 2)" filter="url(#${p}soft)"/>
        <path d="${rr(156, 26, 98, 104, 10)}" fill="url(#${p}brush)"/>
        <path d="${rr(156.5, 26.5, 97, 103, 9.5)}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width=".8"/>
        <text x="205" y="70" text-anchor="middle" class="svg-t" font-size="10" font-weight="600" fill="rgba(70,80,90,.55)" letter-spacing="1">5G</text>
        <text x="205" y="84" text-anchor="middle" class="svg-t" font-size="5.5" fill="rgba(70,80,90,.5)" letter-spacing="1.4">MÓDEM · N1 · WI-FI 7</text>
        <g fill="rgba(70,80,90,.25)"><circle cx="166" cy="36" r="1.4"/><circle cx="244" cy="36" r="1.4"/><circle cx="166" cy="120" r="1.4"/><circle cx="244" cy="120" r="1.4"/></g>

        ${pkg(26, 152, 80, 80, 7)}
        <rect x="36" y="162" width="60" height="60" rx="4" fill="none" stroke="rgba(255,255,255,.06)"/>
        <text x="66" y="192" text-anchor="middle" class="svg-t" font-size="13" font-weight="600" fill="#e6e8ea">A19</text>
        <text x="66" y="205" text-anchor="middle" class="svg-t" font-size="7" font-weight="500" fill="#aab0b6" letter-spacing="2.5">PRO</text>
        <text x="66" y="221" text-anchor="middle" class="svg-t" font-size="4" fill="#6f757c" letter-spacing=".8">CC2611 · 3NM</text>

        ${pkg(114, 150, 60, 36, 3.5)}
        <text x="144" y="165" text-anchor="middle" class="svg-t" font-size="6.5" font-weight="600" fill="#d8dbde">12 GB</text>
        <text x="144" y="175" text-anchor="middle" class="svg-t" font-size="4.2" fill="#8b9198" letter-spacing=".8">LPDDR5X</text>
        ${pkg(114, 194, 60, 38, 3.5)}
        <text x="144" y="210" text-anchor="middle" class="svg-t" font-size="6.5" font-weight="600" fill="#d8dbde">NAND</text>
        <text x="144" y="220" text-anchor="middle" class="svg-t" font-size="4.2" fill="#8b9198" letter-spacing=".8">2 TB · NVMe</text>

        <path d="${rr(184, 142, 70, 62, 8)}" fill="url(#${p}brush)"/>
        <path d="${rr(184.5, 142.5, 69, 61, 7.5)}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width=".8"/>
        <text x="219" y="176" text-anchor="middle" class="svg-t" font-size="5" fill="rgba(70,80,90,.45)" letter-spacing="1.2">PMIC</text>

        <rect x="184" y="214" width="32" height="14" rx="2.5" fill="#121316"/>${pins(184, 214, 32, 9)}
        <rect x="222" y="214" width="32" height="14" rx="2.5" fill="#121316"/>${pins(222, 214, 32, 9)}
        ${screw(26, 242)}${screw(254, 242)}${screw(254, 136)}${screw(170, 30)}

        <path d="${rr(126, 532, 48, 42, 10)}" fill="url(#${p}pcb)"/>
        <rect x="134" y="560" width="32" height="10" rx="5" fill="url(#${p}ring)"/><rect x="139" y="563" width="22" height="4" rx="2" fill="#1a1c20"/>
        <circle cx="140" cy="544" r="2.4" fill="#0e0f12"/><circle cx="160" cy="544" r="2.4" fill="#0e0f12"/>
      `) +
        hsBtn('modem', 154, 24, 102, 108, 12) + hsBtn('cpu', 24, 150, 84, 84, 9) +
        hsBtn('ram', 112, 148, 64, 40, 6) + hsBtn('nand', 112, 192, 64, 42, 6) +
        anc('modem', 246, 34) + anc('cpu', 32, 160) + anc('ram', 170, 180) + anc('nand', 168, 226);
    },

    /* Cámara de vapor */
    vapor: p => {
      const lines = Array.from({ length: 52 }, (_, i) => `<line x1="0" y1="${16 + i * 4.6}" x2="${W}" y2="${16 + i * 4.6}"/>`).join('');
      return svg(`
        <defs>
          <linearGradient id="${p}cu" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ecc3a2"/><stop offset=".3" stop-color="#c88a62"/><stop offset=".55" stop-color="#e7b48e"/><stop offset=".8" stop-color="#b9774f"/><stop offset="1" stop-color="#d9a079"/>
          </linearGradient>
          <clipPath id="${p}vc"><path d="${BOARD}"/></clipPath>
        </defs>
        <path d="${BOARD}" fill="url(#${p}cu)"/>
        <g clip-path="url(#${p}vc)" stroke="rgba(255,255,255,.10)" stroke-width=".5">${lines}</g>
        <g clip-path="url(#${p}vc)"><path d="${BOARD}" fill="none" stroke="rgba(120,60,30,.30)" stroke-width="14"/></g>
        <path d="${BOARD}" fill="none" stroke="rgba(255,240,225,.8)" stroke-width=".8"/>
        <text x="200" y="198" text-anchor="middle" class="svg-t" font-size="7" fill="rgba(110,55,25,.45)" letter-spacing="2.4">VAPOR CHAMBER</text>
      `) + hsBtn('vapor', 14, 140, 252, 112, 18) + hsBtn('vapor', 146, 16, 120, 126, 18) + anc('vapor', 236, 40);
    },

    /* Batería + Taptic Engine + altavoz */
    battery: p => {
      const grill = Array.from({ length: 8 }, (_, r) => Array.from({ length: 12 }, (_, c) => `<circle cx="${186 + c * 5.4}" cy="${526 + r * 5.4}" r="1.1"/>`).join('')).join('');
      return svg(`
        <defs>${metalDefs(p)}
          <linearGradient id="${p}steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3e5e8"/><stop offset=".4" stop-color="#b9bdc2"/><stop offset=".65" stop-color="#d9dce0"/><stop offset="1" stop-color="#a9adb3"/></linearGradient>
          <linearGradient id="${p}blk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3d43"/><stop offset="1" stop-color="#17181b"/></linearGradient>
        </defs>
        <path d="M226,266 V238 h14 v28" fill="#c98a3a" opacity=".85"/>
        <rect x="222" y="226" width="22" height="14" rx="2" fill="#121316"/>
        <path d="${rr(22, 266, 236, 242, 16)}" fill="rgba(20,30,40,.35)" transform="translate(0 3)" filter="url(#${p}soft)"/>
        <path d="${rr(22, 266, 236, 242, 16)}" fill="url(#${p}steel)"/>
        <path d="${rr(22.5, 266.5, 235, 241, 15.5)}" fill="none" stroke="rgba(255,255,255,.95)"/>
        <path d="${rr(30, 274, 220, 226, 11)}" fill="none" stroke="rgba(90,100,110,.18)"/>
        <text x="44" y="306" class="svg-t" font-size="9" font-weight="600" fill="rgba(60,68,76,.6)" letter-spacing="1">Li-ion</text>
        <text x="44" y="320" class="svg-t" font-size="5.5" fill="rgba(60,68,76,.5)" letter-spacing=".8">3,88 V · CARCASA DE ACERO</text>
        <text x="44" y="330" class="svg-t" font-size="5.5" fill="rgba(60,68,76,.5)" letter-spacing=".8">CC-17 PRO MAX · PASTO, NARIÑO</text>
        <g fill="none" stroke="rgba(60,68,76,.4)" stroke-width=".8">
          <circle cx="50" cy="478" r="6"/><path d="M46,482 L54,474"/><rect x="62" y="472" width="12" height="12" rx="1.5"/><path d="M84,484 l6,-12 l6,12z"/>
        </g>
        <rect x="104" y="500" width="72" height="14" rx="3" fill="#1c1d21"/>
        <text x="140" y="509.5" text-anchor="middle" class="svg-t" font-size="4.5" fill="#8b9198" letter-spacing="1">TIRAR</text>
        <path d="${rr(26, 522, 96, 48, 8)}" fill="url(#${p}blk)"/>
        <path d="${rr(26, 522, 96, 48, 8)}" fill="none" stroke="rgba(255,255,255,.14)"/>
        <rect x="32" y="528" width="84" height="8" rx="2" fill="url(#${p}brush)"/>
        <text x="74" y="554" text-anchor="middle" class="svg-t" font-size="5.5" fill="#9aa0a7" letter-spacing="1.2">TAPTIC ENGINE</text>
        <path d="${rr(178, 516, 76, 58, 10)}" fill="url(#${p}blk)"/>
        <path d="${rr(178, 516, 76, 58, 10)}" fill="none" stroke="rgba(255,255,255,.14)"/>
        <g fill="#0a0b0d">${grill}</g>
      `) + hsBtn('battery', 22, 266, 236, 242, 16) + hsBtn('taptic', 22, 514, 236, 64, 12) +
        anc('battery', 240, 470) + anc('taptic', 34, 564);
    },

    /* Módulo de cámaras (vista trasera) */
    camera: p => {
      const unit = ([cx, cy]) => `
        <rect x="${cx - 31}" y="${cy - 29}" width="62" height="62" rx="9" fill="rgba(0,0,0,.35)" filter="url(#${p}soft)"/>
        <rect x="${cx - 31}" y="${cy - 31}" width="62" height="62" rx="9" fill="url(#${p}blk)"/>
        <rect x="${cx - 30.5}" y="${cy - 30.5}" width="61" height="61" rx="8.5" fill="none" stroke="rgba(255,255,255,.12)"/>
        ${lens(cx, cy, 24, p, false)}`;
      return svg(`
        <defs>${metalDefs(p)}
          <linearGradient id="${p}blk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34373d"/><stop offset="1" stop-color="#141518"/></linearGradient>
        </defs>
        <path d="M140,150 C170,170 200,170 214,200 V250" fill="none" stroke="#c98a3a" stroke-width="10" opacity=".8"/>
        <path d="M86,160 C90,190 120,210 150,214 H200" fill="none" stroke="#c98a3a" stroke-width="9" opacity=".7"/>
        <rect x="196" y="244" width="36" height="14" rx="2.5" fill="#121316"/>
        <path d="${rr(12, 12, 150, 166, 26)}" fill="url(#${p}brush)"/>
        <path d="${rr(12.5, 12.5, 149, 165, 25.5)}" fill="none" stroke="rgba(255,255,255,.95)"/>
        ${LENSES.map(unit).join('')}
        <rect x="229" y="34" width="24" height="26" rx="5" fill="url(#${p}blk)"/><circle cx="241" cy="47" r="7" fill="#f2ead6"/><circle cx="241" cy="47" r="3" fill="#fffaf0"/>
        <rect x="230" y="116" width="26" height="26" rx="5" fill="url(#${p}blk)"/><circle cx="243" cy="129" r="7.5" fill="#08090b"/><circle cx="241" cy="127" r="2" fill="rgba(120,90,255,.4)"/>
        <text x="87" y="172" text-anchor="middle" class="svg-t" font-size="4.5" fill="rgba(60,68,76,.6)" letter-spacing="1">48MP FUSION · ×3</text>
      `) + hsBtn('camera', 12, 12, 150, 166, 26) + anc('camera', 120, 96);
    },

    /* Carcasa trasera (fiel al 17 Pro: meseta de cámaras de lado a lado) */
    back: p => {
      const pl = `M3,${R} A${R - 3},${R - 3} 0 0 1 ${R},3 H${W - R} A${R - 3},${R - 3} 0 0 1 ${W - 3},${R} V146 A22,22 0 0 1 ${W - 25},168 H25 A22,22 0 0 1 3,146 Z`;
      return svg(`
        <defs>${metalDefs(p)}
          <linearGradient id="${p}plat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8f9"/><stop offset=".5" stop-color="#e4e6e9"/><stop offset="1" stop-color="#d5d8dc"/></linearGradient>
          <linearGradient id="${p}cer" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f4f6"/><stop offset=".6" stop-color="#e7e9ec"/><stop offset="1" stop-color="#dcdfe3"/></linearGradient>
          <linearGradient id="${p}logo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#cfd3d8"/><stop offset="1" stop-color="#f4f5f7"/></linearGradient>
        </defs>
        <path d="${rr(0, 0, W, H, R)}" fill="url(#${p}alu)"/>
        <path d="${rr(10, 178, 260, 402, 34)}" fill="url(#${p}cer)"/>
        <path d="${rr(10.5, 178.5, 259, 401, 33.5)}" fill="none" stroke="rgba(120,130,140,.18)"/>
        <path d="${pl}" fill="rgba(40,50,60,.22)" transform="translate(0 4)" filter="url(#${p}soft)"/>
        <path d="${pl}" fill="url(#${p}plat)"/>
        <path d="${pl}" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1"/>
        ${LENSES.map(([x, y]) => lens(x, y, LR, p)).join('')}
        <circle cx="241" cy="47" r="10" fill="url(#${p}ring)"/><circle cx="241" cy="47" r="8" fill="#f1ead8"/><circle cx="241" cy="47" r="3.5" fill="#fffbf2"/>
        <circle cx="241" cy="88" r="2" fill="#6d737a"/>
        <circle cx="243" cy="129" r="10.5" fill="url(#${p}ring)"/><circle cx="243" cy="129" r="8.6" fill="#0a0b0d"/><circle cx="240.5" cy="126.5" r="2.4" fill="rgba(140,110,255,.35)"/>
        <text x="140" y="398" text-anchor="middle" class="svg-t" font-size="30" font-weight="500" fill="url(#${p}logo)" stroke="rgba(150,158,166,.35)" stroke-width=".6" letter-spacing="-1">CC</text>
        <path d="${rr(0.5, 0.5, W - 1, H - 1, R - 0.5)}" fill="none" stroke="rgba(255,255,255,.95)"/>
        <path d="${rr(2.5, 2.5, W - 5, H - 5, R - 2.5)}" fill="none" stroke="rgba(120,130,140,.22)"/>
      `);
    },
  };

  /* Canto de aluminio: tiras alrededor del contorno redondeado, visibles solo con el teléfono ensamblado */
  function edgeBand() {
    const T = (LAYERS.length - 1) * STATES.assembled.gap, hw = W / 2, hh = H / 2, seg = 6, pts = [];
    const corners = [[hw - R, -hh + R, -90], [hw - R, hh - R, 0], [-hw + R, hh - R, 90], [-hw + R, -hh + R, 180]];
    corners.forEach(([cx, cy, a0]) => {
      for (let i = 0; i <= seg; i++) {
        const a = (a0 + (90 * i) / seg) * Math.PI / 180;
        pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
      }
    });
    return pts.map((A, i) => {
      const B = pts[(i + 1) % pts.length], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy);
      if (L < 0.5) return '';
      const phi = Math.atan2(-dx, dy) * 180 / Math.PI, mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
      return `<i class="edge" style="width:${T}px;height:${(L + 1).toFixed(2)}px;margin:${(-(L + 1) / 2).toFixed(2)}px 0 0 ${-T / 2}px;transform:translate3d(${mx.toFixed(2)}px,${my.toFixed(2)}px,0) rotateZ(${phi.toFixed(2)}deg) rotateY(90deg)"></i>`;
    }).join('');
  }

  /* ───────────── Escena ───────────── */
  function buildScene(host, prefix) {
    const inner = id => (id === 'back'
      ? `<div class="face f-front">${ART.back(prefix + 'back')}</div><div class="face f-rear">${ART.back(prefix + 'backr')}</div>`
      : ART[id](prefix + id));
    host.innerHTML = `<div class="cam"><div class="tilt"><div class="rig">${LAYERS.map(id =>
      `<div class="layer" data-layer="${id}">${inner(id)}</div>`).join('')}${prefix === 'l' ? edgeBand() : ''}</div></div></div>`;
    const scene = { el: host, cam: $('.cam', host), tilt: $('.tilt', host), rig: $('.rig', host), layers: {} };
    LAYERS.forEach(id => { scene.layers[id] = $(`.layer[data-layer="${id}"]`, host); });
    return scene;
  }
  let turn = 0;
  const live = buildScene($('#stage'), 'l');
  const ghost = buildScene($('#ghost'), 'g');

  function applyState(scene, mode, focusLayer) {
    const S = STATES[mode], mob = isMobile();
    const gap = mode === 'assembled' ? S.gap : (mob ? 118 : S.gap);
    const ry = (mob && mode === 'overview' ? S.ry - 6 : S.ry) + (scene === live ? turn : 0);
    const ryCss = scene === live && mode === 'assembled' ? `calc(${ry}deg + var(--spin))` : `${ry}deg`;
    scene.rig.style.transform = `rotateX(${S.rx}deg) rotateY(${ryCss}) rotateZ(${S.rz}deg)`;
    const n = LAYERS.length, fi = focusLayer ? LAYERS.indexOf(focusLayer) : -1;
    LAYERS.forEach((id, i) => {
      let z = ((n - 1) / 2 - i) * gap;
      if (fi >= 0) { if (i < fi) z += S.push; else if (i > fi) z -= S.push; else z += S.lift; }
      const el = scene.layers[id];
      el.style.transform = `translate3d(0,0,${z.toFixed(1)}px)`;
      el.classList.toggle('dim', fi >= 0 && i !== fi);
      el.classList.toggle('on', i === fi);
    });
  }

  function union(els) {
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    els.forEach(e => {
      const q = e.getBoundingClientRect();
      l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
    });
    return { left: l, top: t, width: r - l, height: b - t, cx: (l + r) / 2, cy: (t + b) / 2 };
  }
  const panelWidth = () => Math.min(620, innerWidth * 0.46) + 20;

  function camFor(mode, hs) {
    applyState(ghost, mode, hs ? HS_LAYER[hs] : null);
    const vw = innerWidth, vh = innerHeight, mob = isMobile(), C = { x: vw / 2, y: vh / 2 };
    let r, T, aw, ah, maxK;
    if (mode === 'focus') {
      r = union($$(`.hs[data-hs="${hs}"]`, ghost.el));
      if (mob) { T = { x: vw / 2, y: (vh * 0.37 + 96) / 2 }; aw = vw * 0.66; ah = vh * 0.37 - 140; }
      else { const pw = panelWidth(); T = { x: (vw - pw) / 2, y: vh / 2 + 10 }; aw = (vw - pw) * 0.62; ah = vh * 0.66; }
      maxK = 3;
    } else if (mode === 'assembled') {
      r = union(LAYERS.map(id => ghost.layers[id]));
      if (mob) { ah = Math.min(vh * 0.4, 340); T = { x: vw * 0.27, y: 82 + ah / 2 }; aw = vw * 0.46; }
      else { T = { x: vw * 0.22, y: vh / 2 + 18 }; aw = vw * 0.32; ah = vh - 250; }
      maxK = 1.3;
    } else {
      r = union(LAYERS.map(id => ghost.layers[id]));
      if (mob) { T = { x: vw / 2, y: vh * 0.47 }; aw = vw * 0.98; ah = vh * 0.6; }
      else { T = { x: vw / 2, y: vh / 2 + 4 }; aw = vw * 0.86; ah = Math.max(260, vh - 380); }
      maxK = 1.3;
    }
    const k = Math.min(maxK, aw / r.width, ah / r.height);
    return { tx: T.x - C.x - k * (r.cx - C.x), ty: T.y - C.y - k * (r.cy - C.y), k };
  }
  const setCam = c => { live.cam.style.transform = `translate(${c.tx.toFixed(1)}px,${c.ty.toFixed(1)}px) scale(${c.k.toFixed(4)})`; };

  /* ───────────── Etiquetas ───────────── */
  const labelsEl = $('#labels'), linesEl = $('#lines');
  const HS_IDS = SECTIONS.map(s => s.hs);
  labelsEl.innerHTML = HS_IDS.map(hs => {
    const s = sec(hs);
    return `<button class="lbl ${ROW[hs]}" data-hs="${hs}" style="--ac:${acc(hs)}">
      <span class="lbl-n">${pad2(IDX[hs] + 1)}</span><span class="lbl-c"><span class="lbl-t">${esc(shortName(s))}</span><span class="lbl-s">${esc(s.part)}</span></span></button>`;
  }).join('');
  linesEl.innerHTML = HS_IDS.map(hs => `<g data-hs="${hs}"><path/><circle class="halo" r="7"/><circle class="dot" r="3"/></g>`).join('');
  const LBL = {}, LINE = {}, ANC = {};
  HS_IDS.forEach(hs => {
    LBL[hs] = $(`.lbl[data-hs="${hs}"]`, labelsEl);
    LINE[hs] = $(`g[data-hs="${hs}"]`, linesEl);
    ANC[hs] = $(`.anc[data-anc="${hs}"]`, live.el);
  });

  const LW = 178, LGAP = 10;
  function layoutLabels() {
    const vw = innerWidth, vh = innerHeight;
    const topY = 100, botY = vh - 96;
    ['top', 'bottom'].forEach(row => {
      const items = HS_IDS.filter(h => ROW[h] === row).map(h => {
        const q = ANC[h].getBoundingClientRect();
        return { h, ax: q.left, ay: q.top, lx: 0 };
      }).sort((a, b) => a.ax - b.ax);
      items.forEach((it, i) => { it.lx = it.ax - 22; if (i) it.lx = Math.max(it.lx, items[i - 1].lx + LW + LGAP); });
      let maxR = vw - 28 - LW;
      for (let i = items.length - 1; i >= 0; i--) { items[i].lx = Math.min(items[i].lx, maxR); maxR = items[i].lx - LW - LGAP; }
      items.forEach(it => {
        it.lx = Math.max(28, it.lx);
        const lbl = LBL[it.h], lh = lbl.offsetHeight;
        const ly = row === 'top' ? topY : botY - lh;
        lbl.style.transform = `translate(${it.lx.toFixed(1)}px,${ly.toFixed(1)}px)`;
        const ex = it.lx + 22, ey = row === 'top' ? ly + lh : ly;
        const ky = row === 'top' ? Math.min(ey + 30, it.ay - 6) : Math.max(ey - 30, it.ay + 6);
        const g = LINE[it.h];
        g.children[0].setAttribute('d', `M${it.ax.toFixed(1)},${it.ay.toFixed(1)}L${ex.toFixed(1)},${ky.toFixed(1)}L${ex.toFixed(1)},${ey.toFixed(1)}`);
        for (const c of [g.children[1], g.children[2]]) { c.setAttribute('cx', it.ax.toFixed(1)); c.setAttribute('cy', it.ay.toFixed(1)); }
      });
    });
  }

  /* ───────────── Retícula ───────────── */
  const reticle = $('#reticle'), reticleTag = $('.reticle-tag', reticle);
  function placeReticle() {
    if (!current) return;
    const r = union($$(`.hs[data-hs="${current}"]`, live.el)), pad = 14;
    reticle.style.transform = `translate(${(r.left - pad).toFixed(1)}px,${(r.top - pad).toFixed(1)}px)`;
    reticle.style.width = `${(r.width + pad * 2).toFixed(1)}px`;
    reticle.style.height = `${(r.height + pad * 2).toFixed(1)}px`;
  }

  /* ───────────── Contenido del panel ───────────── */
  let todo;
  const need = (label, hint) => { todo.push({ label, hint }); return ''; };
  const ok = v => (Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && v !== '');
  const chips = arr => `<div class="chips">${arr.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>`;
  const ext = (href, label, cls = 'link') => `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}<span>↗</span></a>`;
  const stars = n => `<span class="stars" aria-label="${n} de 5">${Array.from({ length: 5 }, (_, i) => `<i class="${i + 1 <= Math.round(n) ? 'on' : ''}"></i>`).join('')}<b>${String(n).replace('.', ',')}</b></span>`;

  const RENDER = {
    hero(d) {
      const o = D.owner, parts = o.name.split(' ');
      const photo = d.photo
        ? `<img class="hero-photo" src="${esc(d.photo)}" alt="Foto de ${esc(o.name)}">`
        : `<div class="hero-photo is-empty" role="img" aria-label="Espacio para la foto de perfil"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="24" r="11"/><path d="M12 56c2-11 10-17 20-17s18 6 20 17"/></svg><span>Tu foto aquí</span></div>${need('Foto de perfil', 'vertical o cuadrada, mínimo 800 × 1000 px, buena luz y fondo limpio')}`;
      let h = `<div class="hero"><div class="hero-top">${photo}
        <h3 class="hero-name"><span>${esc(parts.slice(0, 2).join(' '))}</span><em>${esc(parts.slice(2).join(' '))}</em></h3></div>
        ${d.tagline ? `<p class="hero-tag">${esc(d.tagline)}</p>` : need('Frase titular', '3 a 5 palabras, ej. “Software, diseño y creatividad.”')}
        ${d.intro ? `<p class="lead">${esc(d.intro)}</p>` : need('Presentación corta', '1 o 2 líneas: qué estudias y qué te interesa crear')}`;
      d.stats.filter(s => !ok(s.value)).forEach(s => need(`Cifra: ${s.label}`, s.label === 'Inglés' ? 'nivel, ej. B1' : 'número'));
      h += `<div class="stats">${d.stats.map(s => `<div><b>${ok(s.value) ? esc(s.value) : '—'}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`;
      h += `<div class="meta-row"><span class="pin"></span>${esc(o.location)}</div>`;
      h += `<div class="actions"><button class="btn-solid" data-next>Conoce mi trabajo <span>→</span></button>${d.cv ? ext(d.cv, 'Ver CV', 'btn-glass') : need('Hoja de vida', 'archivo PDF')}</div></div>`;
      return h;
    },
    about(d) {
      return `${d.headline ? `<p class="quote">${esc(d.headline)}</p>` : need('Frase de “Sobre mí”', 'ej. “Más que código, ideas que conectan.”')}
        ${d.paragraphs.length ? d.paragraphs.map(t => `<p class="lead">${esc(t)}</p>`).join('') : need('Dos párrafos sobre ti', 'formación + qué programas y qué has construido')}
        ${d.focus.length ? chips(d.focus) : need('Tres áreas de enfoque', 'ej. Desarrollo de software · Arquitectura · IA aplicada')}`;
    },
    skills(d) {
      return `<p class="lead">${esc(d.intro)}</p><div class="grid2">${d.groups.map((g, i) => `
        <div class="card"><div class="card-k">${pad2(i + 1)}</div><h4>${esc(g.name)}</h4>
          ${g.items.length ? chips(g.items) : `<div class="chips"><span class="chip ghost">por cargar</span></div>${need(g.name, '3 a 5 herramientas')}`}
        </div>`).join('')}</div>`;
    },
    projects(d) {
      let h = d.intro ? `<p class="lead">${esc(d.intro)}</p>` : need('Introducción de proyectos', '1 línea');
      h += d.items.map((p, i) => `<article class="proj">
          <div class="proj-media">
            <div class="proj-main"><img src="${esc(p.images[0].src)}" alt="${esc(p.images[0].alt)}" data-main></div>
            <div class="proj-thumbs">${p.images.map((im, j) => `<button class="${j ? '' : 'on'}" data-img="${j}" aria-label="Ver captura ${j + 1}"><img src="${esc(im.src)}" alt="" loading="lazy"></button>`).join('')}</div>
          </div>
          <div class="proj-body">
            <div class="card-k">${pad2(i + 1)} · ${esc(p.kicker)}</div>
            <h4>${esc(p.title)}</h4>
            <p>${esc(p.description)}</p>
            ${chips(p.tech)}
            <div class="actions">${p.links.map(l => ext(l.href, l.label, l.primary ? 'btn-solid' : 'btn-glass')).join('')}</div>
          </div>
        </article>`).join('');
      if (d.emptySlots) {
        h += `<div class="grid2">${Array.from({ length: d.emptySlots }, (_, i) => `<div class="slot"><span>${pad2(d.items.length + i + 1)}</span>Ranura disponible<i>+</i></div>`).join('')}</div>`;
        for (let i = 0; i < d.emptySlots; i++) need(`Proyecto ${pad2(d.items.length + i + 1)}`, 'nombre, categoría, descripción, tecnologías, demo, repositorio, capturas');
      }
      h += d.githubAll ? ext(d.githubAll, 'Ver todos los proyectos en GitHub') : need('Enlace a todos tus repositorios', 'github.com/usuario?tab=repositories');
      return h;
    },
    timeline(d) {
      let h = `<p class="lead">${esc(d.intro)}</p>`;
      if (d.items.length) {
        h += `<ol class="tl">${d.items.map(it => `<li><div class="tl-k">${esc(it.period)}${it.kind ? ' · ' + esc(it.kind) : ''}</div><h4>${esc(it.title)}</h4><p>${esc(it.org)}${it.place ? ' · ' + esc(it.place) : ''}</p>${it.link ? ext(it.link, 'Ver certificado') : ''}</li>`).join('')}</ol>`;
      } else {
        need('Pregrado actual', 'programa, universidad, campus/ciudad, semestre');
        need('Cursos y certificados académicos', 'año, tipo, nombre, entidad, enlace o imagen del certificado');
        h += `<ol class="tl ghost"><li><div class="tl-k">Actualidad · Pregrado</div><h4>—</h4></li><li><div class="tl-k">Año · Curso</div><h4>—</h4></li></ol>`;
      }
      return h;
    },
    work(d) {
      let h = `<p class="lead">${esc(d.intro)}</p>`;
      if (d.items.length) {
        h += `<ol class="tl">${d.items.map(it => `<li><div class="tl-k">${esc(it.date)}${it.kind ? ' · ' + esc(it.kind) : ''}</div><h4>${esc(it.title)}</h4><p class="muted">${esc(it.role)}</p><p>${esc(it.description)}</p>${it.tech ? chips(it.tech) : ''}<div class="actions">${(it.links || []).map(l => ext(l.href, l.label)).join('')}</div></li>`).join('')}</ol>`;
      } else {
        need('Experiencias laborales o de proyecto', 'fechas, nombre, rol, tipo (personal/equipo/académico), descripción, tecnologías, enlaces');
        h += `<ol class="tl ghost"><li><div class="tl-k">Fecha · Tipo</div><h4>—</h4></li><li><div class="tl-k">Fecha · Tipo</div><h4>—</h4></li></ol>`;
      }
      h += d.githubAll ? ext(d.githubAll, 'Ver todos mis repositorios en GitHub') : '';
      return h;
    },
    testimonials(d) {
      if (!d.items.length) {
        need('Testimonios (3 o más)', 'nombre, cargo/profesión, texto, calificación /5, año, LinkedIn opcional');
        return `<div class="card ghost-card"><p class="quote">“Aquí aparecerán las palabras de quienes han trabajado conmigo.”</p></div>`;
      }
      return `<div class="tst">${d.items.map(t => `<figure class="card"><blockquote>“${esc(t.text)}”</blockquote>
        <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span>${t.link ? ext(t.link, 'LinkedIn') : ''}</figcaption>
        <div class="tst-f">${ok(t.rating) ? stars(t.rating) : ''}<span>${esc(t.year || '')}</span></div></figure>`).join('')}</div>`;
    },
    more(d) {
      const hints = {
        'Música / pasión principal': 'texto, instrumentos o habilidades, grupos (nombre, rol, género, Instagram), reconocimientos',
        'Arte, escritura o dibujo': 'texto + enlace a tu perfil',
        Deportes: 'qué practicas',
        Mascotas: 'texto + foto opcional',
        Lectura: 'texto + 3 libros (título, autor)',
      };
      let h = d.intro ? `<p class="lead">${esc(d.intro)}</p>` : need('Introducción de pasatiempos', '1 línea');
      h += `<div class="grid2">${d.blocks.map(b => {
        if (!b.text) { need(b.title, hints[b.title] || 'texto'); return `<div class="card"><h4>${esc(b.title)}</h4><p class="muted">Por contar</p></div>`; }
        return `<div class="card"><h4>${esc(b.title)}</h4><p>${esc(b.text)}</p>${b.tags && b.tags.length ? chips(b.tags) : ''}
          ${(b.groups || []).map(g => `<div class="mini"><strong>${esc(g.name)}</strong><span>${esc(g.role)} · ${esc(g.genre)}</span>${g.link ? ext(g.link, 'Instagram') : ''}</div>`).join('')}
          ${(b.books || []).map(k => `<div class="mini"><strong>${esc(k.title)}</strong><span>${esc(k.author)}</span></div>`).join('')}
          ${b.link ? ext(b.link, 'Ver perfil') : ''}</div>`;
      }).join('')}</div>`;
      return h;
    },
    learning(d) {
      let h = `<h5 class="sub">Idiomas</h5><div class="grid2">${d.languages.map(l => `<div class="card lang"><h4>${esc(l.name)}</h4><b>${ok(l.level) ? esc(l.level) : '—'}</b></div>`).join('')}</div>`;
      d.languages.filter(l => !ok(l.level)).forEach(l => need(`Nivel de ${l.name}`, 'ej. A2, B1, B2'));
      h += `<h5 class="sub">Comunicación y otras experiencias</h5>`;
      h += d.experiences.length ? `<ol class="tl">${d.experiences.map(e => `<li><div class="tl-k">${esc(e.year)} · ${esc(e.kind)}</div><h4>${esc(e.title)}</h4><p>${esc(e.org)}</p></li>`).join('')}</ol>`
        : `<p class="muted">Por cargar</p>${need('Otras experiencias', 'monitorías, audiovisual, moderación, voluntariado: año, título, entidad, tipo')}`;
      h += `<h5 class="sub">Certificados adicionales</h5>`;
      h += d.certificates.length ? `<ol class="tl">${d.certificates.map(c => `<li><div class="tl-k">${esc(c.year)}</div><h4>${esc(c.title)}</h4><p>${esc(c.org)}</p>${c.link ? ext(c.link, 'Ver certificado') : ''}</li>`).join('')}</ol>`
        : `<p class="muted">Por cargar</p>${need('Certificados adicionales', 'año, nombre, entidad, archivo (imagen o PDF)')}`;
      return h;
    },
    contact(d) {
      const rows = [['Correo', d.email, d.email ? 'mailto:' + d.email : null], ['LinkedIn', d.linkedin, d.linkedin], ['GitHub', d.github, d.github], ['Instagram', d.instagram, d.instagram]];
      let h = d.text ? `<p class="lead">${esc(d.text)}</p>` : need('Frase de contacto', 'sobre qué estás abierto a conversar');
      h += `<div class="rows">${rows.map(([k, v, href]) => v
        ? `<a class="row" href="${esc(href)}" target="_blank" rel="noopener"><em>${k}</em><span>${esc(v.replace(/^https?:\/\/(www\.)?/, ''))}</span><b>↗</b></a>`
        : `<div class="row"><em>${k}</em><span class="muted">Por configurar</span></div>${need(k, k === 'Correo' ? 'correo de contacto' : 'enlace al perfil')}`).join('')}</div>`;
      h += `<p class="fine">© ${new Date().getFullYear()} ${esc(D.owner.name)} · Diseñado y desarrollado en Pasto, Colombia.</p>`;
      return h;
    },
  };

  function renderSection(s) {
    todo = [];
    const html = RENDER[s.type](s.data, s);
    return { html, todo: todo.slice() };
  }
  const STATUS = SECTIONS.map(renderSection);

  const panel = $('#panel'), pnBody = $('#pnBody'), pnScroll = $('#pnScroll');
  function renderPanel(hs) {
    const s = sec(hs), i = IDX[hs], n = SECTIONS.length, st = renderSection(s);
    panel.style.setProperty('--ac', acc(hs));
    $('#pnCode').textContent = `${pad2(i + 1)} · ${s.part}`;
    $('#pnEyebrow').textContent = s.eyebrow;
    $('#pnTitle').textContent = s.title;
    pnBody.innerHTML = st.html + (st.todo.length ? `<div class="todo"><div class="todo-h"><span class="pulse"></span>Por completar <b>${st.todo.length}</b></div><ul>${st.todo.map(t => `<li><strong>${esc(t.label)}</strong><span>${esc(t.hint)}</span></li>`).join('')}</ul></div>` : '');
    $('#pnCount').textContent = `${pad2(i + 1)} / ${pad2(n)}`;
    $('#pnPrev em').textContent = shortName(SECTIONS[(i - 1 + n) % n]);
    $('#pnNext em').textContent = shortName(SECTIONS[(i + 1) % n]);
    pnScroll.scrollTop = 0;
    reticleTag.textContent = s.part;
  }

  /* ───────────── Estado ───────────── */
  let mode = 'assembled', current = null, hot = null;
  const body = document.body;

  function setHot(hs) {
    if (hot === hs) return;
    if (hot) { $$(`[data-hs="${hot}"]`).forEach(e => e.classList.remove('is-hot')); live.layers[HS_LAYER[hot]].classList.remove('hot'); }
    hot = hs;
    if (hs) { $$(`[data-hs="${hs}"]`).forEach(e => e.classList.add('is-hot')); live.layers[HS_LAYER[hs]].classList.add('hot'); }
  }
  const spinning = () => live.rig.classList.contains('spin');
  let spinT;
  function startSpin() {
    clearTimeout(spinT);
    spinT = setTimeout(() => { if (mode === 'assembled') live.rig.classList.add('spin'); }, 1450);
  }
  function stopSpin() {
    clearTimeout(spinT);
    if (!spinning()) return;
    const a = parseFloat(getComputedStyle(live.rig).getPropertyValue('--spin')) || 0;
    const S = STATES.assembled, cur = S.ry + turn + a;
    live.rig.style.transition = 'none';
    live.rig.style.transform = `rotateX(${S.rx}deg) rotateY(${cur}deg) rotateZ(${S.rz}deg)`;
    live.rig.classList.remove('spin');
    void live.rig.offsetWidth;
    live.rig.style.transition = '';
    turn = 360 * Math.round(cur / 360);
  }
  function setMode(m) {
    if (m === 'assembled') startSpin(); else stopSpin();
    mode = m;
    body.classList.toggle('is-focus', m === 'focus');
    body.classList.toggle('is-assembled', m === 'assembled');
    $('#btnAssemble').textContent = m === 'assembled' ? 'Desensamblar' : 'Ensamblar';
  }
  function closePanel() { panel.classList.remove('is-open'); panel.setAttribute('aria-hidden', 'true'); }

  function overview() {
    current = null; setMode('overview');
    $$('.hs.is-focus, .dock button.on').forEach(e => e.classList.remove('is-focus', 'on'));
    applyState(live, 'overview'); setCam(camFor('overview')); closePanel();
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }
  function assemble() {
    current = null; setMode('assembled'); closePanel();
    applyState(live, 'assembled'); setCam(camFor('assembled'));
  }
  function focus(hs) {
    if (!sec(hs)) return;
    const switching = mode === 'focus';
    current = hs; setMode('focus'); setHot(null);
    $$('.hs.is-focus, .dock button.on').forEach(e => e.classList.remove('is-focus', 'on'));
    $$(`.hs[data-hs="${hs}"]`).forEach(e => e.classList.add('is-focus'));
    const db = $(`.dock button[data-hs="${hs}"]`);
    if (db) { db.classList.add('on'); db.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); }
    applyState(live, 'focus', HS_LAYER[hs]); setCam(camFor('focus', hs));
    if (switching) {
      panel.classList.add('swap');
      setTimeout(() => { renderPanel(hs); panel.classList.remove('swap'); }, 260);
    } else {
      renderPanel(hs); panel.classList.add('is-open'); panel.setAttribute('aria-hidden', 'false');
    }
    history.replaceState(null, '', '#' + sec(hs).key);
  }
  const step = d => { const n = SECTIONS.length, i = current ? IDX[current] : -1; focus(SECTIONS[(i + d + n) % n].hs); };

  /* ───────────── Medidor + dock ───────────── */
  const doneCount = STATUS.filter(s => !s.todo.length).length;
  $('#meter').innerHTML = `<span class="meter-txt">Contenido <b>${doneCount}/${SECTIONS.length}</b></span><span class="meter-bar">${SECTIONS.map((s, i) =>
    `<i class="${!STATUS[i].todo.length ? 'done' : ''}" title="${esc(shortName(s))} · ${STATUS[i].todo.length ? STATUS[i].todo.length + ' pendientes' : 'completo'}"></i>`).join('')}</span>`;
  $('#dock').innerHTML = SECTIONS.map((s, i) => `<button data-hs="${s.hs}"><span>${pad2(i + 1)}</span>${esc(shortName(s))}</button>`).join('');

  /* ───────────── Eventos ───────────── */
  document.addEventListener('pointerover', e => {
    if (mode === 'focus' || e.pointerType === 'touch') return;
    const t = e.target.closest('[data-hs]');
    setHot(t ? t.dataset.hs : null);
  });
  document.addEventListener('click', e => {
    const img = e.target.closest('[data-img]');
    if (img) {
      const card = img.closest('.proj');
      $('[data-main]', card).src = $('img', img).getAttribute('src');
      $$('[data-img]', card).forEach(b => b.classList.toggle('on', b === img));
      return;
    }
    if (e.target.closest('[data-next]')) { step(1); return; }
    if (e.target.closest('[data-home]')) { e.preventDefault(); if (mode !== 'assembled') assemble(); return; }
    if (e.target.closest('[data-explore]')) { overview(); return; }
    const t = e.target.closest('[data-hs]');
    if (t && !t.closest('.panel')) { focus(t.dataset.hs); return; }
    if (mode === 'focus' && e.target.closest('#stage')) overview();
  });
  $('#pnClose').addEventListener('click', overview);
  $('#pnPrev').addEventListener('click', () => step(-1));
  $('#pnNext').addEventListener('click', () => step(1));
  $('#btnTour').addEventListener('click', () => focus(SECTIONS[0].hs));
  $('#btnAssemble').addEventListener('click', () => (mode === 'assembled' ? overview() : assemble()));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mode !== 'overview') overview();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const mx = e.clientX / innerWidth - 0.5, my = e.clientY / innerHeight - 0.5;
    live.tilt.style.transform = mode === 'focus' ? '' : `rotateX(${(-my * 4).toFixed(2)}deg) rotateY(${(mx * 7).toFixed(2)}deg)`;
  });
  let rzT;
  addEventListener('resize', () => {
    clearTimeout(rzT);
    rzT = setTimeout(() => {
      body.classList.add('no-anim');
      if (mode === 'focus') { applyState(live, 'focus', HS_LAYER[current]); setCam(camFor('focus', current)); }
      else { applyState(live, mode); setCam(camFor(mode)); }
      requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove('no-anim')));
    }, 80);
  });

  function tick() {
    if (mode === 'overview' && !isMobile()) layoutLabels();
    if (mode === 'focus') placeReticle();
    requestAnimationFrame(tick);
  }

  /* ───────────── Portada ───────────── */
  (() => {
    const o = D.owner, h = sec('display').data, parts = o.name.split(' ');
    $('#ih').innerHTML = `
      <div class="ih-wrap">
        <div class="ih-text">
          <p class="ih-eyebrow">Portafolio · ${esc((o.location || '').split(',').slice(0, 2).join(','))}</p>
          <h1 class="ih-name"><span>${esc(parts.slice(0, 2).join(' '))}</span><span>${esc(parts.slice(2).join(' '))}</span></h1>
          ${h.tagline ? `<p class="ih-tag">${esc(h.tagline)}</p>` : ''}
          ${h.intro ? `<p class="ih-lead">${esc(h.intro)}</p>` : ''}
          <div class="actions">
            <button class="btn-solid" data-explore>Ver por dentro <span>→</span></button>
            <button class="btn-glass" data-hs="display">Conóceme</button>
          </div>
        </div>
        <figure class="ih-photo">${h.photo
          ? `<img src="${esc(h.photo)}" alt="Foto de ${esc(o.name)}">`
          : `<div class="ih-ph" role="img" aria-label="Espacio para la foto de perfil"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="24" r="11"/><path d="M12 56c2-11 10-17 20-17s18 6 20 17"/></svg><span>Tu foto aquí</span></div>`}</figure>
      </div>`;
  })();

  /* ───────────── Reloj de la pantalla ───────────── */
  function clock() {
    const now = new Date(), t = fmtTime(now), d = fmtDay(now);
    $$('[data-clock]').forEach(e => { if (e.textContent !== t) e.textContent = t; });
    $$('[data-day]').forEach(e => { if (e.textContent !== d) e.textContent = d; });
    setTimeout(clock, 1000 - now.getMilliseconds() + 20);
  }
  clock();

  /* ───────────── Tema claro / oscuro ───────────── */
  const themeBtn = $('#btnTheme'), themeMeta = $('meta[name="theme-color"]');
  let themeT;
  function setTheme(t, save) {
    document.documentElement.dataset.theme = t;
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
    themeMeta.setAttribute('content', t === 'dark' ? '#0f171c' : '#93a8b2');
    if (save) try { localStorage.setItem('cc-theme', t); } catch (e) { /* sin almacenamiento */ }
  }
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  themeBtn.addEventListener('click', () => {
    body.classList.add('theme-anim');
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
    clearTimeout(themeT); themeT = setTimeout(() => body.classList.remove('theme-anim'), 700);
  });

  /* ───────────── Intro ───────────── */
  function intro() {
    body.classList.add('no-anim');
    applyState(live, 'assembled'); setCam(camFor('assembled'));
    const pct = $('.loader-pct'), t0 = performance.now(), dur = 1400;
    const load = now => {
      const p = Math.min(1, (now - t0) / dur);
      pct.textContent = Math.round(p * 100) + '%';
      body.style.setProperty('--load', p);
      if (p < 1) { requestAnimationFrame(load); return; }
      body.classList.remove('is-loading', 'no-anim');
      body.classList.add('is-intro');
      setMode('assembled');
      const target = SECTIONS.find(s => '#' + s.key === location.hash);
      if (target) setTimeout(() => focus(target.hs), 600);
      setTimeout(() => body.classList.remove('is-intro'), 2400);
    };
    requestAnimationFrame(load);
    tick();
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(intro);
})();
