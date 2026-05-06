## Why

The team prefers **Google Gemini** as the LLM provider for ECHO AI refinement (policy, pricing, or Google Cloud alignment). Behavior of the feature—MCQs and refined paragraphs—should stay the same; only the backing API and configuration change.

## What Changes

- Replace **OpenAI** (`openai` SDK, `OPENAI_API_KEY`, `OPENAI_MODEL`) with **Google Gemini** (`@google/generative-ai`, server-side API key, configurable model id).
- MCQ and refinement prompts remain equivalent; responses remain strict **JSON** validated with the existing Zod schemas.
- **BREAKING (operations):** Environment variables and dependency manifest change; deploy/config docs must be updated. **BREAKING:** Any automation that assumed OpenAI must switch to Gemini credentials.

## Capabilities

### New Capabilities

- *(none)*

### Modified Capabilities

- `echo-ai-refinement`: The system SHALL use **Google Gemini** (not OpenAI) for `generateRefinementMCQs` and `applyRefinementFromMcqAnswers`, with server-only Gemini credentials and JSON-mode generation; retries apply to transient Gemini failures.

## Impact

- **project-echo**: Remove `openai` dependency; add `@google/generative-ai`; replace `src/lib/openai/*` with Gemini client utilities; update `.env.local.example` and route error logging wording.
- **Secrets:** `GOOGLE_GENERATIVE_AI_API_KEY` (or `GEMINI_API_KEY`—design picks one canonical name) and `GEMINI_MODEL`.
- **No change** to public HTTP contract (`/api/echo/refinement/mcqs`, `/api/echo/refinement/apply`) or Firestore document shape.
