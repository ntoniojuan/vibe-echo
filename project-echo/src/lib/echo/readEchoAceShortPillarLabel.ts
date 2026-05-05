import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";

export const readEchoAceShortPillarLabel = (aceKey: EchoAceStepKey): string => {
  if (aceKey === "aptitude") {
    return "Aptitude";
  }
  if (aceKey === "character") {
    return "Character";
  }
  return "Effectiveness";
};
