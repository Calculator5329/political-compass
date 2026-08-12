import { PRINCIPLE_PAIRS, QUESTIONS } from './questions.js';
import {
  LIKERT, score, scoreFigure, subScores, subScoresFigure, quadrant, describe,
} from './scoring.js';
import { drawCompass, fitCanvas, hitMark, hitRegion } from './compass.js';
import { FIGURES } from './figures.js';
import { BLURBS } from './blurbs.js';
import { FACTIONS } from './factions.js';
import { DEFAULT_MODE, MODES, figuresInMode, modeById } from './modes.js';
import {
  ballotRanking,
  compressibility,
  extremity,
  factionFit,
  figureMatches,
  fitQuestionModels,
  headToHead,
  heterodoxy,
  likertLabel,
  pairConsistency,
  trajectory,
} from './insights.js';
import {
  backfillStoredSubscores,
  isTestScreen,
  migrateGrownBank,
  migrateLegacyState,
  rowsWithSubscores,
  splitLeaderboardRows,
  testLanding,
} from './state.js';

const app = document.getElementById('app');
const STORAGE_KEY = 'political-compass-v1';
// Question order is shuffled once per attempt so dimension blocks don't clump,
// then persisted so refresh mid-quiz keeps the same order.
let state = load() ?? fresh();

// Navigation is intentionally not part of the persisted landing route. Saved
// answers still resume, but every fresh page load opens the Test tab instead
// of whichever reference page happened to be open last.
if (!isTestScreen(state.screen)) {
  state.screen = testLanding(state, QUESTIONS.length);
  save();
}

function fresh() {
  return {
    screen: 'intro',
    testScreen: 'intro',
    order: shuffle(QUESTIONS.map((q) => q.id)),
    idx: 0,
    answers: {},
  };
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (s && Array.isArray(s.order) && s.order.length === QUESTIONS.length) return s;
    // Bank grew (wave-2 items): keep every answer and the ledger signature,
    // append the new items, land the taker on the first of them.
    const grown = migrateGrownBank(s, QUESTIONS, shuffle(
      QUESTIONS.map((q) => q.id).filter((id) => !s?.order?.includes(id)),
    ));
    if (grown) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(grown));
      return grown;
    }
    const migrated = migrateLegacyState(s, fresh());
    if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return null;
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
  if (isTestScreen(patch.screen)) {
    patch.testScreen = patch.screen;
  }
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
  else if (state.screen === 'compare') renderCompare();
  else if (state.screen === 'board') renderBoard();
  else renderResults();
}

const NAV = [
  ['intro', 'The Test'],
  ['figures', 'Figures'],
  ['factions', 'Factions'],
  ['compare', 'Head to Head'],
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
  const paint = () => {
    if (!fitCanvas(canvas)) return;
    drawCompass(canvas, point, marks, opts);
  };
  paint();
  // The side-by-side flex layout can briefly report a sub-pixel canvas. Never
  // replace the backing store with that provisional size; repaint when the
  // real box arrives.
  const settledLayout = new ResizeObserver(() => {
    const target = Math.round(canvas.clientWidth * (window.devicePixelRatio || 1));
    if (target > 4 && canvas.width !== target) paint();
  });
  settledLayout.observe(canvas);
  // Delayed passes cover engines that coalesce the initial observation.
  window.setTimeout(paint, 50);
  window.setTimeout(paint, 250);
  window.addEventListener('resize', paint, { once: true });
}

// Every figure scored on the main plane and the sub-dimensions, once.
// Figures score over the items their dossier answers (scoreFigure), so
// pending wave-2 items don't drag the whole roster toward the center.
function placedFigures() {
  return FIGURES.map((f) => ({
    ...f,
    pt: scoreFigure(f.answers, QUESTIONS),
    subs: subScoresFigure(f.answers, QUESTIONS),
  }));
}

function myPoint() {
  return Object.keys(state.answers).length === 0 ? null : score(state.answers, QUESTIONS);
}

// Answers live in this browser's storage; a ledger signature made elsewhere
// (another device, the deployed site vs dev) can be claimed as your ✕ instead.
function effectivePoint() {
  return myPoint() ?? (state.claimed ? { x: state.claimed.x, y: state.claimed.y } : null);
}

