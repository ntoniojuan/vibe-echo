import type { GainsLevel } from "@/lib/echo/gainsLevelType";
import type { EchoGainsLevelRadioOption } from "@/lib/echo/echoGainsLevelRadioOptionType";
import { readGainsLevelFullLabel } from "@/lib/echo/readGainsLevelFullLabel";
import { readGainsAxisTickLabel } from "@/lib/evaluatee/readGainsAxisTickLabel";

export const readEchoGainsLevelRadioOptions = (): ReadonlyArray<EchoGainsLevelRadioOption> => {
  const levels: GainsLevel[] = [5, 4, 3, 2, 1];
  return levels.map((value) => ({
    value,
    label: readGainsLevelFullLabel(value),
    letter: readGainsAxisTickLabel(value),
  }));
};
