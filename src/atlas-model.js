import {
  BANK,
  BY_ID,
  AXES,
  INSTRUMENT_VERSION,
  SCORING_VERSION,
} from "./instrument.js";
import {
  positionValue,
  profileScores,
  profilePoint,
  comparePositions,
  pointDistance,
} from "./scoring.js";
export const STORAGE_KEY = "political-atlas-v2";
const statuses = new Set(["position", "mixed", "unsure", "skip"]);
const certainties = new Set(["tentative", "fairly", "confident"]);
export function cleanAnswers(input) {
  const result = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return result;
  for (const q of BANK) {
    const a = input[q.id];
    if (!a || !statuses.has(a.status)) continue;
    if (a.status === "position" && positionValue(a) === null) continue;
    result[q.id] = {
      status: a.status,
      value: a.status === "position" ? a.value : null,
      certainty: certainties.has(a.certainty) ? a.certainty : "tentative",
      importance: [0, 1, 2, 3].includes(a.importance) ? a.importance : 1,
      reason: typeof a.reason === "string" ? a.reason.slice(0, 180) : "",
      note: typeof a.note === "string" ? a.note.slice(0, 2000) : "",
    };
  }
  return result;
}
export function initialState(legacy = null) {
  const answers = {};
  for (const q of BANK) {
    if (q.revised || !q.legacyId) continue;
    const v = legacy?.answers?.[q.legacyId];
    if (!Number.isInteger(v) || Math.abs(v) > 2) continue;
    answers[q.id] = {
      status: v === 0 ? "unsure" : "position",
      value: v === 0 ? null : v,
      certainty: "tentative",
      importance: 1,
      reason: "",
      note: "",
    };
  }
  return {
    version: INSTRUMENT_VERSION,
    answers,
    history: [],
    drafts: [],
    tradeoffs: {},
    pilot: {},
    module: "core",
    index: 0,
    migrated: !!legacy,
  };
}
export function loadState(storage) {
  try {
    const old = JSON.parse(storage.getItem(STORAGE_KEY));
    if (old && typeof old === "object")
      return {
        ...initialState(),
        ...old,
        answers: cleanAnswers(old.answers),
        history: Array.isArray(old.history) ? old.history : [],
        drafts: Array.isArray(old.drafts) ? old.drafts : [],
        pilot: old.pilot ?? {},
        tradeoffs: old.tradeoffs ?? {},
      };
    return initialState(JSON.parse(storage.getItem("political-compass-v1")));
  } catch {
    return initialState();
  }
}
export function snapshot(answers, note = "", extras = {}) {
  return {
    kind: "political-atlas-profile",
    schema: 1,
    version: INSTRUMENT_VERSION,
    scoringVersion: SCORING_VERSION,
    date: new Date().toISOString(),
    answers: cleanAnswers(answers),
    scores: profileScores(answers, BANK, AXES),
    questionText: Object.fromEntries(
      BANK.filter((q) => q.id in answers).map((q) => [q.id, q.text]),
    ),
    note: note.slice(0, 2000),
    ...extras,
  };
}
export function exportProfile(answers, consent) {
  if (!consent)
    throw new Error("Choose to include your answers before exporting.");
  const safe = cleanAnswers(answers);
  for (const a of Object.values(safe)) {
    a.note = "";
    a.reason = "";
  }
  return snapshot(safe, "", {
    purpose: "Voluntary comparison; excludes notebook notes and reasons.",
  });
}
export function parseProfile(text) {
  if (text.length > 500000)
    throw new Error("This file is too large for a profile.");
  const input = JSON.parse(text);
  if (input?.kind !== "political-atlas-profile" || input.schema !== 1)
    throw new Error("Choose a Political Atlas profile export.");
  if (
    input.version !== INSTRUMENT_VERSION ||
    input.scoringVersion !== SCORING_VERSION
  )
    throw new Error(
      "This profile uses another instrument version. Keep it in the notebook; use the same version for a shared comparison.",
    );
  const answers = cleanAnswers(input.answers);
  if (
    Object.values(answers).filter((a) => positionValue(a) !== null).length < 6
  )
    throw new Error(
      "At least six stated positions are needed for a comparison.",
    );
  return { ...input, answers };
}
export function figureAnswers(figure, evidence) {
  const items = evidence?.figures?.[figure.slug]?.items ?? {};
  const answers = {};
  for (const q of BANK) {
    // Reworded items are new questions. Do not silently transfer the old score.
    const row =
      items[q.id] ?? (!q.revised && q.legacyId ? items[q.legacyId] : null);
    if (
      !row ||
      row.status !== "documented" ||
      !Number.isInteger(row.value) ||
      Math.abs(row.value) > 2
    )
      continue;
    if (!row.sources?.some((s) => /^https?:\/\//.test(s.url))) continue;
    answers[q.id] = {
      status: "position",
      value: row.value,
      certainty: "tentative",
      importance: 1,
    };
  }
  return answers;
}
export function rankedFigures(answers, figures, evidence, weighted = false) {
  return figures
    .map((figure) => ({
      figure,
      ...comparePositions(
        answers,
        figureAnswers(figure, evidence),
        BANK,
        weighted,
      ),
    }))
    .filter((r) => r.similarity !== null)
    .sort((a, b) => b.similarity - a.similarity || b.shared - a.shared);
}
export function sameMapExample(figures, evidence) {
  const placed = figures
    .map((f) => {
      const answers = figureAnswers(f, evidence);
      return {
        figure: f,
        answers,
        point: profilePoint(
          profileScores(answers, BANK, AXES),
          "econ",
          "social",
        ),
      };
    })
    .filter((f) => f.point);
  let best = null;
  for (let i = 0; i < placed.length; i++)
    for (let j = i + 1; j < placed.length; j++) {
      const a = placed[i],
        b = placed[j],
        distance = pointDistance(a.point, b.point);
      if (distance > 3) continue;
      const comparison = comparePositions(a.answers, b.answers, BANK);
      if (
        comparison.similarity === null ||
        !comparison.rows.some((r) => r.gap >= 3)
      )
        continue;
      if (!best || comparison.similarity < best.similarity)
        best = { a, b, distance, ...comparison };
    }
  return best;
}
export function historyChanges(before, after) {
  const sameVersion =
    before.version === after.version &&
    before.scoringVersion === after.scoringVersion;
  const rows = BANK.flatMap((q) => {
    const a = before.answers?.[q.id],
      b = after.answers?.[q.id];
    if (!a || !b || before.questionText?.[q.id] !== after.questionText?.[q.id])
      return [];
    return a.status !== b.status || a.value !== b.value
      ? [{ q, before: a, after: b }]
      : [];
  });
  return { sameVersion, rows };
}
export function evidenceFor(figure, id, evidence) {
  const q = BY_ID[id],
    items = evidence?.figures?.[figure.slug]?.items ?? {};
  if (items[id]) return items[id];
  if (q?.revised)
    return {
      status: "unknown",
      value: null,
      rationale:
        "This wording changed in the atlas. Earlier evidence has not been scored against this exact statement.",
      sources: [],
    };
  return (
    items[q?.legacyId ?? id] ?? {
      status: "unknown",
      value: null,
      rationale:
        "No item-specific documented position has been added. This is excluded from scoring.",
      sources: [],
    }
  );
}
export function disagreementGuide(a, b) {
  const result = comparePositions(a, b, BANK);
  return {
    ...result,
    sharedPriorities: result.rows.filter(
      (r) =>
        (a[r.q.id].importance ?? 1) >= 2 && (b[r.q.id].importance ?? 1) >= 2,
    ),
    agreements: result.rows.filter((r) => r.gap <= 1),
    disagreements: result.rows.filter((r) => r.gap >= 2),
  };
}

// Backups are untrusted files. Validate all entries before mutating the notebook.
export function parseNotebook(text) {
  if (text.length > 10000000) throw new Error("This notebook is too large.");
  const data = JSON.parse(text);
  if (
    data?.kind !== "political-atlas-notebook" ||
    data.schema !== 1 ||
    !Array.isArray(data.entries) ||
    data.entries.length > 1000
  )
    throw new Error("Choose a Political Atlas notebook backup.");
  const incoming = [...data.entries, ...(data.current ? [data.current] : [])];
  const entries = incoming.map((entry) => {
    if (
      entry?.kind !== "political-atlas-profile" ||
      typeof entry.date !== "string" ||
      !Number.isFinite(Date.parse(entry.date)) ||
      typeof entry.version !== "string" ||
      typeof entry.scoringVersion !== "string" ||
      !entry.answers ||
      !entry.scores
    )
      throw new Error("This backup has an invalid entry.");
    const scores = {};
    for (const [id, score] of Object.entries(entry.scores)) {
      if (!AXES[id]) continue;
      if (
        !score ||
        (score.value !== null &&
          (!Number.isFinite(score.value) || Math.abs(score.value) > 10)) ||
        !Number.isInteger(score.answered) ||
        !Number.isInteger(score.total) ||
        score.answered < 0 ||
        score.total < score.answered
      )
        throw new Error("This backup contains invalid scores.");
      scores[id] = {
        value: score.value,
        answered: score.answered,
        total: score.total,
        provisional: true,
      };
    }
    const questionText = Object.fromEntries(
      Object.entries(entry.questionText ?? {})
        .filter(([id, text]) => BY_ID[id] && typeof text === "string")
        .map(([id, text]) => [id, text.slice(0, 1500)]),
    );
    const tradeoffs = {};
    for (const key of ["cost", "delay"])
      if (
        entry.tradeoffs?.[key] === "depends" ||
        Number.isFinite(entry.tradeoffs?.[key])
      )
        tradeoffs[key] = entry.tradeoffs[key];
    if (typeof entry.tradeoffs?.note === "string")
      tradeoffs.note = entry.tradeoffs.note.slice(0, 2000);
    return {
      kind: entry.kind,
      schema: 1,
      date: entry.date,
      version: entry.version.slice(0, 100),
      scoringVersion: entry.scoringVersion.slice(0, 100),
      answers: cleanAnswers(entry.answers),
      scores,
      questionText,
      note: typeof entry.note === "string" ? entry.note.slice(0, 2000) : "",
      archived: entry.archived === true,
      tradeoffs,
    };
  });
  const drafts = (Array.isArray(data.drafts) ? data.drafts : [])
    .slice(0, 1000)
    .filter((d) => d && BY_ID[d.id] && typeof d.slug === "string")
    .map((d) => ({
      slug: d.slug.slice(0, 80),
      id: d.id,
      source: typeof d.source === "string" ? d.source.slice(0, 2000) : "",
      reason: typeof d.reason === "string" ? d.reason.slice(0, 2000) : "",
      createdAt:
        typeof d.createdAt === "string"
          ? d.createdAt
          : new Date().toISOString(),
      status: "restored draft",
      version: typeof d.version === "string" ? d.version : INSTRUMENT_VERSION,
    }));
  const pilot = Object.fromEntries(
    Object.entries(data.pilot ?? {})
      .filter(([id, text]) => BY_ID[id] && typeof text === "string")
      .map(([id, text]) => [id, text.slice(0, 2000)]),
  );
  return { entries, drafts, pilot };
}

// Deliberately constructed examples, not real respondents or population data.
export function cancellationExample() {
  const values = {
    e02: 2,
    e03: -2,
    e04: 2,
    e07r2: 2,
    s01: 2,
    s02: 2,
    s06r2: 2,
    s08: 2,
  };
  const make = (sign) =>
    Object.fromEntries(
      Object.entries(values).map(([id, v]) => [
        id,
        { status: "position", value: sign * v, importance: 1 },
      ]),
    );
  const left = make(1),
    right = make(-1);
  return {
    left,
    right,
    leftPoint: profilePoint(profileScores(left, BANK, AXES), "econ", "social"),
    rightPoint: profilePoint(
      profileScores(right, BANK, AXES),
      "econ",
      "social",
    ),
    ...comparePositions(left, right, BANK),
  };
}
