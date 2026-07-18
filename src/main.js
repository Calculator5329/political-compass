import { QUESTIONS } from './questions.js';
import { LIKERT, score, subScores, quadrant, describe } from './scoring.js';
import { drawCompass, fitCanvas, hitMark } from './compass.js';
import { FIGURES } from './figures.js';
import { BLURBS } from './blurbs.js';
import { FACTIONS } from './factions.js';

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
  else if (state.screen === 'factions') renderFactions();
  else if (state.screen === 'board') renderBoard();
  else renderResults();
}

const NAV = [
  ['intro', 'The Test'],
  ['figures', 'Figures'],
  ['factions', 'Factions'],
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

function drawOn(selector, point, marks, opts) {
  const canvas = app.querySelector(selector);
  fitCanvas(canvas);
  drawCompass(canvas, point, marks, opts);
  window.addEventListener('resize', () => { fitCanvas(canvas); drawCompass(canvas, point, marks, opts); }, { once: true });
}

// Every figure scored on the main plane and the sub-dimensions, once.
function placedFigures() {
  return FIGURES.map((f) => ({
    ...f,
    pt: score(f.answers, QUESTIONS),
    subs: subScores(f.answers, QUESTIONS),
  }));
}

function myPoint() {
  return Object.keys(state.answers).length === 0 ? null : score(state.answers, QUESTIONS);
}

function figureMarks(placed) {
  return placed.map((f) => ({
    x: f.pt.x, y: f.pt.y,
    label: f.name.replace(/,? (Jr\.|Sr\.|[IV]+)$/, '').split(' ').at(-1),
    name: f.name,
    blurb: BLURBS[f.slug] ?? '',
    place: `${quadrant(f.pt)} · x ${fmt(f.pt.x)} · y ${fmt(f.pt.y)}`,
  }));
}

function renderFigures() {
  const placed = placedFigures();
  const mine = myPoint();
  const showMe = state.showMe ?? true;
  app.append(el(`
    <p class="kicker center">Charted from the public record</p>
    <h1 class="center">The Figures</h1>
    <div class="chart-wrap" id="wrap-main">
      <canvas class="compass"></canvas>
      <div class="fig-tip" hidden></div>
    </div>
    <p class="center chart-note">
      ${mine
        ? `<label class="me-toggle"><input type="checkbox" id="showme" ${showMe ? 'checked' : ''} />
           Mark my position <span class="me-x">✕</span> among them</label>`
        : `<span class="muted"><a href="#" id="gotest">Take the survey</a> to set your own ✕ among them.</span>`}
    </p>
    <h2 class="center smallcaps mt">The Economic × Social Plane</h2>
    <div class="chart-wrap" id="wrap-sub">
      <canvas class="compass sub"></canvas>
      <div class="fig-tip" hidden></div>
    </div>
    <p class="muted center">The same record, split by dimension: the horizontal is purely
    economic, the vertical purely social — the system axis set aside.</p>
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
  const marks = figureMarks(placed);
  drawOn('#wrap-main canvas', showMe ? mine : null, marks);
  attachFigureTip(app.querySelector('#wrap-main'), marks);

  // econ (x) × social (y): social-right scores plot upward as Traditional
  const subMarks = placed.map((f) => ({
    x: f.subs.econ.x, y: f.subs.social.x,
    label: f.name.replace(/,? (Jr\.|Sr\.|[IV]+)$/, '').split(' ').at(-1),
    name: f.name,
    blurb: BLURBS[f.slug] ?? '',
    place: `econ ${fmt(f.subs.econ.x)} · social ${fmt(f.subs.social.x)}`,
  }));
  const mySubs = mine ? subScores(state.answers, QUESTIONS) : null;
  const subLabels = { top: 'Traditional', bottom: 'Progressive', left: 'Econ Left', right: 'Econ Right' };
  drawOn('#wrap-sub canvas',
    showMe && mySubs ? { x: mySubs.econ.x, y: mySubs.social.x } : null,
    subMarks, { labels: subLabels });
  attachFigureTip(app.querySelector('#wrap-sub'), subMarks);

  app.querySelector('#showme')?.addEventListener('change', (e) => set({ showMe: e.target.checked }));
  app.querySelector('#gotest')?.addEventListener('click', (e) => {
    e.preventDefault();
    set({ screen: state.idx > 0 ? 'quiz' : 'intro' });
  });
}

// Hover (or tap) a dot → a marginalia-style tooltip beside it.
function attachFigureTip(wrap, marks) {
  const canvas = wrap.querySelector('canvas');
  const tip = wrap.querySelector('.fig-tip');
  let shown = null;

  const hide = () => {
    shown = null;
    tip.hidden = true;
    canvas.style.cursor = '';
  };

  const show = (hit) => {
    if (shown === hit.mark) return;
    shown = hit.mark;
    tip.innerHTML = `
      <span class="fig-tip-name">${hit.mark.name}</span>
      <span class="fig-tip-desc">${hit.mark.blurb}</span>
      <span class="fig-tip-place">${hit.mark.place}</span>`;
    tip.hidden = false;
    // place beside the dot, flipping to stay on the paper
    const w = wrap.clientWidth;
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let left = hit.px + 14;
    if (left + tw > w - 4) left = hit.px - tw - 14;
    let top = hit.py - th / 2;
    top = Math.max(4, Math.min(top, wrap.clientHeight - th - 4));
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  };

  const onMove = (ev) => {
    const hit = hitMark(canvas, marks, ev);
    if (hit) {
      canvas.style.cursor = 'pointer';
      show(hit);
    } else hide();
  };
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('click', onMove); // touch taps
  canvas.addEventListener('mouseleave', hide);
}

function renderFactions() {
  const placed = placedFigures();
  const mine = myPoint();
  app.append(el(`
    <p class="kicker center">The territories of the moment</p>
    <h1 class="center">The Factions</h1>
    <div class="chart-wrap" id="wrap-factions">
      <canvas class="compass"></canvas>
      <div class="fig-tip" hidden></div>
    </div>
    <p class="muted center">Territories are drawn by hand around the charted record, not
    computed — coalitions overlap, and some figures stand in two camps at once.</p>
    <div class="faction-list">
      ${FACTIONS.map((fa) => `
        <div class="faction">
          <span class="faction-swatch" style="background:${fa.fill.replace(/[\d.]+\)$/, '0.55)')}"></span>
          <div>
            <span class="faction-name">${fa.name}</span>
            <p class="faction-blurb">${fa.blurb}</p>
            <p class="faction-members muted">${fa.members
              .map((slug) => FIGURES.find((f) => f.slug === slug)?.name)
              .filter(Boolean).join(' · ')}</p>
          </div>
        </div>`).join('')}
    </div>
  `));
  const marks = figureMarks(placed);
  drawOn('#wrap-factions canvas', mine, marks.map((m) => ({ ...m, label: '' })), {
    regions: FACTIONS.map((fa) => ({ ...fa, label: fa.name })),
  });
  attachFigureTip(app.querySelector('#wrap-factions'), marks);
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
  const ranked = placedFigures()
    .map((f) => ({ f, d: Math.hypot(f.pt.x - pt.x, f.pt.y - pt.y) }))
    .sort((a, b) => a.d - b.d);
  const neighbours = ranked.slice(0, 3);
  const antipodes = ranked.slice(-3).reverse();
  const company = (r) => `<li><span class="fig-name">${r.f.name}</span>
    <span class="muted">${quadrant(r.f.pt)} · ${r.d.toFixed(1)} away</span></li>`;

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
    <div class="company">
      <div class="company-col">
        <h3 class="smallcaps">Nearest company</h3>
        <ul>${neighbours.map(company).join('')}</ul>
      </div>
      <div class="company-col">
        <h3 class="smallcaps">Farthest remove</h3>
        <ul>${antipodes.map(company).join('')}</ul>
      </div>
    </div>
    <p class="center"><button class="ghost" id="seefigs">See yourself among the figures →</button></p>
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

  app.querySelector('#seefigs').addEventListener('click', () => set({ screen: 'figures', showMe: true }));
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
