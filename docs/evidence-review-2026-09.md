# Figure evidence review: 2026-09-05

The index now covers all 69 figures and all 83 current atlas questions, while preserving every original 54-item row. The union contains 98 IDs per figure: 6,762 rows. This follow-up individually reviewed the Sanders, Vance, Warren, Biden, Harris, Newsom, Paul, Trump and AOC dossiers against the actual current wording in `src/instrument.js`.

## Current inventory

All 98 IDs: 167 documented, 5 mixed, 2100 inferred/null and 4490 unknown/null.
Current 83-item bank only: 153 documented, 5 mixed, 1487 inferred/null and 4082 unknown/null.
The complete index preserves 900 distinct recorded HTTP(S) source URLs; 134 appear in documented rows. 23 documented rows use primary records opened in this work (including separately mapped revised items); the other documented rows retain individually read dossier citations without claiming fresh web verification.

These are counts of index classifications, not measurements of political truth, historical completeness or source accuracy. No score was adjusted to manufacture a comparison. Most rows remain unavailable.

## What the statuses mean

- `documented`: an individually mapped cited statement/action supports the exact wording. Its rationale distinguishes a newly opened primary record from a retained dossier citation. A documented row is still an editorial interpretation of evidence, not a survey response from the figure.
- `mixed`: a source-backed dossier explicitly records conflicting positions; zero is confined to this category.
- `inferred`: adjacent statements, analogies, grouped rationale, or unconfirmed interpretations; always null.
- `unknown`: no established answer; always null. Missing evidence is never made neutral.
- `recordThrough`: the actual dossier Updated date, July 18 or August 11, 2026. This is provenance, not a guarantee every political position was researched through that date.
- `reviewedAt`: this indexing date. It must not be displayed as blanket recency verification.
- `sourceDate`: an identified date for newly checked evidence; dates on inherited claims remain null.

## Comparable cohort

The existing scoring functions were run without changing their thresholds (three items per dimension, six shared items per comparison). Eight figures now have economics/social coordinates. Paul remains without a social coordinate: the examined evidence establishes only one current social answer, and party identity or religion is not a substitute.

| Figure | Current documented answers | Economics answers | Social answers | Comparable figures within nine-person cohort |
|---|---:|---:|---:|---|
| Donald Trump | 22 | 4 | 7 | JD Vance, Bernie Sanders, Alexandria Ocasio-Cortez, Gavin Newsom, Elizabeth Warren, Joe Biden, Kamala Harris |
| JD Vance | 17 | 3 | 6 | Donald Trump, Bernie Sanders, Alexandria Ocasio-Cortez, Gavin Newsom, Elizabeth Warren, Joe Biden, Kamala Harris |
| Bernie Sanders | 21 | 6 | 3 | Donald Trump, JD Vance, Alexandria Ocasio-Cortez, Gavin Newsom, Rand Paul, Elizabeth Warren, Joe Biden, Kamala Harris |
| Alexandria Ocasio-Cortez | 18 | 5 | 3 | Donald Trump, JD Vance, Bernie Sanders, Gavin Newsom, Elizabeth Warren, Joe Biden, Kamala Harris |
| Gavin Newsom | 11 | 3 | 4 | Donald Trump, JD Vance, Bernie Sanders, Alexandria Ocasio-Cortez, Elizabeth Warren, Joe Biden, Kamala Harris |
| Rand Paul | 10 | 3 | 1 | Bernie Sanders, Elizabeth Warren |
| Elizabeth Warren | 21 | 8 | 5 | Donald Trump, JD Vance, Bernie Sanders, Alexandria Ocasio-Cortez, Gavin Newsom, Rand Paul, Joe Biden, Kamala Harris |
| Joe Biden | 17 | 7 | 4 | Donald Trump, JD Vance, Bernie Sanders, Alexandria Ocasio-Cortez, Gavin Newsom, Elizabeth Warren, Kamala Harris |
| Kamala Harris | 14 | 6 | 4 | Donald Trump, JD Vance, Bernie Sanders, Alexandria Ocasio-Cortez, Gavin Newsom, Elizabeth Warren, Joe Biden |

`sameMapExample` returns Joe Biden and Alexandria Ocasio-Cortez with 11 shared answers and a recorded difference on `y05`. Their calculated agreement index is 86.36%; this is an instrument calculation over that limited overlap, not population similarity or statistical confidence.

## Mapping decisions

The follow-up did not bulk-promote whole dossiers. Individual direct records now support minimum-wage policy, universal insurance proposals, family leave, debt cancellation, abortion, specific admission changes, treatment bans and selected checks on power. The row rationales state each mapping.

