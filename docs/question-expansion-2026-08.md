# Wave-2 question expansion, 2026-08-11

Ethan asked (chat, 2026-08-11): "generate all, then sort through and pick out
the best ones that give the most signal to add." This file is the audit trail:
every candidate generated, what was kept, and why the rest were cut.
Statement-bank edits remain Ethan-reviewed; the 12 adopted items ship flagged
`pending` (figures not yet researched against them) and were presented for
review in the same chat.

Selection criterion: signal per item. An item earns its place if it (a) splits
at least one 2026 coalition internally rather than restating the x-axis, (b)
is not already covered by an existing item, and (c) has a defensible weight
vector on the existing axes.

## Foreign (3 items existing, badly underpowered vs 12-14 for other dims)

| id | statement (short) | verdict |
|---|---|---|
| f04 | Defend Taiwan militarily if China attacks | **KEPT** - splits restrainers from hawks inside both parties; the one foreign flashpoint f01-f03 miss entirely |
| f05 | Cut the military budget, spend savings at home | **KEPT** - clean left-restraint loading; balances the two insurgent-right-coded adds |
| f06 | Underpaying NATO allies should not count on protection | **KEPT** - the burden-sharing fight; splits the right (Reaganites vs New Right) |
| f07 | Foreign aid against famine/disease is money well spent | **KEPT** - post-USAID-dismantlement litmus; reverse-coded (agree = institutionalist-left) for agree-bias balance |
| f08 | UN/WHO have too much say over American policy | **KEPT** - sovereignty-vs-institutions, loads insurgent axis where f02/f03 load left-right |
| - | Cutting economic ties with China is worth higher prices | CUT - substantially covered by e01 (tariffs); would double-count protectionism |
| - | Immigration levels as foreign policy | CUT - covered by s05/s06 |
| - | Bring troops home from the Middle East | CUT - near-duplicate of f01, weaker framing |

## Liberty (new dim: order vs civil liberties, cross-cuts left/right)

| id | statement (short) | verdict |
|---|---|---|
| l01 | Expanded surveillance acceptable to stop terrorism/crime | **KEPT** - canonical order-vs-liberty item; unites Rand Paul and AOC against the center, which no existing item does |
| l02 | Authorities may ban protests threatening public order | **KEPT** - mirrors y05 (civil disobedience) from the state side; second PRINCIPLE_PAIRS probe |
| l03 | Group-demeaning speech punishable by law | **KEPT** - splits left civil-libertarians from progressives; the only item where agree codes left AND institutionalist |
| - | Police should unlock any phone with a warrant (weaken encryption) | CUT - correlates heavily with l01; l01 is the cleaner statement |
| - | Assets should not be seized before conviction | CUT - weak, low-salience loading; near-consensus when framed plainly |
| - | Small-quantity drug possession is a health issue, not a crime | CUT - good item but belongs to `social` and overlaps s10; revisit if social is ever rebalanced |
| - | President may bypass Congress in a genuine emergency | CUT - already effectively measured by y03/y04/y13 executive-power cluster |

## Tech (new dim: the 2026 technology fights)

| id | statement (short) | verdict |
|---|---|---|
| t01 | License frontier AI as strictly as aviation/pharma | **KEPT** - the AI-regulation fight; cross-cuts (safety left + populist-right tech distrust vs accelerationists in both camps) |
| t02 | Bar banks/processors from debanking lawful speech | **KEPT** - the debanking fight; agree codes insurgent-right today but the principle reads anti-corporate, which is exactly the tension that makes it informative |
| t03 | AI job losses should trigger a guaranteed basic income | **KEPT** - UBI reads econ-left but tech-futurist; distinct from e02/e07 welfare items because it is conditional on automation |
| - | Ban algorithmic feeds for minors | CUT - bipartisan supermajority position, near-zero discrimination |
| - | Ban sale of personal data | CUT - same problem, consensus item |
| - | Platform moderation / jawboning | CUT - covered by y06 |

## System (principle-pair probe)

| id | statement (short) | verdict |
|---|---|---|
| y16 | Career officials resisting on legal grounds are doing their job | **KEPT** - reverse-coded mirror of y04; completes the first PRINCIPLE_PAIRS probe (principled vs partisan reasoning) and adds a needed agree=institutionalist item |
| - | "A president of the party you oppose should hold the same powers" framings | CUT - double-barreled and hypothetical; the mirror-pair mechanism measures the same thing without the awkward wording |

## Net effect

42 -> 54 items. New-item coding balance: 6 of 12 agree toward
left/institutionalist, 6 toward right/insurgent. Foreign goes from 3 items
(subscore was mostly noise) to 8, enough for the 4-axis view to show it.
`liberty` and `tech` get their own dim tags so subScores() picks them up with
zero scoring changes.

Follow-up owed (roadmap): a research pass scoring all ~60 figure dossiers
against the 12 pending items, then dropping the `pending` flags.
