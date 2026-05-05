import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import { readFirebaseIdTokenForCurrentEchoUser } from "@/lib/firebase/readFirebaseIdTokenForCurrentEchoUser";

export const updateEchoEvaluateeEvaluationRead = async (
  evaluationDraftId: string,
): Promise<void> => {
  await retryWithBackoff(async () => {
    const idToken = await readFirebaseIdTokenForCurrentEchoUser();
    const response = await fetch("/api/mark-submitted-read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ evaluationDraftId }),
    });

    let responsePayload: { error?: unknown } = {};
    try {
      responsePayload = (await response.json()) as { error?: unknown };
    } catch {
      responsePayload = {};
    }

    if (!response.ok) {
      const message =
        typeof responsePayload.error === "string" ? responsePayload.error : "Update failed.";
      throw new Error(message);
    }
  });
};
