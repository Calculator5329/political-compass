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

export function drawCompass(canvas, point /* {x,y} in [-10,10] or null */, marks = []) {
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
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.font = `${Math.round(s * 0.042)}px ${th.font}`;
  ctx.fillText('Insurgent', c, pad - s * 0.032);
  ctx.fillText('Institutionalist', c, s - pad + s * 0.055);
  ctx.save();
  ctx.translate(pad - s * 0.035, c);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Left', 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(s - pad + s * 0.035, c);
  ctx.rotate(Math.PI / 2);
  ctx.fillText('Right', 0, 0);
  ctx.restore();

  // labeled marks (figures / leaderboard dots)
  if (marks.length) {
    ctx.font = `${Math.max(11, Math.round(s * 0.026))}px ${th.font}`;
    for (const m of marks) {
      const mx = c + (m.x / 10) * half;
      const my = c - (m.y / 10) * half;
      ctx.fillStyle = alpha(th.accent, m.label ? 0.85 : 0.5);
      ctx.beginPath();
      ctx.arc(mx, my, m.label ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fill();
      if (m.label) {
        ctx.fillStyle = INK;
        const flip = mx > s - pad - s * 0.14;
        ctx.textAlign = flip ? 'right' : 'left';
        ctx.fillText(m.label, mx + (flip ? -8 : 8), my + 4);
      }
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
