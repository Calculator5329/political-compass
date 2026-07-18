import { QUESTIONS } from './questions.js';
import { LIKERT, score, subScores, quadrant, describe } from './scoring.js';
import { drawCompass, fitCanvas } from './compass.js';
import { FIGURES } from './figures.js';

const app = document.getElementById('app');
const STORAGE_KEY = 'political-compass-v1';
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
  renderNav();
  if (state.screen === 'intro') renderIntro();
  else if (state.screen === 'quiz') renderQuiz();
  else if (state.screen === 'figures') renderFigures();
  else if (state.screen === 'board') renderBoard();
  else renderResults();
}

const NAV = [
  ['intro', 'The Test'],
  ['figures', 'Figures'],
  ['board', 'Leaderboard'],
];

function renderNav() {
  const cur = state.screen === 'quiz' || state.screen === 'results' ? 'intro' : state.screen;
  const nav = el(`<nav class="tabs">${NAV.map(
    ([id, label]) => `<button data-nav="${id}" class="${cur === id ? 'on' : ''}">${label}</button>`
  ).join('')}</nav>`);
  nav.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => {
      const target = b.dataset.nav;
      // Returning to the test resumes wherever the taker left off.
      if (target === 'intro' && Object.keys(state.answers).length && state.screen !== 'quiz') {
        set({ screen: state.order ? 'results' : 'intro' });
      } else set({ screen: target === 'intro' ? (state.idx > 0 ? 'quiz' : 'intro') : target });
    })
  );
  app.append(nav);
}

function drawOn(selector, point, marks) {
  const canvas = app.querySelector(selector);
  fitCanvas(canvas);
  drawCompass(canvas, point, marks);
  window.addEventListener('resize', () => { fitCanvas(canvas); drawCompass(canvas, point, marks); }, { once: true });
}

function renderFigures() {
  const placed = FIGURES.map((f) => {
    const pt = score(f.answers, QUESTIONS);
    return { ...f, pt };
  });
  app.append(el(`
    <p class="kicker center">Charted from the public record</p>
    <h1 class="center">The Figures</h1>
    <canvas class="compass"></canvas>
    <p class="muted center">Each mark is the instrument scored from documented votes,
    policies, and on-record statements — the same 36 questions you answer. Sources below.</p>
    <div class="figure-list">
      ${placed.map((f) => `
        <details>
          <summary><span class="fig-name">${f.name}</span>
          <span class="muted">${quadrant(f.pt)} · x ${fmt(f.pt.x)} · y ${fmt(f.pt.y)}</span></summary>
          <p>${f.note}</p>
          <ul>${f.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('')}</ul>
        </details>`).join('')}
    </div>
  `));
  const marks = placed.map((f) => ({
    x: f.pt.x, y: f.pt.y, label: f.name.split(' ').at(-1),
  }));
  const mine = Object.keys(state.answers).length === 0 ? null : score(state.answers, QUESTIONS);
  drawOn('canvas.compass', mine, marks);
}

async function renderBoard() {
  app.append(el(`
    <p class="kicker center">The public record, so to speak</p>
    <h1 class="center">Leaderboard</h1>
    <canvas class="compass"></canvas>
    <div class="board center muted">Loading…</div>
  `));
  const boardEl = app.querySelector('.board');
  try {
    const { fetchScores } = await import('./firebase.js');
    const rows = await fetchScores(100);
    const mine = Object.keys(state.answers).length === 0 ? null : score(state.answers, QUESTIONS);
    drawOn('canvas.compass', mine, rows.map((r) => ({ x: r.x, y: r.y })));
    if (!rows.length) {
      boardEl.textContent = 'No entries yet — take the test and put your name on the map.';
      return;
    }
    boardEl.classList.remove('center', 'muted');
    boardEl.innerHTML = `<table><thead><tr>
      <th>Name</th><th>Position</th><th>x</th><th>y</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${esc(r.name)}</td><td>${esc(r.q)}</td>
        <td>${fmt(r.x)}</td><td>${fmt(r.y)}</td></tr>`).join('')}
    </tbody></table>`;
  } catch (e) {
    boardEl.textContent = 'Could not reach the leaderboard.';
  }
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
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
    <div class="actions save-row">
      ${state.savedId
        ? `<span class="muted">Saved to the leaderboard ✓</span>`
        : `<input id="savename" maxlength="24" placeholder="Your name" />
           <button id="save" class="primary">Sign the ledger</button>`}
    </div>
    <div class="actions">
      <button id="copy">Copy result</button>
      <button id="retake">Retake</button>
    </div>
  `));

  const saveBtn = app.querySelector('#save');
  if (saveBtn) saveBtn.addEventListener('click', async () => {
    const name = app.querySelector('#savename').value.trim();
    if (!name) { app.querySelector('#savename').focus(); return; }
    saveBtn.disabled = true;
    saveBtn.textContent = 'Inscribing…';
    try {
      const { saveScore } = await import('./firebase.js');
      const id = await saveScore(name, pt, quadrant(pt));
      set({ savedId: id });
    } catch (e) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Failed — retry';
    }
  });

  drawOn('canvas.compass', pt);

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

render();
