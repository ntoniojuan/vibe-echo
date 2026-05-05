import type { GainsLevel } from "@/lib/echo/gainsLevelType";

const gainsLevelFullLabels: Record<GainsLevel, string> = {
  5: "Greatly exceeds",
  4: "Ahead",
  3: "In line",
  2: "Needs improvement",
  1: "Severely underdelivers",
};

export const readGainsLevelFullLabel = (level: GainsLevel): string =>
  gainsLevelFullLabels[level];
