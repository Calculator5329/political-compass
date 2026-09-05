import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  BANK,
  AXES,
  moduleQuestions,
  INSTRUMENT_VERSION,
  SCORING_VERSION,
} from "./instrument.js";
import { profileScores, comparePositions, profilePoint } from "./scoring.js";
import {
  initialState,
  figureAnswers,
  snapshot,
  exportProfile,
  parseProfile,
  parseNotebook,
  cancellationExample,
  historyChanges,
} from "./atlas-model.js";
import { ELECTIONS } from "./elections.js";
import { FIGURES } from "./figures.js";
const a = (value, importance = 1) => ({
  status: "position",
  value,
  importance,
  certainty: "tentative",
});
const q = ["one", "two", "three"].map((id) => ({ id, loads: { econ: 1 } }));
const axis = { econ: AXES.econ };
const responses = Object.fromEntries(
  moduleQuestions("core").map((q, i) => [q.id, a((i % 5) - 2)]),
);

describe("independent profiles", () => {
  it("keeps unknowns unknown and requires enough stated positions", () => {
    expect(profileScores({}, q, axis).econ.value).toBeNull();
    expect(
      profileScores(
        { one: a(2), two: { status: "unsure" }, three: { status: "mixed" } },
        q,
        axis,
      ).econ,
    ).toMatchObject({ value: null, answered: 1, total: 3 });
    expect(
      profileScores({ one: a(0), two: a(0), three: a(0) }, q, axis).econ.value,
    ).toBe(0);
  });
  it("normalizes only stated positions and reports incomplete coverage", () => {
    const bank = [...q, { id: "four", loads: { econ: 1 } }];
    expect(
      profileScores({ one: a(2), two: a(2), three: a(2) }, bank, axis).econ,
    ).toMatchObject({ value: 10, answered: 3, total: 4 });
    expect(profilePoint(profileScores({}, q, axis), "econ", "econ")).toBeNull();
  });
  it("does not conflate UBI with AI regulation or certainty with ideology", () => {
    const original = profileScores(responses, BANK, AXES);
    const changed = Object.fromEntries(
      Object.entries(responses).map(([id, r]) => [
        id,
        { ...r, certainty: "confident", importance: 3 },
      ]),
    );
    expect(profileScores(changed, BANK, AXES)).toEqual(original);
    expect(BANK.find((q) => q.id === "t03").loads).not.toHaveProperty(
      "governance",
    );
  });
  it("covers every question in exactly one selectable chapter", () => {
    const ids = [
      "core",
      "econ",
      "social",
      "system",
      "build",
      "foreign",
      "tech",
      "current",
    ].flatMap((id) => moduleQuestions(id).map((q) => q.id));
    expect(moduleQuestions("core")).toHaveLength(30);
    expect(ids.length).toBe(BANK.length);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of BANK) {
      for (const id of Object.keys(q.loads)) expect(AXES).toHaveProperty(id);
      if (q.module === "current") expect(q.loads).toEqual({});
    }
  });
});
describe("comparisons and migration", () => {
  it("keeps original uncertain responses uncertain and requests revised answers again", () => {
    const state = initialState({ answers: { e02: 0, e03: 2, e10: 2 } });
    expect(state.answers.e02.status).toBe("unsure");
    expect(state.answers.e03.value).toBe(2);
    expect(state.answers.e10r2).toBeUndefined();
  });
  it("excludes guessed evidence and never transfers a revised figure answer", () => {
    const evidence = {
      figures: {
        test: {
          items: {
            e02: {
              status: "documented",
              value: 2,
              sources: [{ url: "https://example.org/evidence" }],
            },
            e03: {
              status: "inferred",
              value: 2,
              sources: [{ url: "https://example.org/evidence" }],
            },
            e10: {
              status: "documented",
              value: 2,
              sources: [{ url: "https://example.org/evidence" }],
            },
          },
        },
      },
    };
    expect(Object.keys(figureAnswers({ slug: "test" }, evidence))).toEqual([
      "e02",
    ]);
  });
  it("changes optional match weighting without using uncertainty as neutral", () => {
    const bank = Array.from({ length: 6 }, (_, i) => ({ id: String(i) }));
    const left = Object.fromEntries(
      bank.map((q) => [q.id, a(2, q.id === "0" ? 3 : 1)]),
    );
    const right = Object.fromEntries(
      bank.map((q) => [q.id, a(q.id === "0" ? -2 : 2)]),
    );
    expect(comparePositions(left, right, bank, true).similarity).toBeLessThan(
      comparePositions(left, right, bank).similarity,
    );
    right["0"] = { status: "mixed" };
    expect(comparePositions(left, right, bank).similarity).toBeNull();
  });
  it("requires explicit export consent and excludes private reasons and notes", () => {
    const answers = {
      ...responses,
      e02: { ...a(2), note: "private note", reason: "private reason" },
    };
    expect(() => exportProfile(answers, false)).toThrow();
    const exported = exportProfile(answers, true);
    expect(exported.answers.e02.note).toBe("");
    expect(exported.answers.e02.reason).toBe("");
    expect(parseProfile(JSON.stringify(exported)).version).toBe(
      INSTRUMENT_VERSION,
    );
    expect(() =>
      parseProfile(JSON.stringify({ ...exported, scoringVersion: "other" })),
    ).toThrow(/another instrument/);
  });
  it("freezes notebook scores and compares only identical wording", () => {
    const before = snapshot(responses),
      after = snapshot({ ...responses, e02: a(2) });
    before.questionText.e02 = "Older wording";
    expect(
      historyChanges(before, after).rows.some((r) => r.q.id === "e02"),
    ).toBe(false);
    expect(before.scoringVersion).toBe(SCORING_VERSION);
  });
  it("rejects malformed imported scores before notebook state can be mutated", () => {
    const entry = snapshot(responses);
    const valid = {
      kind: "political-atlas-notebook",
      schema: 1,
      entries: [entry],
      drafts: [],
      pilot: { e02: "My interpretation" },
    };
    expect(parseNotebook(JSON.stringify(valid)).entries).toHaveLength(1);
    entry.scores.econ.value = "not a number";
    expect(() => parseNotebook(JSON.stringify(valid))).toThrow(
      /invalid scores/,
    );
  });
});
describe("election and evidence records", () => {
  it("keeps unscored candidates in named races and matches exact figure names", () => {
    expect(
      ELECTIONS.some((r) => r.candidates.some((c) => c.slug === null)),
    ).toBe(true);
    for (const r of ELECTIONS) {
      expect(r.sources.length).toBeGreaterThan(0);
      for (const c of r.candidates)
        if (c.slug)
          expect(FIGURES.find((f) => f.slug === c.slug)?.name).toBe(c.name);
    }
  });
  it("never gives unknown or inferred evidence a numeric value", () => {
    const e = JSON.parse(
      readFileSync(
        new URL("../public/figure-evidence.json", import.meta.url),
        "utf8",
      ),
    );
    for (const f of Object.values(e.figures))
      for (const r of Object.values(f.items)) {
        if (["unknown", "inferred"].includes(r.status))
          expect(r.value).toBeNull();
        if (r.status === "documented") {
          expect(r.sources.some((s) => /^https?:\/\//.test(s.url))).toBe(true);
          expect(Number.isInteger(r.value) && Math.abs(r.value) <= 2).toBe(
            true,
          );
        }
      }
  });
});

it("demonstrates cancellation with explicitly constructed profiles", () => {
  const d = cancellationExample();
  expect(d.leftPoint).toEqual(d.rightPoint);
  expect(d.leftPoint).toEqual({ x: 0, y: 0 });
  expect(d.similarity).toBe(0);
});
