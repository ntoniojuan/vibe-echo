import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";

export const createInitialEchoWizardFormState = (): EchoWizardFormState => ({
  evaluateeName: "",
  evaluateeEmail: "",
  isAnonymous: false,
  relationshipType: "",
  evaluationReason: "",
  aptitudeObservations: "",
  characterObservations: "",
  effectivenessObservations: "",
  gainsRatings: {},
});
