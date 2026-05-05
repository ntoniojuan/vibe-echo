## Why

Supervisors often enter rough, unstructured notes in the ECHO ACE observation fields. Without clarification, those notes stay vague and hard to use in formal evaluations. Guided multiple-choice questions can surface missing context (consistency, scope, impact) before the notes are polished into a single actionable paragraph and stored with the evaluation draft.

## What Changes

- Add a backend capability (Node.js) that calls **OpenAI GPT-4o** to generate **five** multiple-choice questions from `rawNotes` and an **ACE category** (Aptitude / Character / Effectiveness).
- MCQs target clarification of supervisor feedback (e.g., one-off vs. pattern, impact, frequency).
- Returned shape: JSON array of items `{ question: string, options: string[] }` (five items).
- Add a second step: after the user submits answers to those MCQs, call the model again to **rewrite** `rawNotes` into a **professional, actionable evaluation paragraph**, conditioned on the Q&A pairs, then **append** the result to the relevant observation field in the existing **Firestore** `echoEvaluationDrafts` document (server-side or trusted path—API key must not ship to the browser).
- **BREAKING**: None at spec level until wired into the frontend; new API surface is additive.

## Capabilities

### New Capabilities

- `echo-ai-refinement`: Server-side OpenAI-powered MCQ generation from raw ACE notes and refinement paragraph generation from MCQ answers, with persistence to Firestore drafts.

### Modified Capabilities

- *(none — no prior specs in `openspec/specs/`)*

## Impact

- **New** Node.js module or Next.js Route Handlers / separate service: OpenAI SDK or `fetch` to Responses/Chat Completions, structured JSON parsing/validation, retries and error logging.
- **Secrets**: `OPENAI_API_KEY` (server only); optional `OPENAI_MODEL` defaulting to `gpt-4o`.
- **Firestore**: Reuse collection `echoEvaluationDrafts`; update fields `aptitudeObservations`, `characterObservations`, or `effectivenessObservations` depending on `aceCategory`, appending refined text (format TBD in design—e.g. newline + labeled block).
- **Frontend** (future task): Buttons to request MCQs, answer UI, submit answers—out of scope for proposal except as consumer of API.
- **Dependencies**: `openai` package or raw HTTP; Firebase Admin or existing Firestore rules must allow **server** writes (typical pattern: Cloud Function / API route with Admin SDK).
