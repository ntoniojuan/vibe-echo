## ADDED Requirements

### Requirement: Refinement MCQ loading presentation

While the client is waiting for **MCQ generation** from the AI refinement service (the UI state that corresponds to an in-flight **Gemini** MCQ request), the refinement section SHALL display a **minimal centered loader** with:

- The text **ECHO** in a **bold** sans-serif treatment and **navy-oriented** primary color appropriate to the active theme.
- A **CSS-based ripple** consisting of **two** **sage-colored** rings that **radiate outward** from the wordmark and **fade to fully transparent**.
- Below the acronym, the line **Evaluation of Capabilities & Holistic Objectives.** in a **smaller**, **muted** style.

#### Scenario: User starts refine and waits for questions

- **WHEN** the user triggers refinement and the system enters the MCQ-generation loading state
- **THEN** the loader SHALL appear with ECHO, subtitle, and animated sage ripples

### Requirement: Cycling status messages

During the same MCQ-generation loading state, the interface SHALL **cycle**, in order and repeating as needed, through these **three** status messages:

1. **Analyzing ACE sub-competencies…**
2. **Drafting professional GAINS feedback…**
3. **Finalizing holistic objectives…**

#### Scenario: Messages advance while loading

- **WHEN** loading continues beyond the first message interval
- **THEN** the visible status text SHALL advance to the next message in the sequence

### Requirement: Framer Motion enter and exit

The loading UI SHALL be wrapped with **Framer Motion** such that when the MCQ-generation loading flag becomes **true**, the loader **fades in**, and when MCQs are **ready** (loading ends successfully and the quiz UI is shown), the loader **fades out** smoothly.

#### Scenario: Transition when MCQs arrive

- **WHEN** MCQ data becomes available and the UI transitions from loading to the quiz
- **THEN** the loader SHALL animate out (opacity fade) rather than disappear instantly
