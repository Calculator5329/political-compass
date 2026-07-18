import { describe as suite, it, expect } from 'vitest';
import { QUESTIONS } from './questions.js';
import { score, subScores, quadrant } from './scoring.js';

suite('instrument', () => {
  it('has 36 questions, 12 per dimension, unique ids', () => {
    expect(QUESTIONS).toHaveLength(36);
    const byDim = {};
    for (const q of QUESTIONS) byDim[q.dim] = (byDim[q.dim] ?? 0) + 1;
    expect(byDim).toEqual({ econ: 12, social: 12, system: 12 });
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(36);
  });

  it('is roughly balanced against agree-bias on both axes', () => {
    // If someone answers "agree" to everything, they should land near center,
    // not launched into a corner.
    const all1 = Object.fromEntries(QUESTIONS.map((q) => [q.id, 1]));
    const pt = score(all1, QUESTIONS);
    expect(Math.abs(pt.x)).toBeLessThan(2);
    expect(Math.abs(pt.y)).toBeLessThan(2);
  });
});

suite('score', () => {
  it('returns 0,0 for no answers', () => {
    expect(score({}, QUESTIONS)).toEqual({ x: 0, y: 0 });
  });

  it('never exceeds ±10 even at maximum polarization', () => {
    const maxRight = Object.fromEntries(
      QUESTIONS.map((q) => [q.id, q.w.x >= 0 ? 2 : -2])
    );
    const pt = score(maxRight, QUESTIONS);
    expect(pt.x).toBeLessThanOrEqual(10);
    expect(pt.x).toBeGreaterThan(9.9); // fully polarized should hit the rim
  });

  it('skipped questions cannot inflate the score', () => {
    // Answer only one strongly-right question; ceiling still counts all 36.
    const one = { e04: 2 };
    const pt = score(one, QUESTIONS);
    expect(pt.x).toBeGreaterThan(0);
    expect(pt.x).toBeLessThan(1.5);
  });

  it('quadrant boundaries', () => {
    expect(quadrant({ x: -3, y: 4 })).toBe('Insurgent Left');
    expect(quadrant({ x: 3, y: -4 })).toBe('Institutionalist Right');
  });

  it('subScores split by dimension and cover all three', () => {
    const subs = subScores({ y05: 2 }, QUESTIONS);
    expect(Object.keys(subs).sort()).toEqual(['econ', 'social', 'system']);
    expect(subs.system.y).toBeGreaterThan(0);
    expect(subs.econ.y).toBe(0);
  });
});
