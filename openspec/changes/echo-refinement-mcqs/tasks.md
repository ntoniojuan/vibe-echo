## 1. Setup and dependencies

- [x] 1.1 Add server-only env vars: `OPENAI_API_KEY`, optional `OPENAI_MODEL` (default `gpt-4o`), Firebase Admin credentials for Firestore writes
- [x] 1.2 Add `openai` and Firebase Admin (or existing project pattern) to the Node/Next server package; document in `.env.local.example` (no secrets committed)

## 2. Core library: MCQ generation

- [x] 2.1 Implement `generateRefinementMCQs({ rawNotes, aceCategory })` with input validation and ACE category normalization
- [x] 2.2 Implement OpenAI call with JSON-shaped response (`items` array of five `{ question, options }`); validate with Zod or equivalent; one repair retry on parse failure
- [x] 2.3 Add retry/backoff wrapper for transient OpenAI errors; log failures without secrets

## 3. Core library: Refinement + Firestore append

- [x] 3.1 Implement `applyRefinementFromMcqAnswers({ draftId, rawNotes, aceCategory, mcqs, answers })` building a strict prompt that includes Q&A pairs
- [x] 3.2 Implement OpenAI call to produce a single professional, actionable paragraph; validate non-empty output
- [x] 3.3 Map `aceCategory` to `aptitudeObservations` | `characterObservations` | `effectivenessObservations` on `echoEvaluationDrafts/{draftId}`
- [x] 3.4 Append via Firestore transaction (read-modify-write) with a clear delimiter (e.g. timestamped “Refined” block)

## 4. HTTP API surface (Next.js Route Handlers or Node server)

- [x] 4.1 `POST /api/echo/refinement/mcqs` — body: `rawNotes`, `aceCategory`; returns five MCQs JSON
- [x] 4.2 `POST /api/echo/refinement/apply` — body: `draftId`, `rawNotes`, `aceCategory`, `mcqs`, `answers`; returns success + `appendedParagraph` (or equivalent)
- [x] 4.3 Return consistent 4xx on validation errors; 5xx with logged details on upstream failures

## 5. Hardening (pre-production)

- [x] 5.1 Add authentication / internal API key check on both routes (per Open Questions in design)
- [x] 5.2 Add rate limiting or quota guard to limit OpenAI spend

## 6. Frontend integration (optional follow-on)

- [x] 6.1 Wire ECHO ACE step “Refine with AI” to call `/api/echo/refinement/mcqs`, render MCQs, submit answers to `/api/echo/refinement/apply`, then refresh or merge local state
