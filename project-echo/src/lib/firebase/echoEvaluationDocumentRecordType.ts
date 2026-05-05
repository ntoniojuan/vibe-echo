import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";

export type EchoEvaluationDocumentRecord = {
  documentId: string;
  payload: EchoEvaluationDraftFirestorePayload;
};
