## Context

ECHO refinement already generates MCQs and refined paragraphs server-side, then appends to Firestore. The prior implementation used OpenAI GPT-4o. This change standardizes on **Google Gemini** via the official **`@google/generative-ai`** Node SDK.

## Goals / Non-Goals

**Goals:**

- Same functional outputs: five MCQ items, one refinement paragraph, transactional Firestore append.
- **JSON-only** model outputs (`responseMimeType: application/json`) where supported; parse + Zod validate as today; one repair retry for MCQs if parse fails.
- **Server-only** API key; retries on transient Gemini errors (e.g., 429 / unavailable patterns).

**Non-Goals:**

- Changing HTTP routes, request bodies, or Firestore schema.
- Dual-provider abstraction (OpenAI + Gemini) unless later requested.

## Decisions

### 1) SDK and model default

- **Choice:** `@google/generative-ai`, default model **`gemini-2.0-flash`** (override via **`GEMINI_MODEL`**).
- **Rationale:** Flash tier fits low-latency JSON generation; widely available on Generative Language API.
- **Alternative:** `gemini-1.5-pro` for heavier reasoning—configurable via env.

### 2) Environment variable name

- **Choice:** **`GOOGLE_GENERATIVE_AI_API_KEY`** (matches Google’s docs naming); optional alias support out of scope.
- **Rationale:** Single canonical secret name in `.env.local.example`.

### 3) Prompt assembly

- **Choice:** `getGenerativeModel({ model, systemInstruction, generationConfig: { responseMimeType: 'application/json' } })`, then `generateContent(userText)` for each call.
- **Rationale:** Clean separation of system vs. user content; matches current two-message OpenAI pattern.

### 4) Retry policy

- **Choice:** Reuse pattern from OpenAI migration: up to **3** attempts, backoff **600ms** base, retry when `isRetryableGeminiError` (HTTP 429/503/500 where exposed, plus message heuristics for “Resource exhausted” / “UNAVAILABLE”).

### 5) Removal of OpenAI

- **Choice:** Remove `openai` package and `src/lib/openai/`; add `src/lib/gemini/` with `callGeminiJsonGeneration`, `readGeminiClient`, `readGeminiModelId`, `retryGeminiRequest`, `isRetryableGeminiError`.

## Risks / Trade-offs

- **[Risk] Different failure shapes** from Google SDK → Mitigation: conservative retry helper + structured logging without secrets.
- **[Risk] Model output drift** → Mitigation: keep Zod + repair retry for MCQs; minimum length checks on paragraph.

## Migration Plan

1. Add Gemini env vars; deploy key in secret store.
2. Ship code swap; remove OpenAI key from env.
3. Smoke-test both route handlers.

## Open Questions

- Whether production uses **Vertex AI** instead of AI Studio key (different SDK path)—out of scope unless requested.
