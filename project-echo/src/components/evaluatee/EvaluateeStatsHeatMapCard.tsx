"use client";

import { readEvaluateeHeatMapPresentation } from "@/lib/evaluatee/readEvaluateeHeatMapPresentation";

type HeatCell = {
  code: string;
  label: string;
  strengthScore: number;
};

type EvaluateeStatsHeatMapCardProps = {
  competencyHeatMapCells: ReadonlyArray<HeatCell>;
};

const heatMapGridSlotCount = 16;

/** Swatches match `readEvaluateeHeatMapPresentation` bands (low → high). */
const heatMapLegendItems = [
  { label: "Severely underdelivers", swatchClass: "bg-[color:var(--echo-heatmap-severe-swatch)]" },
  { label: "Needs improvement", swatchClass: "bg-[color:var(--echo-heatmap-needs-swatch)]" },
  { label: "In line", swatchClass: "bg-[color:var(--echo-heatmap-inline-swatch)]" },
  { label: "Ahead", swatchClass: "bg-[color:var(--echo-heatmap-ahead-swatch)]" },
  { label: "Greatly exceeds", swatchClass: "bg-[color:var(--echo-heatmap-great-swatch)]" },
] as const;

export const EvaluateeStatsHeatMapCard = ({
  competencyHeatMapCells,
}: EvaluateeStatsHeatMapCardProps) => {
  const paddingCellCount = Math.max(0, heatMapGridSlotCount - competencyHeatMapCells.length);

  return (
    <div className="rounded-xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-6 shadow-[var(--shadow-echo-card)]">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="text-[22px] font-semibold leading-snug text-on-surface">
          Competency heat map
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-on-surface-variant">
          {heatMapLegendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-sm ${item.swatchClass}`} aria-hidden />
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <p className="mb-4 text-sm text-on-surface-variant">
        Latest completed evaluation — GAINS score (1–5) per sub-competency.
      </p>
      <div className="grid grid-cols-4 grid-rows-4 gap-3">
        {competencyHeatMapCells.map((cell) => {
          const presentation = readEvaluateeHeatMapPresentation(cell.strengthScore);
          const titleText = `${cell.label}: ${presentation.bandLabel}`;
          const srSummary = `${cell.label}, ${presentation.bandLabel}, score ${cell.strengthScore.toFixed(1)}`;
          return (
            <div
              key={cell.code}
              title={titleText}
              className={`flex min-h-[100px] flex-col rounded-lg border p-3 transition-shadow hover:shadow-md md:p-4 ${presentation.containerClass}`}
            >
              <span className="sr-only">{srSummary}</span>
              <div className="flex flex-1 flex-col items-center justify-center gap-2 md:hidden">
                <span className="text-2xl font-bold leading-none text-on-surface" aria-hidden>
                  {cell.code}
                </span>
                <span
                  className={`text-base font-semibold tabular-nums ${presentation.accentClass}`}
                  aria-hidden
                >
                  {cell.strengthScore.toFixed(1)}
                </span>
              </div>
              <div className="hidden min-h-0 flex-1 flex-col justify-between md:flex">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
                    {cell.code}
                  </span>
                  <span
                    className={`text-xs font-semibold tabular-nums ${presentation.accentClass}`}
                  >
                    {cell.strengthScore.toFixed(1)}
                  </span>
                </div>
                <span className="mt-2 text-sm font-semibold leading-snug text-on-surface">
                  {cell.label}
                </span>
              </div>
            </div>
          );
        })}
        {Array.from({ length: paddingCellCount }).map((_, index) => (
          <div
            key={`heatmap-grid-pad-${String(index)}`}
            className="min-h-[100px] rounded-lg border border-dashed border-outline-variant/25 bg-surface-container-low/20"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
};
