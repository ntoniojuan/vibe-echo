## Context

Project ECHO collects ACE observation text in Firestore (`echoEvaluationDrafts`). The Next.js frontend currently saves drafts client-side. Supervisors need help turning bullet notes into clear, evaluable prose. This design adds **server-side** Node.js endpoints (or a small service) using **OpenAI GPT-4o** to (1) generate five clarification MCQs from raw notes + ACE category, and (2) produce a refined paragraph from notes + answers, then **append** it to the correct Firestore field. Proposal: `proposal.md`. Capability name: `echo-ai-refinement`.

## Goals / Non-Goals

**Goals:**

- Expose a typed API that generates **exactly five** MCQs in strict JSON: `{ question: string, options: string[] }[]`.
- Expose a second API that accepts the **same raw notes**, **ACE category**, **MCQ list**, and **user’s selected answers** (per question), returns a **professional, actionable** evaluation paragraph, and **updates Firestore** by appending that text to the matching observation field on the specified draft document.
- Keep **OpenAI API keys** on the server only; validate inputs; use **retries** on transient failures; **log** errors without leaking secrets.

**Non-Goals:**

- Building the full MCQ UI in this design (assumed follow-up).
- Replacing or auto-deleting `rawNotes` (append-only refinement unless product changes).
- Training/fine-tuning a custom model.
- Airtable or other backends.

## Decisions

### 1) Where the logic runs

- **Choice**: Implement as **Next.js App Router Route Handlers** (e.g. `POST /api/echo/refinement/mcqs`, `POST /api/echo/refinement/apply`) *or* a dedicated Node service behind the same repo—all logic in one process for MedGrocer to start.
- **Rationale**: Single deploy unit, easy to share types with `project-echo`; secrets via server env only.
- **Alternative**: Firebase Cloud Functions Gen 2 + Callable HTTP—better if all writes must go through Firebase; adds deploy complexity.

### 2) OpenAI integration

- **Choice**: Official **`openai` Node SDK**, model **`gpt-4o`** (override via `OPENAI_MODEL`).
- **Rationale**: Stable chat/completions with **`response_format: { type: "json_object" }`** for MCQ generation; second call can use same pattern with a schema-focused system prompt.
- **Alternative**: Raw `fetch` to OpenAI—fewer deps, more boilerplate.

### 3) MCQ JSON contract

- **Choice**: Model returns a **single JSON object** wrapper, e.g. `{ "items": [ { "question": "...", "options": ["...", "..."] }, ... ] }` with **exactly five** items; each `options` array length **≥ 2** (prefer **4** options); options are **mutually exclusive** where applicable; questions MUST reference the **ACE category** lens (Aptitude / Character / Effectiveness).
- **Rationale**: Easier to validate than free-form text; `generateRefinementMCQs(rawNotes, aceCategory)` parses and returns `items`.
- **Alternative**: JSON Schema + `response_format` with strict schema where SDK supports it.

### 4) Mapping `aceCategory` to Firestore

- **Choice**: Accept enum **`aptitude` | `character` | `effectiveness`** (case-normalized). Map to fields:
  - `aptitude` → `aptitudeObservations`
  - `character` → `characterObservations`
  - `effectiveness` → `effectivenessObservations`
- **Append format**: `\n\n--- Refined (${ISO timestamp})\n${paragraph}\n` after existing field value (or first paragraph only if field empty).
- **Rationale**: Aligns with existing `project-echo` document shape.

### 5) Firestore access from the server

- **Choice**: **Firebase Admin SDK** with service account (e.g. `GOOGLE_APPLICATION_CREDENTIALS` or JSON in secret manager), `updateDoc` / `FieldValue.arrayUnion` **not** used—use `get` + string concat + `update` to append text, or transaction `runTransaction` to avoid lost updates.
- **Rationale**: Client rules often block arbitrary server writes; Admin bypasses rules intentionally—protect routes with **auth** (session, JWT, or internal API key) in a later hardening task.
- **Alternative**: Client-side append after server returns paragraph—**rejected** (user asked Firestore update server-side; keeps one trusted writer).

### 6) Function names (library surface)

- **`generateRefinementMCQs({ rawNotes, aceCategory })`**: validates inputs, calls OpenAI, validates five items, returns `RefinementMcqItem[]`.
- **`applyRefinementFromMcqAnswers({ draftId, rawNotes, aceCategory, mcqs, answers })`**: `answers` as array aligned by index with `mcqs` (selected option string or index); builds user prompt; calls OpenAI; appends result to Firestore; returns `{ appendedParagraph: string }`.

### 7) Prompting principles

- System prompts: healthcare-professional tone, no fabricated incidents—only clarify and sharpen what appears in `rawNotes`; if notes empty, return safe error or degenerate MCQs asking for more detail (product choice).
- MCQs: themes like consistency vs. one-off, scope, stakeholder impact, demonstrability, frequency—aligned to ACE category.

## Risks / Trade-offs

- **[Risk] OpenAI returns invalid JSON** → Mitigation: `response_format`, Zod (or similar) validation, single repair retry with “fix JSON only” prompt.
- **[Risk] Race on Firestore append** → Mitigation: **transaction** read-modify-write on the one string field.
- **[Risk] Unauthenticated API abuse / cost** → Mitigation: rate limit + auth (non-goal for MVP but MUST before production); monitor token usage.
- **[Risk] PII in prompts** → Mitigation: data handling policy, optional logging redaction, BAA/subprocessor alignment if required.

## Migration Plan

1. Add server env vars (`OPENAI_API_KEY`, Firebase Admin creds, optional model id).
2. Deploy routes; smoke-test with curl.
3. Wire frontend “Refine with AI” to new endpoints (separate tasks).
4. Rollback: disable routes; no schema change to existing documents.

## Open Questions

- Auth model for routes (session cookie vs. Firebase ID token)?
- Should refined text **replace** a segment vs. always **append**?
- Minimum length for `rawNotes` before calling OpenAI?
