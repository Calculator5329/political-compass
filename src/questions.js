// Retained 54-item legacy bank. The live atlas uses instrument.js.
// The instrument. Each statement loads on the two axes via a weight vector:
//   x: left (−) ↔ right (+)      y: institutionalist (−) ↔ insurgent (+)
// dim tags the sub-dimension (econ / social / system / foreign) so alternate
// views can be rendered without touching a single question. Roughly half are
// reverse-coded (agreement pulls left or institutionalist) to cancel
// agree-bias. The 42-item 2026 bank was Ethan-reviewed on 2026-07-18.

export const QUESTIONS = [
  // ----- economic (x-heavy) -----
  { id: 'e01', dim: 'econ', text: 'Broad tariffs are worth it to protect American industry, even if consumer prices rise.', w: { x: 0.6, y: 0.3 } },
  { id: 'e02', dim: 'econ', text: 'The federal government should guarantee health insurance for every American.', w: { x: -0.9, y: 0.0 } },
  { id: 'e03', dim: 'econ', text: 'A wealth tax on fortunes above $50 million is fair.', w: { x: -0.8, y: 0.1 } },
  { id: 'e04', dim: 'econ', text: 'The minimum wage should be set by the market, not the government.', w: { x: 0.9, y: 0.0 } },
  { id: 'e05', dim: 'econ', text: 'The largest tech companies should be broken up.', w: { x: -0.3, y: 0.5 } },
  { id: 'e07', dim: 'econ', text: 'Paid family leave and subsidized child care should be federal programs.', w: { x: -0.7, y: 0.0 } },
  { id: 'e08', dim: 'econ', text: 'Government should largely leave cryptocurrency alone rather than regulate it like traditional finance.', w: { x: 0.5, y: 0.4 } },
  { id: 'e09', dim: 'econ', text: 'Labor unions do more good than harm for working people.', w: { x: -0.7, y: 0.1 } },
  { id: 'e10', dim: 'econ', text: 'Canceling student debt rewards bad decisions at everyone else’s expense.', w: { x: 0.7, y: 0.0 } },
  { id: 'e11', dim: 'econ', text: 'Aggressive federal action on climate is worth real costs to economic growth.', w: { x: -0.7, y: -0.1 } },
  { id: 'e12', dim: 'econ', text: 'Cutting corporate taxes ultimately benefits ordinary workers.', w: { x: 0.8, y: -0.1 } },
  { id: 'e13', dim: 'econ', text: 'The government should directly run essential services like groceries, banking, and utilities where markets fail.', w: { x: -0.8, y: 0.3 } },

  // ----- social (x-heavy) -----
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
  { id: 's13', dim: 'social', text: 'Transgender women should be allowed to compete in women’s sports.', w: { x: -0.7, y: 0.1 } },

  // ----- system (y-heavy) -----
  { id: 'y01', dim: 'system', text: 'Mainstream news coverage can generally be trusted to get the basic facts right.', w: { x: 0.0, y: -0.8 } },
  { id: 'y02', dim: 'system', text: 'Recent presidential elections were administered fairly and their results can be trusted.', w: { x: 0.0, y: -0.8 } },
  { id: 'y03', dim: 'system', text: 'The president, not career officials, should decide whom the Justice Department investigates.', w: { x: 0.3, y: 0.7 } },
  { id: 'y04', dim: 'system', text: 'A president should be able to fire any federal employee who obstructs the agenda voters chose.', w: { x: 0.3, y: 0.7 } },
  { id: 'y05', dim: 'system', text: 'When normal politics keeps failing, mass civil disobedience - blocking roads, occupying buildings - is justified.', w: { x: -0.2, y: 0.8 } },
  { id: 'y06', dim: 'system', text: 'Government agencies should never pressure platforms to take down lawful speech, even misinformation.', w: { x: 0.2, y: 0.6 } },
  { id: 'y08', dim: 'system', text: 'Both major parties answer to donors, not voters.', w: { x: 0.0, y: 0.8 } },
  { id: 'y09', dim: 'system', text: 'On complex questions, expert consensus deserves deference in policymaking.', w: { x: -0.1, y: -0.8 } },
  { id: 'y10', dim: 'system', text: 'There is a coordinated effort inside federal agencies to sabotage presidents they oppose.', w: { x: 0.3, y: 0.8 } },
  { id: 'y11', dim: 'system', text: 'America’s constitutional system needs fundamental restructuring, not incremental reform.', w: { x: -0.1, y: 0.8 } },
  { id: 'y12', dim: 'system', text: 'Compromise between the parties is how the system is supposed to work, not a betrayal.', w: { x: 0.0, y: -0.7 } },
  { id: 'y13', dim: 'system', text: 'A president should be able to seek a third term if voters want one.', w: { x: 0.3, y: 0.9 } },
  { id: 'y14', dim: 'system', text: 'Pardoning your own supporters who were convicted of political violence is an abuse of the pardon power.', w: { x: -0.3, y: -0.8 } },
  { id: 'y15', dim: 'system', text: 'The government has been hiding the truth about the Epstein files.', w: { x: 0.1, y: 0.8 } },

  // ----- foreign (2026 coalition splitters) -----
  { id: 'f01', dim: 'foreign', text: 'The United States should stay out of foreign wars even when allies ask for help.', w: { x: 0.2, y: 0.6 } },
  { id: 'f02', dim: 'foreign', text: 'American support for Israel should continue largely unconditionally.', w: { x: 0.6, y: -0.3 } },
  { id: 'f03', dim: 'foreign', text: 'Continuing military aid to Ukraine is in America’s interest.', w: { x: -0.4, y: -0.6 } },

  // ----- wave-2 expansion, curated 2026-08-11 (full candidate list and the
  // rejects: docs/question-expansion-2026-08.md). `pending` marks items the
  // figure dossiers have not been researched against yet: figures are scored
  // on the subset they have answered, and the coverage test exempts these
  // until a research pass lands and the flag comes off.
  { id: 'f04', dim: 'foreign', pending: true, text: 'If China attacks Taiwan, the United States should defend it militarily.', w: { x: 0.1, y: -0.6 } },
  { id: 'f05', dim: 'foreign', pending: true, text: 'The military budget should be cut substantially and the savings spent at home.', w: { x: -0.5, y: 0.3 } },
  { id: 'f06', dim: 'foreign', pending: true, text: 'NATO allies that will not pay for their own defense should not count on American protection.', w: { x: 0.4, y: 0.5 } },
  { id: 'f07', dim: 'foreign', pending: true, text: 'Foreign aid that fights famine and disease abroad is money well spent.', w: { x: -0.4, y: -0.5 } },
  { id: 'f08', dim: 'foreign', pending: true, text: 'International bodies like the UN and the WHO have too much say over American policy.', w: { x: 0.4, y: 0.6 } },

  // ----- liberty (order vs civil liberties; cross-cuts left/right) -----
  { id: 'l01', dim: 'liberty', pending: true, text: 'Expanded government surveillance is an acceptable price for stopping terrorism and violent crime.', w: { x: 0.2, y: -0.6 } },
  { id: 'l02', dim: 'liberty', pending: true, text: 'Authorities should be able to ban protests they judge a threat to public order.', w: { x: 0.3, y: -0.6 } },
  { id: 'l03', dim: 'liberty', pending: true, text: 'Speech that demeans racial or religious groups should be punishable by law.', w: { x: -0.4, y: -0.4 } },

  // ----- tech (the 2026 technology fights) -----
  { id: 't01', dim: 'tech', pending: true, text: 'Frontier artificial intelligence should be licensed and regulated as strictly as aviation or pharmaceuticals, even if that slows it down.', w: { x: -0.4, y: -0.3 } },
  { id: 't02', dim: 'tech', pending: true, text: 'Banks and payment processors should be barred from denying service over lawful speech or politics.', w: { x: 0.3, y: 0.5 } },
  { id: 't03', dim: 'tech', pending: true, text: 'If automation and AI wipe out large numbers of jobs, the government should guarantee a basic income.', w: { x: -0.7, y: 0.1 } },

  // ----- system, principle-pair probe (mirrors y04) -----
  { id: 'y16', dim: 'system', pending: true, text: 'Career officials who resist a president’s orders on legal grounds are doing their job, not sabotaging democracy.', w: { x: -0.2, y: -0.7 } },
];

// Mirrored statement pairs: each pair asks for the same underlying power or
// principle with the valence flipped. Endorsing both sides of a pair is a
// measurable inconsistency, surfaced by pairConsistency() in insights.js.
export const PRINCIPLE_PAIRS = [
  ['y04', 'y16'],
  ['y05', 'l02'],
];
