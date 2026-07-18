// Question-differentiation analysis over the figure bank.
// Usage: node docs/figures/analyze.mjs
import { FIGURES } from '../../src/figures.js';
import { QUESTIONS } from '../../src/questions.js';
import { score, quadrant } from '../../src/scoring.js';

const rows = QUESTIONS.map((q) => {
  const vals = FIGURES.map((f) => f.answers[q.id]).filter((v) => typeof v === 'number');
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
  const zeros = vals.filter((v) => v === 0).length;
  // correlation of this item's answers with overall x and y
  const pts = FIGURES.map((f) => ({ v: f.answers[q.id], ...score(f.answers, QUESTIONS) }));
  const corr = (key) => {
    const xs = pts.map((p) => p.v), ys = pts.map((p) => p[key]);
    const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length;
    let num = 0, dx = 0, dy = 0;
    for (let i = 0; i < xs.length; i++) { num += (xs[i] - mx) * (ys[i] - my); dx += (xs[i] - mx) ** 2; dy += (ys[i] - my) ** 2; }
    return dx && dy ? num / Math.sqrt(dx * dy) : 0;
  };
  return { id: q.id, dim: q.dim, mean: r2(mean), sd: r2(sd), zeros, rx: r2(corr('x')), ry: r2(corr('y')), text: q.text.slice(0, 70) };
});

console.log('id   dim     mean   sd  zeros   r(x)   r(y)  text');
for (const r of rows.sort((a, b) => a.sd - b.sd))
  console.log(`${r.id}  ${r.dim.padEnd(6)} ${String(r.mean).padStart(5)} ${String(r.sd).padStart(4)}   ${String(r.zeros).padStart(2)}   ${String(r.rx).padStart(5)} ${String(r.ry).padStart(5)}  ${r.text}`);

console.log('\n— figure placements —');
for (const f of FIGURES) {
  const p = score(f.answers, QUESTIONS);
  console.log(`${f.name.padEnd(26)} x=${String(p.x).padStart(6)} y=${String(p.y).padStart(6)}  ${quadrant(p)}`);
}

// nearest-neighbor crowding
console.log('\n— closest pairs (map distance) —');
const placed = FIGURES.map((f) => ({ n: f.name, ...score(f.answers, QUESTIONS) }));
const pairs = [];
for (let i = 0; i < placed.length; i++)
  for (let j = i + 1; j < placed.length; j++)
    pairs.push({ a: placed[i].n, b: placed[j].n, d: r2(Math.hypot(placed[i].x - placed[j].x, placed[i].y - placed[j].y)) });
for (const p of pairs.sort((a, b) => a.d - b.d).slice(0, 12)) console.log(`${p.d}  ${p.a} ↔ ${p.b}`);

function r2(n) { return Math.round(n * 100) / 100; }
