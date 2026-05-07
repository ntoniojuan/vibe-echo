## 1. API and validation

- [x] 1.1 Add `gainsRatingsForPillar` (four codes × integer 1–5 for **A1–A4**, **C1–C4**, or **E1–E4** matching `aceCategory`) to refinement MCQ and apply request Zod schemas; return **400** when incomplete or out of range
- [x] 1.2 Thread validated GAINS from `/api/echo/refinement/mcqs` and `/api/echo/refinement/apply` (or equivalent) into `generateRefinementMCQs` and `applyRefinementFromMcqAnswers`

## 2. Prompts and model inputs

- [x] 2.1 Extend **MCQ generation** user (and system if present) prompt/payload to include a readable GAINS summary for the pillar alongside plain-text notes and `aceCategory`
- [x] 2.2 Extend **apply refinement** system instruction so the model synthesizes raw observations, MCQ answers, and GAINS; add explicit alignment rule (low **1–2** → growth grounded in notes; high **4–5** → strengths grounded in notes; **3** balanced; no fabrications)

## 3. Client (Echo wizard)

- [x] 3.1 In `EchoAceRefinementSection` (or single fetch site), build the four-code GAINS map from wizard `gainsRatings` for the active `aceCategory` and include it in both refinement POST bodies
- [x] 3.2 Handle **400** from missing/invalid GAINS (surface existing error UX pattern)

## 4. Verification

- [x] 4.1 Manually test: aptitude step — submit refinement with mixed GAINS; confirm MCQs and final text align tone with low vs high scores while raw notes stay above `--- Refined Feedback ---`
- [x] 4.2 Confirm `readRefinementApiErrorPayload` (or equivalent) still maps server errors for new validation messages
