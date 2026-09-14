# Roadmap

## Now

- [ ] Production hotfix for the 2026-09-13 QA nits (nav overflow at phone widths, confident "Insurgent Right" verdict for an all-neutral or all-skipped run, dead romney.senate.gov / gabbard.house.gov / supernewsworld.com citations). Master carries the fixes on the Atlas source; production is the rolled-back August 1 build, so a hotfix branch off 87ffe1d with the same three changes needs Ethan's local review and deploy, or the fixes ride the Atlas release. Owner decision.
- [x] <!-- workspace:id=work:2528706c-86d7-5c29-be90-66a6da2cb165 --> [ETHAN] Deploy the verified owner-feedback update using
      `docs/DEPLOY-OWNER-ACTION.md`
      *(Ethan ran the deploy 2026-08-01 via the brief3 run-type packet;
      site verified live, HTTP 200 at https://political-test-2026.web.app;
      card-01KYZDHMYX0YXY32W5D3EHQFQB resolved with the URL as receipt)*
- [x] <!-- workspace:id=work:de6be456-2dbb-5440-b9fb-e8e9b0ca42a1 --> Ethan reviewed the statement bank; 9 ambiguous items rewritten (2026-07-18)
- [x] <!-- workspace:id=work:f79c626f-489c-535c-b2d6-d8ec8d4c7665 --> Owner-feedback polish: readable question type, Test-first reloads, own-score
      tooltips, larger title-free Factions chart, and no site em dashes (2026-07-18)
- [x] <!-- workspace:id=work:909c4a53-0db3-560c-bc1a-89cf5118781b --> Clarify Leaderboard dots versus the red current-result mark, and suppress
      a duplicate dot when the current result is already saved (2026-07-18)
- [x] <!-- workspace:id=work:7fe9fb06-efe3-5795-8933-ada3fc67474d --> Show both Political and Economic × Social planes on Leaderboard, with
      explicit coverage for older entries that lack second-plane scores (2026-07-18)
- [x] <!-- workspace:id=work:abccb857-6d75-5b3c-ba68-97973763bff6 --> Recover exact legacy sub-scores when the original browser answers remain,
      label unrecoverable entries honestly, and remove the table scrollbar
      (2026-07-18)
- [x] <!-- workspace:id=work:ee0ed90c-58a5-505b-8fd6-5e4d29574513 --> Recency-audit all 42 figures and cover the adopted 42-item bank (2026-07-18)
- [x] <!-- workspace:id=work:cf5fd9cd-66b3-545c-a458-032f7eb4af5b --> Re-verify all 42 figures against the full current bank with three research
      lanes; apply 18 evidence-backed corrections across 11 figures (2026-07-18)
- [x] <!-- workspace:id=work:d88f3d85-0437-5f5b-804d-2d2daaf050a7 --> Replace the opaque results label "Farthest remove" with "Farthest
      company" while preserving the same top-three distance calculation
      (2026-07-18)
- [x] <!-- workspace:id=work:432e9500-bd89-58c4-a607-84355aea73b9 --> Keep the take-the-survey fallback visible beside leaderboard claiming,
      contain dense edge labels, and prevent fresh side-by-side canvases from
      inheriting a provisional one-pixel backing store (2026-07-18)
- [x] <!-- workspace:id=work:926e5b8f-28d6-5503-9a3c-8be2646d64c8 --> Share-card image export (canvas → PNG of the marked map)
      (2026-09-05: selected atlas dimensions, version and provisional label included)

## Next
- [x] <!-- workspace:id=work:1500bc3a-c429-550e-bb83-2d9440cffac1 --> Public-figure mode: 42 figures, per-question evidence dossiers in
      docs/figures/ (deep-research pass 2026-07-18)
- [x] <!-- workspace:id=work:571dc614-e929-5e39-b716-b96d3086acbc --> Ethan reviewed docs/figures/QUESTION-PROPOSALS.md; eight additions,
      rewritten `y03`, and two retirements adopted (2026-07-18)
- [x] <!-- workspace:id=work:50c1dff0-2f11-5545-bc65-b4e20579e271 --> Split econ×social chart from the dim tags (2026-07-18; system axis is the main y)

## Now
- [x] <!-- workspace:id=work:3745cd74-1a97-5365-87be-c62b5237e6f7 --> Figure modes: rosters over the same scored figures, switchable on the
      Figures tab. National (subtraction), Local Leaders (Minnesota 10),
      The 2028 Bench, Commentators (2026-08-11)
- [x] <!-- workspace:id=work:15cdcf8f-9665-5de0-9760-c097f45877ca --> Remaining mode groups Ethan asked for: world leaders, tech and money
      (2026-09-05: collections available; US-frame limitations and missing evidence explicit)
- [ ] <!-- workspace:id=work:b9513d65-7ff0-50aa-b16e-55dbe8101058 --> Verification pass over the 27 figures added 2026-08-11: their dossiers are
      first-pass and below the per-item citation density of the 2026-07-18 batch

## Later
- [x] <!-- workspace:id=work:2472661c-7c23-5b6b-b801-e9e2e1825c3a --> Compare view v1: show-me toggle on Figures + nearest/farthest on results (2026-07-18)
- [x] <!-- workspace:id=work:5528d69b-342d-591e-98df-f9b0634bc49e --> Compare view v2: pick figures, overlay per-dimension deltas
      (2026-08-11: shipped as the Head to Head tab - two-figure pick, shared
      chart, divergence table sorted by Likert gap)
- [ ] <!-- workspace:id=work:102b2a9a-02d8-532f-9bbd-6d7a85a922a5 --> Research pass: score all figure dossiers against the 12 pending wave-2
      items (f04-f08, l01-l03, t01-t03, y16), then drop their `pending` flags
      (candidates and rationale: docs/question-expansion-2026-08.md)
- [ ] <!-- workspace:id=work:ec678907-ddbc-510b-a41a-047b7428aca9 --> Trajectory research: era-stamped answer sets (`eras`) for a first cohort
      (Trump/Vance/Newsom 2016/2020) - rendering machinery already ships
- [ ] <!-- workspace:id=work:7b217a42-7288-534f-8b7f-4e8e72bb83c7 --> Ballot rosters beyond Minnesota (machinery ships; each state is a
      modes.js roster plus dossier research)
- [x] <!-- workspace:id=work:b4d0b698-46aa-5d43-ae79-f62836c40b3b --> DEPLOYED (Ethan-directed 2026-07-18): https://political-test-2026.web.app

## Atlas delivery, 2026-09-05

Ethan approved all review proposals and explicitly authorized implementation, commit,
push and redeploy. Implemented the short core plus optional chapters, independent
provisional scoring, exact-wording evidence, priorities/certainty/reasons, local
comparison and discussion, tradeoffs, notebook history, question/evidence versioning,
pilot workflow, evidence challenges, PNG exports and versioned ledger. See
`docs/intent.md`, `docs/changelog.md` and `public/release-notes.md`.

The open research items above remain research, not completed by substituting
unknown values. Every current question/figure pair is inventoried; most lack
adequate evidence. Race records cover three Minnesota races, with final-ballot
certification explicitly unverified. A real respondent pilot and statistical
calibration have not occurred; the app includes the workflow and states this limit.
