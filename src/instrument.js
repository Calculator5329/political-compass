import { QUESTIONS as LEGACY } from "./questions.js";

export const INSTRUMENT_VERSION = "atlas-2026.09.05";
export const SCORING_VERSION = "independent-dimensions-1";
export const AXES = {
  econ: {
    name: "Economics",
    low: "Public provision",
    high: "Market allocation",
    group: "core",
    description:
      "Preferred role for public provision and redistribution versus market allocation.",
  },
  social: {
    name: "Social values",
    low: "Progressive",
    high: "Traditional",
    group: "core",
    description:
      "Views on social norms and the role of tradition in public life.",
  },
  power: {
    name: "Checks on power",
    low: "Executive discretion",
    high: "Institutional checks",
    group: "core",
    description:
      "Constraints on executive authority, distinct from satisfaction with today’s institutions.",
  },
  liberty: {
    name: "Civil liberties",
    low: "Enforcement discretion",
    high: "Individual protections",
    group: "core",
    description:
      "Privacy, expression and procedural rights versus discretion to enforce order.",
  },
  build: {
    name: "Building & review",
    low: "Local control & review",
    high: "Permission to build",
    group: "core",
    description:
      "Authority to build housing and infrastructure versus local control and additional review.",
  },
  trust: {
    name: "Institutional trust",
    low: "Skeptical",
    high: "Trusting",
    group: "trust",
    description:
      "Reported trust in several institutions. Read the individual answers because trust can vary by institution.",
  },
  military: {
    name: "Military policy",
    low: "Restraint",
    high: "Military engagement",
    group: "foreign",
    description:
      "Willingness to use military force or military assistance overseas.",
  },
  cooperation: {
    name: "International cooperation",
    low: "National discretion",
    high: "Cooperation",
    group: "foreign",
    description:
      "Diplomacy, humanitarian aid and shared international institutions.",
  },
  trade: {
    name: "Trade",
    low: "Open trade",
    high: "Protection",
    group: "foreign",
    description: "Trade barriers and domestic production preferences.",
  },
  governance: {
    name: "AI safeguards",
    low: "Developer discretion",
    high: "Public safeguards",
    group: "tech",
    description:
      "Evaluation and accountability requirements, not enthusiasm for technology.",
  },
  openness: {
    name: "Digital autonomy",
    low: "Central oversight",
    high: "Individual autonomy",
    group: "tech",
    description: "Ability to use technology without centralized permission.",
  },
  corporate: {
    name: "Corporate power",
    low: "Company discretion",
    high: "Public constraints",
    group: "tech",
    description:
      "Limits on large companies and their control over access and personal data.",
  },
};
export const MODULES = [
  {
    id: "core",
    name: "The core profile",
    description: "30 questions across the main dimensions. Start here.",
  },
  {
    id: "econ",
    name: "Economics & public services",
    description:
      "Taxes, redistribution, public services and fiscal priorities.",
  },
  {
    id: "social",
    name: "Social values & civil liberties",
    description: "Social norms, privacy, expression and procedural rights.",
  },
  {
    id: "system",
    name: "Power & institutions",
    description: "Checks, reform, trust and government capability.",
  },
  {
    id: "build",
    name: "Housing, energy & building",
    description: "Construction, local authority and climate choices.",
  },
  {
    id: "foreign",
    name: "Foreign policy",
    description: "Military force, cooperation and trade as distinct choices.",
  },
  {
    id: "tech",
    name: "Technology & data",
    description: "AI governance, digital autonomy and corporate power.",
  },
  {
    id: "current",
    name: "Current affairs · September 2026",
    description:
      "Dated issue snapshots. These do not alter your durable core dimensions.",
  },
];
const loads = {
  e01: { trade: 1 },
  e02: { econ: -1 },
  e03: { econ: -1 },
  e04: { econ: 1 },
  e05: { corporate: 1 },
  e07: { econ: -1 },
  e08: { openness: 1 },
  e09: { econ: -1 },
  e10: { econ: 1 },
  e11: {},
  e12: { econ: 1 },
  e13: { econ: -1 },
  s01: { social: -1 },
  s02: { social: 1 },
  s03: { liberty: 1 },
  s04: { liberty: 1 },
  s05: {},
  s06: { social: -1 },
  s07: { social: -1 },
  s08: { social: 1 },
  s09: { social: 1 },
  s10: { liberty: 1 },
  s11: { social: 1 },
  s12: { liberty: 1 },
  s13: { social: -1 },
  y01: { trust: 1 },
  y02: { trust: 1 },
  y03: { power: -1 },
  y04: { power: -1 },
  y05: { liberty: 1 },
  y06: { liberty: 1 },
  y08: { trust: -1 },
  y09: { trust: 1 },
  y10: {},
  y11: {},
  y12: {},
  y13: { power: -1 },
  y14: { power: 1 },
  y15: {},
  y16: { power: 1 },
  f01: { military: -1 },
  f02: { military: 1 },
  f03: { military: 1 },
  f04: { military: 1 },
  f05: { military: -1 },
  f06: { cooperation: -1 },
  f07: { cooperation: 1 },
  f08: { cooperation: -1 },
  l01: { liberty: -1 },
  l02: { liberty: -1 },
  l03: { liberty: -1 },
  t01: { governance: 1 },
  t02: { corporate: 1 },
  t03: { econ: -1 },
};
const revisions = {
  e07: "The federal government should fund paid family leave.",
  e10: "The federal government should cancel outstanding federal student loans.",
  e13: "Government should operate public utilities where private providers fail to deliver reliable service.",
  s05: "The government should increase deportations of people living in the country without legal authorization.",
  s06: "The United States should increase the number of people admitted through legal immigration.",
  s11: "Employers should be prohibited from considering race or gender when selecting candidates.",
  y02: "I trust election officials to count votes accurately.",
  y03: "The president should be allowed to direct investigations of specific people by the Justice Department.",
  y04: "A president should be allowed to dismiss career officials for disagreeing with the president’s policy agenda.",
  y10: "I believe career officials often obstruct presidents because of political disagreement.",
  y13: "The Constitution should be amended to allow presidents to serve more than two elected terms.",
  f01: "The United States should avoid entering overseas wars to defend allies.",
  f05: "The United States should substantially reduce its military spending.",
  l02: "Authorities should be allowed to prohibit a peaceful protest if they expect serious disruption to traffic.",
  t01: "Developers should complete independent safety evaluations before releasing their most capable AI systems.",
};
const sourceByModule = {
  build: [
    {
      title: "HUD: housing regulatory barriers",
      url: "https://www.huduser.gov/portal/publications/eliminating-regulatory-barriers-to-affordable-housing.html",
    },
  ],
  tech: [
    {
      title: "NIST: AI Risk Management Framework",
      url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
    },
    {
      title: "FTC: commercial data practices",
      url: "https://www.ftc.gov/system/files/ftc_gov/pdf/Social-Media-6b-Report-9-11-2024.pdf",
    },
  ],
  system: [
    {
      title: "GAO: government technology management",
      url: "https://www.gao.gov/products/gao-25-107852",
    },
  ],
};
const remodule = {
  e01: "foreign",
  e05: "tech",
  e08: "tech",
  e11: "build",
  y01: "system",
  y15: "current",
  y10: "current",
  l01: "social",
  l02: "social",
  l03: "social",
};
const bank = LEGACY.map((q) => {
  const module = remodule[q.id] ?? { liberty: "social" }[q.dim] ?? q.dim;
  const revised = q.id in revisions;
  return {
    id: revised ? `${q.id}r2` : q.id,
    legacyId: q.id,
    text: revisions[q.id] ?? q.text,
    module,
    loads: q.id === "e10" ? { econ: -1 } : loads[q.id],
    revised,
    core: false,
    rationale:
      "Policy preference; the dimension mapping is editorial and provisional.",
    sources: sourceByModule[module] ?? [],
    ...(module === "current"
      ? {
          edition: "2026-09-05",
          expires: "2026-12-05",
          loads: {},
          rationale:
            "A dated belief question, not an assertion that the belief is true. It is excluded from core scores.",
        }
      : {}),
  };
});
const additions = [
  [
    "b01",
    "build",
    "Property owners should be allowed to build small apartment buildings in neighborhoods currently restricted to detached houses.",
    { build: 1 },
  ],
  [
    "b02",
    "build",
    "States should be able to override local housing restrictions when a community allows too little new housing.",
    { build: 1 },
  ],
  [
    "b03",
    "build",
    "Major transmission projects should have a fixed deadline for approval or rejection, even if that limits time for local objections.",
    { build: 1 },
  ],
  [
    "b04",
    "build",
    "New nuclear power plants should be part of the country’s strategy for reducing carbon emissions.",
    {},
  ],
  [
    "b05",
    "build",
    "Local residents should retain the power to block new housing even when a project meets published safety standards.",
    { build: -1 },
  ],
  [
    "b06",
    "build",
    "The government should fund construction of public housing.",
    { econ: -1 },
  ],
  [
    "b07",
    "build",
    "Tenant protections should limit how much landlords can increase rents each year.",
    { econ: -1 },
  ],
  [
    "t04",
    "tech",
    "People denied public benefits by an automated system should be entitled to a human review.",
    { governance: 1 },
  ],
  [
    "t05",
    "tech",
    "Companies should need explicit permission before selling a person’s location history.",
    { corporate: 1 },
  ],
  [
    "t06",
    "tech",
    "Adults should be allowed to run AI models on their own devices without registering with the government.",
    { openness: 1 },
  ],
  [
    "t07",
    "tech",
    "Developers should be allowed to release general-purpose AI systems without an independent safety evaluation.",
    { governance: -1 },
  ],
  [
    "t08",
    "tech",
    "The government should require providers to approve which general-purpose software adults install on their personal devices.",
    { openness: -1 },
  ],
  [
    "t09",
    "tech",
    "People should be able to use encrypted messaging that its provider cannot read.",
    { openness: 1, liberty: 1 },
  ],
  [
    "t10",
    "tech",
    "Large online platforms should be free to set access rules for lawful businesses without government intervention.",
    { corporate: -1 },
  ],
  [
    "l04",
    "social",
    "People facing deportation should have access to an individual hearing, even if this slows removals.",
    { liberty: 1 },
  ],
  [
    "y17",
    "system",
    "Government agencies should pay more to recruit scarce technical specialists, even when this exceeds ordinary public-sector salaries.",
    {},
  ],
  [
    "y18",
    "system",
    "Legislative seats should be allocated in proportion to each party’s share of the vote, even if that produces more coalition governments.",
    {},
  ],
  [
    "y19",
    "system",
    "The president should comply with final court orders even when they prevent a major campaign promise.",
    { power: 1 },
  ],
  [
    "y20",
    "system",
    "During a national emergency, the president should be able to suspend legislative oversight.",
    { power: -1 },
  ],
  [
    "y21",
    "system",
    "I trust courts to apply the law fairly regardless of a person’s political connections.",
    { trust: 1 },
  ],
  [
    "y22",
    "system",
    "I trust scientific institutions to correct their conclusions when evidence changes.",
    { trust: 1 },
  ],
  [
    "y23",
    "system",
    "I trust large businesses to provide accurate information about the risks of their products.",
    { trust: 1 },
  ],
  [
    "e14",
    "econ",
    "Reducing the federal deficit should take priority over cutting income taxes.",
    {},
  ],
  [
    "e15",
    "econ",
    "The federal government should subsidize child care.",
    { econ: -1 },
  ],
  [
    "f09",
    "foreign",
    "The United States should pursue diplomatic agreements with hostile governments even when major disagreements remain.",
    { cooperation: 1 },
  ],
  [
    "f10",
    "foreign",
    "Import restrictions should be reduced even when some domestic businesses face greater competition.",
    { trade: -1 },
  ],
  [
    "f11",
    "foreign",
    "Government purchases should favor domestic production even when imported alternatives cost less.",
    { trade: 1 },
  ],
  [
    "c01",
    "current",
    "Before the November 2026 election, federal candidates should publish detailed plans for oversight of government use of AI.",
    {},
  ],
  [
    "c02",
    "current",
    "Housing supply should be a leading priority for candidates in the November 2026 election.",
    {},
  ],
];
for (const [id, module, text, weights] of additions)
  bank.push({
    id,
    module,
    text,
    loads: weights,
    core: false,
    revised: false,
    rationale: Object.keys(weights).length
      ? "A proposed item for the stated dimension; not yet calibrated with respondents."
      : "An issue position shown individually, without forcing it onto an axis.",
    sources: sourceByModule[module] ?? [],
    ...(module === "current"
      ? { edition: "2026-09-05", expires: "2026-11-04" }
      : {}),
  });
