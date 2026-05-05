import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { HttpsError, onCall, type CallableRequest } from "firebase-functions/v2/https";

const echoEvaluationDraftCollectionId = "echoEvaluationDrafts";

type MarkReadPayload = {
  evaluationDraftId: string;
};

export const markEchoEvaluationSubmittedReadAudited = onCall(
  { region: "us-central1" },
  async (request: CallableRequest<MarkReadPayload>) => {
    if (!request.auth?.uid || !request.auth.token.email) {
      throw new HttpsError("unauthenticated", "Sign in required.");
    }
    const evaluationDraftId = request.data?.evaluationDraftId?.trim() ?? "";
    if (evaluationDraftId.length === 0) {
      throw new HttpsError("invalid-argument", "evaluationDraftId is required.");
    }

    const authEmail = String(request.auth.token.email).trim().toLowerCase();
    const authUid = request.auth.uid.trim();

    const database = getFirestore();
    const documentReference = database
      .collection(echoEvaluationDraftCollectionId)
      .doc(evaluationDraftId);

    const snapshot = await documentReference.get();
    if (!snapshot.exists) {
      throw new HttpsError("not-found", "Evaluation not found.");
    }

    const record = snapshot.data();
    if (record?.status !== "submitted") {
      throw new HttpsError("failed-precondition", "Only submitted evaluations can be marked read.");
    }

    const evaluateeEmail = String(record.evaluateeEmail ?? "").trim().toLowerCase();
    if (evaluateeEmail !== authEmail) {
      throw new HttpsError("permission-denied", "Only the evaluatee can mark this evaluation read.");
    }

    const batch = database.batch();
    batch.update(documentReference, {
      isRead: true,
      updatedAt: FieldValue.serverTimestamp(),
    });
    const logReference = database.collection("system_logs").doc();
    batch.set(logReference, {
      eventType: "edit",
      domain: "echo_evaluation_draft",
      evaluationId: evaluationDraftId,
      timestamp: FieldValue.serverTimestamp(),
      actorUid: authUid,
      actorSource: "markEchoEvaluationSubmittedReadAudited",
      snapshotAfter: { isRead: true },
    });

    await batch.commit();
    return { ok: true };
  },
);