function effectiveSubPoint() {
  if (myPoint()) {
    const mine = subScores(state.answers, QUESTIONS);
    return { x: mine.econ.x, y: mine.social.x };
  }
  if (state.claimed && state.claimed.es != null && state.claimed.ss != null) {
    return { x: state.claimed.es, y: state.claimed.ss };
  }
  return null;
}

function ownMark(point, place) {
  if (!point) return null;
  return {
    ...point,
    name: 'Your score',
    blurb: state.claimed && !myPoint()
      ? `Claimed from the ledger as ${esc(state.claimed.name)}.`
      : state.legacySavedSubscores
        ? 'Recovered from the original survey answers preserved in this browser.'
      : 'Calculated from the answers saved in this browser.',
    place,
  };
}

// Only the most recognizable figures get printed labels; everyone else is
// hover-only, which keeps the label type large and the leader lines short.
const FEATURED = new Set([
  'trump', 'vance', 'obama', 'sanders', 'aoc', 'musk',
  'desantis', 'newsom', 'harris', 'rogan',
]);

// A roster small enough to print every name does; the crowded national board
// keeps its hover-only rule so the label type stays large.
function labelsFor(placed) {
  // A hand-drawn roster labels every mark; only the national board, which is
  // three times the size of any roster, falls back to the featured subset.
  return placed.length <= 20 ? new Set(placed.map((f) => f.slug)) : FEATURED;
}

function figureMarks(placed, labelled = labelsFor(placed)) {
  return placed.map((f) => ({
    x: f.pt.x, y: f.pt.y,
    trail: trajectory(f, QUESTIONS).map((t) => ({ x: t.pt.x, y: t.pt.y, era: t.era })),
    label: labelled.has(f.slug)
      ? f.name.replace(/,? (Jr\.|Sr\.|[IV]+)$/, '').split(' ').at(-1)
      : '',
    name: f.name,
    blurb: BLURBS[f.slug] ?? '',
    place: `${quadrant(f.pt)} · x ${fmt(f.pt.x)} · y ${fmt(f.pt.y)}`,
  }));
}

