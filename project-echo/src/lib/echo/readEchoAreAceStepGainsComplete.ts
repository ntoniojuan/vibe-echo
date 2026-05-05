import { readEchoGainsSubcompetencyRowsForAceStep } from "@/lib/echo/readEchoGainsSubcompetencyRowsForAceStep";
import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";

export const readEchoAreAceStepGainsComplete = (
  aceStep: EchoAceStepKey,
  formState: EchoWizardFormState,
): boolean => {
  const codes = readEchoGainsSubcompetencyRowsForAceStep(aceStep).map((row) => row.code);
  return codes.every((code) => formState.gainsRatings[code] !== undefined);
};
