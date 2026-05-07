## Context

Refinement today sends **plain raw notes** (after HTML strip if present) and **aceCategory** to MCQ generation, and **rawNotes + MCQs + answers** to apply. **GAINS ratings** for the four sub-competencies on the active step exist in wizard state and Firestore but are **not** inputs to Gemini—so structured “Refined Feedback” can under- or over-state performance vs the numeric scale.

## Goals / Non-Goals

**Goals:**

- Pass **all four GAINS values (1–5)** for the **current pillar** on every refinement MCQ and apply call.
- Extend **system** (and as needed **user**) prompts so the model **synthesizes** observations, MCQ answers, and GAINS, and **justifies** scores—**1–2** → specific growth areas tied to notes; **4–5** → specific strengths tied to notes.
- Keep **append contract** unchanged: raw notes preserved, `--- Refined Feedback ---` suffix.

**Non-Goals:**

- Changing MCQ count, JSON schema for structured refinement, or Firestore document layout.
- Sending **all twelve** GAINS on every call (only the **active** pillar’s four codes).
- Re-rating or validating GAINS via the model (evaluator remains source of truth).

## Decisions

1. **Payload shape** — Add `gainsRatingsForPillar: Record<string, number>` (or explicit four keys) validated as integers **1–5** for the pillar’s codes (`A1–A4`, `C1–C4`, or `E1–E4`). Reject missing keys or out-of-range values with **400** so the model never sees partial pillars.

2. **Where to assemble** — **Client** (`EchoAceRefinementSection`) reads `gainsRatings` from props (wizard already has them) and includes the slice for `aceCategory` in POST bodies. **Server** validates and forwards into `generateRefinementMCQs` / `applyRefinementFromMcqAnswers` user payloads (plain-text table or JSON alongside existing fields).

3. **MCQ generation** — Include GAINS in the **user** payload (and optionally a short **system** line) so questions still disambiguate notes but **respect** the scored profile (e.g. not assume contradiction with a unanimous “4–5” row without asking).

4. **Apply / structured JSON** — Append to **system** prompt (Evaluation Prompt v260430 stack): explicit bullet that **Refined Feedback MUST align with provided GAINS**; **low (1–2)** → concrete development priorities in notes; **high (4–5)** → concrete strengths in notes; **3** → balanced; never invent incidents.

5. **Plain text for model** — Keep **readPlainTextFromEchoObservationHtml** (or equivalent) for narrative notes in payloads; GAINS are numeric only.

**Alternatives considered:**

- **Only apply**, not MCQs — rejected: MCQs should also be score-aware for coherent flow.
- **Full 12 ratings** — rejected: noise and cross-pillar confusion; pillar-local is enough.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Evaluator changes a rating after starting MCQs | MCQs are ephemeral per request; apply uses **current** client state at click—document in UX if needed. |
| Prompt length / token use | Four integers + labels; negligible vs notes. |
| Stricter validation breaks old clients | Ship client + API together; routes return clear **400** on bad `gainsRatingsForPillar`. |

## Migration Plan

1. Deploy API schema + server prompts first or together with client.
2. No Firestore migration; optional backward-compat window only if mobile/other clients call routes without new field—**prefer required field** once wizard is sole caller.

## Open Questions

- Whether to include **GAINS letter labels** (G/A/I/N/S) in the prompt for readability—recommend yes in prompt construction for the model.
