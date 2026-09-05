# Political Atlas intent

## Owner decision, 2026-09-05
Ethan approved all proposals in the Political Compass review and explicitly requested implementation, commit, push, and redeployment of political-test-2026.web.app. Preserve the ink-on-paper identity, vanilla Vite architecture, existing records, and local-first answers. This is the site-specific deployment authorization for this update.

The product is a political atlas with a short core survey, optional policy modules, transparent provisional dimensions, documented figure comparisons, a private civic notebook, consented comparison, tradeoff exploration and race-specific election context. It does not diagnose an identity or claim population validation.

## Design examination
- Failure scenario: the atlas grows into an overwhelming quiz, while precise-looking outputs still hide unknowns and stale evidence.
- Simpler alternative: a short core plus optional modules and progressively disclosed evidence. Adopt this instead of one mandatory long questionnaire or a new backend.
- Vocabulary: position, importance, certainty, evidence coverage, and historical result are separate concepts. A topic is not automatically an axis; unknown is not neutral; a public-figure roster is not a ballot.
- Fit: retain manuscript styling, use independent explicit scoring in scoring.js, retain legacy code/records, no account required. Owner authorized the current question edits, push, and site deployment. No new paid services or publication of personal answers.
- Decision: REFINE the existing app with a modular atlas. Retain the prior UI in docs/archive/atlas-v1/main.js. Human interpretation pilots and statistical calibration require real respondents; supply a pilot workflow and publish limitations, never fabricate those outcomes.
