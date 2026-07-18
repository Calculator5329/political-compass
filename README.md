# Political Compass — MMXXVI

A political compass test built for the actual 2026 US landscape. Two axes:

- **Vertical: Insurgent ↔ Institutionalist** — your relation to the system
  itself (institutional trust, proceduralism, free expression), not left/right.
- **Horizontal: Left ↔ Right** — blended economic + social.

Every question carries a `dim` tag (econ / social / system) and a weight
vector `{x, y}`, so a split 4-axis view or re-weighting needs no question
changes. Planned: plot public figures from cited votes/statements using the
same instrument.

Ink-on-paper aesthetic: IM Fell English + EB Garamond, canvas compass rose,
red-ink ✕. `npm run dev` to run; `npm test` for the scoring suite.