function renderFigures() {
  const mode = modeById(state.figMode ?? DEFAULT_MODE);
  const placed = figuresInMode(placedFigures(), mode.id);
  const mine = effectivePoint();
  const showMe = state.showMe ?? true;
  app.append(el(`
    <p class="kicker center">Charted from the public record</p>
    <h1 class="center">The Figures</h1>
    <div class="modes">
      ${MODES.map((m) => `<button data-mode="${m.id}" class="${m.id === mode.id ? 'on' : ''}">${m.name}</button>`).join('')}
    </div>
    <p class="muted center mode-blurb">${mode.blurb}</p>
    <div class="charts-row">
      <div class="chart-col">
        <h2 class="center smallcaps chart-cap">The Political Plane</h2>
        <div class="chart-wrap" id="wrap-main">
          <canvas class="compass"></canvas>
          <div class="fig-tip" hidden></div>
        </div>
      </div>
      <div class="chart-col">
        <h2 class="center smallcaps chart-cap">The Economic × Social Plane</h2>
        <div class="chart-wrap" id="wrap-sub">
          <canvas class="compass sub"></canvas>
          <div class="fig-tip" hidden></div>
        </div>
      </div>
    </div>
    <p class="center chart-note">
      ${mine
        ? `<label class="me-toggle"><input type="checkbox" id="showme" ${showMe ? 'checked' : ''} />
           Mark my position <span class="me-x">✕</span>${state.claimed && !myPoint() ? ` (as ${esc(state.claimed.name)})` : ''} among them</label>${
             state.claimed && !myPoint() && state.claimed.es == null
               ? `<br /><span class="muted claim-hint">This ledger entry predates the second plane; retake the survey to appear there.</span>`
               : ''}`
        : `<span id="claim-wrap"><span class="muted">Already signed the ledger? Claim your mark:</span>
           <select id="claim"><option value="" disabled selected hidden>choose your name</option></select><br /></span>
           <button class="ghost survey-link" id="take-survey" type="button">Take the survey to set your own ✕ among them</button>`}
    </p>
    <p class="muted center">On the right, the same record split by dimension: the horizontal
    is purely economic, the vertical purely social, with system and foreign items set aside.</p>
    <p class="muted center">Each mark is the instrument scored from documented votes,
    policies, and on-record statements, answering the same ${QUESTIONS.length} questions you do.</p>
    <div class="figure-cards">
      ${placed.length ? '' : '<p class="muted center">This roster is still being scored; its dossiers are not written yet.</p>'}
      ${placed.map((f, i) => `
        <div class="fig-card" data-fig="${i}">
          <span class="fig-seal">${seal(f.name)}</span>
          <div class="fig-card-body">
            <span class="fig-name">${f.name}</span>
            <span class="fig-card-place muted">${quadrant(f.pt)} · x ${fmt(f.pt.x)} · y ${fmt(f.pt.y)}</span>
            <span class="fig-card-links">${f.sources.slice(0, 5).map((s, i) =>
              `<a href="${s.url}" target="_blank" rel="noopener" title="${esc(s.title)}">${i + 1}</a>`).join('')}</span>
          </div>
        </div>`).join('')}
      <div class="fig-tip" hidden></div>
    </div>
  `));
  attachCardTips(placed);
  app.querySelectorAll('.modes button').forEach((b) =>
    b.addEventListener('click', () => set({ figMode: b.dataset.mode })));
  const labelled = labelsFor(placed);
  const marks = figureMarks(placed, labelled);
  drawOn('#wrap-main canvas', showMe ? mine : null, marks);
  attachFigureTip(
    app.querySelector('#wrap-main'),
    marks,
    [],
    ownMark(showMe ? mine : null, mine ? `${quadrant(mine)} · x ${fmt(mine.x)} · y ${fmt(mine.y)}` : ''),
  );

  // econ (x) × social (y): social-right scores plot upward as Traditional
  const subMarks = placed.map((f) => ({
    x: f.subs.econ.x, y: f.subs.social.x,
    label: labelled.has(f.slug)
      ? f.name.replace(/,? (Jr\.|Sr\.|[IV]+)$/, '').split(' ').at(-1)
      : '',
    name: f.name,
    blurb: BLURBS[f.slug] ?? '',
    place: `econ ${fmt(f.subs.econ.x)} · social ${fmt(f.subs.social.x)}`,
  }));
  // sub-plane ✕: from answers when we have them, else from the claimed
  // ledger entry's stored econ/social sub-scores (older entries lack them)
  const subPt = effectiveSubPoint();
  const subLabels = { top: 'Traditional', bottom: 'Progressive', left: 'Econ Left', right: 'Econ Right' };
  drawOn('#wrap-sub canvas', showMe ? subPt : null, subMarks, { labels: subLabels });
  attachFigureTip(
    app.querySelector('#wrap-sub'),
    subMarks,
    [],
    ownMark(showMe ? subPt : null, subPt ? `econ ${fmt(subPt.x)} · social ${fmt(subPt.y)}` : ''),
  );

  app.querySelector('#showme')?.addEventListener('change', (e) => set({ showMe: e.target.checked }));
  app.querySelector('#take-survey')?.addEventListener('click', () => set({ screen: state.idx > 0 ? 'quiz' : 'intro' }));

  const claim = app.querySelector('#claim');
  if (claim) {
    const claimWrap = app.querySelector('#claim-wrap');
    import('./firebase.js')
      .then(({ fetchScores }) => fetchScores(100))
      .then((rows) => {
        if (!rows.length) {
          claimWrap?.remove();
          return;
        }
        for (const [i, r] of rows.entries()) {
          const o = document.createElement('option');
          o.value = i;
          o.textContent = `${r.name} - ${r.q}`;
          claim.append(o);
        }
        claim.addEventListener('change', () => {
          const r = rows[claim.value];
          if (r) set({ claimed: { id: r.id, name: r.name, x: r.x, y: r.y, es: r.es ?? null, ss: r.ss ?? null }, showMe: true });
        });
      })
      .catch(() => claimWrap?.remove());
  }
}

