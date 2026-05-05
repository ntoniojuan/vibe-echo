import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";

export const readEchoGainsRatingsMapForFirestore = (
  gainsRatings: Partial<Record<GainsSubcompetencyCode, GainsLevel>>,
): Record<string, number> => {
  const output: Record<string, number> = {};
  for (const [code, value] of Object.entries(gainsRatings)) {
    if (value !== undefined) {
      output[code] = value;
    }
  }
  return output;
};
