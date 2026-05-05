import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { HttpsError, onCall, type CallableRequest } from "firebase-functions/v2/https";

const echoEvaluationDraftCollectionId = "echoEvaluationDrafts";

type UpdateEchoEvaluationDraftAuditedPayload = {
  evaluationDraftId: string;
  currentStepIndex: number;
  status: "draft" | "submitted";
  shouldSetCreatedAt: boolean;
  evaluateeName: string;
  evaluateeEmail: string;
  isAnonymous: boolean;
  relationshipType: string;
  evaluationReason: string;
  aptitudeObservations: string;
  characterObservations: string;
  effectivenessObservations: string;
  gainsRatings: Record<string, number>;
};

export const updateEchoEvaluationDraftAudited = onCall(
  { region: "us-central1" },
  async (request: CallableRequest<UpdateEchoEvaluationDraftAuditedPayload>) => {
    if (!request.auth?.uid || !request.auth.token.email) {
      throw new HttpsError("unauthenticated", "Sign in required.");
    }
    const data = request.data;
    if (
      !data ||
      typeof data.evaluationDraftId !== "string" ||
      data.evaluationDraftId.trim().length === 0
    ) {
      throw new HttpsError("invalid-argument", "evaluationDraftId is required.");
    }
    if (data.status !== "draft" && data.status !== "submitted") {
      throw new HttpsError("invalid-argument", "status must be draft or submitted.");
    }

    const authEmail = String(request.auth.token.email).trim().toLowerCase();
    const authUid = request.auth.uid.trim();

    const database = getFirestore();
    const documentReference = database
      .collection(echoEvaluationDraftCollectionId)
      .doc(data.evaluationDraftId.trim());

    const snapshot = await documentReference.get();
    if (snapshot.exists) {
      const existingEvaluatorEmail = String(snapshot.data()?.evaluatorEmail ?? "")
        .trim()
        .toLowerCase();
      if (existingEvaluatorEmail.length > 0 && existingEvaluatorEmail !== authEmail) {
        throw new HttpsError("permission-denied", "Not allowed to modify this evaluation.");
      }
    }

    const peerAnonymous = data.relationshipType === "colleague" ? Boolean(data.isAnonymous) : false;

    const documentPayload: Record<string, unknown> = {
      evaluateeName: data.evaluateeName,
      evaluateeEmail: data.evaluateeEmail,
      isAnonymous: peerAnonymous,
      relationshipType: data.relationshipType,
      evaluationReason: data.evaluationReason,
      aptitudeObservations: data.aptitudeObservations,
      characterObservations: data.characterObservations,
      effectivenessObservations: data.effectivenessObservations,
      gainsRatings: data.gainsRatings,
      currentStepIndex: data.currentStepIndex,
      status: data.status,
      updatedAt: FieldValue.serverTimestamp(),
      evaluatorEmail: authEmail,
      evaluatorUid: authUid,
    };

    if (data.shouldSetCreatedAt) {
      documentPayload.createdAt = FieldValue.serverTimestamp();
    }

    const snapshotForLog: Record<string, unknown> = {
      evaluateeName: data.evaluateeName,
      evaluateeEmail: data.evaluateeEmail,
      isAnonymous: peerAnonymous,
      relationshipType: data.relationshipType,
      evaluationReason: data.evaluationReason,
      aptitudeObservations: data.aptitudeObservations,
      characterObservations: data.characterObservations,
      effectivenessObservations: data.effectivenessObservations,
      gainsRatings: data.gainsRatings,
      currentStepIndex: data.currentStepIndex,
      status: data.status,
      evaluatorEmail: authEmail,
      evaluatorUid: authUid,
    };

    const batch = database.batch();
    batch.set(documentReference, documentPayload, { merge: true });
    const logReference = database.collection("system_logs").doc();
    batch.set(logReference, {
      eventType: "edit",
      domain: "echo_evaluation_draft",
      evaluationId: data.evaluationDraftId.trim(),
      timestamp: FieldValue.serverTimestamp(),
      actorUid: authUid,
      actorSource: "updateEchoEvaluationDraftAudited",
      snapshotAfter: snapshotForLog,
    });

    await batch.commit();
    return { ok: true };
  },
);
