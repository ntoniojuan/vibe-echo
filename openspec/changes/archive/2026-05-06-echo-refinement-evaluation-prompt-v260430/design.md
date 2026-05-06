## Context

**Evaluation Prompt v260430** defines **HR Performance Evaluation Assistant** behavior: ACE domains, markdown template sections (**Observations**, **Evaluatee to start working on or continue**, **Timing or Trigger**, **Support**), anonymization, observation-only grounding, and footer **IMPORTANT: Please check...**. **project-echo** refinement today returns one paragraph JSON.

## Goals / Non-Goals

**Goals:**

- **Apply** path produces **four** sections + system-appended **footer**; headings in markdown: **Observations**, **Areas to improve** (semantic match to PDF “Evaluatee to start working on or continue”), **Timing or trigger**, **Support**.
- Prompt text aligns with **v260430** **Role**, **Tone**, **ACE**, **Processing rules** (1–3 bullets per section when evidence exists).
- **MCQ** prompt notes that clarifications support filling those four dimensions where notes are vague.
- **Mock / 429 fallback** uses the same layout.

**Non-Goals:**

- Changing **MCQ count** (still 5) or **API** request/response wrappers beyond the refined payload shape.
- Splitting Firestore into four fields (still **one** observation string per ACE pillar with markdown inside).

## Decisions

1. **JSON keys** — `observations`, `areasToImprove`, `timingOrTrigger`, `support` (camelCase) for model reliability; render to titled markdown for humans.
2. **Validation** — Sum of trimmed lengths ≥ prior minimum (~20) or raise; no required non-empty per field if honest “no detail” sentence allowed.
3. **Formatter** — Single exported builder `readEchoRefinementObservationMarkdownFromSections` in its own file (one export per file).

## Risks / Trade-offs

- **[Risk]** Longer Firestore strings — Mitigation: same append model; users edit.
- **[Risk]** Model omits JSON key — Mitigation: Zod + repair path already exists pattern; apply can add second attempt with stricter reminder if needed later.
