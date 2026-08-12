import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { BLURBS } from './blurbs.js';
import { FIGURES } from './figures.js';
import { MODES, figuresInMode } from './modes.js';
import { PRINCIPLE_PAIRS, QUESTIONS } from './questions.js';
import { score, scoreFigure } from './scoring.js';
import {
  backfillStoredSubscores,
  legacySubscores,
  migrateGrownBank,
  migrateLegacyState,
  rowsWithSubscores,
  splitLeaderboardRows,
  testLanding,
} from './state.js';

const srcDir = dirname(fileURLToPath(import.meta.url));
const siteFiles = [
  join(srcDir, '..', 'index.html'),
  ...readdirSync(srcDir)
    .filter((name) => /\.(?:css|js)$/.test(name))
    .map((name) => join(srcDir, name)),
];

describe('site copy', () => {
  it('contains no em dashes', () => {
    for (const path of siteFiles) {
      expect(readFileSync(path, 'utf8'), path).not.toContain('\u2014');
    }
  });

  it('scores every figure against every researched question', () => {
    // Wave-2 items ship `pending` until the dossier research pass covers
    // them; everything else must be answered by every figure.
    const ids = QUESTIONS.filter((question) => !question.pending)
      .map((question) => question.id);
    for (const figure of FIGURES) {
      expect(
        ids.filter((id) => !(id in figure.answers)),
        `${figure.name} has unanswered current items`,
      ).toEqual([]);
    }
  });

  it('keeps principle pairs mirrored and figure scores immune to pending items', () => {
    const byId = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
    for (const [aId, bId] of PRINCIPLE_PAIRS) {
      const a = byId[aId];
      const b = byId[bId];
      expect(a, aId).toBeTruthy();
      expect(b, bId).toBeTruthy();
      // Mirrored statements must pull opposite ways on the system axis.
      expect(Math.sign(a.w.y) * Math.sign(b.w.y), `${aId}/${bId}`).toBe(-1);
    }
    // A figure answering only researched items scores identically whether or
    // not the pending wave exists: no drift toward the center as the bank grows.
    const researched = QUESTIONS.filter((q) => !q.pending);
    const figure = FIGURES[0];
    expect(scoreFigure(figure.answers, QUESTIONS))
      .toEqual(score(figure.answers, researched));
  });

  it('keeps the second full-instrument research corrections wired in', () => {
    const expected = {
      newsom: { e03: 1, e12: -2, y15: 2, f01: -1, f02: -1 },
      harris: { f01: -1 },
      rogan: { e13: 0, y03: -2 },
      rfk: { e13: 0 },
      hutch: { e13: 0 },
      desantis: { y14: -1 },
      warren: { y15: 2 },
      mtg: { y13: -2 },
      shapiro: { y15: -1 },
      kirk: { y14: -2, f01: 2 },
      ramaswamy: { f01: 2, f02: -2 },
    };
    for (const [slug, answers] of Object.entries(expected)) {
      expect(FIGURES.find((figure) => figure.slug === slug)?.answers, slug)
        .toMatchObject(answers);
    }
  });

  it('gives every figure a unique slug, a blurb, and an evidence dossier', () => {
    const slugs = FIGURES.map((figure) => figure.slug);
    expect(new Set(slugs).size, 'duplicate slug').toBe(slugs.length);
    const dossiers = new Set(
      readdirSync(join(srcDir, '..', 'docs', 'figures'))
        .filter((name) => name.endsWith('.md'))
        .map((name) => name.replace(/\.md$/, '')),
    );
    for (const figure of FIGURES) {
      expect(BLURBS[figure.slug], `${figure.name} has no blurb`).toBeTruthy();
      expect(dossiers.has(figure.slug), `${figure.name} has no evidence dossier`).toBe(true);
    }
  });

  it('keeps state-level figures off the national roster and on their own', () => {
    const national = figuresInMode(FIGURES, 'national');
    expect(national.filter((figure) => figure.local)).toEqual([]);
    for (const figure of FIGURES) {
      if (!figure.local) continue;
      const rosters = MODES.filter((mode) => mode.members?.includes(figure.slug));
      expect(rosters.length, `${figure.name} appears on no roster`).toBeGreaterThan(0);
    }
  });

  it('orders a roster as written and ignores slugs with no figure yet', () => {
    // Deliberately reversed against the roster order, so a filter that merely
    // preserved the figures.js order would fail here.
    const figures = [{ slug: 'z', local: true }, { slug: 'b' }, { slug: 'a' }];
    MODES.push({ id: 'test-roster', members: ['a', 'missing', 'z'] });
    try {
      expect(figuresInMode(figures, 'test-roster').map((f) => f.slug)).toEqual(['a', 'z']);
      expect(figuresInMode(figures, 'national').map((f) => f.slug)).toEqual(['b', 'a']);
    } finally {
      MODES.pop();
    }
  });

  it('returns saved reference pages to the correct Test screen', () => {
    const count = QUESTIONS.length;
    expect(testLanding({ screen: 'factions', idx: 0, answers: {} }, count)).toBe('intro');
    expect(testLanding({ screen: 'figures', idx: 8, answers: { e01: 2 } }, count)).toBe('quiz');
    expect(testLanding({ screen: 'board', testScreen: 'results', idx: count - 1, answers: {} }, count)).toBe('results');
  });

  it('does not draw a saved current result twice on the leaderboard', () => {
    const rows = [{ id: 'mine' }, { id: 'other' }];
    expect(splitLeaderboardRows(rows, 'mine')).toEqual({
      ownRow: rows[0],
      dotRows: [rows[1]],
    });
    expect(splitLeaderboardRows(rows, null)).toEqual({
      ownRow: null,
      dotRows: rows,
    });
  });

  it('limits the second leaderboard plane to entries with both sub-scores', () => {
    const complete = { id: 'complete', es: 0, ss: -2 };
    expect(rowsWithSubscores([complete, { id: 'old' }, { id: 'partial', es: 1 }])).toEqual([complete]);
  });

  it('grows a stored 42-item state into the 54-item bank without losing anything', () => {
    const oldIds = QUESTIONS.filter((q) => !q.pending).map((q) => q.id);
    const newIds = QUESTIONS.filter((q) => q.pending).map((q) => q.id);
    const answers = Object.fromEntries(oldIds.map((id) => [id, 1]));
    const finished = migrateGrownBank(
      { order: oldIds, answers, savedId: 'mine', testScreen: 'results', idx: 41 },
      QUESTIONS,
      newIds,
    );
    expect(finished.order).toEqual([...oldIds, ...newIds]);
    expect(finished.savedId).toBe('mine');
    expect(finished.idx).toBe(oldIds.length); // lands on the first new item
    expect(finished.screen).toBe('quiz');
    const midway = migrateGrownBank(
      { order: oldIds, answers: { e01: 2 }, idx: 7 },
      QUESTIONS,
      newIds,
    );
    expect(midway.idx).toBe(7);
    // A pre-42 legacy state (contains retired ids) is not this migration's job.
    expect(migrateGrownBank({ order: ['e06'], answers: {} }, QUESTIONS, newIds)).toBeNull();
  });

  it('recovers exact legacy sub-scores from preserved browser answers', () => {
    expect(legacySubscores({ e01: 2, s01: 2 })).toEqual({ es: 0.71, ss: -1.01 });
    const migrated = migrateLegacyState(
      { order: Array(36).fill('old'), answers: { e01: 2, s01: 2 }, savedId: 'mine' },
      { order: Array(42).fill('new'), answers: {} },
    );
    expect(migrated.legacySavedSubscores).toEqual({ es: 0.71, ss: -1.01 });
    expect(migrated.savedId).toBe('mine');
  });

  it('backfills only the matching legacy row and preserves recorded scores', () => {
    const rows = [
      { id: 'mine', name: 'Me' },
      { id: 'recorded', es: 3, ss: 4 },
      { id: 'unknown' },
    ];
    const result = backfillStoredSubscores(rows, {
      savedId: 'mine',
      legacySavedSubscores: { es: -1.2, ss: 2.4 },
    });
    expect(result[0]).toMatchObject({ es: -1.2, ss: 2.4, recoveredSubscores: true });
    expect(result[1]).toBe(rows[1]);
    expect(result[2]).toBe(rows[2]);
  });
});
