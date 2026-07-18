// Hand-drawn compass chart on canvas. Ink on paper: slightly wavering lines,
// a faint rose, quadrant wash, and a red-ink ✕ for the result.

// Palette comes off the body's theme tokens so the chart restyles with the page.
function theme() {
  const cs = getComputedStyle(document.body);
  const t = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  return {
    ink: t('--ink', '#2b2620'),
    accent: t('--accent', '#7a1f1f'),
    font: t('--chart-font', "'IM Fell English SC', serif"),
    wobbleAmp: parseFloat(t('--chart-wobble', '1.6')) || 0,
    washes: [t('--wash-tl', 'rgba(0,0,0,0.04)'), t('--wash-tr', 'rgba(0,0,0,0.04)'),
             t('--wash-bl', 'rgba(0,0,0,0.04)'), t('--wash-br', 'rgba(0,0,0,0.04)')],
  };
}

let AMP = 1.6;

// Deterministic wobble so redraws don't shimmer.
function wobble(i) {
  return Math.sin(i * 12.9898) * AMP;
}

function waveringLine(ctx, x1, y1, x2, y2, segments = 24) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  const dx = (x2 - x1) / segments;
  const dy = (y2 - y1) / segments;
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  for (let i = 1; i <= segments; i++) {
    const w = i === segments ? 0 : wobble(i + x1 + y2);
    ctx.lineTo(x1 + dx * i + nx * w, y1 + dy * i + ny * w);
  }
  ctx.stroke();
}

