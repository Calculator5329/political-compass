# 2026 race membership research

Checked 2026-09-05. The atlas now separates people with ideological dossiers from people running in a particular election. Race membership is drawn from election administration sources, never prominence or an old candidacy note.

## Minnesota general-election compilation

The [SOS primary explanation](https://sos.mn.gov/elections-voting/how-elections-work/primary-election/) says primary winners represent their parties in November. The [State Canvassing Board page](https://www.sos.mn.gov/elections-voting/election-results/2026/2026-primary-election-results/2026-state-canvassing-board-primary/) confirms certification on August 18. Its linked [certificate record 20262739](https://officialdocuments.sos.mn.gov/Document/Details/159977) identifies the state/federal partisan and judicial primary certificate. The downloadable certificate itself was not available through the text reader.

| Race | Major-party winners | Other candidates retained from filings |
| --- | --- | --- |
| U.S. Senate | Peggy Flanagan (DFL), Michele Tafoya (Republican) | Marisa Simonetti (Independent), Rebecca Whiting (Libertarian) |
| Governor / lieutenant governor | Amy Klobuchar / Ben Schierer (DFL), Lisa Demuth / Ryan Wilson (Republican) | Steven Young / Jane Kirby (Green) |
| U.S. House district 1 | Jake Johnson (DFL), Brad Finstad (Republican) | None listed |

Evidence:

- [SOS Senate primary summary](https://www.sos.mn.gov/elections-voting/election-results/2026/2026-primary-election-results/) explicitly marks Flanagan and Tafoya as winners.
- [SOS governor results](https://electionresults.sos.mn.gov/Results/Index?ersElectionId=200&officeInElectionId=38695&scenario=Governor) shows Demuth and Klobuchar leading their party contests, all precincts reporting.
- [SOS district 1 results](https://electionresults.sos.mn.gov/Results/Index?districtId=556&ersElectionId=200&scenario=USRepresentative) shows Finstad and Johnson leading their party contests, all precincts reporting.
- [SOS federal/executive filings](https://candidates.sos.mn.gov/CandidateFilingResults.aspx?candidateid=0&executive=True&federal=True&judicial=False&level=1&office=0&party=0&representative=False&senate=False) lists all filed contenders and their parties/tickets. Its instructions say petition filers are added after review and withdrawn candidates are removed. Retained non-major-party entries provide the three additional candidacies above.

The governor and congressional results pages retain an “Unofficial Results” banner even though the separate canvassing page reports certification. The compilation therefore cites both and does not pretend to be a downloaded certified general-election ballot. Primary losers, including Angie Craig and Mike Lindell, are excluded from these November races but can remain in the public-figure atlas.

## Limits and refresh

The [candidate finder](https://candidates.sos.mn.gov/) offers a separate general-election text export. A browser click produced no readable document; a direct public-form request encountered a CAPTCHA. No CAPTCHA was solved or bypassed. The dataset is explicitly marked `ballotCertified: false`, with status describing its reconstruction from primary winners and petition filings. It includes all remaining candidates identified in those inspected records, but future substitutions, withdrawals, and write-ins require rechecking. The date is a research snapshot, not a live feed or official state attestation of this application.

Each unscored candidate has `slug: null`, remains in the list, and must not receive invented neutral coordinates. Governor `runningMate` preserves the joint ticket while `slug` refers only to the governor candidate's dossier. Display `scoreNote` for that race.

For a voter's actual ballot, link to [Minnesota SOS What's on My Ballot](https://www.sos.mn.gov/elections-voting/whats-on-my-ballot/).

## Outside Minnesota

An additional Pennsylvania governor roster was investigated. The [Washington County election page](https://www.washingtoncopa.gov/elections/2026-election-information) identifies Josh Shapiro and Stacy Garrity but calls its list unofficial and retains contested lieutenant-governor primary entries. That cannot establish a complete September general-election roster or exclude minor-party candidates. No Pennsylvania race was added on that evidence. The module is jurisdiction-independent and can accept further races once equivalent complete election records are checked.

## Module contract

`src/elections.js` exports `ELECTIONS` and `ELECTION_SOURCES`. Every election supplies `id`, `name`, `jurisdiction`, `electionDate`, `verifiedAt`, `stage`, `status`, `ballotCertified`, `note`, `ballotUrl`, `sources`, and `candidates`. Every candidate supplies `name`, exact existing `slug` or null, `party`, and `candidacy`; governor entries also have `runningMate`. Race scores are joined through `slug` only. Never hide candidates because they lack a dossier.
