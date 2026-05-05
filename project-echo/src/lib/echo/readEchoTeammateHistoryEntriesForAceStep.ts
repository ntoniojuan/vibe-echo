import { echoGainsSubcompetencyCatalog } from "@/lib/echo/echoGainsSubcompetencyCatalog";
import type { EchoTeammateHistoryEntry } from "@/lib/echo/echoTeammateHistoryEntryType";
import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import { readEchoAceShortPillarLabel } from "@/lib/echo/readEchoAceShortPillarLabel";
import { readEchoHistoryTimelineCycleLabel } from "@/lib/echo/readEchoHistoryTimelineCycleLabel";
import { readEchoHistoryTimelineQuarterBadge } from "@/lib/echo/readEchoHistoryTimelineQuarterBadge";
import { readEchoObservationSnippetForAceStep } from "@/lib/echo/readEchoObservationSnippetForAceStep";
import { readEchoGainsSubcompetencyRowsForAceStep } from "@/lib/echo/readEchoGainsSubcompetencyRowsForAceStep";
import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";
import { readEvaluateeHeatMapPresentation } from "@/lib/evaluatee/readEvaluateeHeatMapPresentation";

const defaultMaxEntries = 8;

const readMean = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((total, value) => total + value, 0) / values.length;
};

const readEchoEvaluationDraftIsGainsComplete = (
  draft: EchoEvaluationDraftFirestorePayload,
): boolean =>
  echoGainsSubcompetencyCatalog.every((row) => draft.gainsRatings[row.code] !== undefined);

const readEchoPillarMeanFromDraft = (
  draft: EchoEvaluationDraftFirestorePayload,
  pillarCodes: GainsSubcompetencyCode[],
): number | null => {
  const levels = pillarCodes
    .map((code) => draft.gainsRatings[code])
    .filter((value): value is GainsLevel => value !== undefined);
  if (levels.length !== pillarCodes.length) {
    return null;
  }
  return readMean(levels);
};

export const readEchoTeammateHistoryEntriesForAceStep = (
  aceKey: EchoAceStepKey,
  drafts: EchoEvaluationDraftFirestorePayload[],
  maxEntries: number = defaultMaxEntries,
): ReadonlyArray<EchoTeammateHistoryEntry> => {
  const pillarCodes = readEchoGainsSubcompetencyRowsForAceStep(aceKey).map((row) => row.code);
  const completeSortedNewestFirst = drafts
    .filter((draft) => readEchoEvaluationDraftIsGainsComplete(draft))
    .sort((left, right) => right.updatedAt.getTime() - left.updatedAt.getTime());

  const pillarShortLabel = readEchoAceShortPillarLabel(aceKey);

  return completeSortedNewestFirst.slice(0, maxEntries).map((draft, index) => {
    const pillarMean = readEchoPillarMeanFromDraft(draft, pillarCodes);
    const bandLabel =
      pillarMean !== null
        ? readEvaluateeHeatMapPresentation(pillarMean).bandLabel
        : "—";
    const key = `history-${String(draft.updatedAt.getTime())}-${String(index)}`;

    return {
      key,
      cycleLabel: readEchoHistoryTimelineCycleLabel(draft.updatedAt),
      quarterBadge: readEchoHistoryTimelineQuarterBadge(draft.updatedAt),
      pillarShortLabel,
      bandLabel,
      summarySnippet: readEchoObservationSnippetForAceStep(draft, aceKey),
    };
  });
};
