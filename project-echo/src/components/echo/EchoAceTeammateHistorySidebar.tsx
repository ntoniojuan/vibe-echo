"use client";

import { useEffect, useState } from "react";
import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import { readEchoTeammateHistoryEntriesForAceStep } from "@/lib/echo/readEchoTeammateHistoryEntriesForAceStep";
import { readSubmittedEchoEvaluationDraftsForEvaluateeEmail } from "@/lib/firebase/readSubmittedEchoEvaluationDraftsForEvaluateeEmail";

type EchoAceTeammateHistorySidebarProps = {
  aceKey: EchoAceStepKey;
  evaluateeEmail: string;
};

export const EchoAceTeammateHistorySidebar = ({
  aceKey,
  evaluateeEmail,
}: EchoAceTeammateHistorySidebarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [entries, setEntries] = useState(() =>
    readEchoTeammateHistoryEntriesForAceStep(aceKey, []),
  );

  useEffect(() => {
    const trimmedEmail = evaluateeEmail.trim();
    if (trimmedEmail.length === 0) {
      setEntries(readEchoTeammateHistoryEntriesForAceStep(aceKey, []));
      setLoadFailed(false);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setLoadFailed(false);

    void (async () => {
      try {
        const drafts = await readSubmittedEchoEvaluationDraftsForEvaluateeEmail(trimmedEmail);
        if (cancelled) {
          return;
        }
        setEntries(readEchoTeammateHistoryEntriesForAceStep(aceKey, drafts));
      } catch (error) {
        console.error("ECHO teammate history could not load.", error);
        if (!cancelled) {
          setLoadFailed(true);
          setEntries(readEchoTeammateHistoryEntriesForAceStep(aceKey, []));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [aceKey, evaluateeEmail]);

  const emailMissing = evaluateeEmail.trim().length === 0;

  return (
    <aside className="hidden w-full max-w-[320px] shrink-0 lg:block">
      <div className="sticky top-24 rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-[var(--shadow-echo-card)]">
        <h3 className="mb-6 flex items-center gap-2 text-[22px] font-semibold leading-snug text-on-surface">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-container/30 text-on-primary-container"
            aria-hidden
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
            </svg>
          </span>
          Teammate history
        </h3>

        {emailMissing ? (
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Add the evaluatee&apos;s email on the first step to load prior submitted ECHO
            evaluations for this person.
          </p>
        ) : null}

        {!emailMissing && loadFailed ? (
          <p className="text-sm leading-relaxed text-on-surface-variant">
            History could not be loaded. Check Firestore rules for{" "}
            <code className="rounded bg-surface-container-low px-1 py-0.5 text-xs">echoEvaluationDrafts</code>
            .
          </p>
        ) : null}

        {!emailMissing && !loadFailed && isLoading ? (
          <p className="text-sm text-on-surface-variant">Loading history…</p>
        ) : null}

        {!emailMissing && !loadFailed && !isLoading && entries.length === 0 ? (
          <p className="text-sm leading-relaxed text-on-surface-variant">
            No completed evaluations with full GAINS on file yet for this teammate.
          </p>
        ) : null}

        {!emailMissing && !loadFailed && !isLoading && entries.length > 0 ? (
          <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-outline-variant/50 before:to-transparent">
            {entries.map((entry, index) => {
              const isFirst = index === 0;
              return (
                <div key={entry.key} className="relative flex items-start gap-4">
                  <div
                    className={
                      isFirst
                        ? "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-primary-container text-[10px] font-bold uppercase tracking-wide text-on-primary-container shadow-sm"
                        : "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-surface-variant text-[10px] font-bold uppercase tracking-wide text-on-surface-variant shadow-sm"
                    }
                    aria-hidden
                  >
                    {entry.quarterBadge}
                  </div>
                  <div
                    className={
                      isFirst
                        ? "flex-1 rounded-lg bg-surface-container-low p-3 shadow-sm"
                        : "flex-1 rounded-lg bg-surface-container-low p-3 opacity-80 shadow-sm"
                    }
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-on-surface">
                        {entry.pillarShortLabel}
                      </span>
                      <span
                        className={
                          isFirst
                            ? "text-xs font-semibold text-primary"
                            : "text-xs font-semibold text-on-surface-variant"
                        }
                      >
                        {entry.bandLabel}
                      </span>
                    </div>
                    <p className="mb-1 text-[10px] font-medium text-on-surface-variant">
                      {entry.cycleLabel}
                    </p>
                    <p className="text-[13px] leading-tight text-on-surface-variant">
                      {entry.summarySnippet.length > 0 ? entry.summarySnippet : "—"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </aside>
  );
};
