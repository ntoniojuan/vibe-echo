## 1. Schema and formatter

- [x] 1.1 Add **`refinedStructuredWrapperSchema`** (four strings) in `refinementMcqZod.ts`; remove or stop using **`refinedParagraphWrapperSchema`** for apply
- [x] 1.2 Add **`readEchoRefinementObservationMarkdownFromSections`** (single export) to render markdown + mandatory footer

## 2. Apply path

- [x] 2.1 Replace **`refinementSystemPrompt`** in `applyRefinementFromMcqAnswers.ts` with **Evaluation Prompt v260430**-aligned instructions and **four-field** JSON contract
- [x] 2.2 Parse/validate structured JSON; append formatted block to observation field (keep `--- Refined (ISO) ---` pattern)

## 3. MCQ path

- [x] 3.1 Update **`mcqSystemPrompt`** in `generateRefinementMCQs.ts` to reference the four downstream sections

## 4. Mock fallback

- [x] 4.1 Update **`buildDevelopmentMockRefinedParagraph`** (or successor) to emit the **same** markdown section layout

## 5. Verification

- [x] 5.1 `npm run lint` and `npm run build` in **project-echo**
