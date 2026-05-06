"use client";

import type { EvaluateeStatsDashboardProps } from "@/lib/evaluatee/evaluateeStatsDashboardProps";
import { EvaluateeStatsHeatMapCard } from "@/components/evaluatee/EvaluateeStatsHeatMapCard";
import { EvaluateeStatsRadarCard } from "@/components/evaluatee/EvaluateeStatsRadarCard";
import { EvaluateeStatsTrendCard } from "@/components/evaluatee/EvaluateeStatsTrendCard";
import { EchoAppPageHeader } from "@/components/shell/EchoAppPageHeader";

export const EvaluateeStatsDashboard = (props: EvaluateeStatsDashboardProps) => {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6">
      <EchoAppPageHeader
        eyebrow="Growth analytics"
        title="Your ECHO performance"
        description={`${props.evaluateeDisplayName} — ACE balance from all completed cycles, overall score trend (last four), and latest GAINS heat map.`}
      />
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
