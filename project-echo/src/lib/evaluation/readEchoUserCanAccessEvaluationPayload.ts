import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";

export const readEchoUserCanAccessEvaluationPayload = (
  userEmail: string | null | undefined,
  payload: EchoEvaluationDraftFirestorePayload,
): boolean => {
  const normalizedUser = (userEmail ?? "").trim().toLowerCase();
  if (normalizedUser.length === 0) {
    return false;
  }
  const evaluator = payload.evaluatorEmail.trim().toLowerCase();
  const evaluatee = payload.evaluateeEmail.trim().toLowerCase();
  return normalizedUser === evaluator || normalizedUser === evaluatee;
};
