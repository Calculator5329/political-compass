import {
  BANK,
  BY_ID,
  AXES,
  MODULES,
  INSTRUMENT_VERSION,
  SCORING_VERSION,
  CONTEXT_PAIRS,
  REASONS,
  moduleQuestions,
} from "./instrument.js";
import {
  profileScores,
  profilePoint,
  comparePositions,
  positionValue,
} from "./scoring.js";
import {
  STORAGE_KEY,
  loadState,
  snapshot,
  exportProfile,
  parseProfile,
  parseNotebook,
  cancellationExample,
  figureAnswers,
  rankedFigures,
  sameMapExample,
  historyChanges,
  evidenceFor,
  disagreementGuide,
} from "./atlas-model.js";
import { FIGURES } from "./figures.js";
import { MODES, figuresInMode } from "./modes.js";
import { ELECTIONS } from "./elections.js";
import { FACTIONS } from "./factions.js";
import { drawCompass, fitCanvas } from "./compass.js";

const app = document.getElementById("app");
let exportText = "";
let state = loadState(localStorage),
  view = "intro",
  evidence = null,
  evidenceError = "",
  notice = "",
  peer = null,
  ledger = null;
let axisX = "econ",
  axisY = "social",
  mode = "national",
  selectedFigure = "trump",
  compareFigure = "sanders",
  weighted = false,
  pilotMode = false,
  showMe = true;
