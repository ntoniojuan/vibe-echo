import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";
import { readEchoGainsSubcompetencyRowsForAceStep } from "@/lib/echo/readEchoGainsSubcompetencyRowsForAceStep";

export type ReadRefinementGainsRatingsForPillarPayloadResult =
  | { ok: true; gainsRatingsForPillar: Record<GainsSubcompetencyCode, GainsLevel> }
  | { ok: false; missingCodes: GainsSubcompetencyCode[] };

export const readRefinementGainsRatingsForPillarPayload = (
  aceStep: EchoAceStepKey,
  gainsRatings: Partial<Record<GainsSubcompetencyCode, GainsLevel>>,
): ReadRefinementGainsRatingsForPillarPayloadResult => {
  const rows = readEchoGainsSubcompetencyRowsForAceStep(aceStep);
  const missingCodes: GainsSubcompetencyCode[] = [];
  const gainsRatingsForPillar = {} as Record<GainsSubcompetencyCode, GainsLevel>;

  for (const row of rows) {
    const level = gainsRatings[row.code];
    if (level === undefined) {
      missingCodes.push(row.code);
    } else {
      gainsRatingsForPillar[row.code] = level;
    }
  }

  if (missingCodes.length > 0) {
    return { ok: false, missingCodes };
  }

  return { ok: true, gainsRatingsForPillar };
};
