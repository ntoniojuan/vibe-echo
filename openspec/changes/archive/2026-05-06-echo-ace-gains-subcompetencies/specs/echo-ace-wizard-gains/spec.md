## ADDED Requirements

### Requirement: Sub-competency list and copy

The wizard SHALL display exactly twelve sub-competencies across ACE steps with the following codes, titles, and short descriptions for evaluator context:

- **A1 — Internal Data-literacy:** Validating data, hypotheses, double-checking numbers.
- **A2 — External Comprehension:** Meeting prep, asking questions, synthesizing clearly.
- **A3 — Decision-making:** Prioritization, practical/innovative options, big-picture thinking.
- **A4 — Clarity:** Rapport building, concise reporting, concrete next steps.
- **C1 — Resilience:** Accepts challenges, manages stress.
- **C2 — Coachability:** Open to feedback, broadening skills.
- **C3 — Teamwork:** Keeps commitments, helps beyond role.
- **C4 — Coaching Ability:** Delegation, giving feedback to all levels.
- **E1 — Process-focus:** Standard procedures, checklists, flagging deviations.
- **E2 — Planning:** Calendar management, timely escalations, posting WIP.
- **E3 — Outcomes:** Tracking metrics, quality results, company growth.
- **E4 — Resourcefulness:** Efficiency, adapting to change, cost-saving.

#### Scenario: Aptitude step shows four competencies

- **WHEN** the user opens step 2 (Aptitude / Head)
- **THEN** the system shows A1 through A4 each with its title and description and an independent rating control

#### Scenario: Character step shows four competencies

- **WHEN** the user opens step 3 (Character / Heart)
- **THEN** the system shows C1 through C4 each with its title and description and an independent rating control

#### Scenario: Effectiveness step shows four competencies

- **WHEN** the user opens step 4 (Effectiveness / Hands)
- **THEN** the system shows E1 through E4 each with its title and description and an independent rating control

### Requirement: GAINS five-point radio scale per sub-competency

For each sub-competency, the system SHALL provide exactly one mutually exclusive selection among five levels, labeled in full for evaluators:

1. Severely underdelivers (S) — numeric value **1**
2. Needs improvement (N) — numeric value **2**
3. In line (I) — numeric value **3**
4. Ahead (A) — numeric value **4**
5. Greatly exceeds (G) — numeric value **5**

The control SHALL use radio buttons (or an equally accessible single-select pattern). Keyboard and screen-reader semantics SHALL expose the sub-competency as the group label.

#### Scenario: Selecting a level

- **WHEN** the evaluator selects “Ahead” for A2
- **THEN** the form state records A2 as numeric **4** and no other level remains selected for A2

#### Scenario: Independence between competencies

- **WHEN** the evaluator rates A1 as 5 and A2 as 2
- **THEN** both values coexist without affecting each other

### Requirement: Step validation and summary

The system MUST NOT advance from step 2, 3, or 4 to the next step until every sub-competency on that step has a selected GAINS value. The summary step SHALL display all twelve selected levels (labels or full text) with links or actions to edit the originating section.

Final submission MUST require all twelve GAINS values set in addition to any existing required general-information rules.

#### Scenario: Blocked next on incomplete Aptitude

- **WHEN** the user taps Next on step 2 and any of A1–A4 is unset
- **THEN** the system remains on step 2 and indicates which items need a rating

#### Scenario: Complete summary

- **WHEN** all steps are complete and the user views the summary
- **THEN** the system lists all twelve codes with their chosen GAINS level

### Requirement: Raw observation notes preserved

The system SHALL continue to capture the three free-text observation fields (Aptitude, Character, Effectiveness) on the same steps as the new ratings. AI refinement features, if present, SHALL remain bound to the corresponding raw note field for that pillar.

#### Scenario: Notes and ratings together

- **WHEN** the user enters Aptitude observations and sets A1–A4 ratings
- **THEN** both notes and ratings are present in client state for save
