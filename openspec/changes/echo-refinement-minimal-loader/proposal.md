## Why

The AI refinement flow currently relies on a **“Generating…”** button label with little visual feedback while the **Gemini-backed** MCQ endpoint runs. A **minimal, on-brand loader** (ECHO wordmark, ripple, status copy) reduces perceived latency and reinforces what the system is doing.

## What Changes

- Introduce a **centered minimalist loading UI** shown while refinement **MCQ generation** is in flight (`generating` phase before quiz appears).
- **Visuals**: Bold **ECHO** wordmark in **navy** sans-serif; **CSS ripple** using **two sage-green** rings that expand outward and **fade to transparent**; subtitle in **smaller muted** type: *Evaluation of Capabilities & Holistic Objectives.*
- **Status line**: Cycle **three** messages at the bottom while loading: (1) *Analyzing ACE sub-competencies…* (2) *Drafting professional GAINS feedback…* (3) *Finalizing holistic objectives…*
- **Motion**: **Framer Motion** wraps the loader so it **fades in** when loading becomes true and **fades out** when MCQs are ready (transition to `quiz` phase). Smooth opacity (and optional layout subtlety per design).
- **Dependency**: Add **`framer-motion`** to `project-echo` (not currently listed).

## Capabilities

### New Capabilities

- `echo-refinement-minimal-loader`: Branded refinement loading overlay/panel with ripple, cycling status text, and Framer Motion enter/exit tied to MCQ-generation busy state.

### Modified Capabilities

- _(none)_

## Impact

- **`EchoAceRefinementSection.tsx`**: Render loader when `phase === "generating"` (primary); wire `AnimatePresence` / `motion` to that condition.
- **`globals.css`** or co-located CSS: **ripple** keyframes (scoped class to avoid global bleed).
- **`package.json`**: `framer-motion` dependency; lockfile update.
