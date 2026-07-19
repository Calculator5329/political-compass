# The Political Compass — MMXXVI

**Live: [political-test-2026.web.app](https://political-test-2026.web.app)**

A political compass test built for the actual 2026 US landscape, rendered as an
ink-on-paper manuscript. Two axes:

- **Vertical: Insurgent ↔ Institutionalist** — your relation to the system
  itself (institutional trust, proceduralism, expertise), not left/right.
- **Horizontal: Left ↔ Right** — blended economic + social.

## Features

- **42-question instrument** with per-question dimension tags and weight
  vectors, so re-weighting or alternate views need no question changes.
- **42 public figures** charted from the documented record — every one of the
  42 answers per figure are backed by a cited evidence dossier plus the 2026
  recency-update appendix
  ([docs/figures/](docs/figures/), rubric in
  [METHOD.md](docs/figures/METHOD.md)), researched and verified by parallel
  AI research agents with per-question quotes and sources.
- **Factions** — hand-drawn coalition territories (MAGA & the New Right,
  Populist Independents, Socialist Left, Democratic Establishment, Centrist
  Liberals, Reaganite Conservatives) shaded on the map.
- **Economic × Social plane** — the same record split by sub-dimension.
- **Leaderboard** — sign the ledger (Firestore, create-only validated schema)
  and claim your mark from any device.
- Hover tooltips, hand-wobbled canvas rendering, IM Fell English + EB Garamond,
  and a red-ink ✕ for you.

## Development

```sh
npm install
npm run dev    # vite dev server
npm test       # vitest: scoring + instrument invariants
npm run build  # production bundle
```

Vanilla JS + Vite, no frameworks. Axis math lives only in
[src/scoring.js](src/scoring.js); figures store answers, never coordinates.
