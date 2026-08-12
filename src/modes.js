// Modes are views over the same scored figures: one instrument, different
// rosters. A figure can belong to several (Klobuchar is national, local, and
// bench). Membership is hand-drawn like factions.js - display grouping only,
// never scoring. Slugs that have no figure yet are ignored, so a roster can
// name someone before their evidence dossier lands.

export const MODES = [
  {
    id: 'national',
    name: 'National',
    blurb:
      'The national landscape: officeholders, candidates, media, and the two ' +
      'foreign heads of state the instrument reads by closest analogue.',
    // Everyone except figures whose record is purely state-level.
    members: null,
  },
  {
    id: 'local',
    name: 'Local Leaders',
    blurb:
      'Minnesota: the statewide DFL bench, the Republican House speaker, a ' +
      'contested First District race, and the state’s loudest private citizens.',
    members: [
      'klobuchar', 'craig', 'flanagan', 'ellison', 'walz',
      'demuth', 'finstad', 'jakejohnson', 'tafoya', 'lindell',
    ],
  },
  {
    id: 'bench',
    name: 'The 2028 Bench',
    blurb:
      'Who runs next: the governors, senators, and the sitting Vice President ' +
      'most often named for 2028, on both sides.',
    members: [
      'vance', 'desantis', 'rubio', 'hawley', 'youngkin', 'kemp', 'haley', 'ramaswamy',
      'newsom', 'jshapiro', 'whitmer', 'moore', 'beshear', 'pritzker',
      'buttigieg', 'aoc', 'walz', 'harris', 'klobuchar',
    ],
  },
];

export const DEFAULT_MODE = 'national';

export function modeById(id) {
  return MODES.find((mode) => mode.id === id) ?? MODES[0];
}

// National is defined by subtraction rather than by a list: a figure is on it
// unless their record is purely state-level, so adding a national figure never
// means remembering to edit a roster here.
export function figuresInMode(figures, id) {
  const mode = modeById(id);
  if (!mode.members) return figures.filter((figure) => !figure.local);
  const rank = new Map(mode.members.map((slug, i) => [slug, i]));
  return figures
    .filter((figure) => rank.has(figure.slug))
    .sort((a, b) => rank.get(a.slug) - rank.get(b.slug));
}
