import { readEchoEvaluationDraftRecordsWhereEvaluateeEmail } from "@/lib/firebase/readEchoEvaluationDraftRecordsWhereEvaluateeEmail";
import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";

/**
 * Submitted evaluations where evaluateeEmail matches. Newest first by updatedAt.
 */
export const readSubmittedEchoEvaluationDraftsForEvaluateeEmail = async (
  evaluateeEmail: string,
): Promise<EchoEvaluationDraftFirestorePayload[]> => {
  const records = await readEchoEvaluationDraftRecordsWhereEvaluateeEmail(evaluateeEmail);
  return records
    .filter((record) => record.payload.status === "submitted")
    .map((record) => record.payload)
    .sort((left, right) => left.updatedAt.getTime() - right.updatedAt.getTime());
};
