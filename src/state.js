const TEST_SCREENS = new Set(['intro', 'quiz', 'results']);

// The first public ledger used the 36-item bank. Its raw answers stayed in the
// browser, so a browser that has not yet opened the 42-item release can still
// recover the exact Economic and Social scores before starting a fresh test.
const LEGACY_SUB_QUESTIONS = [
  { id: 'e01', dim: 'econ', w: { x: 0.6, y: 0.3 } },
  { id: 'e02', dim: 'econ', w: { x: -0.9, y: 0 } },
  { id: 'e03', dim: 'econ', w: { x: -0.8, y: 0.1 } },
  { id: 'e04', dim: 'econ', w: { x: 0.9, y: 0 } },
  { id: 'e05', dim: 'econ', w: { x: -0.3, y: 0.5 } },
  { id: 'e06', dim: 'econ', w: { x: 0.8, y: -0.1 } },
  { id: 'e07', dim: 'econ', w: { x: -0.7, y: 0 } },
  { id: 'e08', dim: 'econ', w: { x: 0.5, y: 0.4 } },
  { id: 'e09', dim: 'econ', w: { x: -0.7, y: 0.1 } },
  { id: 'e10', dim: 'econ', w: { x: 0.7, y: 0 } },
  { id: 'e11', dim: 'econ', w: { x: -0.7, y: -0.1 } },
  { id: 'e12', dim: 'econ', w: { x: 0.8, y: -0.1 } },
  { id: 's01', dim: 'social', w: { x: -0.8, y: 0 } },
  { id: 's02', dim: 'social', w: { x: 0.7, y: 0 } },
  { id: 's03', dim: 'social', w: { x: 0.8, y: 0.1 } },
  { id: 's04', dim: 'social', w: { x: -0.7, y: 0.1 } },
  { id: 's05', dim: 'social', w: { x: 0.7, y: 0.4 } },
  { id: 's06', dim: 'social', w: { x: -0.4, y: -0.4 } },
  { id: 's07', dim: 'social', w: { x: -0.7, y: 0 } },
  { id: 's08', dim: 'social', w: { x: 0.7, y: 0.1 } },
  { id: 's09', dim: 'social', w: { x: 0.7, y: 0.1 } },
  { id: 's10', dim: 'social', w: { x: -0.4, y: 0.2 } },
  { id: 's11', dim: 'social', w: { x: 0.7, y: 0 } },
  { id: 's12', dim: 'social', w: { x: -0.6, y: -0.1 } },
];

function axisScore(answers, questions) {
  let value = 0;
  let ceiling = 0;
  for (const question of questions) {
    ceiling += 2 * Math.abs(question.w.x);
    if (typeof answers?.[question.id] === 'number') {
      value += answers[question.id] * question.w.x;
    }
  }
  return ceiling ? Math.round(((10 * value) / ceiling) * 100) / 100 : 0;
}

export function legacySubscores(answers) {
  return {
    es: axisScore(answers, LEGACY_SUB_QUESTIONS.filter((question) => question.dim === 'econ')),
    ss: axisScore(answers, LEGACY_SUB_QUESTIONS.filter((question) => question.dim === 'social')),
  };
}

export function migrateLegacyState(stored, freshState) {
  if (!stored || !Array.isArray(stored.order) || stored.order.length !== 36) return null;
  const recovered = stored.savedId && stored.answers
    ? legacySubscores(stored.answers)
    : null;
  return {
    ...freshState,
    savedId: stored.savedId ?? null,
    legacySavedSubscores: recovered,
  };
}

// Wave-2 bank growth (42 -> 54): a browser holding answers to the old bank
// keeps every answer, its ledger signature, and its claim; the new items are
// appended to the question order (caller supplies them pre-shuffled) and the
// taker lands on the first of them instead of losing progress or diluting a
// finished score with a dozen silent skips.
export function migrateGrownBank(stored, questions, shuffledNewIds) {
  if (!stored || !Array.isArray(stored.order)) return null;
  if (stored.order.length >= questions.length) return null;
  const ids = new Set(questions.map((q) => q.id));
  if (!stored.order.every((id) => ids.has(id))) return null; // pre-42 legacy
  const oldDone =
    stored.order.every((id) => typeof stored.answers?.[id] === 'number') ||
    stored.testScreen === 'results';
  return {
    ...stored,
    order: [...stored.order, ...shuffledNewIds],
    idx: oldDone ? stored.order.length : Math.min(stored.idx ?? 0, stored.order.length - 1),
    screen: 'quiz',
    testScreen: 'quiz',
  };
}

export function backfillStoredSubscores(rows, state) {
  const recovered = state.legacySavedSubscores;
  if (!state.savedId || !recovered) return rows;
  return rows.map((row) => (
    row.id === state.savedId && !Number.isFinite(row.es) && !Number.isFinite(row.ss)
      ? { ...row, ...recovered, recoveredSubscores: true }
      : row
  ));
}

export function isTestScreen(screen) {
  return TEST_SCREENS.has(screen);
}

export function testLanding(state, questionCount) {
  if (isTestScreen(state.testScreen)) return state.testScreen;
  const answered = Object.keys(state.answers ?? {}).length;
  if (answered === questionCount || state.idx >= questionCount - 1) return 'results';
  if (state.idx > 0 || answered > 0) return 'quiz';
  return 'intro';
}

export function splitLeaderboardRows(rows, currentId) {
  const ownRow = currentId ? rows.find((row) => row.id === currentId) ?? null : null;
  return {
    ownRow,
    dotRows: ownRow ? rows.filter((row) => row.id !== ownRow.id) : rows,
  };
}

export function rowsWithSubscores(rows) {
  return rows.filter((row) => Number.isFinite(row.es) && Number.isFinite(row.ss));
}
