## Why

Refined feedback can drift from what the evaluator already signaled on the GAINS scale. Passing the **current pillar’s numeric ratings (1–5)** into the refinement pipeline grounds Gemini in the same evidence hierarchy as the wizard and produces structured output that **justifies** those scores—especially important when notes are brief or ambiguous.

## What Changes

- **Client/API payload**: Refinement **MCQ** and **apply** requests include **GAINS scores for the active ACE step only** (four sub-competency codes × values 1–5), alongside existing `rawNotes`, `aceCategory`, MCQs, and answers.
- **Gemini prompts**: System (and as needed user) instructions require synthesizing **raw observations**, **MCQ answers**, and **GAINS scores**, with explicit guidance: low scores (1–2) → constructive growth aligned to notes; high scores (4–5) → specific strengths from notes.
- **Persistence**: Unchanged—refined block still appends under `--- Refined Feedback ---` after preserved raw notes (`echo-refinement-observation-append` / `echo-refinement-append-refined-feedback`).

## Capabilities

### New Capabilities

- `echo-refinement-gains-context`: Refinement MCQ generation and apply operations receive the evaluator’s **current GAINS map for the active pillar**; model instructions require **alignment and justification** with those scores (growth emphasis for 1–2, strength celebration for 4–5 grounded in notes).

### Modified Capabilities

- _(none — behavior is fully specified under the new capability and existing append/structured specs remain valid.)_

## Impact

- **Code**: `EchoAceRefinementSection` (request bodies), `/api/echo/refinement/mcqs` and `/api/echo/refinement/apply` request schemas, `generateRefinementMCQs`, `applyRefinementFromMcqAnswers`, Zod schemas, Gemini system/user prompts; optionally `useEchoWizard` only if passing gains through props is centralized there.
- **Dependencies**: None beyond existing Gemini + Firestore refinement stack.
- **Systems**: Same refinement routes and draft document shape; no Firestore schema change required beyond optional request logging fields.
