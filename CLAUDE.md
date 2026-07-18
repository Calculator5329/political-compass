# political-compass

Mini-project (Fable-built, no codex lanes — see planning/plans/MINI-PROJECTS.md).
US political compass for the 2026 landscape; future: plot public figures from
cited statements via the same instrument.

- Verify: `npm test` (vitest; scoring + instrument invariants)
- Axes: vertical Insurgent(+y)/Institutionalist(−y), horizontal Left(−x)/Right(+x)
- Hard rules: questions carry dim tags + weight vectors — never hardcode axis
  math outside src/scoring.js. Statement-bank edits are Ethan-reviewed.
- Aesthetic is load-bearing. Five committed themes (manuscript / broadsheet /
  terminal / federal / arcade) via body[data-theme] tokens in src/themes.css;
  the canvas chart reads the same tokens. No frameworks — vanilla Vite.
