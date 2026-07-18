# Figure-scoring method (research agents: read fully before scoring)

Every public figure is scored by answering the same 36-item instrument in
`src/questions.js` as that figure would, based on **documented positions only**
— votes, executive actions, platform documents, direct quotes from interviews,
speeches, podcasts, and social posts. Scores then flow through `src/scoring.js`
like any respondent. Never invent an (x,y) directly.

## Answer scale (Likert, integers)

| value | meaning |
|---|---|
| +2 | Strongly agrees — repeated, emphatic, or acted on it (vote/EO/policy) |
| +1 | Agrees — stated support, but hedged, occasional, or rhetorical only |
| 0 | Genuinely mixed, contradictory, or **no findable evidence** |
| −1 | Disagrees — stated opposition, hedged or occasional |
| −2 | Strongly disagrees — repeated, emphatic, or acted against it |

Rules:
- Score the **statement as written**, not the vibe of the figure. Read each
  question's exact wording; many are reverse-coded.
- Weight **recency**: 2024–2026 positions dominate; earlier career only fills
  gaps (note flips, e.g. "was X until 2023, now Y — scored on current").
- Actions beat words. A signed order/vote outweighs a contradicting soundbite.
- 0 is a real answer, not a dodge — but use it only after searching. An agent
  that returns many 0s for a heavily documented figure has under-researched.
- For non-US figures (Putin, Xi), answer US-framed questions by the closest
  analogue in their own governance record, and say so in the justification.

## Evidence dossier — one file per figure: `docs/figures/<slug>.md`

Format:

```markdown
# <Name> — evidence dossier
Updated: 2026-07-18 · Researcher: <agent label>

<2–4 sentence summary of the figure's 2026 political position and what
drives their placement on both axes.>

## Per-question evidence
### e01 · score +2
"<direct quote, ≤25 words>" — <venue, date> (<url>)
<1–2 sentence justification tying quote/action to the score.>

### e02 · score −1
...every one of the 36 ids (e01–e12, s01–s12, y01–y12), in order...

## Key sources
- <title> — <url>   (4–8 primary/most-load-bearing)

## Changes from previous scoring   (verification agents only)
- e05: +1 → −1 — <why the old score was wrong>
```

Evidence rules:
- Prefer primary sources: C-SPAN, congress.gov votes, official transcripts
  (rev.com, whitehouse.gov), the figure's own posts/shows. News analysis is a
  fallback, not a substitute.
- Quotes stay **short (≤25 words) and attributed with URL** — we cite
  transcripts, we do not mirror them.
- Every non-zero score needs at least one concrete cite. A 0 needs a sentence
  on why the record is genuinely mixed or silent.

## Return format (agent final message)

Return ONLY a JSON array, one object per figure:

```json
[{
  "name": "…", "slug": "…",
  "answers": { "e01": 2, … all 36 ids … },
  "note": "<1–2 sentence placement rationale, like existing figures.js notes>",
  "sources": [{ "title": "…", "url": "…" }, … 4–6 best …],
  "changes": [{ "id": "e05", "old": 1, "new": -1, "why": "…" }]
}]
```

`changes` is present only for verification agents ([] if the old scoring held
up). New-figure agents omit it.
