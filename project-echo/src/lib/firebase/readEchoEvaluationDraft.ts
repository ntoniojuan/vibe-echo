import { doc, getDoc } from "firebase/firestore";
import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import type { EchoEvaluateeRelationshipType } from "@/lib/echo/echoEvaluateeRelationshipType";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoGainsRatingsFromFirestoreValue } from "@/lib/echo/readEchoGainsRatingsFromFirestoreValue";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { readFirestoreDb } from "@/lib/firebase/readFirestoreDb";

export type EchoEvaluationDraftFirestorePayload = EchoWizardFormState & {
  currentStepIndex: number;
  status: "draft" | "submitted";
  updatedAt: Date;
  createdAt: Date;
  evaluatorEmail: string;
  /** Present when the evaluator saved while signed in with Firebase Auth. Used for thread anonymity (compare to message authorUid). */
  evaluatorUid: string;
  /** Evaluatee-only: cleared when they open the submitted evaluation detail. Missing in Firestore means unread. */
  isRead: boolean;
};

const isRelationshipType = (
  value: string,
): value is EchoEvaluateeRelationshipType | "" => {
  if (value === "") {
    return true;
  }
  const allowed: EchoEvaluateeRelationshipType[] = [
    "supervisor",
    "supervisee",
    "colleague",
    "self",
  ];
  return allowed.includes(value as EchoEvaluateeRelationshipType);
};

const readTimestampAsDate = (
  value: unknown,
  fallback: Date,
): Date => {
  if (value instanceof Date) {
    return value;
  }
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate();
  }
  return fallback;
};

export const readEchoEvaluationDraftPayloadFromFirestoreData = (
  data: Record<string, unknown>,
): EchoEvaluationDraftFirestorePayload => {
  const relationshipRaw =
    typeof data.relationshipType === "string" ? data.relationshipType : "";
  const relationshipType = isRelationshipType(relationshipRaw)
    ? relationshipRaw
    : "";

  const isAnonymousRaw = data.isAnonymous;
  const isAnonymous = isAnonymousRaw === true;

  return {
    evaluateeName: typeof data.evaluateeName === "string" ? data.evaluateeName : "",
    evaluateeEmail: typeof data.evaluateeEmail === "string" ? data.evaluateeEmail : "",
    isAnonymous,
    relationshipType,
    evaluationReason:
      typeof data.evaluationReason === "string" ? data.evaluationReason : "",
    aptitudeObservations:
      typeof data.aptitudeObservations === "string" ? data.aptitudeObservations : "",
    characterObservations:
      typeof data.characterObservations === "string" ? data.characterObservations : "",
    effectivenessObservations:
      typeof data.effectivenessObservations === "string"
        ? data.effectivenessObservations
        : "",
    gainsRatings: readEchoGainsRatingsFromFirestoreValue(data.gainsRatings),
    currentStepIndex:
      typeof data.currentStepIndex === "number" ? data.currentStepIndex : 0,
    status: data.status === "submitted" ? "submitted" : "draft",
    updatedAt: readTimestampAsDate(data.updatedAt, new Date(0)),
    createdAt: readTimestampAsDate(data.createdAt, new Date(0)),
    evaluatorEmail: typeof data.evaluatorEmail === "string" ? data.evaluatorEmail : "",
    evaluatorUid: typeof data.evaluatorUid === "string" ? data.evaluatorUid : "",
    isRead: data.isRead === true,
  };
};

export const readEchoEvaluationDraft = async (
  evaluationDraftId: string,
): Promise<EchoEvaluationDraftFirestorePayload | null> => {
  return retryWithBackoff(async () => {
    const database = readFirestoreDb();
    const snapshot = await getDoc(
      doc(database, echoEvaluationDraftCollectionId, evaluationDraftId),
    );

    if (!snapshot.exists()) {
      return null;
    }

    const rawData = snapshot.data();
    return readEchoEvaluationDraftPayloadFromFirestoreData(rawData as Record<string, unknown>);
  });
};
