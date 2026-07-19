const TEST_SCREENS = new Set(['intro', 'quiz', 'results']);

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