// Same marginalia tooltip for the figure cards: name, blurb, and the full
// placement note, pinned above the hovered card.
function attachCardTips(placed) {
  const grid = app.querySelector('.figure-cards');
  const tip = grid.querySelector('.fig-tip');
  grid.querySelectorAll('.fig-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const f = placed[card.dataset.fig];
      tip.innerHTML = `
        <span class="fig-tip-name">${f.name}</span>
        <span class="fig-tip-desc">${BLURBS[f.slug] ?? ''}</span>
        <span class="fig-tip-note">${esc(f.note)}</span>`;
      tip.hidden = false;
      const g = grid.getBoundingClientRect();
      const r = card.getBoundingClientRect();
      const tw = tip.offsetWidth;
      let left = r.left - g.left + (r.width - tw) / 2;
      left = Math.max(4, Math.min(left, g.width - tw - 4));
      tip.style.left = `${left}px`;
      const above = r.top - g.top - tip.offsetHeight - 8;
      tip.style.top = `${above >= 0 ? above : r.bottom - g.top + 8}px`;
    });
    card.addEventListener('mouseleave', () => { tip.hidden = true; });
  });
}

// Hover (or tap) a dot - or a faction territory - for a marginalia-style
// tooltip. Dots win over territories; overlapping territories resolve to the
// nearest centre.
function attachFigureTip(wrap, marks, regions = [], own = null) {
  const canvas = wrap.querySelector('canvas');
  const tip = wrap.querySelector('.fig-tip');
  const hoverMarks = own ? [own, ...marks] : marks;
  let shown = null;

  const hide = () => {
    shown = null;
    tip.hidden = true;
    canvas.style.cursor = '';
  };

  const place = (px, py) => {
    const w = wrap.clientWidth;
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let left = px + 14;
    if (left + tw > w - 4) left = px - tw - 14;
    let top = py - th / 2;
    top = Math.max(4, Math.min(top, wrap.clientHeight - th - 4));
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  };

  const show = (key, html, px, py) => {
    if (shown !== key) {
      shown = key;
      tip.innerHTML = html;
      tip.hidden = false;
    }
    place(px, py);
  };

  const onMove = (ev) => {
    const hit = hitMark(canvas, hoverMarks, ev);
    if (hit) {
      canvas.style.cursor = 'pointer';
      show(hit.mark, `
        <span class="fig-tip-name">${hit.mark.name}</span>
        <span class="fig-tip-desc">${hit.mark.blurb}</span>
        <span class="fig-tip-place">${hit.mark.place}</span>`, hit.px, hit.py);
      return;
    }
    const rg = regions.length ? hitRegion(canvas, regions, ev) : null;
    if (rg) {
      canvas.style.cursor = '';
      const rect = canvas.getBoundingClientRect();
      show(rg, `
        <span class="fig-tip-name">${rg.name}</span>
        <span class="fig-tip-desc">${rg.blurb}</span>
        <span class="fig-tip-place">${rg.members.length} figures charted</span>`,
        ev.clientX - rect.left, ev.clientY - rect.top);
      return;
    }
    hide();
  };
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('click', onMove); // touch taps
  canvas.addEventListener('mouseleave', hide);
}

