// Derived insight over answer vectors: figure matching, heterodoxy, fit,
// pairs, factions, ballots, head-to-head, trajectories. Everything here is
// pure and takes its inputs explicitly. Axis math stays in scoring.js; this
// module only ever compares answers or calls scoring helpers.

import { LIKERT, scoreFigure } from './scoring.js';

export function likertLabel(v) {
  return LIKERT.find((o) => o.v === v)?.label ?? String(v);
}

// --- full-vector figure matching -------------------------------------------
// Two people can share an (x, y) point through entirely different answers;
// matching on the shared answered items exposes that. agreement is 1 minus
// the mean absolute Likert gap over shared items, scaled to 0..1.

export function figureMatches(answers, figures, questions, minShared = 10) {
  const out = [];
  for (const figure of figures) {
    const rows = [];
    for (const q of questions) {
      const mine = answers[q.id];
      const theirs = figure.answers?.[q.id];
      if (typeof mine !== 'number' || typeof theirs !== 'number') continue;
      rows.push({ q, mine, theirs, gap: Math.abs(mine - theirs) });
    }
    if (rows.length < minShared) continue;
    const agreement =
      1 - rows.reduce((s, r) => s + r.gap, 0) / (rows.length * 4);
    rows.sort((a, b) => a.gap - b.gap || Math.abs(b.mine) - Math.abs(a.mine));
    out.push({
      figure,
      shared: rows.length,
      agreement: Math.round(agreement * 1000) / 1000,
      agrees: rows.filter((r) => r.gap <= 1 && r.mine !== 0),
      disagrees: rows.filter((r) => r.gap >= 3).reverse(),
    });
  }
  return out.sort((a, b) => b.agreement - a.agreement);
}

// --- per-question expectation models ---------------------------------------
// For each question, ordinary least squares of the figure roster's answers on
// their (x, y): v ~ a + b·x + c·y. That gives "what someone at this point on
// the map typically says" - the baseline both the heterodoxy report and the
// compressibility score measure against.

export function fitQuestionModels(placedFigures, questions) {
  const models = {};
  for (const q of questions) {
    const pts = [];
    for (const f of placedFigures) {
      const v = f.answers?.[q.id];
      if (typeof v === 'number' && f.pt) pts.push([f.pt.x, f.pt.y, v]);
    }
    if (pts.length < 8) continue;
    models[q.id] = ols3(pts);
    models[q.id].n = pts.length;
  }
  return models;
}

// Solve v ~ a + b·x + c·y by normal equations; falls back to the plain mean
// when the design is degenerate (e.g. all figures at one point).
function ols3(rows) {
  let sx = 0, sy = 0, sv = 0, sxx = 0, syy = 0, sxy = 0, sxv = 0, syv = 0;
  const n = rows.length;
  for (const [x, y, v] of rows) {
    sx += x; sy += y; sv += v;
    sxx += x * x; syy += y * y; sxy += x * y;
    sxv += x * v; syv += y * v;
  }
  const M = [
    [n, sx, sy, sv],
    [sx, sxx, sxy, sxv],
    [sy, sxy, syy, syv],
  ];
  const sol = gauss(M);
  if (!sol) return { a: sv / n, b: 0, c: 0 };
  return { a: sol[0], b: sol[1], c: sol[2] };
}

function gauss(M) {
  const m = M.map((r) => [...r]);
  for (let col = 0; col < 3; col++) {
    let piv = col;
    for (let r = col + 1; r < 3; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[piv][col])) piv = r;
    }
    if (Math.abs(m[piv][col]) < 1e-9) return null;
    [m[col], m[piv]] = [m[piv], m[col]];
    for (let r = 0; r < 3; r++) {
      if (r === col) continue;
      const k = m[r][col] / m[col][col];
      for (let cc = col; cc < 4; cc++) m[r][cc] -= k * m[col][cc];
    }
  }
  return [m[0][3] / m[0][0], m[1][3] / m[1][1], m[2][3] / m[2][2]];
}

export function expectedAnswer(model, pt) {
  const raw = model.a + model.b * pt.x + model.c * pt.y;
  return Math.max(-2, Math.min(2, raw));
}

// --- heterodoxy -------------------------------------------------------------
// Where the taker breaks from what their own map position predicts. Sorted by
// the size of the break; the UI shows the top few.

