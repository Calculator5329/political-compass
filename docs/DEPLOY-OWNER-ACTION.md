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

Deployment status and immutable commit/hosting receipt will be recorded here
after the final publish command returns.

Rollback: use the preceding Firebase Hosting release in the console. Retain
all source history; a source rollback must be a revert commit, never a reset or
force-push.