function renderFactions() {
  const placed = placedFigures();
  const mine = effectivePoint();
  app.append(el(`
    <div class="chart-wrap" id="wrap-factions">
      <canvas class="compass"></canvas>
      <div class="fig-tip" hidden></div>
    </div>
    <p class="muted center">Territories are drawn by hand around the charted record, not
    computed - coalitions overlap, and some figures stand in two camps at once.</p>
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
    regions: FACTIONS.map((fa) => ({ ...fa, label: '' })),
  });
  attachFigureTip(
    app.querySelector('#wrap-factions'),
    marks,
    FACTIONS,
    ownMark(mine, mine ? `${quadrant(mine)} · x ${fmt(mine.x)} · y ${fmt(mine.y)}` : ''),
  );
}

async function renderBoard() {
  app.append(el(`
    <p class="kicker center">The public record, so to speak</p>
    <h1 class="center">Leaderboard</h1>
    <div class="charts-row board-charts">
      <div class="chart-col">
        <h2 class="center smallcaps chart-cap">The Political Plane</h2>
        <div class="chart-wrap" id="wrap-board-main">
          <canvas class="compass"></canvas>
          <div class="fig-tip" hidden></div>
        </div>
      </div>
      <div class="chart-col">
        <h2 class="center smallcaps chart-cap">The Economic × Social Plane</h2>
        <div class="chart-wrap" id="wrap-board-sub">
          <canvas class="compass sub"></canvas>
          <div class="fig-tip" hidden></div>
        </div>
      </div>
    </div>
    <div class="chart-key center" id="board-key" hidden></div>
    <p class="center muted board-coverage" id="board-coverage" hidden></p>
    <div class="board center muted">Loading…</div>
  `));
  const boardEl = app.querySelector('.board');
  const keyEl = app.querySelector('#board-key');
  const coverageEl = app.querySelector('#board-coverage');
  try {
    const { fetchScores } = await import('./firebase.js');
    const fetchedRows = await fetchScores(100);
    const rows = backfillStoredSubscores(fetchedRows, state);
    const currentId = state.savedId ?? state.claimed?.id ?? null;
    const currentRow = currentId ? rows.find((row) => row.id === currentId) : null;
    const mine = effectivePoint() ?? (currentRow
      ? { x: currentRow.x, y: currentRow.y }
      : null);
    const subMine = effectiveSubPoint() ?? (
      currentRow && Number.isFinite(currentRow.es) && Number.isFinite(currentRow.ss)
        ? { x: currentRow.es, y: currentRow.ss }
        : null
    );
    const { ownRow, dotRows } = splitLeaderboardRows(rows, currentId);
    const mainMarks = dotRows.map((r) => ({
      x: r.x, y: r.y, label: '',
      name: esc(r.name),
      blurb: '',
      place: `${esc(r.q)} · x ${fmt(r.x)} · y ${fmt(r.y)}`,
    }));
    const ownMain = ownMark(mine, mine ? `${quadrant(mine)} · x ${fmt(mine.x)} · y ${fmt(mine.y)}` : '');
    if (ownMain && ownRow) {
      ownMain.blurb = `Your saved entry as ${esc(ownRow.name)}. Its dot is replaced by this red ✕.`;
    }
    drawOn('#wrap-board-main canvas', mine, mainMarks);
    attachFigureTip(
      app.querySelector('#wrap-board-main'),
      mainMarks,
      [],
      ownMain,
    );

    const subRows = rowsWithSubscores(rows);
    const { ownRow: ownSubRow, dotRows: subDotRows } = splitLeaderboardRows(
      subRows,
      subMine ? currentId : null,
    );
    const subMarks = subDotRows.map((r) => ({
      x: r.es, y: r.ss, label: '',
      name: esc(r.name),
      blurb: '',
      place: `econ ${fmt(r.es)} · social ${fmt(r.ss)}`,
    }));
    const ownSub = ownMark(
      subMine,
      subMine ? `econ ${fmt(subMine.x)} · social ${fmt(subMine.y)}` : '',
    );
    if (ownSub && ownSubRow) {
      ownSub.blurb = `Your saved entry as ${esc(ownSubRow.name)}. Its dot is replaced by this red ✕.`;
    }
    const subLabels = { top: 'Traditional', bottom: 'Progressive', left: 'Econ Left', right: 'Econ Right' };
    drawOn('#wrap-board-sub canvas', subMine, subMarks, { labels: subLabels });
    attachFigureTip(app.querySelector('#wrap-board-sub'), subMarks, [], ownSub);

    keyEl.innerHTML = `
      <span><i class="key-dot"></i>${rows.length} saved ${rows.length === 1 ? 'entry' : 'entries'}</span>
      ${mine ? `<span><i class="key-x">✕</i>${ownRow
        ? 'Your saved entry (shown as ✕ instead of a dot)'
        : 'Your current browser result (not a saved entry)'}</span>` : ''}`;
    keyEl.hidden = false;
    const recoveredCount = rows.filter((row) => row.recoveredSubscores).length;
    if (subRows.length !== rows.length || recoveredCount) {
      const recoveredNote = recoveredCount
        ? ` ${recoveredCount} was recovered exactly from this browser's preserved original answers.`
        : '';
      coverageEl.textContent = `${subRows.length} of ${rows.length} saved entries include Economic × Social scores.${recoveredNote}${subRows.length !== rows.length ? ' Entries without preserved answers require a retake.' : ''}`;
      coverageEl.hidden = false;
    }
    if (!rows.length) {
      boardEl.textContent = 'No entries yet - take the test and put your name on the map.';
      return;
    }
    boardEl.classList.remove('center', 'muted');
    boardEl.innerHTML = `<table><thead><tr>
      <th>Name</th><th>Position</th><th>x</th><th>y</th><th>Econ</th><th>Social</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${esc(r.name)}</td><td>${esc(r.q)}</td>
        <td>${fmt(r.x)}</td><td>${fmt(r.y)}</td>
        <td>${Number.isFinite(r.es) ? fmt(r.es) : 'n/a'}</td>
        <td>${Number.isFinite(r.ss) ? fmt(r.ss) : 'n/a'}</td></tr>`).join('')}
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
    <p class="lede">${QUESTIONS.length} propositions on the questions that actually divide the
    United States today. Mark your agreement with each; the instrument will fix your
    position on the map.</p>
    <p class="mt muted">The vertical axis is not left and right - it measures your relation
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

