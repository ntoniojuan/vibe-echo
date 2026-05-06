## ADDED Requirements

### Requirement: Structured refinement sections

When **apply refinement** runs after MCQs, the model **SHALL** return **JSON** with **four** string fields: **observations**, **areasToImprove**, **timingOrTrigger**, and **support**. The server **SHALL** validate with **Zod** and **SHALL NOT** persist a single unstructured paragraph as the only refined content.

#### Scenario: Successful apply

- **WHEN** a valid apply request is processed and Gemini (or mock) returns valid JSON
- **THEN** the Firestore observation field receives an appended block containing markdown sections **Observations**, **Areas to improve**, **Timing or trigger**, and **Support**, followed by the mandatory line **IMPORTANT: Please check the evaluations generated and edit as applicable.**

### Requirement: Prompt alignment with Evaluation Prompt v260430

The **refinement system instruction** **SHALL** incorporate **v260430** rules: HR evaluation assistant role, ACE single-domain scope from payload, **Evaluatee** anonymization and neutral pronouns, observation-only grounding, constructive sharpening when praise-only, 1–3 bullets per section when evidence supports, and honesty when a section lacks support.

#### Scenario: Model receives notes and MCQ answers

- **WHEN** `applyRefinementFromMcqAnswers` invokes Gemini
- **THEN** the system instruction references those rules and demands the **four-field** JSON shape (no legacy `paragraph` only contract)

### Requirement: MCQ generation supports section richness

The **MCQ system instruction** **SHALL** state that questions help clarify details needed to populate **Observations**, **Areas to improve**, **Timing or trigger**, and **Support** for the given ACE category.

#### Scenario: MCQ generation

- **WHEN** `/api/echo/refinement/mcqs` runs
- **THEN** the model prompt mentions alignment with the four post-refinement sections
