import { httpsCallable } from "firebase/functions";
import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoGainsRatingsMapForFirestore } from "@/lib/echo/readEchoGainsRatingsMapForFirestore";
import { readEchoCallableFunctions } from "@/lib/firebase/readEchoCallableFunctions";

type UpdateEchoEvaluationDraftInput = EchoWizardFormState & {
  evaluationDraftId: string;
  currentStepIndex: number;
  status: "draft" | "submitted";
  shouldSetCreatedAt: boolean;
  evaluatorEmail: string;
  evaluatorUid: string;
};

export const updateEchoEvaluationDraft = async (
  input: UpdateEchoEvaluationDraftInput,
): Promise<void> => {
  await retryWithBackoff(async () => {
    const gainsRatings = readEchoGainsRatingsMapForFirestore(input.gainsRatings);
    const callable = httpsCallable<
      Omit<UpdateEchoEvaluationDraftInput, "evaluatorEmail" | "evaluatorUid"> & {
        gainsRatings: Record<string, number>;
      },
      { ok: boolean }
    >(readEchoCallableFunctions(), "updateEchoEvaluationDraftAudited");

    await callable({
      evaluationDraftId: input.evaluationDraftId,
      currentStepIndex: input.currentStepIndex,
      status: input.status,
      shouldSetCreatedAt: input.shouldSetCreatedAt,
      evaluateeName: input.evaluateeName,
      evaluateeEmail: input.evaluateeEmail,
      isAnonymous: input.isAnonymous,
      relationshipType: input.relationshipType,
      evaluationReason: input.evaluationReason,
      aptitudeObservations: input.aptitudeObservations,
      characterObservations: input.characterObservations,
      effectivenessObservations: input.effectivenessObservations,
      gainsRatings,
    });
  });
};
