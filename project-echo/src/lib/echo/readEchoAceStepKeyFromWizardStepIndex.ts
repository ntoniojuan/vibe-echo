import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";

export const readEchoAceStepKeyFromWizardStepIndex = (
  stepIndex: number,
): EchoAceStepKey | null => {
  if (stepIndex === 1) {
    return "aptitude";
  }
  if (stepIndex === 2) {
    return "character";
  }
  if (stepIndex === 3) {
    return "effectiveness";
  }
  return null;
};
