"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { echoEvaluationDraftThreadMessagesSubcollectionId } from "@/lib/firebase/echoEvaluationDraftThreadMessagesSubcollectionId";
import type { EchoEvaluationThreadMessage } from "@/lib/firebase/echoEvaluationThreadMessageType";
import { readEchoEvaluationThreadMessageFromDoc } from "@/lib/firebase/readEchoEvaluationThreadMessageFromDoc";
import { readFirestoreDb } from "@/lib/firebase/readFirestoreDb";
import { createEchoEvaluationThreadMessage } from "@/lib/firebase/createEchoEvaluationThreadMessage";

export const useEchoEvaluationThreadMessages = (evaluationId: string | null) => {
  const [messages, setMessages] = useState<EchoEvaluationThreadMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (evaluationId === null || evaluationId.trim().length === 0) {
      setMessages([]);
      setLoading(false);
      setError(null);
      return;
    }

    const database = readFirestoreDb();
    const evaluationReference = doc(
      database,
      echoEvaluationDraftCollectionId,
      evaluationId,
    );
    const threadQuery = query(
      collection(evaluationReference, echoEvaluationDraftThreadMessagesSubcollectionId),
      orderBy("createdAt", "asc"),
    );

    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      threadQuery,
      (snapshot) => {
        const nextMessages = snapshot.docs.map((documentSnapshot) =>
          readEchoEvaluationThreadMessageFromDoc(documentSnapshot.id, documentSnapshot.data()),
        );
        setMessages(nextMessages);
        setLoading(false);
      },
      (snapshotError) => {
        console.error("ECHO thread subscription failed.", snapshotError);
        setError("Could not load discussion.");
        setMessages([]);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [evaluationId]);

  const sendMessage = useCallback(
    async (input: { authorUid: string; authorDisplayName: string | null; text: string }) => {
      if (evaluationId === null || evaluationId.trim().length === 0) {
        return;
      }
      await createEchoEvaluationThreadMessage({
        evaluationId,
        authorUid: input.authorUid,
        authorDisplayName: input.authorDisplayName,
        text: input.text,
      });
    },
    [evaluationId],
  );

  return { messages, loading, error, sendMessage };
};