// Display copy for the per-dimension view. Which axis a dimension reads on is
// computed from its weight vectors (dimAxis), never hardcoded here.
const DIM_META = {
  econ: { name: 'Economic', neg: 'Left', pos: 'Right' },
  social: { name: 'Social', neg: 'Progressive', pos: 'Traditional' },
  system: { name: 'System', neg: 'Institutionalist', pos: 'Insurgent' },
  foreign: { name: 'Foreign', neg: 'Engagement', pos: 'Restraint' },
  liberty: { name: 'Liberty', neg: 'Order', pos: 'Liberties' },
  tech: { name: 'Technology', neg: 'Regulate', pos: 'Laissez-faire' },
};

// The axis a dimension's items load most heavily, from the weights themselves.
function dimAxis(dim) {
  let ax = 0, ay = 0;
  for (const q of QUESTIONS) {
    if (q.dim !== dim) continue;
    ax += Math.abs(q.w.x);
    ay += Math.abs(q.w.y);
  }
  return ax >= ay ? 'x' : 'y';
}

function clip(text, n = 92) {
  return text.length > n ? `${text.slice(0, n - 1)}…` : text;
}

function pct(v) {
  return `${Math.round(v * 100)}%`;
}

function dimBars(answers) {
  const subs = subScores(answers, QUESTIONS);
  return `<div class="dims">${Object.keys(DIM_META).map((dim) => {
    const meta = DIM_META[dim];
    const answered = QUESTIONS.filter((q) => q.dim === dim && typeof answers[q.id] === 'number').length;
    const v = subs[dim]?.[dimAxis(dim)] ?? 0;
    const left = ((v + 10) / 20) * 100;
    return `<div class="dim-row">
      <span class="dim-name smallcaps">${meta.name}</span>
      <span class="dim-end muted">${meta.neg}</span>
      <span class="dim-bar">${answered ? `<b class="dim-x" style="left:${left}%">✕</b>` : ''}</span>
      <span class="dim-end muted">${meta.pos}</span>
      <span class="dim-val muted">${answered ? fmt(v) : 'n/a'}</span>
    </div>`;
  }).join('')}</div>`;
}

