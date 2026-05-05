import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoGainsRatingsMapForFirestore } from "@/lib/echo/readEchoGainsRatingsMapForFirestore";
import { readFirebaseIdTokenForCurrentEchoUser } from "@/lib/firebase/readFirebaseIdTokenForCurrentEchoUser";

type UpdateEchoEvaluationDraftInput = EchoWizardFormState & {
  evaluationDraftId: string;
  currentStepIndex: number;
  status: "draft" | "submitted";
  shouldSetCreatedAt: boolean;
};

export const updateEchoEvaluationDraft = async (
  input: UpdateEchoEvaluationDraftInput,
): Promise<void> => {
  await retryWithBackoff(async () => {
    const idToken = await readFirebaseIdTokenForCurrentEchoUser();
    const gainsRatings = readEchoGainsRatingsMapForFirestore(input.gainsRatings);
    const response = await fetch("/api/save-draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
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
      }),
    });

    let responsePayload: { error?: unknown } = {};
    try {
      responsePayload = (await response.json()) as { error?: unknown };
    } catch {
      responsePayload = {};
    }

    if (!response.ok) {
      const message =
        typeof responsePayload.error === "string" ? responsePayload.error : "Save failed.";
      throw new Error(message);
    }
  });
};
