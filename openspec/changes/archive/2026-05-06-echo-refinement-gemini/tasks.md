## 1. Dependencies and configuration

- [x] 1.1 Remove `openai` package; add `@google/generative-ai` to `project-echo`
- [x] 1.2 Replace `OPENAI_*` in `.env.local.example` with `GOOGLE_GENERATIVE_AI_API_KEY` and `GEMINI_MODEL` (document defaults)

## 2. Gemini client layer

- [x] 2.1 Add `readGeminiGenerativeModel.ts` (or equivalent) using API key from env and `GEMINI_MODEL`
- [x] 2.2 Implement `callGeminiJsonGeneration({ systemInstruction, userText })` using `responseMimeType: application/json`
- [x] 2.3 Implement `retryGeminiRequest` + `isRetryableGeminiError` mirroring prior OpenAI retry behavior
- [x] 2.4 Delete `src/lib/openai/*` and update all imports

## 3. Wire refinement logic

- [x] 3.1 Update `generateRefinementMCQs.ts` to call Gemini JSON helper (keep Zod + one repair retry)
- [x] 3.2 Update `applyRefinementFromMcqAnswers.ts` to call Gemini JSON helper
- [x] 3.3 Update API route error copy if it references OpenAI (optional but preferred)

## 4. Verify

- [x] 4.1 Run `npm run lint` and `npm run build` in `project-echo`
