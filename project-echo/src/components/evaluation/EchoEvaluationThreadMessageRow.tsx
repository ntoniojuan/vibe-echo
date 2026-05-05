"use client";

import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";
import type { EchoEvaluationThreadMessage } from "@/lib/firebase/echoEvaluationThreadMessageType";
import { readEchoEvaluationThreadAuthorDisplay } from "@/lib/echo/readEchoEvaluationThreadAuthorDisplay";
import { readEchoThreadMessageTimestampLabel } from "@/lib/echo/readEchoThreadMessageTimestampLabel";

type EchoEvaluationThreadMessageRowProps = {
  evaluation: EchoEvaluationDraftFirestorePayload;
  message: EchoEvaluationThreadMessage;
};

export const EchoEvaluationThreadMessageRow = ({
  evaluation,
  message,
}: EchoEvaluationThreadMessageRowProps) => {
  const display = readEchoEvaluationThreadAuthorDisplay(
    evaluation,
    message.authorUid,
    message.authorDisplayName,
  );
  const timeLabel = readEchoThreadMessageTimestampLabel(message.createdAt);
  const avatarSurface = display.hidePhoto
    ? "border border-outline-variant/50 bg-surface-container-high text-on-surface-variant"
    : "border border-primary/35 bg-primary-container/40 text-primary";

  return (
    <li className="flex gap-3 border-b border-outline-variant/20 py-4 last:border-b-0">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarSurface}`}
        aria-hidden
      >
        {display.avatarInitial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-bold text-on-surface">{display.label}</span>
          <span className="text-xs text-on-surface-variant">{timeLabel}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-on-surface">
          {message.text}
        </p>
      </div>
    </li>
  );
};
