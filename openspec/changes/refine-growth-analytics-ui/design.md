## Context

Growth Analytics renders `EvaluateeStatsHeatMapCard` with `heatMapGridSlotCount = 16` and `grid-cols-4 grid-rows-4`, padding missing slots—while `echoGainsSubcompetencyCatalog` defines exactly **twelve** sub-competencies (four per ACE pillar). `EvaluateeStatsTrendCard` already has a subtitle but the user wants copy aligned to “average ACE scores over the last four evaluation cycles” plus optional tooltip. Recharts radar (`PolarGrid`) and line (`CartesianGrid`) use `var(--color-chart-grid)`; `.dark` sets a low-contrast grid mix that can disappear on `#0b1120`-class canvases.

## Goals / Non-Goals

**Goals:**

- Heat map presents a **3×4** matrix with **no** placeholder row implying a fourth ACE category.
- Growth Trend chart exposes the clarified explanation **on-screen** (caption and/or tooltip).
- Midnight mode shows **clearly visible** chart grid and axis guide lines for radar and line charts via shared tokens.

**Non-Goals:**

- Changing GAINS catalog content, scoring math, or backend aggregation (`readGrowthAnalyticsFromEvaluationDrafts`).
- Redesigning chart palettes, animations, or responsive breakpoints beyond grid/contrast/copy.

## Decisions

1. **Heat map layout**  
   **Choice**: Use CSS `grid-cols-4 grid-rows-3`; render cells in **`echoGainsSubcompetencyCatalog` order** (A block, then C, then E) so rows align with ACE without row labels in DOM. Remove `paddingCellCount` / dashed placeholders entirely.  
   **Alternatives**: 4×3 vs 3×4 — user asked **3 categories × 4 sub-competencies** → **3 rows × 4 columns**.  
   **Rationale**: Matches mental model; eliminates fake fourth row.

2. **Growth Trend copy**  
   **Choice**: Set visible caption to: *“Growth trend: Your average ACE scores over the last four evaluation cycles.”* (sentence case per UI). Keep existing subtitle or merge to avoid duplication. Add Recharts `Tooltip` **labelFormatter** or wrapper **title** / **aria-describedby** so assistive tech and hover reinforce the same meaning.  
   **Alternatives**: Tooltip-only — rejected; caption satisfies “small caption or tooltip” without hiding explanation.

3. **Midnight grid contrast**  
   **Choice**: Adjust **only** `.dark` values for `--color-chart-grid` (and polar grid uses same token in radar) to a **lighter / higher-opacity** neutral stroke; optionally bump `CartesianGrid` opacity if token-only change insufficient.  
   **Alternatives**: Hard-coded `#hex` in TSX — rejected per token discipline.

## Risks / Trade-offs

- **[Risk]** Stronger grid lines add visual noise in light mode → **Mitigation**: Touch `.dark` block only unless light mode fails WCAG contrast checks on grids (unlikely).
- **[Risk]** Tooltip + subtitle duplicate text → **Mitigation**: Single subtitle line + terse tooltip title.

## Migration Plan

1. Ship heat map layout change (visual QA mobile/desktop).
2. Copy + tooltip for trend.
3. Token tweak + radar/line smoke in Midnight.

**Rollback**: Revert single PR or token commit independently.

## Open Questions

- None; cycle definition matches existing “last four completed evaluations” data pipeline.
