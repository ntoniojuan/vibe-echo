export type EvaluateeStatsDashboardProps = {
  gainsAveragesByAce: {
    aptitude: number;
    character: number;
    effectiveness: number;
  };
  overallRatingByCycle: ReadonlyArray<{
    cycleLabel: string;
    rating: number;
  }>;
  competencyHeatMapCells: ReadonlyArray<{
    code: string;
    label: string;
    strengthScore: number;
  }>;
};