export function drawCompass(canvas, point /* {x,y} in [-10,10] or null */, marks = [], opts = {}) {
  const th = theme();
  AMP = th.wobbleAmp;
  const INK = th.ink;
  const INK_FAINT = alpha(INK, 0.35);
  const INK_GHOST = alpha(INK, 0.14);
  const ctx = canvas.getContext('2d');
  const dpr = canvas.width / canvas.clientWidth || 1;
  ctx.save();
  ctx.scale(dpr, dpr);
  const s = canvas.clientWidth;
  const pad = s * 0.115;
  const c = s / 2;
  const half = c - pad;

  ctx.clearRect(0, 0, s, s);

  // quadrant washes — barely-there pigment
  const washes = [
    [th.washes[0], pad, pad],
    [th.washes[1], c, pad],
    [th.washes[2], pad, c],
    [th.washes[3], c, c],
  ];
  for (const [color, x, y] of washes) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, half, half);
  }

  // faction territories — translucent pigment ellipses, clipped to the plot
  if (opts.regions?.length) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pad, pad, half * 2, half * 2);
    ctx.clip();
    for (const rg of opts.regions) {
      const cx = c + (rg.x / 10) * half;
      const cy = c - (rg.y / 10) * half;
      const rx = (rg.rx / 10) * half;
      const ry = (rg.ry / 10) * half;
      ctx.fillStyle = rg.fill;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rg.rot ?? 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = rg.stroke ?? alpha(INK, 0.2);
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    // labels after every fill so overlapping territories can't swallow them
    ctx.textAlign = 'center';
    ctx.font = `${Math.max(10, Math.round(s * 0.024))}px ${th.font}`;
    for (const rg of opts.regions) {
      if (!rg.label) continue;
      const cx = c + (rg.x / 10) * half;
      const cy = c - (rg.y / 10) * half;
      const ry = (rg.ry / 10) * half;
      ctx.fillStyle = rg.ink ?? alpha(INK, 0.7);
      ctx.fillText(rg.label, cx, rg.labelAt === 'center' ? cy : cy - ry - 5);
    }
    ctx.restore();
  }

  // faint ring grid + rose
  ctx.strokeStyle = INK_GHOST;
  ctx.lineWidth = 1;
  for (const r of [0.33, 0.66, 1]) {
    ctx.beginPath();
    ctx.arc(c, c, half * r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // rose points (8 short radial ticks)
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const r1 = i % 2 === 0 ? half * 0.1 : half * 0.06;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r1 * 0.35, c + Math.sin(a) * r1 * 0.35);
    ctx.lineTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
    ctx.strokeStyle = INK_FAINT;
    ctx.stroke();
  }

  // axes
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.4;
  waveringLine(ctx, c, pad, c, s - pad);
  waveringLine(ctx, pad, c, s - pad, c);

  // axis end ticks
  ctx.lineWidth = 1.2;
  for (const [x, y, horiz] of [[c, pad, true], [c, s - pad, true], [pad, c, false], [s - pad, c, false]]) {
    ctx.beginPath();
    if (horiz) { ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y); }
    else { ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); }
    ctx.stroke();
  }

  // labels
  const axisLabels = opts.labels ?? {
    top: 'Insurgent', bottom: 'Institutionalist', left: 'Left', right: 'Right',
  };
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.font = `${Math.round(s * 0.042)}px ${th.font}`;
  ctx.fillText(axisLabels.top, c, pad - s * 0.032);
  ctx.fillText(axisLabels.bottom, c, s - pad + s * 0.055);
  ctx.save();
  ctx.translate(pad - s * 0.035, c);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(axisLabels.left, 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(s - pad + s * 0.035, c);
  ctx.rotate(Math.PI / 2);
  ctx.fillText(axisLabels.right, 0, 0);
  ctx.restore();

  // labeled marks (figures / leaderboard dots) with label de-overlap:
  // each label tries eight anchor positions around its dot (right/left ×
  // mid/up/down, then above/below-centred) and takes the first that collides
  // with no placed label and no dot; failing all, it slides downward on a
  // faint leader line.
  if (marks.length) {
    const dense = marks.length > 30;
    const fs = Math.max(dense ? 10 : 11, Math.round(s * (dense ? 0.022 : 0.026)));
    ctx.font = `${fs}px ${th.font}`;
    const items = marks.map((m) => ({
      m,
      mx: c + (m.x / 10) * half,
      my: c - (m.y / 10) * half,
    }));
    for (const it of items) {
      ctx.fillStyle = alpha(th.accent, it.m.label ? 0.85 : 0.5);
      ctx.beginPath();
      ctx.arc(it.mx, it.my, it.m.label ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fill();
    }
    const placed = items.map((it) => ({ x1: it.mx - 6, x2: it.mx + 6, y1: it.my - 6, y2: it.my + 6 }));
    const hits = (r) => placed.some((p) => r.x1 < p.x2 && r.x2 > p.x1 && r.y1 < p.y2 && r.y2 > p.y1);
    const box = (lx, ly, w) => ({ x1: lx - 2, x2: lx + w + 2, y1: ly - fs, y2: ly + 3 });
    ctx.textAlign = 'left';
    for (const it of items.filter((i) => i.m.label).sort((a, b) => a.my - b.my || a.mx - b.mx)) {
      const w = ctx.measureText(it.m.label).width;
      const right = it.mx + 9;
      const left = it.mx - 9 - w;
      const mid = it.my + fs * 0.35;
      const candidates = [
        [right, mid], [left, mid],
        [right, it.my - fs * 0.55], [left, it.my - fs * 0.55],
        [right, it.my + fs * 1.15], [left, it.my + fs * 1.15],
        [it.mx - w / 2, it.my - 8], [it.mx - w / 2, it.my + 8 + fs * 0.7],
      ].filter(([lx]) => lx >= pad * 0.25 && lx + w <= s - pad * 0.25);
      let spot = candidates.find(([lx, ly]) => !hits(box(lx, ly, w)));
      let leader = false;
      if (!spot) {
        const flip = it.mx + 10 + w > s - pad * 0.4;
        const lx = flip ? left : right;
        let ly = mid;
        let guard = 0;
        while (guard++ < 60 && hits(box(lx, ly, w))) ly += 3;
        spot = [lx, ly];
        leader = ly - it.my > fs;
      }
      const [lx, ly] = spot;
      placed.push(box(lx, ly, w));
      if (leader) {
        ctx.strokeStyle = alpha(INK, 0.3);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(it.mx, it.my + 5);
        ctx.lineTo(lx > it.mx ? lx : lx + w, ly - fs * 0.35);
        ctx.stroke();
      }
      ctx.fillStyle = INK;
      ctx.fillText(it.m.label, lx, ly);
    }
    ctx.textAlign = 'center';
  }

  // result mark: red-ink ✕ with a blot
  if (point) {
    const px = c + (point.x / 10) * half;
    const py = c - (point.y / 10) * half;
    ctx.strokeStyle = th.accent;
    ctx.fillStyle = alpha(th.accent, 0.25);
    ctx.beginPath();
    ctx.arc(px + 3, py + 2, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    const r = Math.max(7, s * 0.016);
    waveringLine(ctx, px - r, py - r, px + r, py + r, 6);
    waveringLine(ctx, px - r, py + r, px + r, py - r, 6);
  }

  ctx.restore();
}

// Hit-test a pointer event against mark dots, mirroring drawCompass geometry.
// Returns { mark, px, py } for the nearest mark within reach, else null.
export function hitMark(canvas, marks, ev, reach = 11) {
  const rect = canvas.getBoundingClientRect();
  const s = canvas.clientWidth;
  const pad = s * 0.115;
  const c = s / 2;
  const half = c - pad;
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;
  let best = null;
  for (const m of marks) {
    const px = c + (m.x / 10) * half;
    const py = c - (m.y / 10) * half;
    const d = Math.hypot(px - x, py - y);
    if (d <= reach && (!best || d < best.d)) best = { mark: m, px, py, d };
  }
  return best;
}

export function fitCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  canvas.width = w * dpr;
  canvas.height = w * dpr;
}

// Accepts #rgb/#rrggbb or rgb()/rgba() strings; returns rgba with the given alpha.
function alpha(color, a) {
  if (color.startsWith('#')) {
    let h = color.slice(1);
    if (h.length === 3) h = [...h].map((ch) => ch + ch).join('');
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b] = m[1].split(',').map((v) => parseFloat(v));
    return `rgba(${r},${g},${b},${a})`;
  }
  return color;
}
