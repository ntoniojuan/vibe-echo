import { echoGainsSubcompetencyCatalog } from "@/lib/echo/echoGainsSubcompetencyCatalog";
import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";
import type { GrowthAnalyticsFromDraftsResult } from "@/lib/evaluatee/growthAnalyticsFromDraftsResultType";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";

const readMean = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((total, value) => total + value, 0) / values.length;
};

const readOverallScoreFromCompleteDraft = (
  draft: EchoEvaluationDraftFirestorePayload,
): number => {
  const ratings = echoGainsSubcompetencyCatalog
    .map((row) => draft.gainsRatings[row.code])
    .filter((value): value is GainsLevel => value !== undefined);
  return readMean(ratings);
};

const readEchoGrowthTrendCycleLabel = (evaluatedAt: Date): string =>
  evaluatedAt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

const readEchoCompleteEvaluationDrafts = (
  drafts: EchoEvaluationDraftFirestorePayload[],
): EchoEvaluationDraftFirestorePayload[] => {
  const complete = drafts.filter((draft) =>
    echoGainsSubcompetencyCatalog.every((row) => draft.gainsRatings[row.code] !== undefined),
  );
  return complete.sort((left, right) => left.updatedAt.getTime() - right.updatedAt.getTime());
};

const lastCompletedCyclesCount = 4;

/**
 * Builds Growth Analytics from submitted Firestore evaluation payloads for one evaluatee.
 *
 * - Radar: mean GAINS per ACE pillar — average of A1–A4, C1–C4, and E1–E4 (each sub-score
 *   averaged across completed evaluations, then the four codes in that pillar are averaged).
 * - Trend: last four *completed* evaluations by `updatedAt`, overall score = mean of 12 GAINS;
 *   points are plotted oldest → newest.
 * - Heat map: 4×4 grid (12 competencies + pads) using GAINS from the single most recent
 *   completed evaluation.
 */
export const readGrowthAnalyticsFromEvaluationDrafts = (
  evaluateeDisplayName: string,
  drafts: EchoEvaluationDraftFirestorePayload[],
): GrowthAnalyticsFromDraftsResult => {
  const matchingSubmittedCount = drafts.length;
  const completeDraftsAsc = readEchoCompleteEvaluationDrafts(drafts);

  if (completeDraftsAsc.length === 0) {
    return { dashboardProps: null, matchingSubmittedCount };
  }

  const completeByUpdatedDesc = [...completeDraftsAsc].sort(
    (left, right) => right.updatedAt.getTime() - left.updatedAt.getTime(),
  );
  const latestComplete = completeByUpdatedDesc[0];
  const lastFourNewestFirst = completeByUpdatedDesc.slice(0, lastCompletedCyclesCount);

  const averagedScoresByCode: Partial<Record<GainsSubcompetencyCode, number>> = {};

  for (const row of echoGainsSubcompetencyCatalog) {
    const scores = completeDraftsAsc
      .map((draft) => draft.gainsRatings[row.code])
      .filter((value): value is GainsLevel => value !== undefined);
    averagedScoresByCode[row.code] = readMean(scores);
  }

  const readPillarMean = (codes: GainsSubcompetencyCode[]): number =>
    readMean(codes.map((code) => averagedScoresByCode[code] ?? 0));

  const aptitudeCodes: GainsSubcompetencyCode[] = ["A1", "A2", "A3", "A4"];
  const characterCodes: GainsSubcompetencyCode[] = ["C1", "C2", "C3", "C4"];
  const effectivenessCodes: GainsSubcompetencyCode[] = ["E1", "E2", "E3", "E4"];

  const lastCyclesChronological = [...lastFourNewestFirst].reverse();
  const overallRatingByCycle = lastCyclesChronological.map((draft) => ({
    cycleLabel: readEchoGrowthTrendCycleLabel(draft.updatedAt),
    rating: readOverallScoreFromCompleteDraft(draft),
  }));

  const competencyHeatMapCells = echoGainsSubcompetencyCatalog.map((row) => ({
    code: row.code,
    label: row.title,
    strengthScore: latestComplete.gainsRatings[row.code] ?? 0,
  }));

  return {
    matchingSubmittedCount,
    dashboardProps: {
      evaluateeDisplayName,
      gainsAveragesByAce: {
        aptitude: readPillarMean(aptitudeCodes),
        character: readPillarMean(characterCodes),
        effectiveness: readPillarMean(effectivenessCodes),
      },
      overallRatingByCycle,
      competencyHeatMapCells,
    },
  };
};
