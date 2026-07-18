// The instrument. Each statement loads on the two axes via a weight vector:
//   x: left (−) ↔ right (+)      y: institutionalist (−) ↔ insurgent (+)
// dim tags the sub-dimension (econ / social / system) so a 4-axis view can be
// rendered later without touching a single question. Roughly half are
// reverse-coded (agreement pulls left or institutionalist) to cancel
// agree-bias. DRAFT v1 — statement bank pending Ethan review.

export const QUESTIONS = [
  // ————— economic (x-heavy) —————
  { id: 'e01', dim: 'econ', text: 'Broad tariffs are worth it to protect American industry, even if consumer prices rise.', w: { x: 0.6, y: 0.3 } },
  { id: 'e02', dim: 'econ', text: 'The federal government should guarantee health insurance for every American.', w: { x: -0.9, y: 0.0 } },
  { id: 'e03', dim: 'econ', text: 'A wealth tax on fortunes above $50 million is fair.', w: { x: -0.8, y: 0.1 } },
  { id: 'e04', dim: 'econ', text: 'The minimum wage should be set by the market, not the government.', w: { x: 0.9, y: 0.0 } },
  { id: 'e05', dim: 'econ', text: 'The largest tech companies should be broken up.', w: { x: -0.3, y: 0.5 } },
  { id: 'e06', dim: 'econ', text: 'Social Security should be partially privatized into individual accounts.', w: { x: 0.8, y: -0.1 } },
  { id: 'e07', dim: 'econ', text: 'Paid family leave and subsidized child care should be federal programs.', w: { x: -0.7, y: 0.0 } },
  { id: 'e08', dim: 'econ', text: 'Government should largely leave cryptocurrency alone rather than regulate it like traditional finance.', w: { x: 0.5, y: 0.4 } },
  { id: 'e09', dim: 'econ', text: 'Labor unions do more good than harm for working people.', w: { x: -0.7, y: 0.1 } },
  { id: 'e10', dim: 'econ', text: 'Canceling student debt rewards bad decisions at everyone else’s expense.', w: { x: 0.7, y: 0.0 } },
  { id: 'e11', dim: 'econ', text: 'Aggressive federal action on climate is worth real costs to economic growth.', w: { x: -0.7, y: -0.1 } },
  { id: 'e12', dim: 'econ', text: 'Cutting corporate taxes ultimately benefits ordinary workers.', w: { x: 0.8, y: -0.1 } },

  // ————— social (x-heavy) —————
  { id: 's01', dim: 'social', text: 'Abortion should be legal in most circumstances.', w: { x: -0.8, y: 0.0 } },
  { id: 's02', dim: 'social', text: 'Government IDs and official forms should list only male or female.', w: { x: 0.7, y: 0.0 } },
  { id: 's03', dim: 'social', text: 'Further restrictions on gun ownership violate a fundamental right.', w: { x: 0.8, y: 0.1 } },
  { id: 's04', dim: 'social', text: 'Some police funding would do more good redirected to mental-health and social services.', w: { x: -0.7, y: 0.1 } },
  { id: 's05', dim: 'social', text: 'People living in the country illegally should be found and deported, whatever it takes.', w: { x: 0.7, y: 0.4 } },
  { id: 's06', dim: 'social', text: 'Legal immigration makes America stronger and should be expanded.', w: { x: -0.4, y: -0.4 } },
  { id: 's07', dim: 'social', text: 'Schools should teach that racism is built into American institutions, not just individual prejudice.', w: { x: -0.7, y: 0.0 } },
  { id: 's08', dim: 'social', text: 'Religious faith deserves a larger role in American public life.', w: { x: 0.7, y: 0.1 } },
  { id: 's09', dim: 'social', text: 'State governments should ban puberty blockers and hormone therapy for minors, even when parents and doctors approve.', w: { x: 0.7, y: 0.1 } },
  { id: 's10', dim: 'social', text: 'Marijuana should be legal nationwide.', w: { x: -0.4, y: 0.2 } },
  { id: 's11', dim: 'social', text: 'Hiring and promotion should be strictly race- and gender-blind, even if workplace diversity suffers.', w: { x: 0.7, y: 0.0 } },
  { id: 's12', dim: 'social', text: 'The death penalty should be abolished.', w: { x: -0.6, y: -0.1 } },

  // ————— system (y-heavy) —————
  { id: 'y01', dim: 'system', text: 'Mainstream news coverage can generally be trusted to get the basic facts right.', w: { x: 0.0, y: -0.8 } },
  { id: 'y02', dim: 'system', text: 'Recent presidential elections were administered fairly and their results can be trusted.', w: { x: 0.0, y: -0.8 } },
  { id: 'y03', dim: 'system', text: 'Federal law enforcement (FBI, DOJ) generally applies the law fairly regardless of politics.', w: { x: 0.0, y: -0.8 } },
  { id: 'y04', dim: 'system', text: 'A president should be able to fire any federal employee who obstructs the agenda voters chose.', w: { x: 0.3, y: 0.7 } },
  { id: 'y05', dim: 'system', text: 'When normal politics keeps failing, mass civil disobedience — blocking roads, occupying buildings — is justified.', w: { x: -0.2, y: 0.8 } },
  { id: 'y06', dim: 'system', text: 'Government agencies should never pressure platforms to take down lawful speech, even misinformation.', w: { x: 0.2, y: 0.6 } },
  { id: 'y07', dim: 'system', text: 'Supreme Court rulings deserve respect even when they are wrong.', w: { x: 0.0, y: -0.8 } },
  { id: 'y08', dim: 'system', text: 'Both major parties answer to donors, not voters.', w: { x: 0.0, y: 0.8 } },
  { id: 'y09', dim: 'system', text: 'On complex questions, expert consensus deserves deference in policymaking.', w: { x: -0.1, y: -0.8 } },
  { id: 'y10', dim: 'system', text: 'There is a coordinated effort inside federal agencies to sabotage presidents they oppose.', w: { x: 0.3, y: 0.8 } },
  { id: 'y11', dim: 'system', text: 'America’s constitutional system needs fundamental restructuring, not incremental reform.', w: { x: -0.1, y: 0.8 } },
  { id: 'y12', dim: 'system', text: 'Compromise between the parties is how the system is supposed to work, not a betrayal.', w: { x: 0.0, y: -0.7 } },
];
