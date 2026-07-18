// The factions of the 2026 map — hand-drawn territories, not computed
// clusters. Ellipses are in axis units on the main (left/right ×
// insurgent/institutionalist) plane; members list the figures.js slugs the
// territory is drawn around. Display copy only — scoring stays in figures.js.

export const FACTIONS = [
  {
    name: 'MAGA & the New Right',
    x: 6.2, y: 6.4, rx: 3.7, ry: 3.0,
    fill: 'rgba(122, 31, 31, 0.10)',
    blurb:
      'The governing insurgency: Trump loyalists, its media organs, and its ' +
      'apostates who broke over Epstein and Iran but kept the worldview.',
    members: ['trump', 'vance', 'miller', 'bannon', 'jones', 'desantis', 'mtg', 'kirk', 'carlson', 'pool', 'owens', 'ramaswamy'],
  },
  {
    name: 'Populist Independents',
    x: 2.0, y: 3.7, rx: 3.4, ry: 2.4,
    fill: 'rgba(64, 84, 55, 0.12)',
    blurb:
      'Podcasters, contrarians, and defectors of no fixed party — anti-expert, ' +
      'anti-establishment, allergic to both machines.',
    members: ['rogan', 'rfk', 'gabbard', 'musk', 'paul'],
  },
  {
    name: 'Socialist Left',
    x: -7.9, y: 1.0, rx: 2.7, ry: 3.3,
    fill: 'rgba(94, 44, 84, 0.10)',
    blurb:
      'DSA and its orbit: structural change through movement politics, deeply ' +
      'skeptical the system can reform itself.',
    members: ['sanders', 'aoc', 'mamdani', 'piker', 'west', 'stewart'],
  },
  {
    name: 'Democratic Establishment',
    x: -7.4, y: -4.9, rx: 2.6, ry: 3.1,
    fill: 'rgba(58, 63, 94, 0.11)',
    blurb:
      'The DNC mainline: progressive ends pursued through courts, elections, ' +
      'expertise, and party discipline.',
    members: ['biden', 'obama', 'harris', 'newsom', 'buttigieg', 'warren', 'pakman', 'btc'],
  },
  {
    name: 'Centrist Liberals',
    x: -2.9, y: -4.1, rx: 2.3, ry: 2.7,
    fill: 'rgba(120, 94, 38, 0.11)',
    blurb:
      'Liberals at odds with their own side — anti-woke, pro-institution, ' +
      'louder about the left’s excesses than the right’s.',
    members: ['maher', 'fetterman', 'destiny', 'hutch'],
  },
  {
    name: 'Reaganite Conservatives',
    x: 4.9, y: -3.9, rx: 3.5, ry: 3.6,
    fill: 'rgba(43, 38, 32, 0.08)',
    blurb:
      'Pre-Trump conservatism in exile: free trade, faith, fiscal rectitude, ' +
      'and a defense of the constitutional order.',
    members: ['romney', 'cheney', 'pence', 'haley', 'shapiro'],
  },
];
