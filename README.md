# The Political Atlas

Live: https://political-test-2026.web.app

A manuscript-style, local-first political profile. The 30-question core leads
into optional economics, social/liberty, institutions, building/energy, foreign,
technology and dated current-affairs chapters. The current bank contains 83
propositions. This is an exploratory instrument, not a validated diagnosis.

## What people can do

- Distinguish a position from mixed views, uncertainty or a skipped question.
- Record importance, certainty, reasons and private reflections separately.
- Explore five main dimensions plus narrower trust, foreign and technology facets.
- Choose any two dimensions for a map and export it as a labeled PNG.
- Compare documented public positions, inspect per-item evidence, or draft an evidence challenge for GitHub review.
- Compare a voluntarily shared profile locally, with shared priorities and discussion prompts.
- Explore hypothetical policy tradeoffs and preserve a private dated notebook.
- Inspect race-specific Minnesota candidates, including unscored candidates and roster limitations.
- Participate in an interpretation pilot without automatic submission of answers.
- Optionally sign a version-separated public ledger with only a name and economic/social coordinates.

## Measurement and evidence

`src/instrument.js` owns current text, versions and explicit loadings. All axis
math stays in `src/scoring.js`. Three stated positions are required per plotted
dimension; six shared positions are required for a comparison. Unknown, mixed
and inferred figure positions are excluded. Unchanged old browser answers can
migrate; old neutral/unsure zeros become unsure, and revised questions require
new answers. Legacy records and the original browser storage key remain intact.

The 69-figure inventory is in `public/figure-evidence.json`. Its review timestamp
is not a claim that every source was freshly reverified. See
`docs/evidence-review-2026-09.md` and `docs/election-research-2026-09.md`.

## Development

```sh
npm ci
npm test
npm run dev
npm run build
```

Vanilla JavaScript + Vite; existing Firebase Hosting. Personal answers and notes
remain in browser storage. The Firestore ledger is dynamically loaded only when
opened. No new backend or account is required.

The earlier interface is retained at `docs/archive/atlas-v1/main.js`; its legacy
instrument, scoring helpers and tests remain available for historical records.
`public/release-notes.md` describes changes and limitations for site visitors.