export function heterodoxy(answers, pt, models, questions) {
  const out = [];
  for (const q of questions) {
    const v = answers[q.id];
    const model = models[q.id];
    if (typeof v !== 'number' || !model) continue;
    const expected = expectedAnswer(model, pt);
    out.push({
      q,
      actual: v,
      expected: Math.round(expected * 100) / 100,
      residual: Math.round((v - expected) * 100) / 100,
    });
  }
  return out.sort((a, b) => Math.abs(b.residual) - Math.abs(a.residual));
}

// How much of the answer set the 2D point actually explains: R² of the
// taker's answers against the per-question expectations. Low is not failure;
// it means "this person does not compress to two axes."
export function compressibility(answers, pt, models, questions) {
  const rows = heterodoxy(answers, pt, models, questions);
  if (rows.length < 8) return null;
  const mean = rows.reduce((s, r) => s + r.actual, 0) / rows.length;
  const ssTot = rows.reduce((s, r) => s + (r.actual - mean) ** 2, 0);
  const ssRes = rows.reduce((s, r) => s + (r.actual - r.expected) ** 2, 0);
  if (ssTot < 1e-9) return null;
  const r2 = Math.max(0, Math.min(1, 1 - ssRes / ssTot));
  return { r2: Math.round(r2 * 100) / 100, n: rows.length };
}

// --- answer temperament -----------------------------------------------------

export function extremity(answers, questions) {
  const t = { strong: 0, moderate: 0, neutral: 0, skipped: 0, answered: 0 };
  for (const q of questions) {
    const v = answers[q.id];
    if (typeof v !== 'number') { t.skipped++; continue; }
    t.answered++;
    if (Math.abs(v) === 2) t.strong++;
    else if (Math.abs(v) === 1) t.moderate++;
    else t.neutral++;
  }
  return t;
}

// --- principle pairs --------------------------------------------------------
// Each pair states one underlying principle with the valence flipped, so a
// consistent taker's two answers should sum near zero. tension is that sum:
// +4 means strongly endorsing both opposed statements.

export function pairConsistency(answers, questions, pairs) {
  const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
  const out = [];
  for (const [aId, bId] of pairs) {
    const va = answers[aId];
    const vb = answers[bId];
    if (typeof va !== 'number' || typeof vb !== 'number') continue;
    out.push({ a: byId[aId], b: byId[bId], va, vb, tension: va + vb });
  }
  return out;
}

// --- faction fit ------------------------------------------------------------
// Normalized ellipse distance to each hand-drawn territory; d <= 1 is inside.

export function factionFit(pt, factions) {
  return factions
    .map((faction) => ({
      faction,
      d: Math.hypot((pt.x - faction.x) / faction.rx, (pt.y - faction.y) / faction.ry),
    }))
    .sort((a, b) => a.d - b.d);
}

// --- ballot mode machinery --------------------------------------------------
// Rank a named roster (e.g. the Minnesota ballot) by full-vector agreement
// with the taker. Pure ranking; what a "ballot" contains stays a roster
// question in modes.js.

export function ballotRanking(answers, figures, questions, rosterSlugs, minShared) {
  const roster = new Set(rosterSlugs);
  return figureMatches(
    answers,
    figures.filter((f) => roster.has(f.slug)),
    questions,
    minShared,
  );
}

// --- head-to-head -----------------------------------------------------------
// Every question both figures have answered, sorted by how far apart they
// land. aligned/split counts summarize the comparison.

export function headToHead(figA, figB, questions) {
  const rows = [];
  for (const q of questions) {
    const a = figA.answers?.[q.id];
    const b = figB.answers?.[q.id];
    if (typeof a !== 'number' || typeof b !== 'number') continue;
    rows.push({ q, a, b, gap: Math.abs(a - b) });
  }
  rows.sort((r1, r2) => r2.gap - r1.gap || r1.q.id.localeCompare(r2.q.id));
  return {
    rows,
    aligned: rows.filter((r) => r.gap <= 1).length,
    split: rows.filter((r) => r.gap >= 3).length,
  };
}

// --- figure trajectories ----------------------------------------------------
// A figure may carry era-stamped answer sets:
//   eras: [{ era: '2016', answers: {...}, note?, sources? }, ...]
// Each era scores through the instrument exactly like the present-day record;
// no research has been done yet, so today this returns [] for every figure.

export function trajectory(figure, questions) {
  return (figure.eras ?? []).map((era) => ({
    era: era.era,
    note: era.note ?? '',
    pt: scoreFigure(era.answers, questions),
  }));
}
