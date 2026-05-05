import type { EchoEvaluateeRelationshipType } from "@/lib/echo/echoEvaluateeRelationshipType";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";

export type EchoWizardFormState = {
  evaluateeName: string;
  evaluateeEmail: string;
  /** When true (peer/colleague flow), the evaluatee sees "Anonymous Teammate" instead of the evaluator identity. */
  isAnonymous: boolean;
  relationshipType: EchoEvaluateeRelationshipType | "";
  evaluationReason: string;
  aptitudeObservations: string;
  characterObservations: string;
  effectivenessObservations: string;
  gainsRatings: Partial<Record<GainsSubcompetencyCode, GainsLevel>>;
};