function renderResults() {
  const pt = score(state.answers, QUESTIONS);
  const placed = placedFigures();

  // Company by full answer vector, not map distance: two people can share a
  // point through entirely different answers. Falls back to plane distance if
  // too few items were answered to compare honestly.
  const matches = figureMatches(state.answers, placed, QUESTIONS);
  let neighbours, antipodes, companyNote;
  if (matches.length >= 3) {
    neighbours = matches.slice(0, 3);
    antipodes = matches.slice(-3).reverse();
    companyNote = 'Matched answer by answer across the whole questionnaire, not by map distance.';
  } else {
    const ranked = placed
      .map((f) => ({ figure: f, d: Math.hypot(f.pt.x - pt.x, f.pt.y - pt.y) }))
      .sort((a, b) => a.d - b.d);
    neighbours = ranked.slice(0, 3);
    antipodes = ranked.slice(-3).reverse();
    companyNote = 'Too few answers for full matching; ranked by map distance instead.';
  }
  const company = (r, receipt) => `<li><span class="fig-name">${r.figure.name}</span>
    <span class="muted">${'agreement' in r
      ? `${pct(r.agreement)} aligned over ${r.shared} shared answers`
      : `${quadrant(r.figure.pt)} · ${r.d.toFixed(1)} away`}</span>
    ${receipt ? `<span class="company-receipt muted">${receipt}</span>` : ''}</li>`;
  const agreeReceipt = (r) => r.agrees?.[0]
    ? `Both of you: “${clip(r.agrees[0].q.text, 76)}”` : '';
  const splitReceipt = (r) => r.disagrees?.[0]
    ? `You split on: “${clip(r.disagrees[0].q.text, 76)}”` : '';

  // Heterodoxy: where this taker breaks from what their own position
  // predicts, measured against the figure roster's answer surface.
  const models = fitQuestionModels(placed, QUESTIONS);
  const breaks = heterodoxy(state.answers, pt, models, QUESTIONS)
    .filter((h) => Math.abs(h.residual) >= 1.2)
    .slice(0, 4);
  const fit = compressibility(state.answers, pt, models, QUESTIONS);
  const temper = extremity(state.answers, QUESTIONS);
  const tensions = pairConsistency(state.answers, QUESTIONS, PRINCIPLE_PAIRS)
    .filter((p) => Math.abs(p.tension) >= 2);

  const fitLine = [
    fit ? `Two axes explain ${pct(fit.r2)} of your ${fit.n} modelled answers.` : '',
    `Full conviction on ${temper.strong} of ${temper.answered} answered;
     ${temper.neutral} neutral${temper.skipped ? `, ${temper.skipped} skipped` : ''}.`,
  ].filter(Boolean).join(' ');

  const nearestFaction = factionFit(pt, FACTIONS)[0];
  const factionLine = nearestFaction
    ? `${nearestFaction.d <= 1 ? 'Your territory' : 'Nearest territory'}:
       <em>${nearestFaction.faction.name}</em>`
    : '';

  // Ballot machinery, demonstrated on the one researched local roster.
  const ballot = ballotRanking(state.answers, placed, QUESTIONS, modeById('local').members ?? []);

  app.append(el(`
    <p class="kicker center">The instrument renders its verdict</p>
    <h1 class="center">Your Position</h1>
    <div class="chart-wrap" id="wrap-results">
      <canvas class="compass"></canvas>
      <div class="fig-tip" hidden></div>
    </div>
    <div class="verdict">
      <div class="place">${quadrant(pt)}</div>
      <div class="coords">x ${fmt(pt.x)} · y ${fmt(pt.y)}</div>
      <p class="desc">${describe(pt)}</p>
      ${factionLine ? `<p class="muted">${factionLine}</p>` : ''}
    </div>
    <h3 class="smallcaps center mt">The Six Dimensions</h3>
    ${dimBars(state.answers)}
    <div class="company">
      <div class="company-col">
        <h3 class="smallcaps">Nearest company</h3>
        <ul>${neighbours.map((r) => company(r, agreeReceipt(r))).join('')}</ul>
      </div>
      <div class="company-col">
        <h3 class="smallcaps">Farthest company</h3>
        <ul>${antipodes.map((r) => company(r, splitReceipt(r))).join('')}</ul>
      </div>
    </div>
    <p class="muted center company-note">${companyNote}</p>
    ${breaks.length ? `
      <h3 class="smallcaps center mt">Where You Break From Your Neighborhood</h3>
      <ul class="hetero">${breaks.map((h) => `
        <li>“${clip(h.q.text)}”<br />
          <span class="muted">People near your position typically say
          <em>${likertLabel(Math.round(h.expected))}</em>; you said
          <em>${likertLabel(h.actual)}</em>.</span></li>`).join('')}
      </ul>` : ''}
    ${tensions.length ? `
      <p class="muted center tension-note">The instrument notes you endorsed both sides of
      ${tensions.length === 1 ? 'a mirrored pair' : `${tensions.length} mirrored pairs`} of
      statements about the same power, read from opposite thrones.</p>` : ''}
    <p class="muted center fit-line">${fitLine}</p>
    ${ballot.length ? `
      <h3 class="smallcaps center mt">The Minnesota Ballot, Ranked For You</h3>
      <ol class="ballot">${ballot.map((r) => `
        <li><span class="fig-name">${r.figure.name}</span>
          <span class="muted">${pct(r.agreement)} aligned</span></li>`).join('')}
      </ol>
      <p class="muted center company-note">Ranked by shared answers with each figure's documented
      record. Minnesota is the first researched ballot; other states follow the same machinery.</p>` : ''}
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
      const id = await saveScore(name, pt, quadrant(pt), subScores(state.answers, QUESTIONS));
      set({ savedId: id });
    } catch (e) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Failed - retry';
    }
  });

  drawOn('#wrap-results canvas', pt);
  attachFigureTip(
    app.querySelector('#wrap-results'),
    [],
    [],
    ownMark(pt, `${quadrant(pt)} · x ${fmt(pt.x)} · y ${fmt(pt.y)}`),
  );

  app.querySelector('#seefigs').addEventListener('click', () => set({ screen: 'figures', showMe: true }));
  app.querySelector('#retake').addEventListener('click', () => {
    state = fresh();
    save();
    render();
  });
  app.querySelector('#copy').addEventListener('click', async (e) => {
    const text = `Political Compass (2026): ${quadrant(pt)} - x ${fmt(pt.x)}, y ${fmt(pt.y)}`;
    await navigator.clipboard.writeText(text);
    e.target.textContent = 'Copied ✓';
  });
}

// Head-to-head: any two figures, every shared question, sorted by how far
// apart their documented records land.
function renderCompare() {
  const placed = placedFigures().sort((a, b) => a.name.localeCompare(b.name));
  const a = placed.find((f) => f.slug === state.cmpA) ?? placed.find((f) => f.slug === 'trump') ?? placed[0];
  const b = placed.find((f) => f.slug === state.cmpB) ?? placed.find((f) => f.slug === 'newsom') ?? placed[1];
  const h2h = headToHead(a, b, QUESTIONS);
  const shown = h2h.rows.slice(0, 12);
  const pick = (id, chosen, other) => `
    <select id="${id}">${placed.map((f) => `
      <option value="${f.slug}" ${f.slug === chosen.slug ? 'selected' : ''}
        ${f.slug === other.slug ? 'disabled' : ''}>${esc(f.name)}</option>`).join('')}
    </select>`;
  const sourceLinks = (f) => f.sources.slice(0, 3).map((s, i) =>
    `<a href="${s.url}" target="_blank" rel="noopener" title="${esc(s.title)}">${i + 1}</a>`).join(' ');

  app.append(el(`
    <p class="kicker center">Two records, one instrument</p>
    <h1 class="center">Head to Head</h1>
    <div class="h2h-picks center">
      ${pick('cmp-a', a, b)}
      <span class="smallcaps h2h-vs">against</span>
      ${pick('cmp-b', b, a)}
    </div>
    <div class="chart-wrap" id="wrap-compare">
      <canvas class="compass"></canvas>
      <div class="fig-tip" hidden></div>
    </div>
    <p class="center muted">Of ${h2h.rows.length} questions both records answer, they align on
    ${h2h.aligned} and split hard on ${h2h.split}.
    Sources - ${esc(a.name)}: ${sourceLinks(a)} · ${esc(b.name)}: ${sourceLinks(b)}</p>
    <table class="h2h">
      <thead><tr><th>The statement</th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead>
      <tbody>${shown.map((r) => `
        <tr class="${r.gap >= 3 ? 'h2h-split' : ''}">
          <td>“${r.q.text}”</td>
          <td>${likertLabel(r.a)}</td>
          <td>${likertLabel(r.b)}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <p class="muted center company-note">The ${shown.length} widest divergences, of
    ${h2h.rows.length} shared questions.</p>
  `));

  const marks = [a, b].map((f) => ({
    x: f.pt.x, y: f.pt.y,
    trail: trajectory(f, QUESTIONS).map((t) => ({ x: t.pt.x, y: t.pt.y, era: t.era })),
    label: f.name.replace(/,? (Jr\.|Sr\.|[IV]+)$/, '').split(' ').at(-1),
    name: f.name,
    blurb: BLURBS[f.slug] ?? '',
    place: `${quadrant(f.pt)} · x ${fmt(f.pt.x)} · y ${fmt(f.pt.y)}`,
  }));
  drawOn('#wrap-compare canvas', null, marks);
  attachFigureTip(app.querySelector('#wrap-compare'), marks);
  app.querySelector('#cmp-a').addEventListener('change', (e) => set({ cmpA: e.target.value }));
  app.querySelector('#cmp-b').addEventListener('change', (e) => set({ cmpB: e.target.value }));
}

function fmt(n) {
  return (n > 0 ? '+' : '') + n.toFixed(1);
}

// Initials for the figure-card seal: first letter of first and last words.
function seal(name) {
  const parts = name.replace(/,? (Jr\.|Sr\.|[IV]+)$/, '').split(' ');
  return (parts[0][0] + (parts.length > 1 ? parts.at(-1)[0] : '')).toUpperCase();
}

render();
