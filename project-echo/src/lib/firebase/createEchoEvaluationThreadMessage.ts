import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { retryWithBackoff } from "@/lib/async/retryWithBackoff";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { echoEvaluationDraftThreadMessagesSubcollectionId } from "@/lib/firebase/echoEvaluationDraftThreadMessagesSubcollectionId";
import { readFirestoreDb } from "@/lib/firebase/readFirestoreDb";

type CreateEchoEvaluationThreadMessageInput = {
  evaluationId: string;
  authorUid: string;
  authorDisplayName: string | null;
  text: string;
};

export const createEchoEvaluationThreadMessage = async (
  input: CreateEchoEvaluationThreadMessageInput,
): Promise<void> => {
  const trimmedBody = input.text.trim();
  if (trimmedBody.length === 0 || input.authorUid.trim().length === 0) {
    throw new Error("Message text and author are required.");
  }

  await retryWithBackoff(async () => {
    const database = readFirestoreDb();
    const evaluationReference = doc(
      database,
      echoEvaluationDraftCollectionId,
      input.evaluationId,
    );
    const threadReference = collection(
      evaluationReference,
      echoEvaluationDraftThreadMessagesSubcollectionId,
    );

    const displayName =
      input.authorDisplayName === null ? "" : input.authorDisplayName.trim();

    await addDoc(threadReference, {
      authorUid: input.authorUid.trim(),
      authorDisplayName: displayName,
      text: trimmedBody,
      createdAt: serverTimestamp(),
    });
  });
};
