import { echoGainsSubcompetencyCatalog } from "@/lib/echo/echoGainsSubcompetencyCatalog";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import { readGainsAxisTickLabel } from "@/lib/evaluatee/readGainsAxisTickLabel";
import type { EchoAceCategoryNormalized } from "@/lib/refinement/echoAceCategoryNormalized";

export const readRefinementGainsPromptSummaryForPillar = (
  aceCategory: EchoAceCategoryNormalized,
  gainsRatingsForPillar: Record<GainsSubcompetencyCode, number>,
): string => {
  const rows = echoGainsSubcompetencyCatalog.filter((row) => row.aceStep === aceCategory);
  return rows
    .map((row) => {
      const score = gainsRatingsForPillar[row.code];
      const letter = readGainsAxisTickLabel(score);
      return `${row.code} (${row.title}): ${String(score)}/5 (GAINS letter ${letter})`;
    })
    .join("\n");
};