Revised questions were treated independently:

- e07r2 separates paid leave from childcare; e15 holds childcare evidence. Trump’s first-term federal leave and childcare records are labeled as dated evidence.
- e10r2 reverses the old framing: recorded advocacy of cancellation maps to positive agreement, rather than copying the old negative value.
- f05r2 asks only about reducing military spending; the directly recorded cut proposals and votes address that narrower statement independently.
- y03r2 uses direct recorded objections to political targeting, not the old generic trust-in-law-enforcement score.
- y13r2 remains unknown for all figures. Willingness to evade constitutional limits does not establish support for amending them.
- t01r2 remains unknown: general AI deregulation or support for safety oversight does not establish support/opposition to independent evaluations before release.
- AOC s11r2 remains inferred: a statement about university admissions does not establish an employer-selection rule.
- General civil-libertarian instincts, party positions, and non-US governance analogies remain inferred.

## Primary sources opened in the first pass

The following table retains the exact first-pass source audit. Original IDs remain in the index even when the atlas now uses revised wording. A source listed here does not imply that all adjacent questions were externally checked.

| Figure / original item | Disposition in that pass | Source |
|---|---|---|
| Donald Trump / `t02` | documented | [Executive Order 14331: Guaranteeing Fair Banking for All Americans](https://www.whitehouse.gov/presidential-actions/2025/08/guaranteeing-fair-banking-for-all-americans/) |
| Donald Trump / `t01` | documented | [White House: America’s AI Action Plan](https://www.whitehouse.gov/releases/2025/07/white-house-unveils-americas-ai-action-plan/) |
| JD Vance / `t01` | documented | [Vice President Vance: Paris AI Action Summit remarks](https://www.presidency.ucsb.edu/documents/remarks-the-vice-president-the-artificial-intelligence-action-summit-paris-france) |
| JD Vance / `l03` | documented | [Vice President Vance: Munich Security Conference remarks](https://www.presidency.ucsb.edu/documents/remarks-the-vice-president-the-munich-security-conference-0) |
| JD Vance / `f06` | inferred | [Vice President Vance: Munich Security Conference remarks](https://www.presidency.ucsb.edu/documents/remarks-the-vice-president-the-munich-security-conference-0) |
| Gavin Newsom / `t01` | inferred | [Newsom: SB1047 veto message](https://www.gov.ca.gov/wp-content/uploads/2024/09/SB-1047-Veto-Message.pdf); [Newsom: SB53 signing, 2025-09-29](https://www.gov.ca.gov/2025/09/29/governor-newsom-signs-sb-53-advancing-californias-world-leading-artificial-intelligence-industry/) |
| Bernie Sanders / `f05` | documented | [Sanders: Cut the Pentagon by 10%](https://www.sanders.senate.gov/press-releases/sanders-cut-the-pentagon-by-10-to-hire-more-teachers-build-more-homes-and-create-more-jobs/) |
| Amy Klobuchar / `f05` | documented | [Congressional Record: vote 135 on Sanders amendment 1788](https://www.congress.gov/116/crec/2020/07/22/modified/CREC-2020-07-22-pt1-PgS4365-3.htm) |
| Elizabeth Warren / `f05` | documented | [Congressional Record: vote 135 on Sanders amendment 1788](https://www.congress.gov/116/crec/2020/07/22/modified/CREC-2020-07-22-pt1-PgS4365-3.htm) |
| Bernie Sanders / `f07` | documented | [Sanders: USAID cuts statement](https://www.sanders.senate.gov/press-releases/news-sanders-statement-usaid-cuts-will-lead-to-millions-of-preventable-deaths/) |
| Rand Paul / `l01` | documented | [Paul: amendments opposing expanded surveillance](https://www.paul.senate.gov/senate-to-vote-on-dr-pauls-amendments-to-eliminate-unconstitutional-practices-in-fake-fisa-reform-and-government-spying/) |
| Bernie Sanders / `l01` | documented | [Senate vote 144: Fourth Amendment Is Not For Sale amendment](https://www.senate.gov/legislative/LIS/roll_call_votes/vote1182/vote_118_2_00144.htm) |
| Elizabeth Warren / `l01` | documented | [Senate vote 144: Fourth Amendment Is Not For Sale amendment](https://www.senate.gov/legislative/LIS/roll_call_votes/vote1182/vote_118_2_00144.htm) |
| Josh Hawley / `l01` | documented | [Senate vote 144: Fourth Amendment Is Not For Sale amendment](https://www.senate.gov/legislative/LIS/roll_call_votes/vote1182/vote_118_2_00144.htm) |
| Alexandria Ocasio-Cortez / `f05` | documented | [House Clerk: Ocasio-Cortez amendment 40, roll call 284](https://clerk.house.gov/Votes/2021284); [AOC foreign policy: indexed excerpt; full page unavailable](https://ocasio-cortez.house.gov/legislation/foreign-policy) |
| Donald Trump / `f08` | documented | [White House: withdrawal from international organizations](https://www.whitehouse.gov/fact-sheets/2026/01/fact-sheet-president-donald-j-trump-withdraws-the-united-states-from-international-organizations-that-are-contrary-to-the-interests-of-the-united-states/) |
| JD Vance / `l01` | unknown | [Senate vote 144: Fourth Amendment Is Not For Sale amendment](https://www.senate.gov/legislative/LIS/roll_call_votes/vote1182/vote_118_2_00144.htm) |

AOC’s foreign-policy page returned 403 when opened. Its indexed official excerpt supplied the domestic-priorities context, while the House roll call itself was retrieved. The f05 answer remains hedged. Vance’s non-vote on the surveillance amendment does not establish an answer.

Other primary material opened for context, without creating an answer: the [WHO withdrawal order](https://www.whitehouse.gov/presidential-actions/2025/01/withdrawing-the-united-states-from-the-worldhealth-organization/) and a [House roll-call navigation mismatch](https://clerk.house.gov/Votes/2021148). The [H4934 record link](https://www.govinfo.gov/link/crec/167/h/4934) and [September 22 House PDF](https://www.congress.gov/117/crec/2021/09/22/167/164/CREC-2021-09-22-house.pdf) failed to retrieve and were not labeled verified evidence.

## Additional primary sources opened in the follow-up

| Item | Source | What was established |
|---|---|---|
| Gavin Newsom / `e04` | [Newsom signs AB1228](https://www.gov.ca.gov/2023/09/28/california-increases-minimum-wage-protections-for-fast-food-workers/) | Primary source opened in this follow-up. Signed a statutory $20 fast-food wage floor. |
| Gavin Newsom / `b07` | [Newsom signs AB1482](https://www.gov.ca.gov/2019/10/08/on-statewide-rent-housing-tour-governor-gavin-newsom-signs-nations-strongest-statewide-renter-protection-legislation/) | Primary source opened in this follow-up. Signed an annual rent-increase cap; this directly addresses rent regulation. |
| Donald Trump / `e07r2` | [Trump child-care and paid-leave summit remarks](https://trumpwhitehouse.archives.gov/briefings-statements/remarks-president-trump-white-house-summit-child-care-paid-leave/) | Primary source opened in this follow-up. Advocated federally supported paid family leave and federal-worker leave; the cited commitment is from his first term. |
| Donald Trump / `e15` | [Trump administration supporting working families](https://trumpwhitehouse.archives.gov/briefings-statements/president-donald-j-trump-committed-supporting-working-families/) | Primary source opened in this follow-up. The administration explicitly supported increased federal child-care assistance; this is a dated first-term record. |
| Alexandria Ocasio-Cortez / `s09` | [House Clerk: H.R.3492 passage vote](https://clerk.house.gov/Votes/2025351); [H.R.3492 introduced text: treatment prohibitions](https://www.congress.gov/119/bills/hr3492/BILLS-119hr3492ih.pdf) | Primary House roll call read in this follow-up records a vote against the federal prohibition on puberty blockers and hormone treatment for minors. The introduced bill text explicitly includes those treatments; this is direct legislative opposition to a treatment ban. |

The official AOC immigration page also returned 403. The s06r2 row instead explicitly retains the individually read dossier’s stated support for expanded legal admissions, with a hedged value and no assertion of fresh external verification.

Searches also explored Paul’s student-loan and healthcare positions, Vance’s family-policy arguments, Taiwan defense, NATO conditions and AI-related income policy. Search results not listed as evidence were discovery leads only. No new substantive claim rests on an unopened search lead.

## What remains unresolved

The roster-wide unknowns are not a completed research audit. Further work is particularly needed on building, technical governance, constitutional emergency powers, trust in specific institutions and the revised consent/privacy statements. Paul needs two additional directly supported social answers before a two-dimensional economics/social placement is available. The other sixty figures were indexed conservatively, not granted detailed new dossiers.

Historical sources from 2019–2021 are explicitly dated; this pass does not claim they settle the latest position. Retained citations may contain inaccuracies or dead links and must be rechecked before stronger provenance or recency claims. The original dossier files and legacy score data were not edited.

## Validation

Local validation passed for exactly 69 slugs, all 98 union IDs per figure, the four status/value contracts, required citations for documented/mixed rows, HTTP(S) URL syntax, and all revised term-limit rows remaining unknown. The existing atlas scoring/model functions produced the cohort and example above. These checks establish data structure and program behavior; they do not certify external political claims.

## Current-bank documented items by figure

| Figure | Current documented IDs |
|---|---|
| Donald Trump | e01, e05, e07r2, e10r2, e11, e12, s01, s02, s03, s04, s05r2, s06r2, s07, s08, s09, s11r2, s12, y01, y04r2, f08, t02, e15 |
| JD Vance | e01, e04, e05, e08, e10r2, s01, s02, s03, s06r2, s08, s09, s10, s11r2, y04r2, l03, y19, e15 |
| Stephen Miller | None established |
| Steve Bannon | None established |
| Alex Jones | None established |
| Mike Pence | None established |
| Mitt Romney | None established |
| Gavin Newsom | e01, e04, e09, s01, s03, s07, s09, s10, s11r2, s12, b07 |
| Kamala Harris | e02, e04, e07r2, e09, e10r2, s01, s03, s06r2, s07, s09, s10, s12, y03r2, e15 |
| Joe Biden | e02, e04, e07r2, e09, e10r2, e12, s01, s02, s03, s04, s06r2, s09, s12, y04r2, y05, y09, e15 |
| Barack Obama | None established |
| Bernie Sanders | e02, e03, e04, e09, e10r2, e11, e12, s01, s03, s06r2, s09, s10, s12, y03r2, y04r2, y05, y08, y09, f05r2, f07, l01 |
| Alexandria Ocasio-Cortez | e02, e04, e05, e07r2, e09, e10r2, e11, s01, s03, s06r2, s09, s10, s12, y03r2, y05, y06, y11, f05r2 |
| Zohran Mamdani | None established |
| Hasan Piker | None established |
| Cornel West | None established |
| Elon Musk | None established |
| Joe Rogan | None established |
| Liz Cheney | None established |
| Robert F. Kennedy Jr. | None established |
| Rand Paul | e01, e02, e04, e12, s01, s03, y01, y06, l01, l04 |
| David Pakman | None established |
| Brian Tyler Cohen | None established |
| Destiny | None established |
| Hutch | None established |
| Tim Pool | None established |
| Vladimir Putin | None established |
| Xi Jinping | None established |
| Ron DeSantis | None established |
| Elizabeth Warren | e01, e02, e03, e04, e05, e07r2, e08, e09, e10r2, e12, s01, s02, s03, s06r2, s08, s09, s10, s12, f05r2, l01, e15 |
| Pete Buttigieg | None established |
| John Fetterman | None established |
| Marjorie Taylor Greene | None established |
| Ben Shapiro | None established |
| Charlie Kirk | None established |
| Tucker Carlson | None established |
| Tulsi Gabbard | None established |
| Candace Owens | None established |
| Bill Maher | None established |
| Nikki Haley | None established |
| Jon Stewart | None established |
| Vivek Ramaswamy | None established |
| Amy Klobuchar | f05r2 |
| Angie Craig | None established |
| Peggy Flanagan | None established |
| Keith Ellison | None established |
| Tim Walz | None established |
| Lisa Demuth | None established |
| Brad Finstad | None established |
| Jake Johnson | None established |
| Michele Tafoya | None established |
| Mike Lindell | None established |
| Marco Rubio | None established |
| Josh Hawley | l01 |
| Glenn Youngkin | None established |
| Brian Kemp | None established |
| Josh Shapiro | None established |
| Gretchen Whitmer | None established |
| Wes Moore | None established |
| Andy Beshear | None established |
| JB Pritzker | None established |
| PF Jung | None established |
| Piers Morgan | None established |
| Andrew Wilson | None established |
| Steven Crowder | None established |
| Nick Fuentes | None established |
| Dennis Prager | None established |
| Michael Knowles | None established |
| Dave Ramsey | None established |

## Final integration

The race-specific follow-up in `docs/election-evidence-review-2026-09.md` is merged into the public index. Machine-counted current-bank totals are in `docs/evidence-inventory-counts.json`: 184 documented, 6 mixed, 1,448 inferred and 4,089 unknown across 69 figures × 83 current items. These counts describe recorded status, not universal fresh source verification.

The invariant test caught seven inferred supplement rows that still carried numeric values. Their active-index values were set to null without promoting their evidence status: klobuchar/l04, flanagan/f03, flanagan/e07r2, flanagan/l04, demuth/e12, demuth/s07, jakejohnson/e14. The supplied supplement is retained in `docs/archive/research-2026-09/election-evidence-additions.json` as research provenance; the corrected public index is the active data.
