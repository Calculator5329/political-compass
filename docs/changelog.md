# Changelog

- 2026-07-18 — v0.3 LIVE at https://political-test-2026.web.app: Firestore
  leaderboard (save name+score, create-only schema-validated rules), Figures
  view — 14 public figures scored against the instrument by four parallel
  research agents from documented positions with cited sources, multi-mark
  compass rendering, tabbed nav. Firebase project political-compass-2026.

- 2026-07-18 — v0.2: five-theme system (Manuscript, Broadsheet, Terminal,
  Federal, Arcade) with per-theme tokens driving page + canvas, persisted
  switcher dock; 9 statement rewrites from Ethan's ambiguity review (concrete
  mechanisms replace bundled propositions; balance tests still green).

- 2026-07-18 — v0.1: full quiz flow (36-statement draft bank, Likert, shuffle,
  localStorage resume), scoring with skip-proof normalization + sub-dimension
  scores, hand-drawn canvas compass, ink-on-paper UI. 7 vitest tests.

## 2026-07-18 — deep-research figure pass
- 14 research agents re-verified all 28 existing figures (per-question, cite-required)
  and added 14 new ones (DeSantis, Warren, Buttigieg, Fetterman, MTG, Shapiro, Kirk,
  Carlson, Gabbard, Owens, Maher, Haley, Stewart, Ramaswamy) — 42 total.
- Evidence dossiers: docs/figures/<slug>.md (36 scores each, quote+URL per item);
  rubric in docs/figures/METHOD.md; ~90 scores corrected (uncited inferences zeroed,
  recency flips applied — e.g. RFK abortion, Destiny y-axis, Musk/Rogan economics).
- docs/figures/analyze.mjs: per-question spread, axis correlations, map crowding.
- docs/figures/QUESTION-PROPOSALS.md: differentiation analysis + 8 candidate items
  (foreign-policy dim, loyalist-splitters, left-shelf splitters) — Ethan-gated.
- Themed SVG favicon (public/favicon.svg): ink compass rose on paper, red-ink ✕.

## 2026-07-18 — figures UX round 2
- Label de-overlap rewritten: 8 candidate anchors per label, collision-checked
  against labels AND dots; denser font at 30+ marks.
- Figures page: "Mark my position" toggle (persisted), take-the-survey link when
  unanswered; second Economic × Social chart from the dim tags (roadmap item).
- Results: Nearest company / Farthest remove (top-3 each) + jump to Figures.
- New Factions page: six hand-drawn shaded territories (MAGA & the New Right,
  The Heterodox, Socialist Left, Liberal Establishment, Disaffected Centre,
  Old Guard Right) on the compass + legend; src/factions.js is display-only.
- compass.js: axis labels + region ellipses now parametrized (opts).
