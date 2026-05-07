## ADDED Requirements

### Requirement: Refinement requests include GAINS for the active pillar

For **both** refinement **MCQ generation** and **apply refinement** server operations, the trusted caller SHALL supply the evaluator’s **current GAINS ratings** for the **active ACE pillar only**: exactly **four** numeric values **1–5**, one per sub-competency code for that pillar (**A1–A4**, **C1–C4**, or **E1–E4** matching `aceCategory`). The server SHALL validate completeness and range; incomplete or invalid maps SHALL yield a **client error** and SHALL NOT invoke Gemini.

#### Scenario: Apply with valid pillar GAINS

- **WHEN** `applyRefinementFromMcqAnswers` (or equivalent) is invoked with valid `rawNotes`, MCQs, five answers, `draftId`, `aceCategory`, and a complete valid four-code GAINS map for that pillar
- **THEN** the GAINS map is passed through to the model layer together with notes and MCQ answer summary

#### Scenario: MCQ request missing a sub-competency score

- **WHEN** MCQ generation is called with `aceCategory` **aptitude** but the payload omits any of **A1–A4**
- **THEN** the server rejects the request without calling Gemini

### Requirement: Gemini prompts synthesize observations, MCQ answers, and GAINS

The **MCQ generation** and **apply refinement** model instructions SHALL require the model to treat **three** grounded inputs: (1) **raw observations** (unstructured notes), (2) **MCQ answers** (clarifications from the wizard), and (3) **GAINS scores** (1–5 per sub-competency on the pillar). The apply refinement system instruction SHALL explicitly require that **Refined Feedback** (structured output per existing JSON rules) **justifies and aligns** with the GAINS provided.

#### Scenario: Alignment instruction present on apply

- **WHEN** apply refinement invokes Gemini for structured JSON refinement
- **THEN** the system prompt includes language that Refined Feedback must align with the supplied GAINS scores

### Requirement: Score-tiered tone in Refined Feedback

The apply refinement system instruction SHALL state that when a sub-competency score is **low (1–2)**, narrative in the relevant sections SHALL emphasize Honest **areas for growth** grounded in the notes; when a score is **high (4–5)**, narrative SHALL **celebrate specific strengths** grounded in the notes. Mid scores (**3**) SHALL be treated in a balanced way without assuming only praise or only critique.

#### Scenario: Low score implies growth-oriented refinement

- **WHEN** GAINS include a **1** or **2** for a code and notes contain usable evidence
- **THEN** the model is instructed to surface constructive, behavior-based refinement consistent with that low score

#### Scenario: High score implies strength acknowledgment

- **WHEN** GAINS include a **4** or **5** for a code and notes contain usable evidence
- **THEN** the model is instructed to acknowledge specific strengths consistent with that high score

### Requirement: Preserve append semantics

The introduction of GAINS context SHALL **not** change persistence semantics: after a successful apply, the observation field SHALL remain **`trimmed raw notes from the request` + `\n\n--- Refined Feedback ---\n` + structured markdown body** (or equivalent agreed append format), preserving original evaluator text above the separator.

#### Scenario: Append format unchanged

- **WHEN** apply refinement succeeds with GAINS-aware prompts
- **THEN** Firestore and client-visible text still show raw notes first, then the `--- Refined Feedback ---` block with generated content
