"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EchoDashboardCycleProgressCard } from "@/components/dashboard/EchoDashboardCycleProgressCard";
import { EchoDashboardInboxCard } from "@/components/dashboard/EchoDashboardInboxCard";
import { EchoAppPageHeader } from "@/components/shell/EchoAppPageHeader";
import { useEchoAuth } from "@/hooks/useEchoAuth";
import { readEchoDashboardCycleProgressProps } from "@/lib/dashboard/readEchoDashboardCycleProgressProps";
import { readEchoDashboardInboxCardViewModel } from "@/lib/dashboard/readEchoDashboardInboxCardViewModel";
import type { EchoEvaluationDocumentRecord } from "@/lib/firebase/echoEvaluationDocumentRecordType";
import { readEchoEvaluationDraftRecordsWhereEvaluateeEmail } from "@/lib/firebase/readEchoEvaluationDraftRecordsWhereEvaluateeEmail";
import { readEchoEvaluationDraftRecordsWhereEvaluatorEmail } from "@/lib/firebase/readEchoEvaluationDraftRecordsWhereEvaluatorEmail";
import { echoWizardDraftStorageKey } from "@/lib/echo/echoWizardDraftStorageKey";

type InboxTabId = "review" | "feedback" | "myEvals";

export const EchoDashboardHomeClient = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useEchoAuth();
  const [tabId, setTabId] = useState<InboxTabId>("feedback");
  const [inboxLoading, setInboxLoading] = useState(true);
  const [inboxError, setInboxError] = useState(false);
  const [forReviewRecords, setForReviewRecords] = useState<EchoEvaluationDocumentRecord[]>([]);
  const [feedbackRecords, setFeedbackRecords] = useState<EchoEvaluationDocumentRecord[]>([]);
  const [myEvalsRecords, setMyEvalsRecords] = useState<EchoEvaluationDocumentRecord[]>([]);

  const userEmail = user?.email?.trim() ?? "";
  const photoUrl = user?.photoURL ?? null;

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (userEmail.length === 0) {
      setForReviewRecords([]);
      setFeedbackRecords([]);
      setMyEvalsRecords([]);
      setInboxLoading(false);
      setInboxError(false);
      return;
    }

    let cancelled = false;
    setInboxLoading(true);
    setInboxError(false);

    void (async () => {
      try {
        const [byEvaluator, byEvaluatee] = await Promise.all([
          readEchoEvaluationDraftRecordsWhereEvaluatorEmail(userEmail),
          readEchoEvaluationDraftRecordsWhereEvaluateeEmail(userEmail),
        ]);
        if (cancelled) {
          return;
        }
        const draftsForMe = byEvaluator.filter((record) => record.payload.status === "draft");
        const submittedAboutMe = byEvaluatee.filter(
          (record) => record.payload.status === "submitted",
        );
        const outgoingByMe = byEvaluator.filter(
          (record) => record.payload.status === "draft" || record.payload.status === "submitted",
        );
        const sortedOutgoing = [...outgoingByMe].sort(
          (left, right) => right.payload.updatedAt.getTime() - left.payload.updatedAt.getTime(),
        );
        setForReviewRecords(draftsForMe);
        setFeedbackRecords(submittedAboutMe);
        setMyEvalsRecords(sortedOutgoing);
      } catch (error) {
        console.error("ECHO dashboard inbox failed to load.", error);
        if (!cancelled) {
          setInboxError(true);
          setForReviewRecords([]);
          setFeedbackRecords([]);
          setMyEvalsRecords([]);
        }
      } finally {
        if (!cancelled) {
          setInboxLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, userEmail]);

  let activeRecords: EchoEvaluationDocumentRecord[] = [];
  if (tabId === "review") {
    activeRecords = forReviewRecords;
  } else if (tabId === "feedback") {
    activeRecords = feedbackRecords;
  } else {
    activeRecords = myEvalsRecords;
  }

  let emptyTitle = "Nothing waiting for your review";
  let emptyBody =
    "In-progress evaluations you save while signed in appear here. Start or continue one from Create.";
  if (tabId === "feedback") {
    emptyTitle = "No feedback yet";
    emptyBody =
      "When someone submits an evaluation with your email as the evaluatee, it will show here.";
  } else if (tabId === "myEvals") {
    emptyTitle = "No sent evaluations yet";
    emptyBody =
      "Evaluations you complete and submit while signed in are listed here with the evaluatee you named.";
  }

  const openEvaluationDetail = useCallback(
    (documentId: string) => {
      router.push(`/dashboard/evaluation/${documentId}`);
    },
    [router],
  );

  const openDraftInWizard = useCallback(
    (documentId: string) => {
      window.localStorage.setItem(echoWizardDraftStorageKey, documentId);
      router.push(`/evaluation?draft=${encodeURIComponent(documentId)}`);
    },
    [router],
  );

  const submittedSentCount = myEvalsRecords.filter(
    (record) => record.payload.status === "submitted",
  ).length;

  const cycleProps = readEchoDashboardCycleProgressProps(
    feedbackRecords.length,
    submittedSentCount,
  );

  const hasUnreadReceived = feedbackRecords.some(
    (record) => record.payload.isRead !== true,
  );

  const renderFeed = () => {
    if (authLoading || inboxLoading) {
      return (
        <div className="rounded-xl border border-slate-200 bg-echo-elevated-card p-8 text-center text-sm text-on-surface-variant shadow-sm dark:border-slate-800">
          Loading inbox…
        </div>
      );
    }
    if (userEmail.length === 0) {
      return (
        <div className="rounded-xl border border-slate-200 bg-echo-elevated-card p-8 text-center shadow-sm dark:border-slate-800">
          <p className="font-semibold text-on-surface">Sign in to see your inbox</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            Your lists load from Firestore once authenticated.
          </p>
        </div>
      );
    }
    if (inboxError) {
      return (
        <div className="rounded-xl border border-slate-200 bg-echo-elevated-card p-8 text-center shadow-sm dark:border-slate-800">
          <p className="font-semibold text-on-surface">Could not load inbox</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            Check Firestore rules for list access on{" "}
            <code className="text-xs">echoEvaluationDrafts</code>, then refresh.
          </p>
        </div>
      );
    }
    if (activeRecords.length === 0) {
      return (
        <div className="rounded-xl border border-slate-200 bg-echo-elevated-card p-8 text-center shadow-sm dark:border-slate-800">
          <p className="font-semibold text-on-surface">{emptyTitle}</p>
          <p className="mt-2 text-sm text-on-surface-variant">{emptyBody}</p>
        </div>
      );
    }
    return (
      <ul className="flex flex-col gap-4">
        {activeRecords.map((record) => {
          const viewModel = readEchoDashboardInboxCardViewModel(record, tabId);
          const isSentDraft = tabId === "myEvals" && record.payload.status === "draft";
          const primaryLabel = tabId === "review" || isSentDraft ? "Continue" : "Open";
          const primaryHandler =
            tabId === "review" || isSentDraft
              ? () => {
                  openDraftInWizard(viewModel.documentId);
                }
              : () => {
                  openEvaluationDetail(viewModel.documentId);
                };
          const showUnreadIndicator =
            tabId === "feedback" &&
            record.payload.status === "submitted" &&
            record.payload.isRead !== true;
          return (
            <li key={viewModel.documentId}>
              <EchoDashboardInboxCard
                title={viewModel.title}
                snippet={viewModel.snippet}
                relativeTimeLabel={viewModel.relativeTimeLabel}
                fromLine={viewModel.fromLine}
                fromLineUsePlaceholderStyle={viewModel.fromLineUsePlaceholderStyle}
                snippetUsePlaceholderStyle={viewModel.snippetUsePlaceholderStyle}
                badgeLabel={viewModel.badgeLabel}
                badgeClassName={viewModel.badgeClassName}
                acePills={viewModel.acePills}
                primaryActionLabel={primaryLabel}
                onPrimaryAction={primaryHandler}
                showUnreadIndicator={showUnreadIndicator}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="pb-10">
      <div className="sticky top-0 z-40 -mx-6 mb-6 border-b border-slate-200/80 bg-white/80 px-6 pb-4 pt-1 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b1120]/70 lg:-mx-8 lg:px-8">
        <EchoAppPageHeader
          title="Dashboard"
          description="Your Evaluations: View your drafts and shared feedback."
          omitOuterMargin
          trailing={
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-outline-variant/50 bg-echo-card">
              {photoUrl !== null ? (
                <Image src={photoUrl} alt="" width={40} height={40} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-primary">
                  {userEmail.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
          }
        />

        <div className="mt-4 flex gap-6 text-sm font-semibold" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tabId === "feedback"}
            onClick={() => {
              setTabId("feedback");
            }}
            className={`relative rounded-sm pb-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-echo-main-canvas ${
              tabId === "feedback"
                ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Received
            {hasUnreadReceived ? (
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            ) : null}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tabId === "myEvals"}
            onClick={() => {
              setTabId("myEvals");
            }}
            className={`relative rounded-sm pb-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-echo-main-canvas ${
              tabId === "myEvals"
                ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sent
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tabId === "review"}
            onClick={() => {
              setTabId("review");
            }}
            className={`relative rounded-sm pb-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-echo-main-canvas ${
              tabId === "review"
                ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Review
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
        <div className="min-w-0">{renderFeed()}</div>
        {userEmail.length > 0 && !inboxError ? (
          <div className="mt-8 min-w-0 lg:mt-0">
            <EchoDashboardCycleProgressCard
              receivedCount={cycleProps.receivedCount}
              receivedGoal={cycleProps.receivedGoal}
              sentCount={cycleProps.sentCount}
              sentGoal={cycleProps.sentGoal}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
