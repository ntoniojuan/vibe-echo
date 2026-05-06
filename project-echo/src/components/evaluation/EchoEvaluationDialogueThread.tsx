"use client";

import { useCallback, useState } from "react";
import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";
import { EchoEvaluationThreadMessageRow } from "@/components/evaluation/EchoEvaluationThreadMessageRow";
import { useEchoEvaluationThreadMessages } from "@/hooks/useEchoEvaluationThreadMessages";

type EchoEvaluationDialogueThreadProps = {
  evaluationId: string;
  evaluation: EchoEvaluationDraftFirestorePayload;
  currentUserUid: string | null;
  currentUserDisplayName: string | null;
  currentUserEmail: string;
  isComposerDisabled: boolean;
};

export const EchoEvaluationDialogueThread = ({
  evaluationId,
  evaluation,
  currentUserUid,
  currentUserDisplayName,
  currentUserEmail,
  isComposerDisabled,
}: EchoEvaluationDialogueThreadProps) => {
  const { messages, loading, error, sendMessage } = useEchoEvaluationThreadMessages(evaluationId);
  const [draftText, setDraftText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const onSend = useCallback(async () => {
    if (currentUserUid === null || currentUserUid.trim().length === 0) {
      return;
    }
    const text = draftText.trim();
    if (text.length === 0 || isSending) {
      return;
    }
    setIsSending(true);
    try {
      await sendMessage({
        authorUid: currentUserUid,
        authorDisplayName: currentUserDisplayName,
        text,
      });
      setDraftText("");
    } catch (sendError) {
      console.error("ECHO thread message failed to send.", sendError);
    } finally {
      setIsSending(false);
    }
  }, [currentUserUid, currentUserDisplayName, draftText, isSending, sendMessage]);

  return (
    <section className="rounded-2xl border border-outline-variant/35 bg-echo-card p-5 shadow-[var(--shadow-echo-card)]">
      <h2 className="text-lg font-semibold text-on-surface">Discussion</h2>
      <p className="mt-1 text-sm text-on-surface-variant">
        Real-time thread for this evaluation. Signed in as {currentUserEmail}.
      </p>

      {error !== null ? (
        <p className="mt-4 text-sm font-medium text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      <ul className="mt-4 max-h-[min(420px,50vh)] overflow-y-auto">
        {loading ? (
          <li className="py-8 text-center text-sm text-on-surface-variant">Loading messages…</li>
        ) : null}
        {!loading && messages.length === 0 ? (
          <li className="py-6 text-center text-sm text-on-surface-variant">
            No messages yet. Start the conversation below.
          </li>
        ) : null}
        {messages.map((message) => (
          <EchoEvaluationThreadMessageRow key={message.messageId} evaluation={evaluation} message={message} />
        ))}
      </ul>

      <div className="mt-4 border-t border-outline-variant/25 pt-4">
        <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant">
          Add a message
          <textarea
            value={draftText}
            disabled={isComposerDisabled || currentUserUid === null || isSending}
            onChange={(event) => {
              setDraftText(event.target.value);
            }}
            rows={3}
            className="mt-2 w-full resize-y rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none ring-primary focus:ring-2 disabled:opacity-60"
            placeholder={
              currentUserUid === null ? "Sign in to participate." : "Write something constructive…"
            }
          />
        </label>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            disabled={
              isComposerDisabled || currentUserUid === null || isSending || draftText.trim().length === 0
            }
            onClick={() => {
              void onSend();
            }}
            className="rounded-full bg-[#4A634A] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#D1DCD1] hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
};
