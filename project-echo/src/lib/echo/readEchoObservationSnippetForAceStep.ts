import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import { readPlainTextFromEchoObservationHtml } from "@/lib/echo/readPlainTextFromEchoObservationHtml";
import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";

const defaultMaxLength = 160;

export const readEchoObservationSnippetForAceStep = (
  draft: EchoEvaluationDraftFirestorePayload,
  aceKey: EchoAceStepKey,
  maxLength: number = defaultMaxLength,
): string => {
  let raw = draft.effectivenessObservations;
  if (aceKey === "aptitude") {
    raw = draft.aptitudeObservations;
  } else if (aceKey === "character") {
    raw = draft.characterObservations;
  }
  const collapsed = readPlainTextFromEchoObservationHtml(raw).replace(/\s+/g, " ").trim();
  if (collapsed.length <= maxLength) {
    return collapsed;
  }
  return `${collapsed.slice(0, maxLength - 1)}…`;
};
