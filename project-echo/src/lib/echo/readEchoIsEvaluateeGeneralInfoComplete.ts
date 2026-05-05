import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";

export const readEchoIsEvaluateeGeneralInfoComplete = (formState: EchoWizardFormState): boolean => {
  const hasName = formState.evaluateeName.trim().length > 0;
  const hasEmail = formState.evaluateeEmail.trim().length > 0;
  const hasRelationship = formState.relationshipType !== "";
  const hasReason = formState.evaluationReason.trim().length > 0;
  return hasName && hasEmail && hasRelationship && hasReason;
};