let dispose = [];
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const safeUrl = (url) => (/^https?:\/\//i.test(url ?? "") ? url : "#");
const links = (sources) =>
  (sources ?? [])
    .map(
      (s) =>
        `<a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${esc(s.title || new URL(safeUrl(s.url) === "#" ? "https://example.invalid" : s.url).hostname)}</a>`,
    )
    .join(" · ");
const btn = (label, action, attrs = "") =>
  `<button data-action="${action}" ${attrs}>${label}</button>`;
const empty = (text) => `<p class="empty">${text}</p>`;
const fmt = (n) =>
  n === null ? "Not enough evidence" : `${n > 0 ? "+" : ""}${n.toFixed(1)}`;
const statusLabel = (a) =>
  !a
    ? "Not answered"
    : a.status === "position"
      ? {
          [-2]: "Strongly oppose",
          [-1]: "Oppose",
          0: "Neither support nor oppose",
          1: "Support",
          2: "Strongly support",
        }[a.value]
      : ({
          mixed: "Mixed / depends",
          unsure: "Not enough information",
          skip: "Skipped",
        }[a.status] ?? "Unknown");
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    notice =
      "Browser storage is unavailable or full. Export your notebook to keep this session.";
  }
}
function go(next) {
  view = next;
  notice = "";
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function heading(title, text = "") {
  return `<header><p class="kicker">The Political Atlas · MMXXVI</p><h1>${title}</h1>${text ? `<p class="lede">${text}</p>` : ""}</header>`;
}
function nav() {
  return `<a class="skip-link" href="#content">Skip to content</a><nav class="tabs" aria-label="Main navigation">${[
    ["intro", "The Test"],
    ["profile", "Your Profile"],
    ["figures", "Figures"],
    ["explore", "Explore"],
    ["notebook", "Notebook"],
    ["elections", "Elections"],
    ["method", "Method"],
    ["ledger", "Ledger"],
  ]
    .map(([id, label]) =>
      btn(
        label,
        "nav",
        `data-view="${id}" ${view === id || (view === "quiz" && id === "intro") ? 'aria-current="page" class="on"' : ""}`,
      ),
    )
    .join("")}</nav>`;
}
function render() {
  for (const d of dispose) d();
  dispose = [];
  app.innerHTML =
    nav() +
    `<main id="content" tabindex="-1">${notice ? `<p class="notice" role="status">${esc(notice)}</p>` : ""}${({ intro: renderIntro, quiz: renderQuiz, profile: renderProfile, figures: renderFigures, explore: renderExplore, notebook: renderNotebook, elections: renderElections, method: renderMethod, ledger: renderLedger }[view] ?? renderIntro)()}</main><footer>Exploratory profiles, with visible evidence gaps. ${INSTRUMENT_VERSION} · <button class="text-button" data-action="nav" data-view="method">How this works</button></footer><footer class="more-by-ethan" aria-label="More by Ethan"><span>More by Ethan:</span> <a href="https://calculator5329.github.io">Projects</a> · <a href="https://gatesai.web.app/" title="A local-first AI chat desktop app that runs on cloud models or fully local Ollama.">GatesAI Chat</a> · <a href="https://ethan-488900.web.app" title="Portfolio backtesting, asset allocation and retirement Monte Carlo over 150+ years of market history.">Fathom</a> · <a href="https://agent-handles.web.app" title="Makes a web app's interface addressable by AI agents, with a receipt for each action.">Agent Handles</a> · <a href="https://neon-vector-defense-7.web.app/?demo=1" title="A sci-fi tower defense game with a deterministic simulation core, exact replays and headless balance sims.">Neon Vector Defense</a> · <a href="https://n2k-almanac-v3.web.app" title="An equation almanac and solver for the N2K dice game, served from a compact binary file in a Web Worker.">N2K Almanac</a> · <a href="https://github.com/Calculator5329">GitHub</a></footer>`;
  wireCharts();
}
function totals() {
  const values = Object.values(state.answers);
  return {
    positions: values.filter((a) => positionValue(a) !== null).length,
    completed: values.length,
    core: moduleQuestions("core").filter((q) => state.answers[q.id]).length,
  };
}
function renderIntro() {
  const t = totals();
  return (
    heading(
      "Where do you stand?",
      "A short survey of your beliefs, followed by room to explore the questions that matter to you.",
    ) +
    `<div class="intro-layout"><div><p>Start with 30 core propositions. Then explore housing, technology, civil liberties, foreign policy and the institutions that shape public life.</p><p class="mt">Your position, priorities and certainty stay separate. You can be undecided without being placed in the center.</p><div class="actions start-actions">${btn(t.core ? "Resume the core survey" : "Begin the core survey", "module", 'data-module="core" class="primary"')}${t.completed ? btn("See my profile", "nav", 'data-view="profile"') : ""}</div><p class="small muted mt">Answers and notebook notes stay in this browser. Sharing is optional and explicit. No account required.</p>${state.migrated ? `<p class="notice">Unchanged answers from your earlier survey were copied here. Old “neutral / unsure” answers now mean unsure. Revised questions need a new answer; your original browser record is untouched.</p>` : ""}</div><aside class="ink-aside"><h2>A profile, with room for nuance</h2><ol><li>Place your views on several separately scored dimensions.</li><li>Compare documented positions, with sources and coverage.</li><li>Keep a private record of what changes your mind.</li></ol></aside></div><hr class="rule"><h2>Choose a chapter</h2><div class="module-grid">${MODULES.map(
      (m) => {
        const qs = moduleQuestions(m.id);
        return `<article><h3>${esc(m.name)}</h3><p>${esc(m.description)}</p><p class="small muted">${qs.filter((q) => state.answers[q.id]).length} of ${qs.length} answered${m.id !== "core" ? " · adds to the core" : ""}</p>${btn("Open chapter", "module", `data-module="${m.id}"`)}</article>`;
      },
    ).join("")}</div>`
  );
}
function renderQuiz() {
  const qs = moduleQuestions(state.module);
  const index = Math.max(0, Math.min(state.index, qs.length - 1));
  state.index = index;
  const q = qs[index];
  if (!q) return empty("This chapter has no additional questions.");
  const a = state.answers[q.id];
  const progress = qs.filter((q) => state.answers[q.id]).length;
  return (
    heading(MODULES.find((m) => m.id === state.module)?.name ?? "Survey") +
    `<div class="progress"><span>Question ${index + 1} of ${qs.length}</span><span>${progress} answered</span></div><progress max="${qs.length}" value="${progress}" aria-label="Chapter completion"></progress>${q.module === "current" ? `<p class="notice">Dated ${q.edition}; review due ${q.expires}. This item is excluded from core scores.</p>` : ""}<h2 class="statement" tabindex="-1">${esc(q.text)}</h2><fieldset class="answer-options"><legend>Do you support or oppose this proposition?</legend>${[-2, -1, 0, 1, 2].map((v) => btn(statusLabel({ status: "position", value: v }), "answer", `data-id="${q.id}" data-value="${v}" aria-pressed="${a?.status === "position" && a.value === v}"`)).join("")}</fieldset><div class="answer-alternatives">${[
      ["mixed", "Mixed / depends"],
      ["unsure", "Not enough information"],
      ["skip", "Skip this question"],
    ]
      .map(([status, label]) =>
        btn(
          label,
          "answer",
          `data-id="${q.id}" data-status="${status}" aria-pressed="${a?.status === status}"`,
        ),
      )
      .join("")}</div>${
      a
        ? `<div class="response-details"><label>How certain are you?<select id="certainty" data-answer-field="certainty" data-id="${q.id}">${[
            ["tentative", "Tentative"],
            ["fairly", "Fairly certain"],
            ["confident", "Very certain"],
          ]
            .map(
              ([v, l]) =>
                `<option value="${v}" ${a.certainty === v ? "selected" : ""}>${l}</option>`,
            )
            .join(
              "",
            )}</select></label><label>How important is this to you?<select data-answer-field="importance" data-id="${q.id}">${[
            ["0", "Not a priority"],
            ["1", "Some importance"],
            ["2", "Important"],
            ["3", "One of my top priorities"],
          ]
            .map(
              ([v, l]) =>
                `<option value="${v}" ${a.importance === Number(v) ? "selected" : ""}>${l}</option>`,
            )
            .join(
              "",
            )}</select></label></div>${REASONS[q.id] ? `<label>Which consideration best explains your answer?<select data-answer-field="reason" data-id="${q.id}"><option value="">Optional</option>${REASONS[q.id].map((r) => `<option ${a.reason === r ? "selected" : ""}>${esc(r)}</option>`).join("")}</select></label>` : ""}<label class="block">What matters to your answer? <span class="muted">Optional; private.</span><textarea data-answer-field="note" data-id="${q.id}" maxlength="2000" rows="2">${esc(a.note)}</textarea></label>`
        : ""
    }<details><summary>Context and scoring</summary><p>${esc(q.rationale)}</p><p>${
      Object.keys(q.loads).length
        ? Object.entries(q.loads)
            .map(
              ([id, w]) =>
                `${esc(AXES[id].name)}: support moves toward ${esc(w > 0 ? AXES[id].high : AXES[id].low)}`,
            )
            .join("<br>")
        : "Shown as an individual issue position. No axis loading."
    }</p>${q.revised ? "<p>This wording changed. Earlier answers and figure scores are not carried over automatically.</p>" : ""}<p class="small">Background reading, not proof of a preferred answer: ${links(q.sources) || "No external context is needed to state a preference."}</p></details>${pilotMode ? `<aside class="pilot"><h3>Interpretation pilot</h3><label>Explain this question in your own words.<textarea data-pilot="${q.id}" maxlength="2000">${esc(state.pilot[q.id] ?? "")}</textarea></label><p class="small">Record confusing wording, missing context or a value judgment. These notes are local until you choose to export them.</p></aside>` : ""}<div class="nav">${btn("Previous", "previous", index === 0 ? "disabled" : "")}${btn(index === qs.length - 1 ? "Finish chapter" : "Next", "next", !a ? 'disabled class="primary"' : 'class="primary"')}</div>${btn("Save progress & view profile", "nav", 'data-view="profile" class="text-button"')}`
  );
}
function axisBars(profile, ids) {
  return ids
    .map((id) => {
      const p = profile[id],
        axis = AXES[id];
      return `<div class="axis-row"><h3>${esc(axis.name)}</h3><div class="axis-ends"><span>${esc(axis.low)}</span><span>${esc(axis.high)}</span></div><div class="axis-track" role="img" aria-label="${esc(axis.name)}: ${p.value === null ? "not enough stated positions" : fmt(p.value)}">${p.value === null ? "" : `<b style="left:${(p.value + 10) * 5}%">✕</b>`}</div><p class="small muted">${p.value === null ? `Need ${p.minimum} stated positions to plot` : `${fmt(p.value)} · provisional`}; ${p.answered} of ${p.total} items with a stated position.</p><details><summary>What this dimension means</summary><p>${esc(axis.description)}</p></details></div>`;
    })
    .join("");
}
function chart(id, point, marks = [], labels = {}) {
  return `<div class="chart-wrap" data-chart="${id}"><canvas class="compass" aria-label="Political profile chart. Exact positions and coverage appear in the accompanying text." role="img" data-point="${esc(JSON.stringify(point))}" data-marks="${esc(JSON.stringify(marks))}" data-labels="${esc(JSON.stringify(labels))}"></canvas></div>`;
}
function axisLabels(x, y) {
  return {
    left: AXES[x].low,
    right: AXES[x].high,
    top: AXES[y].high,
    bottom: AXES[y].low,
  };
}
function axisSelect(id, selected) {
  return `<select id="${id}" aria-label="${id === "axis-x" ? "Horizontal" : "Vertical"} dimension">${Object.entries(
    AXES,
  )
    .map(
      ([k, a]) =>
        `<option value="${k}" ${selected === k ? "selected" : ""}>${esc(a.name)}</option>`,
    )
    .join("")}</select>`;
}
function renderProfile() {
  const t = totals();
  if (!t.completed)
    return (
      heading("Your profile") +
      empty(
        "Answer a few propositions to begin. Unknowns will remain unknown.",
      ) +
      btn(
        "Begin the core survey",
        "module",
        'data-module="core" class="primary"',
      )
    );
  const profile = profileScores(state.answers, BANK, AXES),
    point = profilePoint(profile, axisX, axisY);
  const matches = evidence
    ? rankedFigures(state.answers, FIGURES, evidence, weighted)
    : [];
  return (
    heading(
      "Your political profile",
      "Several views of the same answers, with the uncertainty left visible.",
    ) +
    `<p>${t.positions} stated positions · ${t.completed - t.positions} mixed, unsure or skipped · ${t.core}/30 core questions answered.</p><div class="map-controls"><label>Horizontal ${axisSelect("axis-x", axisX)}</label><label>Vertical ${axisSelect("axis-y", axisY)}</label></div>${point ? chart("profile", point, [], axisLabels(axisX, axisY)) : empty("Answer at least three items on each selected dimension to place a mark. Missing answers are not centered.")}<div class="actions">${btn("Export map as PNG", "png", point ? "" : "disabled")}${btn("Save a dated notebook entry", "snapshot")}${btn("Continue core survey", "module", 'data-module="core"')}</div><h2 class="mt">The main dimensions</h2><div class="axes-grid">${axisBars(profile, ["econ", "social", "power", "liberty", "build"])}</div><details class="chapter"><summary>Trust, foreign policy & technology</summary><p>These subjects contain several distinct preferences. There is no single “pro-technology” or “pro-foreign” score.</p>${axisBars(profile, ["trust", "military", "cooperation", "trade", "governance", "openness", "corporate"])}</details><section class="chapter"><h2>Documented company</h2><label class="check"><input type="checkbox" id="weighted" ${weighted ? "checked" : ""}> Weight comparisons by my priorities</label><p class="small muted">Similarity is the average distance between stated answers on shared items. At least six shared positions are required. Different figures may be compared on different subsets; read coverage before interpreting their order. It is not a probability of agreement, an endorsement, or a voting recommendation.</p>${evidenceStatus()}${
      matches.length
        ? `<ol class="matches">${matches
            .slice(0, 5)
            .map(
              (m) =>
                `<li>${btn(esc(m.figure.name), "figure", `data-slug="${m.figure.slug}" class="text-button"`)}<span>${m.similarity.toFixed(0)}% similarity · ${m.shared} shared items</span><p class="small">Largest difference: ${esc(m.rows[0]?.q.text)} (${statusLabel({ status: "position", value: m.rows[0]?.a })} / ${statusLabel({ status: "position", value: m.rows[0]?.b })})</p></li>`,
            )
            .join("")}</ol>`
        : empty(
            "No comparison has enough shared documented positions yet. More evidence and additional answers can change coverage.",
          )
    }<details><summary>Where your answers differ from the comparison roster</summary><p>The comparison population is the selected public figures, not the American public. No population percentile or “percentage of ideology explained” is claimed.</p>${matches[0] ? rowsTable(matches[0].rows.filter((r) => r.gap >= 2).slice(0, 5), "You", matches[0].figure.name) : ""}</details>${
      matches.length > 3
        ? `<details><summary>Most different documented company</summary><ul>${matches
            .slice(-3)
            .reverse()
            .map(
              (m) =>
                `<li>${btn(esc(m.figure.name), "figure", `data-slug="${m.figure.slug}" class="text-button"`)} · ${m.similarity.toFixed(0)}% similarity across ${m.shared} shared items</li>`,
            )
            .join("")}</ul></details>`
        : ""
    }</section><section class="chapter"><h2>Context worth exploring</h2><p>These pairs can reveal different priorities or contexts. Agreement with both is not a diagnosis of inconsistency.</p>${
      CONTEXT_PAIRS.filter((pair) => pair.every((id) => state.answers[id]))
        .map(
          (pair) =>
            `<article class="pair">${pair.map((id) => `<p>${esc(BY_ID[id].text)}<br><strong>${statusLabel(state.answers[id])}</strong></p>`).join("")}<p class="muted">Would your answer change with different legal limits, harms or decision-makers?</p></article>`,
        )
        .join("") ||
      empty("Context pairs appear after their questions are answered.")
    }<p>Try the Power & institutions or Technology & data chapter for more depth.</p></section><section class="chapter"><h2>Your issue record</h2><p>Edit an answer, adjust its importance, or revisit something you are unsure about.</p><div class="issue-list">${BANK.filter(
      (q) => state.answers[q.id],
    )
      .map(
        (q) =>
          `<details><summary>${esc(q.text)}</summary><p>${statusLabel(state.answers[q.id])} · importance ${state.answers[q.id].importance}/3 · ${esc(state.answers[q.id].certainty)}</p>${btn("Revisit question", "revisit", `data-id="${q.id}"`)}</details>`,
      )
      .join("")}</div></section>`
  );
}
function evidenceStatus() {
  return evidence
    ? ""
    : `<p class="notice" role="status">${evidenceError ? esc(evidenceError) : "Loading the public evidence inventory…"}${evidenceError ? btn("Retry", "retry-evidence") : ""}</p>`;
}
function figureOptions(selected) {
  return FIGURES.map(
    (f) =>
      `<option value="${f.slug}" ${f.slug === selected ? "selected" : ""}>${esc(f.name)}</option>`,
  ).join("");
}
function rowsTable(
  rows,
  left = "First profile",
  right = "Second profile",
  emptyMessage = "No shared stated positions. Unknown and mixed positions are not treated as neutral.",
) {
  return rows.length
    ? `<div class="table-scroll"><table><thead><tr><th>Proposition</th><th>${esc(left)}</th><th>${esc(right)}</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.q.text)}</td><td>${statusLabel({ status: "position", value: r.a })}</td><td>${statusLabel({ status: "position", value: r.b })}</td></tr>`).join("")}</tbody></table></div>`
    : empty(emptyMessage);
}
function renderFigures() {
  const f = FIGURES.find((f) => f.slug === selectedFigure) ?? FIGURES[0],
    g = FIGURES.find((f) => f.slug === compareFigure) ?? FIGURES[1];
  const roster =
    mode === "world"
      ? FIGURES.filter((f) => ["putin", "xi"].includes(f.slug))
      : mode === "tech-money"
        ? FIGURES.filter((f) =>
            ["musk", "ramsey", "ramaswamy"].includes(f.slug),
          )
        : figuresInMode(FIGURES, mode);
  const fa = figureAnswers(f, evidence),
    ga = figureAnswers(g, evidence),
    profile = profileScores(fa, BANK, AXES);
  const comparison = comparePositions(fa, ga, BANK);
  const record = evidence?.figures?.[f.slug];
  const marks = roster.flatMap((f) => {
    const p = profilePoint(
      profileScores(figureAnswers(f, evidence), BANK, AXES),
      "econ",
      "social",
    );
    return p
      ? [
          {
            ...p,
            label: roster.length <= 12 ? f.name.split(" ").at(-1) : "",
            name: f.name,
          },
        ]
      : [];
  });
  return (
    heading(
      "Figures, with their evidence",
      "A documented position is different from a guess about someone’s politics.",
    ) +
    evidenceStatus() +
    `<label>Collection<select id="mode">${[...MODES.map((m) => [m.id, m.name]), ["world", "World leaders · US-framed comparison"], ["tech-money", "Technology & money"]].map(([id, name]) => `<option value="${id}" ${mode === id ? "selected" : ""}>${esc(name)}</option>`).join("")}</select></label>${mode === "world" ? '<p class="notice">This is a US-framed instrument. Positions inferred by analogy to another country are excluded; many dimensions will have insufficient evidence.</p>' : ""}<label class="check"><input id="show-me" type="checkbox" ${showMe ? "checked" : ""}> Show my current profile</label>${marks.length ? chart("figures", showMe ? profilePoint(profileScores(state.answers, BANK, AXES), "econ", "social") : null, marks, axisLabels("econ", "social")) : empty("This collection currently has insufficient documented positions for a two-axis map.")}<p class="small muted">${marks.length} of ${roster.length} figures can be plotted on economics × social values. All figures remain available below. A red cross, when present, is your current profile.</p><div class="figure-roster">${roster.map((f) => btn(esc(f.name), "figure", `data-slug="${f.slug}" class="text-button"`)).join("")}</div><section class="chapter"><label>Inspect a figure<select id="figure">${figureOptions(f.slug)}</select></label><h2>${esc(f.name)}</h2><p class="small muted">Dossier updated: ${esc(record?.recordThrough ?? "unknown")}. Inventory reviewed: ${esc(record?.reviewedAt ?? evidence?.reviewedAt ?? "not available")}. These dates do not imply every source was freshly verified.</p><p>${Object.keys(fa).length}/${BANK.length} exact statements with usable documented positions. Revised and new questions remain unknown until supported.</p><details><summary>Show dimensions</summary>${axisBars(profile, ["econ", "social", "power", "liberty", "build", "military", "cooperation", "governance"])}</details><label>Find a proposition<input id="evidence-filter" placeholder="Search by topic or words" type="search"></label><div id="evidence-list">${evidenceRows(f)}</div></section><section class="chapter"><h2>Head to head</h2><label>Compare ${esc(f.name)} with<select id="compare-figure">${figureOptions(g.slug)}</select></label>${chart(
      "head-to-head",
      null,
      [
        { figure: f, profile },
        { figure: g, profile: profileScores(ga, BANK, AXES) },
      ].flatMap((entry) => {
        const p = profilePoint(entry.profile, "econ", "social");
        return p
          ? [{ ...p, label: entry.figure.name, name: entry.figure.name }]
          : [];
      }),
      axisLabels("econ", "social"),
    )}<p>${comparison.similarity === null ? "Not enough shared positions to calculate similarity." : `${comparison.similarity.toFixed(0)}% similarity across ${comparison.shared} shared positions.`} Unscored positions stay excluded.</p>${rowsTable(comparison.rows, f.name, g.name)}</section>`
  );
}
function evidenceRows(f, filter = "") {
  return BANK.filter((q) =>
    `${q.text} ${q.id} ${q.module}`
      .toLowerCase()
      .includes(filter.toLowerCase()),
  )
    .map((q) => {
      const r = evidenceFor(f, q.id, evidence);
      return `<details class="evidence-item"><summary><span class="evidence-status">${esc(r.status)}</span> ${esc(q.text)}</summary><p>${r.status === "documented" ? statusLabel({ status: "position", value: r.value }) : r.status === "mixed" ? "Mixed documented positions; excluded from numerical matching." : "Not numerically scored."}</p><p>${esc(r.rationale)}</p><p class="small">${links(r.sources) || "No item-specific source recorded."}</p>${r.sourceDate ? `<p class="small">Source date: ${esc(r.sourceDate)}</p>` : ""}${btn("Challenge this placement", "challenge", `data-id="${q.id}" data-slug="${f.slug}"`)}</details>`;
    })
    .join("");
}
function renderExplore() {
  const demo = cancellationExample();
  const example = evidence ? sameMapExample(FIGURES, evidence) : null;
  return (
    heading(
      "Explore the differences",
      "A map is a useful summary. Your answers contain more than a point can show.",
    ) +
    `<section class="chapter"><h2>Nearby points, different politics</h2>${
      example
        ? `<p>${esc(example.a.figure.name)} and ${esc(example.b.figure.name)} sit ${example.distance.toFixed(1)} map units apart on economics × social values, but differ on these shared positions.</p>${chart(
            "same-map",
            null,
            [
              {
                ...example.a.point,
                label: example.a.figure.name,
                name: example.a.figure.name,
              },
              {
                ...example.b.point,
                label: example.b.figure.name,
                name: example.b.figure.name,
              },
            ],
            axisLabels("econ", "social"),
          )}${rowsTable(example.rows.filter((r) => r.gap >= 2).slice(0, 5), example.a.figure.name, example.b.figure.name)}`
        : empty(
            "The evidence inventory does not yet provide a sufficiently covered nearby pair with a large answer difference.",
          )
    }<p>Opposite answers can cancel out. Compare issue records before interpreting proximity as agreement.</p></section><section class="chapter"><h2>Exactly the same point, opposite answers</h2><p>These two profiles are deliberately constructed examples, not real people. Both score economics ${fmt(demo.leftPoint.x)} and social values ${fmt(demo.leftPoint.y)}, while giving opposite answers to every shared proposition. Equal map coordinates need not mean shared beliefs.</p><details><summary>Inspect the example answers</summary>${rowsTable(demo.rows, "Constructed example A", "Constructed example B")}</details></section><section class="chapter"><h2>Explore a tradeoff</h2><p>These scenarios are hypothetical. The numbers are assumptions you choose, not forecasts or estimates of policy effects. They do not change your ideology score.</p>${tradeoff("cost", "Domestic production", "What additional price would you accept for a domestically produced item that otherwise costs $100?", 0, 100, "dollars")}${tradeoff("delay", "Infrastructure review", "How many additional months would you allow for local objections before requiring a final decision on a transmission project?", 0, 60, "months")}<label>What would change your answer?<textarea id="tradeoff-note" maxlength="2000">${esc(state.tradeoffs.note ?? "")}</textarea></label></section><section class="chapter"><h2>A conversation between two people</h2><p>Both participants choose whether to share. Files are read in this browser; they are not uploaded. Export a copy, pass it to someone yourself, then import their same-version copy.</p><label class="check"><input id="share-consent" type="checkbox"> Include my political answers, priorities and certainty in a comparison file. Exclude notebook notes and reasons.</label>${btn("Export my comparison file", "export-profile")}<label class="block">Import the other person’s shared file<input type="file" id="peer-file" accept="application/json,.json"></label><details><summary>Or paste a shared profile</summary><label>Shared profile text<textarea id="peer-text" rows="4" maxlength="500000"></textarea></label>${btn("Read pasted profile", "paste-peer")}</details>${exportText ? `<details><summary>View or copy your prepared comparison file</summary><p class="small">This contains political answers. Share it only if you choose.</p><textarea id="export-text" aria-label="Prepared comparison file" readonly rows="5">${esc(exportText)}</textarea></details>` : ""}<div id="peer-guide">${peer ? renderPeer() : empty("No other profile loaded.")}</div></section><details class="chapter"><summary>Historical faction map</summary><p>The previous app used editorial faction territories on an Insurgent × Left/Right map. These shapes are retained as historical context. They are not learned clusters or classifications for the new atlas.</p>${FACTIONS.map((f) => `<p><strong>${esc(f.name)}</strong>: editorial territory, centered at ${f.x}, ${f.y} on the legacy map.</p>`).join("")}${chart("legacy-factions", null, [], { left: "Left · legacy", right: "Right · legacy", top: "Insurgent · legacy", bottom: "Institutionalist · legacy" })}</details>`
  );
}
function tradeoff(id, title, prompt, min, max, unit) {
  const v = state.tradeoffs[id];
  return `<article class="tradeoff"><h3>${title}</h3><p>${prompt}</p><label>${title} threshold<input data-tradeoff="${id}" type="range" min="${min}" max="${max}" value="${typeof v === "number" ? v : min}" aria-describedby="${id}-value"></label><output id="${id}-value">${v === undefined ? "Not recorded" : v === "depends" ? "Depends on the details" : `${v} ${unit}`}</output><div>${btn("Record this threshold", "record-tradeoff", `data-id="${id}"`)} ${btn("It depends on the details", "depends-tradeoff", `data-id="${id}"`)}</div></article>`;
}
function renderPeer() {
  const guide = disagreementGuide(state.answers, peer.answers);
  return `<h3>Your shared conversation</h3><p>${guide.shared} shared stated positions. ${guide.similarity === null ? "Too few for a summary." : `${guide.similarity.toFixed(0)}% similarity on those items.`}</p><h4>Shared priorities</h4>${rowsTable(guide.sharedPriorities, "You", "Other participant", "No shared high-priority issues were selected.")}<h4>Common ground</h4>${rowsTable(guide.agreements.slice(0, 6), "You", "Other participant", "No close agreements among the shared positions.")}<h4>Differences to discuss</h4>${rowsTable(guide.disagreements.slice(0, 8), "You", "Other participant", "No large differences among the shared positions.")}<p>For each difference, ask: Do we disagree about facts, values, or how the policy would work? What evidence or circumstances would change our answers?</p>${btn("Unload the shared profile", "unload-peer")}`;
}
function renderNotebook() {
  const history = state.history;
  const current = snapshot(state.answers);
  return (
    heading(
      "Your civic notebook",
      "A private record of your answers, uncertainties and changes of mind.",
    ) +
    `<label>What have you been thinking about?<textarea id="notebook-note" maxlength="2000" rows="3" placeholder="What changed your mind, or what are you still considering?">${esc(state.notebookNote ?? "")}</textarea></label><div class="actions">${btn("Save a dated entry", "snapshot")}${btn("Export private notebook backup", "export-notebook")}</div><p class="small muted">The backup includes private notes. Keep it somewhere you trust. Exporting downloads a file; it does not publish it.</p><label class="block">Restore notebook entries from your backup<input type="file" id="notebook-file" accept="application/json,.json"></label><section class="chapter"><h2>Your timeline</h2>${
      history.length
        ? history
            .slice()
            .reverse()
            .map((entry, rev) => {
              const index = history.length - 1 - rev;
              const changes = historyChanges(entry, current);
              return `<details><summary>${esc(new Date(entry.date).toLocaleString())} · ${esc(entry.version)}${entry.archived ? " · archived" : ""}</summary><p>${esc(entry.note || "No reflection recorded.")}</p><p class="small">Saved scoring: ${esc(entry.scoringVersion)}. ${changes.sameVersion ? "Same instrument and scoring version." : "Instrument or scoring changed; only identical questions are compared."}</p><p>Saved dimensions: ${
                Object.entries(entry.scores ?? {})
                  .filter(([, v]) => v?.value !== null)
                  .map(([k, v]) => `${esc(AXES[k]?.name ?? k)} ${fmt(v.value)}`)
                  .join(" · ") || "Insufficient answers at the time."
              }</p>${changes.rows.length ? `<ul>${changes.rows.map((r) => `<li>${esc(r.q.text)}<br>${statusLabel(r.before)} → ${statusLabel(r.after)}</li>`).join("")}</ul>` : "<p>No changed answers on comparable questions.</p>"}${entry.tradeoffs ? `<p>Saved tradeoffs: ${esc(JSON.stringify(entry.tradeoffs))}</p>` : ""}${btn(entry.archived ? "Restore entry" : "Archive entry", "archive-entry", `data-index="${index}"`)}</details>`;
            })
            .join("")
        : empty(
            "Save your first entry to begin a timeline. Earlier entries are frozen; changing the instrument does not rewrite them.",
          )
    }</section><section class="chapter"><h2>Evidence challenges</h2><p>Drafts are private until you explicitly open and submit a GitHub review request. A challenge never changes a score automatically.</p>${state.drafts.map((d, i) => `<details ${i === state.drafts.length - 1 ? "open" : ""}><summary>${esc(FIGURES.find((f) => f.slug === d.slug)?.name ?? d.slug)} · ${esc(d.id)} · ${esc(d.status ?? "draft")}</summary><p>${esc(BY_ID[d.id]?.text ?? d.id)}</p><label>Evidence URL<input type="url" data-draft-field="source" data-index="${i}" value="${esc(d.source)}"></label><label>Why should this placement change?<textarea data-draft-field="reason" data-index="${i}" maxlength="2000">${esc(d.reason)}</textarea></label><p>${links([{ title: "Review current evidence and rationale", url: `https://political-test-2026.web.app/?figure=${encodeURIComponent(d.slug)}` }])}</p>${btn("Open review draft on GitHub", "open-challenge", `data-index="${i}"`)} ${btn("Mark as submitted", "submitted-challenge", `data-index="${i}"`)}</details>`).join("") || empty("Use “Challenge this placement” beside any figure’s evidence.")}</section>${state.migrated ? `<details class="chapter"><summary>Earlier survey preserved</summary><p>The original political-compass-v1 browser record remains untouched. Its coordinates use an older instrument and cannot be compared directly with atlas dimensions.</p>${btn("Download original survey record", "export-legacy")}</details>` : ""}`
  );
}
function renderElections() {
  return (
    heading(
      "Compare a race",
      "Candidates belong to a particular election and office. Evidence gaps stay visible.",
    ) +
    `<label class="check"><input type="checkbox" id="weighted" ${weighted ? "checked" : ""}> Weight comparisons by my priorities</label>${evidenceStatus()}${ELECTIONS.map(
      (race) => {
        const candidates = race.candidates
          .map((c) => {
            const f = FIGURES.find((f) => f.slug === c.slug);
            const m = f
              ? comparePositions(
                  state.answers,
                  figureAnswers(f, evidence),
                  BANK,
                  weighted,
                )
              : null;
            return { ...c, m };
          })
          .sort((a, b) => (b.m?.similarity ?? -1) - (a.m?.similarity ?? -1));
        return `<section class="chapter"><h2>${esc(race.name)}</h2><p>${esc(race.electionDate)} · checked ${esc(race.verifiedAt)}</p><p class="small muted">${esc(race.status)}. ${esc(race.note)} ${esc(race.scoreNote ?? "")}</p><ol class="matches">${candidates.map((c) => `<li><strong>${esc(c.name)}${c.runningMate ? ` / ${esc(c.runningMate)}` : ""}</strong><span>${esc(c.party)} · ${esc(c.candidacy ?? "")}</span><p>${c.m?.similarity !== null && c.m?.similarity !== undefined ? `${c.m.similarity.toFixed(0)}% similarity · ${c.m.shared} shared positions` : "Not ranked: insufficient shared documented positions."}</p>${c.slug ? btn("Inspect evidence", "figure", `data-slug="${c.slug}"`) : '<p class="small">This candidate has no scored dossier yet and remains included.</p>'}</li>`).join("")}</ol><p class="small">${links(race.sources)}</p><a href="${esc(safeUrl(race.ballotUrl))}" target="_blank" rel="noopener noreferrer">Check your official ballot</a></section>`;
      },
    ).join(
      "",
    )}<p>Coverage currently includes these Minnesota races. It does not imply a complete state or national ballot. Rankings reflect issue similarity only; qualifications, conduct and other considerations require separate judgment.</p>`
  );
}
function renderMethod() {
  return (
    heading(
      "How the atlas works",
      "Transparent editorial choices, without a claim of scientific diagnosis.",
    ) +
    `<section class="chapter"><h2>What is measured</h2><p>Each stated position runs from strongly oppose (-2) to strongly support (+2). “Neither support nor oppose” is an explicit zero. “Mixed / depends,” “Not enough information,” skipped items and missing public evidence have no numerical position.</p><p>Every dimension has explicit item loadings. Its score is the weighted sum of stated positions divided by twice the absolute weights of those answered items, scaled to -10 through +10. At least three stated positions are required. Coverage is shown; a sparse result can change substantially with more answers.</p><p>Importance and certainty do not change axis coordinates. Optional priority weighting changes comparison distances only. Mixed public evidence and inferred positions do not enter comparisons. Similarity needs six shared positions and is a descriptive distance, not a probability.</p><p>Axes are provisional editorial constructs. There are no calibrated confidence intervals, population percentiles or empirically derived faction memberships. No respondent pilot or population validation is claimed.</p></section><section class="chapter"><h2>Question versions and evidence</h2><p>Current instrument: ${INSTRUMENT_VERSION}; scoring: ${SCORING_VERSION}. ${BANK.length} available propositions, including a 30-item core. Reworded questions have new identifiers. Older scores retain their version and are not recomputed as if the person changed their mind.</p><p>Public dossiers are research records, not self-reported answers from the figures. Evidence may be documented, mixed, inferred or unknown. Recorded citations are not automatically freshly verified sources. A source date and a review date mean different things. Open each item to inspect the rationale.</p><p>New questions can be useful before every figure is researched. Their absent evidence remains unknown; it is never filled from a person’s party or general ideology. Foreign leaders are especially difficult to compare using US-framed propositions.</p><p>Current affairs are a dated module, separate from durable scores. Review dates are visible on its questions. Roster additions, evidence changes and scoring revisions belong in the public update record.</p><a href="/release-notes.md" target="_blank">Read this release’s changes and limitations</a></section><section class="chapter"><h2>Try the interpretation pilot</h2><p>Help evaluate wording by explaining what you think a question asks, without being shown a supposed correct answer. A small pilot can identify confusion; establishing reliable dimensions requires further research with real respondents.</p><label class="check"><input type="checkbox" id="pilot-mode" ${pilotMode ? "checked" : ""}> Show private interpretation notes while taking the survey</label><div class="actions">${btn("Start or resume pilot", "module", 'data-module="core"')}${btn("Download my pilot notes", "export-pilot")}</div><p class="small">Pilot exports contain your notes. Nothing is submitted automatically.</p><p>Suggested evaluation: recruit people with different political views and familiarity; compare paraphrases; test alternate wording; assess completion, repeated-answer stability and whether proposed dimensions actually separate. Publish the sample and methods before making validation claims.</p></section><section class="chapter"><h2>Privacy and sharing</h2><p>Your answers, reasons, certainty, tradeoff reflections and notebook live in local browser storage. Clearing browser data can remove them, so export a backup when useful. Shared-profile imports are processed locally. Third-party fonts load when the page opens.</p><p>The public ledger loads only when you open it. Signing it publishes your chosen name and economic/social coordinates, instrument identifier and time to Firebase. It does not publish raw answers. Entries are create-only and cannot be edited or removed through this app. Comparison exports and GitHub review drafts require separate explicit actions.</p></section><section class="chapter"><h2>Background and methods</h2><ul><li><a href="https://www.pewresearch.org/politics/2026/06/10/beyond-red-vs-blue-the-political-typology/" target="_blank" rel="noopener noreferrer">Pew’s 2026 political typology</a>: a benchmark for mixed political profiles, not validation of this atlas.</li><li><a href="https://www.pewresearch.org/writing-survey-questions/" target="_blank" rel="noopener noreferrer">Pew: writing survey questions</a></li><li><a href="https://www.census.gov/about/policies/quality/standards/appendixa2.html" target="_blank" rel="noopener noreferrer">Census: questionnaire testing</a></li><li><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" target="_blank" rel="noopener noreferrer">NIST: AI governance</a></li></ul></section>`
  );
}
function renderLedger() {
  const p = profileScores(state.answers, BANK, AXES),
    point = profilePoint(p, "econ", "social");
  const current = ledger?.filter((r) => r.q === INSTRUMENT_VERSION),
    legacy = ledger?.filter((r) => r.q !== INSTRUMENT_VERSION);
  return (
    heading(
      "The public ledger",
      "Voluntary signatures, separated by instrument version. This is not a representative sample.",
    ) +
    `<p class="notice">Signing publishes your chosen name and economic/social coordinates. Public entries are permanent through this app. Your raw answers, notes and other dimensions stay private.</p><label>Public name<input id="ledger-name" maxlength="24" autocomplete="off"></label><label class="check"><input id="ledger-consent" type="checkbox"> Publish my chosen name and these two coordinates.</label><p>${point ? `Economics ${fmt(point.x)} · social values ${fmt(point.y)} · ${INSTRUMENT_VERSION}` : "Answer enough economic and social questions before signing."}</p>${btn(state.ledgerSaved ? "Already signed this result" : "Sign the public ledger", "sign-ledger", !point || state.ledgerSaved ? "disabled" : "")}<section class="chapter"><h2>Atlas entries</h2>${
      ledger === null
        ? empty("Loading public entries…")
        : current.length
          ? `${chart(
              "ledger",
              null,
              current.map((r) => ({ x: r.x, y: r.y, name: r.name })),
              axisLabels("econ", "social"),
            )}<ul>${current.map((r) => `<li>${esc(r.name)} · economics ${fmt(r.x)}, social ${fmt(r.y)}</li>`).join("")}</ul>`
          : empty("No atlas entries in the latest 100 records.")
    }<p class="small">Only the latest 100 public records are loaded. Scores are self-submitted.</p></section><details class="chapter"><summary>Earlier instrument entries (${legacy?.length ?? 0})</summary><p>These coordinates came from earlier banks. They do not use the atlas scales. Entries without version identifiers cannot be assigned an exact historical bank.</p>${legacy?.map((r) => `<p>${esc(r.name)} · ${esc(r.q)} · legacy x ${fmt(r.x)}, y ${fmt(r.y)}</p>`).join("") ?? ""}</details>`
  );
}
function wireCharts() {
  app.querySelectorAll("canvas.compass").forEach((canvas) => {
    const point = JSON.parse(canvas.dataset.point),
      marks = JSON.parse(canvas.dataset.marks),
      labels = JSON.parse(canvas.dataset.labels);
    const paint = () => {
      if (!canvas.isConnected || !fitCanvas(canvas)) return;
      drawCompass(canvas, point, marks, {
        labels,
        ...(canvas.parentElement.dataset.chart === "legacy-factions"
          ? { regions: FACTIONS }
          : {}),
      });
    };
    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(canvas);
    dispose.push(() => observer.disconnect());
    canvas.addEventListener("pointermove", (event) => {
      const box = canvas.getBoundingClientRect(),
        x = (event.clientX - box.left) / box.width,
        y = (event.clientY - box.top) / box.height;
      const nearest = marks
        .map((m) => ({
          ...m,
          d: Math.hypot(x - (0.5 + 0.0385 * m.x), y - (0.5 - 0.0385 * m.y)),
        }))
        .sort((a, b) => a.d - b.d)[0];
      canvas.title =
        nearest?.d < 0.05
          ? `${nearest.name}: ${fmt(nearest.x)}, ${fmt(nearest.y)}`
          : point
            ? `Your score: ${fmt(point.x)}, ${fmt(point.y)}`
            : "";
    });
  });
}
function download(name, content, type = "application/json") {
  const blob = new Blob(
    [typeof content === "string" ? content : JSON.stringify(content, null, 2)],
    { type },
  );
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function loadEvidence() {
  evidenceError = "";
  try {
    const response = await fetch("/figure-evidence.json");
    if (!response.ok) throw new Error();
    evidence = await response.json();
    if (!evidence.figures) throw new Error();
  } catch {
    evidence = null;
    evidenceError =
      "The evidence inventory could not be loaded. Figure scores remain unavailable.";
  }
  if (["profile", "figures", "explore", "elections"].includes(view)) render();
}
async function loadLedger() {
  try {
    const { fetchScores } = await import("./firebase.js");
    ledger = await fetchScores();
  } catch {
    ledger = [];
    notice =
      "The public ledger is unavailable. Your private answers are still here.";
  }
  if (view === "ledger") render();
}
function startModule(id, questionId = null) {
  state.module = id;
  const qs = moduleQuestions(id);
  state.index = questionId
    ? Math.max(
        0,
        qs.findIndex((q) => q.id === questionId),
      )
    : Math.max(
        0,
        qs.findIndex((q) => !state.answers[q.id]),
      );
  save();
  go("quiz");
}
app.addEventListener("click", async (event) => {
  const b = event.target.closest("button[data-action]");
  if (!b || b.disabled) return;
  const action = b.dataset.action;
  try {
    if (action === "nav") {
      go(b.dataset.view);
      if (view === "ledger" && ledger === null) loadLedger();
    }
    if (action === "module") startModule(b.dataset.module);
    if (action === "answer") {
      const id = b.dataset.id,
        previous = state.answers[id] ?? {};
      const status = b.dataset.status ?? "position";
      state.answers[id] = {
        certainty: "tentative",
        importance: 1,
        reason: "",
        note: "",
        ...previous,
        status,
        value: status === "position" ? Number(b.dataset.value) : null,
      };
      state.ledgerSaved = false;
      save();
      render();
      app.querySelector('[aria-pressed="true"]')?.focus();
    }
    if (action === "previous") {
      state.index--;
      save();
      render();
    }
    if (action === "next") {
      state.index++;
      save();
      if (state.index >= moduleQuestions(state.module).length) go("profile");
      else {
        render();
        app.querySelector(".statement")?.focus();
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
    if (action === "revisit") {
      const q = BY_ID[b.dataset.id];
      startModule(q.core ? "core" : q.module, q.id);
    }
    if (action === "figure") {
      selectedFigure = b.dataset.slug;
      go("figures");
    }
    if (action === "snapshot") {
      state.history.push(
        snapshot(state.answers, state.notebookNote ?? "", {
          tradeoffs: { ...state.tradeoffs },
        }),
      );
      state.notebookNote = "";
      save();
      go("notebook");
    }
    if (action === "archive-entry") {
      const entry = state.history[Number(b.dataset.index)];
      entry.archived = !entry.archived;
      save();
      render();
    }
    if (action === "export-profile") {
      exportText = JSON.stringify(
        exportProfile(
          state.answers,
          app.querySelector("#share-consent").checked,
        ),
        null,
        2,
      );
      download("political-atlas-shared-profile.json", exportText);
      notice =
        "Comparison file prepared; check your browser’s downloads or open the copy below. You choose whether to share it.";
      render();
    }
    if (action === "export-notebook")
      download("political-atlas-private-notebook.json", {
        kind: "political-atlas-notebook",
        schema: 1,
        exportedAt: new Date().toISOString(),
        entries: state.history,
        current: snapshot(state.answers, state.notebookNote ?? "", {
          tradeoffs: state.tradeoffs,
        }),
        drafts: state.drafts,
        pilot: state.pilot,
      });
    if (action === "export-legacy")
      download(
        "political-compass-original-record.json",
        localStorage.getItem("political-compass-v1") ?? "null",
      );
    if (action === "paste-peer") {
      peer = parseProfile(app.querySelector("#peer-text").value);
      notice = "Shared profile read locally. Nothing was uploaded.";
      render();
    }
    if (action === "unload-peer") {
      peer = null;
      render();
    }
    if (action === "record-tradeoff") {
      const input = app.querySelector(`[data-tradeoff="${b.dataset.id}"]`);
      state.tradeoffs[b.dataset.id] = Number(input.value);
      save();
      render();
    }
    if (action === "depends-tradeoff") {
      state.tradeoffs[b.dataset.id] = "depends";
      save();
      render();
    }
    if (action === "challenge") {
      state.drafts.push({
        slug: b.dataset.slug,
        id: b.dataset.id,
        source: "",
        reason: "",
        status: "draft",
        createdAt: new Date().toISOString(),
        version: INSTRUMENT_VERSION,
      });
      save();
      go("notebook");
    }
    if (action === "open-challenge") {
      const d = state.drafts[Number(b.dataset.index)];
      if (!/^https?:\/\//i.test(d.source) || !d.reason.trim())
        throw new Error(
          "Add a public evidence URL and a reason before opening a review draft.",
        );
      const body = `Figure: ${d.slug}\nQuestion: ${d.id}\nInstrument: ${d.version}\n\n${BY_ID[d.id]?.text ?? ""}\n\nEvidence: ${d.source}\n\nProposed correction and reasoning:\n${d.reason}\n\nPlease review the existing evidence and document whether the placement is retained or revised.`;
      window.open(
        `https://github.com/Calculator5329/political-compass/issues/new?title=${encodeURIComponent(`Evidence review: ${d.slug} / ${d.id}`)}&body=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    if (action === "submitted-challenge") {
      state.drafts[Number(b.dataset.index)].status =
        "submitted (marked by you)";
      save();
      render();
    }
    if (action === "export-pilot")
      download("political-atlas-interpretation-pilot.json", {
        kind: "interpretation-pilot",
        version: INSTRUMENT_VERSION,
        questions: Object.fromEntries(
          BANK.filter((q) => state.pilot[q.id]).map((q) => [
            q.id,
            { text: q.text, interpretation: state.pilot[q.id] },
          ]),
        ),
        validationClaim: false,
      });
    if (action === "retry-evidence") await loadEvidence();
    if (action === "png") {
      const canvas = app.querySelector("canvas.compass");
      const out = document.createElement("canvas");
      out.width = canvas.width;
      out.height = canvas.height + 160;
      const ctx = out.getContext("2d");
      ctx.fillStyle = "#ede4d0";
      ctx.fillRect(0, 0, out.width, out.height);
      ctx.drawImage(canvas, 0, 0);
      ctx.fillStyle = "#2b2620";
      ctx.font = `${Math.max(14, out.width / 35)}px Georgia`;
      ctx.fillText(
        "Political Atlas · provisional profile",
        20,
        canvas.height + 40,
      );
      ctx.fillText(
        `${INSTRUMENT_VERSION} · ${new Date().toLocaleDateString()}`,
        20,
        canvas.height + 80,
      );
      ctx.fillText(
        "Selected dimensions only; not a validated classification.",
        20,
        canvas.height + 120,
      );
      out.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob),
          a = document.createElement("a");
        a.href = url;
        a.download = "political-atlas-map.png";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });
    }
    if (action === "sign-ledger") {
      const consent = app.querySelector("#ledger-consent").checked,
        name = app.querySelector("#ledger-name").value.trim(),
        p = profileScores(state.answers, BANK, AXES),
        point = profilePoint(p, "econ", "social");
      if (!consent || !name || !point)
        throw new Error(
          "Choose a public name and explicitly agree to publish these coordinates.",
        );
      b.disabled = true;
      const { saveScore } = await import("./firebase.js");
      await saveScore(name, point, INSTRUMENT_VERSION, {
        econ: { x: point.x },
        social: { x: point.y },
      });
      state.ledgerSaved = true;
      save();
      notice =
        "Your atlas entry is public. Your raw answers and private notes were not sent.";
      await loadLedger();
    }
  } catch (error) {
    notice = error.message || "That action could not be completed.";
    render();
  }
});
app.addEventListener("input", (event) => {
  const e = event.target;
  if (e.dataset.answerField) {
    const a = state.answers[e.dataset.id];
    if (a) {
      a[e.dataset.answerField] =
        e.dataset.answerField === "importance" ? Number(e.value) : e.value;
      save();
    }
  }
  if (e.dataset.pilot) {
    state.pilot[e.dataset.pilot] = e.value;
    save();
  }
  if (e.id === "notebook-note") {
    state.notebookNote = e.value;
    save();
  }
  if (e.id === "tradeoff-note") {
    state.tradeoffs.note = e.value;
    save();
  }
  if (e.dataset.tradeoff) {
    app.querySelector(`#${e.dataset.tradeoff}-value`).textContent =
      `${e.value} ${e.dataset.tradeoff === "cost" ? "dollars" : "months"} (not recorded yet)`;
  }
  if (e.dataset.draftField) {
    state.drafts[Number(e.dataset.index)][e.dataset.draftField] = e.value;
    save();
  }
  if (e.id === "evidence-filter") {
    const f = FIGURES.find((f) => f.slug === selectedFigure);
    app.querySelector("#evidence-list").innerHTML = evidenceRows(f, e.value);
  }
});
app.addEventListener("change", async (event) => {
  const e = event.target;
  try {
    if (e.id === "axis-x") {
      axisX = e.value;
      render();
    }
    if (e.id === "axis-y") {
      axisY = e.value;
      render();
    }
    if (e.id === "show-me") {
      showMe = e.checked;
      render();
    }
    if (e.id === "mode") {
      mode = e.value;
      render();
    }
    if (e.id === "figure") {
      selectedFigure = e.value;
      render();
    }
    if (e.id === "compare-figure") {
      compareFigure = e.value;
      render();
    }
    if (e.id === "weighted") {
      weighted = e.checked;
      render();
    }
    if (e.id === "pilot-mode") pilotMode = e.checked;
    if (e.id === "peer-file" && e.files[0]) {
      if (e.files[0].size > 500000)
        throw new Error("This profile is too large.");
      peer = parseProfile(await e.files[0].text());
      render();
    }
    if (e.id === "notebook-file" && e.files[0]) {
      if (e.files[0].size > 10000000)
        throw new Error("This notebook is too large.");
      const data = parseNotebook(await e.files[0].text());
      const existing = new Set(state.history.map((e) => e.date));
      state.history.push(...data.entries.filter((e) => !existing.has(e.date)));
      const draftKeys = new Set(state.drafts.map((d) => d.createdAt));
      state.drafts.push(
        ...data.drafts.filter((d) => !draftKeys.has(d.createdAt)),
      );
      state.pilot = { ...data.pilot, ...state.pilot };
      save();
      notice =
        "Backup entries, evidence drafts and pilot notes were restored. Your current answers were not replaced.";
      render();
    }
  } catch (error) {
    notice = error.message || "The file could not be read.";
    render();
  }
});
const requestedFigure = new URLSearchParams(location.search).get("figure");
if (FIGURES.some((f) => f.slug === requestedFigure)) {
  selectedFigure = requestedFigure;
  view = "figures";
}
render();
loadEvidence();
