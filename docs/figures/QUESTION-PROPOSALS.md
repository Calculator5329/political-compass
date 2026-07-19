# Question-bank differentiation analysis + proposed additions
2026-07-18 · from the 42-figure deep-research pass (`node docs/figures/analyze.mjs` reproduces the numbers)
**Status: ADOPTED 2026-07-18 after Ethan review.** The eight additions, `y03`
rewrite, and retirements of `e06` and `y07` are wired into the 42-item bank.
All figures were re-covered in `RECENCY-UPDATE-2026-07-18.md` and
`src/figure-updates.js`.

## What the data says

**Weakest differentiators** (lowest spread across the 42 figures):

| item | sd | zeros | problem |
|---|---|---|---|
| e06 SS privatization | 1.02 | 13/42 | Dead consensus — almost nobody with a record supports it in 2026; 13 figures have no record at all. |
| y03 FBI/DOJ fairness | 1.11 | 2 | Everyone now distrusts federal law enforcement — MAGA says it's weaponized against Trump, the left says it's weaponized *by* Trump. Same answer, opposite reasons: the item has collapsed. |
| e05 break up Big Tech | 1.14 | 12 | Crosses ideologies (Vance & Warren both +2) which is fine for y, but 12 figures simply have no position. |
| y07 respect SCOTUS rulings | 1.19 | 13 | 13 no-records; commentators rarely engage the principle. |
| e07 paid leave / e08 crypto | ~1.3 | 9–12 | High no-record counts among media figures. |

**Crowded map regions** (closest pairs): the MAGA core is stacked — Trump↔Vance 0.37, Vance↔MTG 0.38, Miller↔Kirk 0.77, MTG↔Ramaswamy 0.77 — and the mainstream-Dem shelf too: Harris↔Pakman 0.60, Harris↔Buttigieg 0.61. Real-world 2025–26 politics *does* split these people (Epstein files, Iran strikes, tariffs, Israel, trans-sports moderation) — the instrument just doesn't ask about it.

**Structural gap: zero foreign-policy items.** The single loudest 2025–26 right-coalition fracture (Iran strikes → Carlson "no future for MAGA", Owens "genocidal maniac", MTG "foreign wars") and the loudest left fracture (Israel/Gaza → Fetterman would leave the party) are invisible to the instrument.

## Proposed additions (8 candidates — adding ~4–6 is plenty)

New `dim: 'foreign'` (x-and-y-loaded) unless noted:

- **f01** "The United States should stay out of foreign wars even when allies ask for help." `{ x: 0.2, y: 0.6 }` — splits Trump/Vance/Haley/Cheney from Carlson/MTG/Owens/Gabbard/Paul; splits Sanders-left from Biden-center.
- **f02** "American support for Israel should continue largely unconditionally." `{ x: 0.6, y: -0.3 }` — Fetterman/Shapiro vs Mamdani/Piker/West/Carlson/Owens; cuts *across* both crowded clusters.
- **f03** "Continuing military aid to Ukraine is in America's interest." `{ x: -0.4, y: -0.6 }` — cleanly separates institutional right (Pence/Cheney/Haley/Romney) from MAGA right.

System items to break the y03 collapse and MAGA stack:

- **y13** "A president should be able to seek a third term if voters want one." `{ x: 0.3, y: 0.9 }` — separates Trump/Bannon loyalism from everyone else on the right, including Vance-adjacent figures who dodge it.
- **y14** "Pardoning your own supporters who were convicted of political violence is an abuse of the pardon power." `{ x: -0.3, y: -0.8 }` — Pence/Shapiro/Haley agree; Trump-core disagrees; splits the 0.37–0.78 loyalist cluster.
- **y15** "The government has been hiding the truth about the Epstein files." `{ x: 0.1, y: 0.8 }` — the single sharpest 2025–26 loyalist-vs-insurgent divider (MTG/Pool/Carlson/Owens vs Trump).

Left-shelf splitters:

- **s13** "Transgender women should be allowed to compete in women's sports." `{ x: -0.7, y: 0.1 }` — Newsom/Maher/Fetterman/Buttigieg-moderation vs AOC/Piker/BTC; currently s09 (minors' care bans) fails to split these because they all oppose bans.
- **e13** "The government should directly run essential services — groceries, banking, utilities — where markets fail." `{ x: -0.8, y: 0.3 }` — separates Mamdani/West/Piker socialism from Warren/Sanders regulation-left and from Harris/Buttigieg market-left.

## Possible retirements (only if bank length matters)
e06 (dead consensus), y07 (no-record magnet) are the two weakest; y03 could be rewritten direction-neutral as "The president, not career officials, should decide whom the DOJ investigates" `{ x: 0.3, y: 0.7 }`, which restores its discriminating power.

## Notes
- All weights eyeballed to match existing conventions (|w| ≤ 0.9, x+y loading reflects 2026 coalition structure); re-run `analyze.mjs` after any adoption and re-score figures from the dossiers — every dossier already contains the evidence needed to answer f01–f03/y13–y15 for most figures.
