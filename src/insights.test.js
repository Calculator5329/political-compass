import { describe, expect, it } from 'vitest';
import {
  ballotRanking,
  compressibility,
  expectedAnswer,
  extremity,
  factionFit,
  figureMatches,
  fitQuestionModels,
  headToHead,
  heterodoxy,
  pairConsistency,
  trajectory,
} from './insights.js';
import { PRINCIPLE_PAIRS, QUESTIONS } from './questions.js';
import { scoreFigure } from './scoring.js';

// Synthetic bank: three questions, ids reused across helpers.
const QS = [
  { id: 'a', dim: 'econ', w: { x: 1, y: 0 } },
  { id: 'b', dim: 'econ', w: { x: -1, y: 0 } },
  { id: 'c', dim: 'system', w: { x: 0, y: 1 } },
];

describe('figure matching', () => {
  it('ranks by mean Likert agreement over shared items and reports receipts', () => {
    const twin = { slug: 'twin', answers: { a: 2, b: -2, c: 1 } };
    const foil = { slug: 'foil', answers: { a: -2, b: 2, c: -2 } };
    const matches = figureMatches({ a: 2, b: -2, c: 1 }, [foil, twin], QS, 3);
    expect(matches.map((m) => m.figure.slug)).toEqual(['twin', 'foil']);
    expect(matches[0].agreement).toBe(1);
    expect(matches[0].agrees.length).toBe(3);
    expect(matches[1].disagrees.length).toBeGreaterThan(0);
    expect(matches[1].agreement).toBeLessThan(0.2);
  });

  it('skips figures with too few shared answered items', () => {
    const sparse = { slug: 'sparse', answers: { a: 2 } };
    expect(figureMatches({ a: 2, b: 0, c: 0 }, [sparse], QS, 3)).toEqual([]);
  });
});

describe('expectation models and heterodoxy', () => {
  // Figures whose answer to `a` is exactly x/5 and to `c` exactly y/5, at
  // spread-out points, so the OLS should recover the plane near-perfectly.
  const roster = [-10, -5, 0, 5, 10].flatMap((x) => [-10, 0, 10].map((y) => ({
    slug: `f${x}_${y}`,
    pt: { x, y },
    answers: { a: x / 5, c: y / 5 },
  })));

  it('recovers a linear answer surface and flags the taker deviation', () => {
    const models = fitQuestionModels(roster, QS);
    expect(models.a.n).toBe(15);
    expect(expectedAnswer(models.a, { x: 10, y: 0 })).toBeCloseTo(2, 5);
    expect(expectedAnswer(models.a, { x: -5, y: 0 })).toBeCloseTo(-1, 5);
    // Taker at x=10 who answers `a` like someone from x=-10: max heterodoxy.
    const het = heterodoxy({ a: -2, c: 0 }, { x: 10, y: 0 }, models, QS);
    expect(het[0].q.id).toBe('a');
    expect(het[0].residual).toBeCloseTo(-4, 1);
  });

  it('scores a conforming taker as highly compressible', () => {
    const models = fitQuestionModels(roster, QS);
    const manyQs = QS.concat(
      Array.from({ length: 6 }, (_, i) => ({ id: `x${i}`, dim: 'econ', w: { x: 1, y: 0 } })),
    );
    const manyRoster = roster.map((f) => ({
      ...f,
      answers: { ...f.answers, ...Object.fromEntries(manyQs.slice(3).map((q) => [q.id, f.pt.x / 5])) },
    }));
    const fullModels = fitQuestionModels(manyRoster, manyQs);
    const conforming = { a: 2, c: 0, x0: 2, x1: 2, x2: 2, x3: 2, x4: 2, x5: 2 };
    const fit = compressibility(conforming, { x: 10, y: 0 }, fullModels, manyQs);
    expect(fit.r2).toBeGreaterThan(0.9);
    expect(models).toBeTruthy();
  });
});

describe('temperament, pairs, factions', () => {
  it('counts answer strengths and skips', () => {
    expect(extremity({ a: 2, b: 0 }, QS)).toEqual({
      strong: 1, moderate: 0, neutral: 1, skipped: 1, answered: 2,
    });
  });

  it('measures endorsement of both sides of a mirrored pair as tension', () => {
    const qs = [{ id: 'p', w: { x: 0, y: 0.7 } }, { id: 'q', w: { x: 0, y: -0.7 } }];
    const rows = pairConsistency({ p: 2, q: 2 }, qs, [['p', 'q']]);
    expect(rows[0].tension).toBe(4);
    expect(pairConsistency({ p: 2 }, qs, [['p', 'q']])).toEqual([]);
  });

  it('declares every shipped principle pair on real questions', () => {
    const ids = new Set(QUESTIONS.map((q) => q.id));
    for (const pair of PRINCIPLE_PAIRS) {
      for (const id of pair) expect(ids.has(id), id).toBe(true);
    }
  });

  it('sorts factions by normalized ellipse distance, inside first', () => {
    const factions = [
      { name: 'far', x: 8, y: 8, rx: 1, ry: 1 },
      { name: 'home', x: 0, y: 0, rx: 2, ry: 2 },
    ];
    const fit = factionFit({ x: 1, y: 0 }, factions);
    expect(fit[0].faction.name).toBe('home');
    expect(fit[0].d).toBeLessThanOrEqual(1);
    expect(fit[1].d).toBeGreaterThan(1);
  });
});

describe('ballot, head-to-head, trajectories', () => {
  it('ranks only the named roster', () => {
    const figures = [
      { slug: 'on', answers: { a: 2, b: -2, c: 2 } },
      { slug: 'off', answers: { a: 2, b: -2, c: 2 } },
    ];
    const ranked = ballotRanking({ a: 2, b: -2, c: 2 }, figures, QS, ['on'], 3);
    expect(ranked.map((r) => r.figure.slug)).toEqual(['on']);
  });

  it('sorts head-to-head rows by divergence and counts alignment', () => {
    const a = { answers: { a: 2, b: 2, c: 0 } };
    const b = { answers: { a: -2, b: 2, c: 1 } };
    const h2h = headToHead(a, b, QS);
    expect(h2h.rows[0].q.id).toBe('a');
    expect(h2h.aligned).toBe(2);
    expect(h2h.split).toBe(1);
  });

  it('scores era answer sets through the instrument', () => {
    const figure = {
      answers: { a: 2 },
      eras: [{ era: '2016', answers: { a: -2 } }],
    };
    const [past] = trajectory(figure, QS);
    expect(past.era).toBe('2016');
    expect(past.pt).toEqual(scoreFigure({ a: -2 }, QS));
    expect(past.pt.x).toBeLessThan(0);
    expect(trajectory({ answers: {} }, QS)).toEqual([]);
  });
});
