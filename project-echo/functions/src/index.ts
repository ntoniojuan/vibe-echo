import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { onDocumentDeleted } from "firebase-functions/v2/firestore";
import { markEchoEvaluationSubmittedReadAudited } from "./markEchoEvaluationSubmittedReadAudited";
import { updateEchoEvaluationDraftAudited } from "./updateEchoEvaluationDraftAudited";

initializeApp();

const region = "us-central1";

export { markEchoEvaluationSubmittedReadAudited, updateEchoEvaluationDraftAudited };

/**
 * Hard deletes still need a server-side log when performed (e.g. admin tooling).
 * Client apps route evaluator saves through {@link updateEchoEvaluationDraftAudited}.
 */
export const auditEchoEvaluationDraftDeleted = onDocumentDeleted(
  {
    document: "echoEvaluationDrafts/{evaluationId}",
    region,
  },
  async (event) => {
    const evaluationId = event.params.evaluationId;
    const deletedSnapshot = event.data;
    const snapshotBefore =
      deletedSnapshot !== undefined && deletedSnapshot.exists ? deletedSnapshot.data() : null;
    const database = getFirestore();
    await database.collection("system_logs").add({
      eventType: "delete",
      domain: "echo_evaluation_draft",
      evaluationId,
      timestamp: FieldValue.serverTimestamp(),
      actorUid: null,
      actorSource: "firestore_trigger_v2_delete",
      snapshotBefore,
    });
  },
);
