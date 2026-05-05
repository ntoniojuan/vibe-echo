"use client";

import type { EvaluateeStatsDashboardProps } from "@/lib/evaluatee/evaluateeStatsDashboardProps";
import { EvaluateeStatsHeatMapCard } from "@/components/evaluatee/EvaluateeStatsHeatMapCard";
import { EvaluateeStatsRadarCard } from "@/components/evaluatee/EvaluateeStatsRadarCard";
import { EvaluateeStatsTrendCard } from "@/components/evaluatee/EvaluateeStatsTrendCard";

export const EvaluateeStatsDashboard = (props: EvaluateeStatsDashboardProps) => {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 md:py-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Growth analytics</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
            Your ECHO performance
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-on-surface-variant">
            {props.evaluateeDisplayName} — ACE balance from all completed cycles, overall score trend
            (last four), and latest GAINS heat map.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <EvaluateeStatsRadarCard
            aptitude={props.gainsAveragesByAce.aptitude}
            character={props.gainsAveragesByAce.character}
            effectiveness={props.gainsAveragesByAce.effectiveness}
          />
        </div>
        <div className="min-w-0">
          <EvaluateeStatsTrendCard overallRatingByCycle={props.overallRatingByCycle} />
        </div>
      </div>

      <EvaluateeStatsHeatMapCard competencyHeatMapCells={props.competencyHeatMapCells} />
    </div>
  );
};
