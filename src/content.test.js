import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { FIGURES } from './figures.js';
import { QUESTIONS } from './questions.js';
import { testLanding } from './state.js';

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

  it('scores every figure against every current question', () => {
    const ids = QUESTIONS.map((question) => question.id);
    for (const figure of FIGURES) {
      expect(
        ids.filter((id) => !(id in figure.answers)),
        `${figure.name} has unanswered current items`,
      ).toEqual([]);
    }
  });

  it('returns saved reference pages to the correct Test screen', () => {
    const count = QUESTIONS.length;
    expect(testLanding({ screen: 'factions', idx: 0, answers: {} }, count)).toBe('intro');
    expect(testLanding({ screen: 'figures', idx: 8, answers: { e01: 2 } }, count)).toBe('quiz');
    expect(testLanding({ screen: 'board', testScreen: 'results', idx: count - 1, answers: {} }, count)).toBe('results');
  });
});
