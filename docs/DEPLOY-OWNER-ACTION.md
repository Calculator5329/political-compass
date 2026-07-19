# Owner action: deploy the Political Test feedback update

## Why this needs Ethan

The update is verified and pushed to `master`, but Firebase deployment is an
owner-only operation under the workspace trust contract. The agent did not run
it.

## What this changes

This publishes the current `master` production build to Firebase Hosting only.
It does not deploy Firestore rules, change repository settings, or publish a
package.

## Run

```bash
cd /home/ethan/projects/mini/political-compass
git status --short --branch
git pull --ff-only origin master
npm ci
npm test
npm run build
firebase deploy --only hosting
```

The status should be clean and on `master`. Tests should pass.
Firebase should end with the hosting URL:
`https://political-test-2026.web.app`.

## Verify

1. Reload the live URL while on Figures or Factions. It should return to The Test.
2. Start the test and confirm the question statement is upright EB Garamond.
3. On Factions, confirm the chart is larger and has no headings or clipped
   faction names inside the plot.
4. Hover or tap the red score mark and confirm the Your score tooltip appears.
5. On Leaderboard, confirm the legend explains saved dots versus the red ✕ and
   that a saved current result is not drawn twice.
6. Confirm Leaderboard shows both Political and Economic × Social charts and
   explains any older entries that lack second-plane scores. A browser that
   still has the original 36-item saved answers should recover that row exactly.
7. Confirm the Leaderboard table has no horizontal scrollbar.
8. Search visible pages for em dashes; none should remain.
9. On Figures, spot-check Newsom, Rogan, Warren, Shapiro, Kirk, and Ramaswamy;
   their placements and source links should reflect the second 42-figure audit.

The current public Firestore rows do not contain original answers, so an entry
whose browser state has already been replaced cannot be reconstructed exactly.
That row remains marked unavailable until its owner retakes the survey.

## Undo

The Firebase console Hosting release history can roll back to the preceding
release. A code-level rollback can also be made without rewriting history:

```bash
cd /home/ethan/projects/mini/political-compass
git switch -c codex/rollback-political-test-feedback
git revert 049379f
npm ci
npm test
npm run build
firebase deploy --only hosting
```

Return the final Firebase deploy output or acknowledge the run card so the
deployment can be recorded as complete.
