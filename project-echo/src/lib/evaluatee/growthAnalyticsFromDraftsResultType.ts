import type { EvaluateeStatsDashboardProps } from "@/lib/evaluatee/evaluateeStatsDashboardProps";

export type GrowthAnalyticsFromDraftsResult = {
  dashboardProps: EvaluateeStatsDashboardProps | null;
  matchingSubmittedCount: number;
};
