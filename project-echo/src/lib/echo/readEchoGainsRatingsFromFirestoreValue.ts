import { echoGainsSubcompetencyCatalog } from "@/lib/echo/echoGainsSubcompetencyCatalog";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";

const allowedCodes = new Set(
  echoGainsSubcompetencyCatalog.map((row) => row.code),
) as ReadonlySet<GainsSubcompetencyCode>;

const isGainsLevel = (value: number): value is GainsLevel =>
  value === 1 || value === 2 || value === 3 || value === 4 || value === 5;

export const readEchoGainsRatingsFromFirestoreValue = (
  raw: unknown,
): Partial<Record<GainsSubcompetencyCode, GainsLevel>> => {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }
  const output: Partial<Record<GainsSubcompetencyCode, GainsLevel>> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!allowedCodes.has(key as GainsSubcompetencyCode)) {
      continue;
    }
    if (typeof value !== "number" || !Number.isFinite(value)) {
      continue;
    }
    const rounded = Math.round(value);
    if (!isGainsLevel(rounded)) {
      continue;
    }
    output[key as GainsSubcompetencyCode] = rounded;
  }
  return output;
};
