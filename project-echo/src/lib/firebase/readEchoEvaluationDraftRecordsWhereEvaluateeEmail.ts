import { collection, getDocs, query, where } from "firebase/firestore";
import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import type { EchoEvaluationDocumentRecord } from "@/lib/firebase/echoEvaluationDocumentRecordType";
import { readEchoEvaluationDraftPayloadFromFirestoreData } from "@/lib/firebase/readEchoEvaluationDraft";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { readFirestoreDb } from "@/lib/firebase/readFirestoreDb";

/**
 * Single-field equality on evaluateeEmail. Filter status (e.g. submitted) client-side to avoid
 * composite indexes.
 */
export const readEchoEvaluationDraftRecordsWhereEvaluateeEmail = async (
  evaluateeEmail: string,
): Promise<EchoEvaluationDocumentRecord[]> => {
  const normalizedEmail = evaluateeEmail.trim();
  if (normalizedEmail.length === 0) {
    return [];
  }

  return retryWithBackoff(async () => {
    const database = readFirestoreDb();
    const draftsQuery = query(
      collection(database, echoEvaluationDraftCollectionId),
      where("evaluateeEmail", "==", normalizedEmail),
    );
    const snapshot = await getDocs(draftsQuery);
    const records = snapshot.docs.map((documentSnapshot) => ({
      documentId: documentSnapshot.id,
      payload: readEchoEvaluationDraftPayloadFromFirestoreData(
        documentSnapshot.data() as Record<string, unknown>,
      ),
    }));
    return records.sort((left, right) => right.payload.updatedAt.getTime() - left.payload.updatedAt.getTime());
  });
};
