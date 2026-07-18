import { QUESTIONS } from './questions.js';
import { LIKERT, score, subScores, quadrant, describe } from './scoring.js';
import { drawCompass, fitCanvas } from './compass.js';

const app = document.getElementById('app');
const STORAGE_KEY = 'political-compass-v1';
const THEME_KEY = 'political-compass-theme';

const THEMES = [
  { id: 'manuscript', label: 'Manuscript' },
  { id: 'broadsheet', label: 'Broadsheet' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'federal', label: 'Federal' },
  { id: 'arcade', label: 'Arcade' },
];

function applyTheme(id) {
  document.body.dataset.theme = id;
  localStorage.setItem(THEME_KEY, id);
  document.querySelectorAll('.theme-dock button').forEach((b) =>
    b.classList.toggle('on', b.dataset.theme === id)
  );
}

function mountThemeDock() {
  const dock = document.createElement('nav');
  dock.className = 'theme-dock';
  dock.setAttribute('aria-label', 'Theme');
  for (const t of THEMES) {
    const b = document.createElement('button');
    b.textContent = t.label;
    b.dataset.theme = t.id;
    b.addEventListener('click', () => {
      applyTheme(t.id);
      render(); // results screen redraws its canvas with the new palette
    });
    dock.append(b);
  }
  document.body.prepend(dock);
  applyTheme(localStorage.getItem(THEME_KEY) ?? 'manuscript');
}

// Question order is shuffled once per attempt so dimension blocks don't clump,
// then persisted so refresh mid-quiz keeps the same order.
let state = load() ?? fresh();

function fresh() {
  return {
    screen: 'intro',
    order: shuffle(QUESTIONS.map((q) => q.id)),
    idx: 0,
    answers: {},
  };
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return s && Array.isArray(s.order) && s.order.length === QUESTIONS.length ? s : null;
  } catch {
    return null;
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function set(patch) {
  Object.assign(state, patch);
  save();
  render();
}

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content;
}

function render() {
  app.replaceChildren();
  if (state.screen === 'intro') renderIntro();
  else if (state.screen === 'quiz') renderQuiz();
  else renderResults();
}

function renderIntro() {
  app.append(el(`
    <p class="kicker">A Survey of the Present Landscape · MMXXVI</p>
    <h1>The Political Compass</h1>
    <hr class="rule" />
    <p class="lede">Thirty-six propositions on the questions that actually divide the
    United States today. Mark your agreement with each; the instrument will fix your
    position on the map.</p>
    <p class="mt muted">The vertical axis is not left and right — it measures your relation
    to the system itself: <em>Institutionalist</em> (the institutions, for all their faults,
    deserve defense) against <em>Insurgent</em> (the institutions themselves are the problem).
    The horizontal is the familiar left–right, blended from economic and social questions.</p>
    <p class="center mt"><button class="primary" id="begin">Begin the survey</button></p>
  `));
  app.querySelector('#begin').addEventListener('click', () =>
    set({ screen: 'quiz', idx: 0 })
  );
}

function renderQuiz() {
  const qid = state.order[state.idx];
  const q = QUESTIONS.find((x) => x.id === qid);
  const n = QUESTIONS.length;
  const answered = state.answers[q.id];

  app.append(el(`
    <div class="progress">
      <span class="smallcaps">${state.idx + 1} of ${n}</span>
      <span class="bar"><i style="width:${(state.idx / n) * 100}%"></i></span>
      <span class="smallcaps muted">${q.dim}</span>
    </div>
    <hr class="rule" />
    <p class="statement">“${q.text}”</p>
    <div class="likert">
      ${LIKERT.map(
        (o) => `<button data-v="${o.v}" class="${answered === o.v ? 'picked' : ''}">${o.label}</button>`
      ).join('')}
    </div>
    <div class="nav">
      <button class="ghost" id="back" ${state.idx === 0 ? 'disabled' : ''}>← Back</button>
      <button class="ghost" id="skip">Skip →</button>
    </div>
  `));

  app.querySelectorAll('.likert button').forEach((b) =>
    b.addEventListener('click', () => {
      state.answers[q.id] = Number(b.dataset.v);
      advance();
    })
  );
  app.querySelector('#back').addEventListener('click', () => set({ idx: state.idx - 1 }));
  app.querySelector('#skip').addEventListener('click', () => {
    delete state.answers[q.id];
    advance();
  });
}

function advance() {
  if (state.idx + 1 >= QUESTIONS.length) set({ screen: 'results' });
  else set({ idx: state.idx + 1 });
}

function renderResults() {
  const pt = score(state.answers, QUESTIONS);
  const subs = subScores(state.answers, QUESTIONS);

  app.append(el(`
    <p class="kicker center">The instrument renders its verdict</p>
    <h1 class="center">Your Position</h1>
    <canvas class="compass"></canvas>
    <div class="verdict">
      <div class="place">${quadrant(pt)}</div>
      <div class="coords">x ${fmt(pt.x)} · y ${fmt(pt.y)}</div>
      <p class="desc">${describe(pt)}</p>
      <p class="muted mt">Sub-dimensions — econ ${fmt(subs.econ.x)}, social ${fmt(subs.social.x)},
      system ${fmt(subs.system.y)}</p>
    </div>
    <div class="actions">
      <button id="copy">Copy result</button>
      <button id="retake">Retake</button>
    </div>
  `));

  const canvas = app.querySelector('canvas');
  fitCanvas(canvas);
  drawCompass(canvas, pt);
  window.addEventListener('resize', () => { fitCanvas(canvas); drawCompass(canvas, pt); }, { once: true });

  app.querySelector('#retake').addEventListener('click', () => {
    state = fresh();
    save();
    render();
  });
  app.querySelector('#copy').addEventListener('click', async (e) => {
    const text = `Political Compass (2026): ${quadrant(pt)} — x ${fmt(pt.x)}, y ${fmt(pt.y)}`;
    await navigator.clipboard.writeText(text);
    e.target.textContent = 'Copied ✓';
  });
}

function fmt(n) {
  return (n > 0 ? '+' : '') + n.toFixed(1);
}

mountThemeDock();
render();
