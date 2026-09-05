// Election membership is independent of ideological scoring. A null slug is
// deliberately visible as an unscored candidate, never an invented coordinate.
const filings = {
  title: "Minnesota SOS : federal and executive candidate filings",
  url: "https://candidates.sos.mn.gov/CandidateFilingResults.aspx?candidateid=0&executive=True&federal=True&judicial=False&level=1&office=0&party=0&representative=False&senate=False",
};
const canvass = {
  title: "Minnesota SOS : August 18 primary certification",
  url: "https://www.sos.mn.gov/elections-voting/election-results/2026/2026-primary-election-results/2026-state-canvassing-board-primary/",
};
const primaryRule = {
  title: "Minnesota SOS : primary winners advance to November",
  url: "https://sos.mn.gov/elections-voting/how-elections-work/primary-election/",
};
const senate = {
  title: "Minnesota SOS : 2026 U.S. Senate primary winners",
  url: "https://www.sos.mn.gov/elections-voting/election-results/2026/2026-primary-election-results/",
};
const governor = {
  title: "Minnesota SOS : 2026 governor primary results",
  url: "https://electionresults.sos.mn.gov/Results/Index?ersElectionId=200&officeInElectionId=38695&scenario=Governor",
};
const district1 = {
  title: "Minnesota SOS : 2026 congressional district 1 primary results",
  url: "https://electionresults.sos.mn.gov/Results/Index?districtId=556&ersElectionId=200&scenario=USRepresentative",
};

const common = {
  electionDate: "2026-11-03",
  verifiedAt: "2026-09-05",
  stage: "general",
  status: "Primary winners + filed petition candidates",
  ballotCertified: false,
  note: "Compiled from Minnesota SOS primary results and candidate filings. Includes every remaining candidate identified by those records, including unscored petition candidates. Final general-election ballot and write-ins have not been independently verified; confirm your ballot with the election office.",
  ballotUrl: "https://www.sos.mn.gov/elections-voting/whats-on-my-ballot/",
};

export const ELECTIONS = [
  {
    ...common,
    id: "mn-senate-2026",
    name: "Minnesota · U.S. Senate",
    jurisdiction: "Minnesota",
    sources: [senate, filings, canvass, primaryRule],
    candidates: [
      {
        name: "Peggy Flanagan",
        slug: "flanagan",
        party: "Democratic-Farmer-Labor",
        candidacy: "Primary winner",
      },
      {
        name: "Michele Tafoya",
        slug: "tafoya",
        party: "Republican",
        candidacy: "Primary winner",
      },
      {
        name: "Marisa Simonetti",
        slug: null,
        party: "Independent",
        candidacy: "Listed petition candidate",
      },
      {
        name: "Rebecca Whiting",
        slug: null,
        party: "Libertarian",
        candidacy: "Listed petition candidate",
      },
    ],
  },
  {
    ...common,
    id: "mn-governor-2026",
    name: "Minnesota · Governor & lieutenant governor",
    jurisdiction: "Minnesota",
    sources: [governor, filings, canvass, primaryRule],
    candidates: [
      {
        name: "Amy Klobuchar",
        runningMate: "Ben Schierer",
        slug: "klobuchar",
        party: "Democratic-Farmer-Labor",
        candidacy: "Primary winner",
      },
      {
        name: "Lisa Demuth",
        runningMate: "Ryan Wilson",
        slug: "demuth",
        party: "Republican",
        candidacy: "Primary winner",
      },
      {
        name: "Steven Young",
        runningMate: "Jane Kirby",
        slug: null,
        party: "Green",
        candidacy: "Listed petition candidate",
      },
    ],
    scoreNote:
      "A plotted score describes the governor candidate only, not the joint ticket or running mate.",
  },
  {
    ...common,
    id: "mn-house-1-2026",
    name: "Minnesota · U.S. House district 1",
    jurisdiction: "Minnesota congressional district 1",
    status: "Primary winners checked against candidate filings",
    sources: [district1, filings, canvass, primaryRule],
    candidates: [
      {
        name: "Jake Johnson",
        slug: "jakejohnson",
        party: "Democratic-Farmer-Labor",
        candidacy: "Primary winner",
      },
      {
        name: "Brad Finstad",
        slug: "finstad",
        party: "Republican",
        candidacy: "Primary winner",
      },
    ],
  },
];

export const ELECTION_SOURCES = [
  filings,
  canvass,
  primaryRule,
  senate,
  governor,
  district1,
];
