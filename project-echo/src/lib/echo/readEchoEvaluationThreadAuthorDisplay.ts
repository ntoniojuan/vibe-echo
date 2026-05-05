import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";

export type EchoEvaluationThreadAuthorDisplay = {
  label: string;
  avatarInitial: string;
  hidePhoto: boolean;
};

export const readEchoEvaluationThreadAuthorDisplay = (
  evaluation: EchoEvaluationDraftFirestorePayload,
  messageAuthorUid: string,
  messageAuthorDisplayName: string | null,
): EchoEvaluationThreadAuthorDisplay => {
  const evaluatorUid = evaluation.evaluatorUid.trim();
  const anonymousEvaluator =
    evaluation.isAnonymous === true &&
    evaluatorUid.length > 0 &&
    messageAuthorUid === evaluatorUid;

  if (anonymousEvaluator) {
    return {
      label: "Anonymous Teammate",
      avatarInitial: "A",
      hidePhoto: true,
    };
  }

  const trimmedName = (messageAuthorDisplayName ?? "").trim();
  const label = trimmedName.length > 0 ? trimmedName : "Teammate";
  const avatarInitial = label.slice(0, 1).toUpperCase();
  return { label, avatarInitial, hidePhoto: false };
};
