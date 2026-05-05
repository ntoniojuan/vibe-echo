## Why

The evaluatee **Growth Analytics** competency heat map should read as a true **GAINS** visualization: lower tiers must not read as generic “error red,” and **mobile** cells are overcrowded when full sub-competency titles appear inside each tile. Separately, dashboard inbox cards repeat an **ACE pillars** explainer that adds noise without helping most users.

## What Changes

- **Heat map palette:** Update `readEvaluateeHeatMapPresentation` (and any paired legend UI) so **“Needs improvement”** and **“Severely underdelivers”** bands use **amber / orange** tones consistent with the GAINS semantics (no red for those categories). Align greens with existing “ahead / greatly exceeds” language where already correct.
- **Heat map mobile layout:** On small viewports, heat map tiles SHALL show **only** the sub-competency code (**A1**, **C2**, etc.) in **large, bold** type; **full competency names** SHALL NOT render inside the box on mobile (keep full name in `title` / accessible description where useful). Desktop/tablet MAY continue to show the full label or a richer layout per implementation.
- **Copy removal:** Remove the sentence *“ACE pillars — brighter when that section has written observations (not GAINS alone).”* from **dashboard inbox cards** (and anywhere else it was duplicated).

## Capabilities

### New Capabilities

- `echo-evaluatee-stats-heatmap`: GAINS-aligned heat map colors for all score bands; responsive cell labeling (codes-only on mobile).
- `echo-dashboard-inbox-ace-copy`: Omit redundant ACE pillar explainer line on inbox cards.

### Modified Capabilities

- _(None — no `openspec/specs/` baseline.)_

## Impact

- **project-echo:** `readEvaluateeHeatMapPresentation.ts`, `EvaluateeStatsHeatMapCard.tsx` (grid cells + legend), `EchoDashboardInboxCard.tsx`. Possible touch to teammate history if it shares heat presentation helpers (verify).
