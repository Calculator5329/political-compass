# Changelog

## 2026-07-18 - owner-feedback polish + recency update
- Verified and pushed to `master`; live Firebase Hosting deploy remains the
  owner action in `docs/DEPLOY-OWNER-ACTION.md`.
- Question statements now use upright, medium-weight EB Garamond at a larger
  size for easier reading.
- A reload always returns to the Test tab while preserving the correct intro,
  in-progress quiz, or results state. Reference-page cookies/local storage no
  longer make Figures, Factions, or Leaderboard the landing page.
- The user's red score mark has the same hover/tap tooltip on Results, Figures,
  Factions, and Leaderboard as figure dots.
- Leaderboard now labels saved-entry dots separately from the red current-result
  ✕. If that result is already saved, its dot is replaced by the ✕ instead of
  being drawn twice.
- Factions chart enlarged from 560px to 680px. Duplicate page headings and
  clipped in-chart faction labels were removed; the legend remains authoritative.
- Site copy and metadata contain no em dashes; a regression test enforces it.
- Three research lanes audited all 42 figures against recent 2025-2026 primary
  material and completed coverage for the adopted 42-item bank. High-confidence
  legacy corrections: Trump `y06` 0 to -1; Rogan `y02` -1 to -2. The Hutch vs
  Destiny deep dive preserves Destiny as more institutionalist overall while
  documenting Hutch's greater procedural caution in recent debates.

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

## 2026-07-18 — factions polish
- Faction territories are hoverable: same marginalia tooltip (name, blurb,
  member count); dots take precedence, overlaps resolve to nearest centre.
- Renames (Ethan): Liberal Establishment → Democratic Establishment,
  Disaffected Centre → Centrist Liberals, The Heterodox → Populist
  Independents, Old Guard Right → Reaganite Conservatives.
- Claim-your-mark: with no local answers, the Figures page offers the ledger's
  entries to claim as your ✕ (answers don't cross origins/devices). Claimed
  marks skip the econ×social ✕ (no per-question data).
- Scrollbar rail hidden (scrolling unaffected).

## 2026-07-18 — figures page compaction + deploy
- Charts side by side (The Political Plane / The Economic × Social Plane),
  stacking on mobile; captions added.
- Em dashes removed from the two figure-page paragraphs; take-the-survey line
  removed (claim-your-mark stays).
- Figure list converted to a compact 3-column card grid: initial seal, name
  (note on hover), quadrant + coords, numbered source links.
- Deployed to https://political-test-2026.web.app (Ethan-directed).

## 2026-07-18 — chart legibility + layout
- Only 10 featured figures get printed labels (Trump, Vance, Obama, Sanders,
  AOC, Musk, DeSantis, Newsom, Harris, Rogan); the rest are hover-only. Label
  type is larger; unlabeled dots slightly bigger/darker.
- Charts and card grid break out to min(1020px, 94vw); nav spacing halved.
- Tabs restyled as a manuscript running head: chromeless small caps with
  fleuron separators and a tilted red-ink underline on the active page.

## 2026-07-18 — sub-plane mark everywhere
- Ledger entries now store econ/social sub-scores (es/ss; firestore.rules
  extended with optional validated fields, deployed).
- Claimed marks with sub-scores draw the ✕ on the Economic × Social plane too;
  older entries show a retake hint instead of a wrong mark.

## 2026-07-18 — card tooltips + claim placeholder
- Figure-card hover now uses the themed marginalia tooltip (name, blurb, full
  placement note) instead of the native title attribute.
- Claim dropdown placeholder is disabled/hidden "choose your name" rather than
  a selectable "the ledger" entry.
