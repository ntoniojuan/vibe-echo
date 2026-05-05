import { httpsCallable } from "firebase/functions";
import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import { readEchoCallableFunctions } from "@/lib/firebase/readEchoCallableFunctions";

export const updateEchoEvaluateeEvaluationRead = async (
  evaluationDraftId: string,
): Promise<void> => {
  await retryWithBackoff(async () => {
    const callable = httpsCallable<{ evaluationDraftId: string }, { ok: boolean }>(
      readEchoCallableFunctions(),
      "markEchoEvaluationSubmittedReadAudited",
    );
    await callable({ evaluationDraftId });
  });
};
