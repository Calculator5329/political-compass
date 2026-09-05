# Political Atlas deployment record

Ethan explicitly authorized implementation, commit, push and redeployment in the
2026-09-05 conversation. This is the site-specific authority for this release.
Earlier owner-only deployment instructions are retained in
`docs/archive/atlas-v1/DEPLOY-OWNER-ACTION.md`.

Target: `political-test-2026` in Firebase project `political-compass-2026`.
URL: https://political-test-2026.web.app

This release deploys Hosting only. Firestore rules and other hosting sites are
unchanged. The ledger uses its existing schema; the `q` field identifies atlas
entries so they are never mixed with historical coordinates.

Verification: `npm test`, `npm run build`, and browser walkthroughs of the core
survey, profile, mobile layout, notebook, comparison consent and local import,
evidence inspection, races and method/pilot controls. Synthetic local answers
are test data, not Ethan's beliefs; no test answers are posted to the ledger.

Initial content deployment succeeded for source commit `c0d262dfe73b053eff42493baea054676739dcad`, Firebase version `32391976f8f11000`. Live verification found a stale browser landing page under Firebase’s default one-hour cache. This update adds revalidation for pages/evidence and immutable caching only for fingerprinted assets. The final artifact and deployment receipt is `docs/deployment-2026-09-05.json`; live build metadata is at https://political-test-2026.web.app/release.json.

Final deployment succeeded for source commit `cc2766eab40e17d4a1e1d6949c2d5441d7c0e14d`, Firebase version `060f34c8d2d783bf`. Every served build file matched its SHA-256 digest; pages and evidence revalidate, fingerprinted assets are immutable. The ordinary live URL was reloaded and displayed the Atlas interface. The machine receipt records eight successful HTTP and content/cache checks. This receipt-only follow-up does not change the deployed application.

Rollback: use the preceding Firebase Hosting release in the console. Retain
all source history; a source rollback must be a revert commit, never a reset or
force-push.