const coreIds = [
  "e02",
  "e03",
  "e04",
  "e07r2",
  "e09",
  "e10r2",
  "e12",
  "s01",
  "s02",
  "s06r2",
  "s08",
  "s11r2",
  "s13",
  "y01",
  "y03r2",
  "y09",
  "y14",
  "y16",
  "y19",
  "l01",
  "l02r2",
  "l04",
  "f01r2",
  "f03",
  "b01",
  "b02",
  "b03",
  "t01r2",
  "t04",
  "t06",
];
export const BANK = bank.map((q) => ({ ...q, core: coreIds.includes(q.id) }));
export const BY_ID = Object.fromEntries(BANK.map((q) => [q.id, q]));
export const CONTEXT_PAIRS = [
  ["y04r2", "y16"],
  ["y05", "l02r2"],
  ["t01r2", "t07"],
];
export const REASONS = {
  e01: [
    "Protect jobs",
    "National security",
    "Bargaining leverage",
    "Domestic self-sufficiency",
    "Other / context matters",
  ],
  b01: [
    "Housing affordability",
    "Property rights",
    "Neighborhood character",
    "Infrastructure capacity",
    "Other / context matters",
  ],
  t01r2: [
    "Safety",
    "Public accountability",
    "Avoiding barriers to entry",
    "Freedom to innovate",
    "Other / context matters",
  ],
  l04: [
    "Due process",
    "Enforcement speed",
    "Avoiding mistaken removals",
    "Administrative cost",
    "Other / context matters",
  ],
};
export function moduleQuestions(id) {
  return BANK.filter((q) =>
    id === "core" ? q.core : q.module === id && !q.core,
  );
}
