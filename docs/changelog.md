# Changelog

## 2026-09-05 - Political Atlas
- Owner-approved expansion: 83 propositions, with a 30-item core and optional chapters.
- Explicit independent provisional dimensions replace the dominant-axis topic bars. Unknown, mixed, neutral, certainty and importance are separate. Revised items have new IDs.
- Current figure comparisons use documented exact-question positions only, with visible sources, rationales, dates and missing coverage. The 69-figure inventory accounts for every current item; research gaps remain unknown.
- Added priorities, reasons, context prompts, nearby-profile and constructed cancellation examples, hypothetical tradeoffs, local voluntary comparison and a discussion guide.
- Added a private versioned notebook with frozen snapshots, change explanations, backups, restore and reversible archiving.
- Added user-submitted evidence challenge drafts, an interpretation-pilot workflow, race-specific Minnesota records with unscored candidates, world/technology collections, labeled PNG export and version-separated public ledger entries.
- Preserved manuscript styling and legacy records. Previous UI and deployment instructions are archived under `docs/archive/atlas-v1/`.
- Validation: 44 automated tests, production build and desktop/mobile browser checks. Exact final verification/deployment records are linked from `docs/DEPLOY-OWNER-ACTION.md`. No human calibration or final-ballot certification is claimed.

## 2026-08-11 - figure modes, and 27 new figures
- Figures tab now switches between rosters: National, Local Leaders,
  The 2028 Bench, and Commentators. Membership is display-only, drawn by hand
  in `src/modes.js` the way factions are; scoring is untouched. National is
  defined by subtraction, so adding a national figure never means editing a
  roster, and rosters may name slugs whose dossiers do not exist yet.
- Local Leaders: Klobuchar, Craig, Flanagan, Ellison, Walz, Demuth, Finstad,
  Jake Johnson, Tafoya, Lindell (`src/figures-mn.js`).
- The 2028 Bench: nine additions in `src/figures-bench.js` (Rubio, Hawley,
  Youngkin, Kemp, Josh Shapiro, Whitmer, Moore, Beshear, Pritzker) alongside
  ten figures already on the board.
- Commentators: eight additions in `src/figures-media.js` (PF Jung, Piers
  Morgan, Andrew Wilson, Crowder, Fuentes, Prager, Knowles, Ramsey) alongside
  nine already scored.
- Every new figure answered the full 42-item instrument and has a per-question
  dossier in `docs/figures/`. Each of those dossiers opens with an evidence-
  density note: they are first pass and below the citation density of the
  2026-07-18 batch.
- The chart labels every mark on a roster of 20 or fewer, up from 14, so the
  17-name Commentators roster is not left mostly unlabelled.

## 2026-08-11 - instrument expansion + insight features
- Statement bank grows 42 -> 54: five new foreign items (Taiwan, military
  budget, NATO burden-sharing, foreign aid, UN/WHO), a new `liberty` dimension
  (surveillance, protest bans, speech law), a new `tech` dimension (AI
  licensing, debanking, automation UBI), and `y16` completing the first
  mirrored principle pair with `y04`. Full candidate list and cuts:
  `docs/question-expansion-2026-08.md`. New items ship `pending` until a
  figure-research pass covers them.
- Figures now score over the items their dossier answers (`scoreFigure`), so a
  growing bank can never drag the roster toward the center; a test pins this.
- A stored 42-item browser state migrates forward: answers, ledger signature,
  and claim survive, and the taker lands on the first new question.
- Results gains: The Six Dimensions (per-dimension ink scales, dominant axis
  computed from the weights), full-answer-vector nearest/farthest company with
  quoted receipts, a heterodoxy report ("where you break from your
  neighborhood," measured against an OLS answer surface fitted on the figure
  roster), a compressibility line (how much of you two axes explain), a
  mirrored-pair tension note, faction territory assignment, and the Minnesota
  ballot ranked by shared answers.
- New Head to Head tab: any two figures, shared chart, and their widest
  divergences question by question with source links.
- Trajectory machinery: a figure may carry era-stamped `eras` answer sets;
  the chart draws a dashed ink trail through past positions. No era data is
  researched yet, so nothing renders until it lands.

## 2026-07-18 - owner-feedback polish + recency update
- Results now labels the second company column "Farthest company" instead of
  the opaque "Farthest remove"; ranking and distance behavior are unchanged.
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
- Leaderboard now mirrors Figures with side-by-side Political and Economic ×
  Social charts, hover/tap tooltips on both, and Econ/Social table columns.
  Older entries without stored sub-scores remain visible on the Political Plane
  and are counted in a short coverage note.
- The 36-item browser state now migrates before reset and recovers exact legacy
  Economic and Social scores for its own saved row. Entries whose original
  answers are gone stay explicitly unavailable rather than receiving invented
  coordinates. The Leaderboard table now fits its page without a horizontal
  scrollbar.
- Factions chart enlarged from 560px to 680px. Duplicate page headings and
  clipped in-chart faction labels were removed; the legend remains authoritative.
- Site copy and metadata contain no em dashes; a regression test enforces it.
- Three research lanes audited all 42 figures against recent 2025-2026 primary
  material and completed coverage for the adopted 42-item bank. High-confidence
  legacy corrections: Trump `y06` 0 to -1; Rogan `y02` -1 to -2. The Hutch vs
  Destiny deep dive preserves Destiny as more institutionalist overall while
  documenting Hutch's greater procedural caution in recent debates.
- A second three-lane full-instrument verification applied 18 evidence-backed
  corrections across 11 figures. The largest movement is Newsom's June 2026
  economic and foreign-policy pivot; Rogan moves sharply institutional on
  politically directed DOJ investigations; Warren, MTG, Shapiro, DeSantis,
  Kirk, Ramaswamy, Harris, RFK Jr., and Hutch receive narrower corrections.
  The remaining 31 figures were explicitly reviewed and retained.

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

## 2026-07-18 — final Figures feedback pass
- Unanswered visitors always retain "Take the survey to set your own ✕ among
  them"; leaderboard failure or an empty ledger now removes only the claim
  control instead of the survey path.
- Dense edge labels search upward and downward within canvas bounds before
  using a leader line, keeping the Harris/AOC/Obama cluster readable.
- Fresh side-by-side charts reject provisional sub-pixel canvas sizes and
  repaint after flex layout settles. Chromium at 1280×800 verified two
  499×499 backing stores, exact 1280px page containment, and no console errors.
