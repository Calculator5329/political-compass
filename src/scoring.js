// Pure scoring. Answers are Likert integers −2..+2 keyed by question id;
// unanswered questions contribute nothing but still count toward the
// normalization ceiling, so skipping can't inflate a score.

export const LIKERT = [
  { v: -2, label: 'Strongly disagree' },
  { v: -1, label: 'Disagree' },
  { v: 0, label: 'Neutral / unsure' },
  { v: 1, label: 'Agree' },
  { v: 2, label: 'Strongly agree' },
];

export function score(answers, questions) {
  let x = 0, y = 0, xCeil = 0, yCeil = 0;
  for (const q of questions) {
    xCeil += 2 * Math.abs(q.w.x);
    yCeil += 2 * Math.abs(q.w.y);
    const v = answers[q.id];
    if (typeof v !== 'number') continue;
    x += v * q.w.x;
    y += v * q.w.y;
  }
  return {
    x: xCeil ? round2((10 * x) / xCeil) : 0,
    y: yCeil ? round2((10 * y) / yCeil) : 0,
  };
}

// Sub-dimension scores for the future 4-axis view.
export function subScores(answers, questions) {
  const dims = {};
  for (const q of questions) (dims[q.dim] ??= []).push(q);
  return Object.fromEntries(
    Object.entries(dims).map(([dim, qs]) => [dim, score(answers, qs)])
  );
}

export function quadrant({ x, y }) {
  const vert = y >= 0 ? 'Insurgent' : 'Institutionalist';
  const horiz = x < 0 ? 'Left' : 'Right';
  return `${vert} ${horiz}`;
}

const DESCRIPTIONS = {
  'Insurgent Left': 'You want structural economic and social change, and you doubt the system as it stands can deliver it.',
  'Insurgent Right': 'You hold traditional or market-right commitments and believe entrenched institutions are working against them.',
  'Institutionalist Left': 'You want progressive outcomes pursued through courts, elections, expertise, and process.',
  'Institutionalist Right': 'You favor markets and tradition, defended through the same institutions the system already has.',
};

export function describe(pt) {
  return DESCRIPTIONS[quadrant(pt)];
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
