import { collection, getDocs, query, where } from "firebase/firestore";
import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import type { EchoEvaluationDocumentRecord } from "@/lib/firebase/echoEvaluationDocumentRecordType";
import { readEchoEvaluationDraftPayloadFromFirestoreData } from "@/lib/firebase/readEchoEvaluationDraft";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { readFirestoreDb } from "@/lib/firebase/readFirestoreDb";

/**
 * Drafts and submissions created from the wizard while signed in store evaluatorEmail (Firebase Auth).
 * Legacy documents may omit this field and will not appear in this query.
 */
export const readEchoEvaluationDraftRecordsWhereEvaluatorEmail = async (
  evaluatorEmail: string,
): Promise<EchoEvaluationDocumentRecord[]> => {
  const normalizedEmail = evaluatorEmail.trim();
  if (normalizedEmail.length === 0) {
    return [];
  }

  return retryWithBackoff(async () => {
    const database = readFirestoreDb();
    const draftsQuery = query(
      collection(database, echoEvaluationDraftCollectionId),
      where("evaluatorEmail", "==", normalizedEmail),
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
