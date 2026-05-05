## Context

Heat map styling lives in `readEvaluateeHeatMapPresentation` (numeric band → Tailwind-ish hex classes). `EvaluateeStatsHeatMapCard` renders the grid and a compact legend. The lowest band currently uses **#D32F2F** (red). Dashboard inbox uses a long ACE explainer above GAINS pills.

## Goals / Non-Goals

**Goals:**

- Replace **red** low band with a **deeper amber / orange** that is visually distinct from the **“Needs improvement”** orange (`#FF9800` / Material Orange 500) but still reads as “concern,” not “system error.”
- Keep **five-band** mapping (1–5 averages) stable; only **presentation** changes.
- **Mobile:** `@media` or Tailwind breakpoint (e.g. `md:`) so **below `md`** cells show **code + score** prominently; **full `label` hidden** in-cell (still on `title` for hover/focus or screen readers as needed).
- Remove inbox **ACE pillars** explainer sentence.

**Non-Goals:**

- Changing how `strengthScore` is computed in `readGrowthAnalyticsFromEvaluationDrafts`.
- Redesigning the full stats dashboard layout or radar/trend charts (unless a shared color token is extracted—optional).

## Decisions

1. **Severely underdelivers color**  
   - **Decision:** Use **Material Amber / deep orange** family, e.g. **`#F57C00`** (Orange 700) or **`#E65100`** (Orange 900) for backgrounds/borders with matching `accentClass`—**not** `#D32F2F`.  
   - **Rationale:** User explicitly requested amber/orange instead of red; stays in warm “attention” spectrum.

2. **Needs improvement**  
   - **Decision:** Retain **`#FF9800`** or nudge to documented GAINS adjacent token if design system defines one; must remain **distinguishable** from the lowest band.

3. **Legend completeness**  
   - **Decision:** Legend SHALL include **all five** GAINS bands users can see in cells (including **Severely underdelivers**) with colors matching `readEvaluateeHeatMapPresentation` to avoid mismatch.

4. **Mobile breakpoint**  
   - **Decision:** Use Tailwind **`max-md:`** / **`md:``** pattern: default (mobile-first) = code-primary layout; from **`md` up**, restore full label in cell.

## Risks / Trade-offs

- **[Risk]** WCAG contrast on pale orange fills → **Mitigation:** Keep border + numeric score contrast checked; adjust opacity tokens if needed.  
- **[Risk]** Users lose in-cell name on phone → **Mitigation:** `title` attribute + optional sr-only full name.

## Migration Plan

1. Ship UI changes; no data migration.  
2. **Rollback:** revert PR.

## Open Questions

- Whether Marketing/brand supplies an official **GAINS hex ladder** document (if so, replace decision hex values to match).
