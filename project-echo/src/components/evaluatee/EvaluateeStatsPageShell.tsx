"use client";

import { useEffect, useState } from "react";
import { EvaluateeGrowthAnalyticsEmptyState } from "@/components/evaluatee/EvaluateeGrowthAnalyticsEmptyState";
import { EvaluateeStatsDashboard } from "@/components/evaluatee/EvaluateeStatsDashboard";
import { useEchoAuth } from "@/hooks/useEchoAuth";
import type { EvaluateeStatsDashboardProps } from "@/lib/evaluatee/evaluateeStatsDashboardProps";
import { readGrowthAnalyticsFromEvaluationDrafts } from "@/lib/evaluatee/readGrowthAnalyticsFromEvaluationDrafts";
import { readSubmittedEchoEvaluationDraftsForEvaluateeEmail } from "@/lib/firebase/readSubmittedEchoEvaluationDraftsForEvaluateeEmail";

export const EvaluateeStatsPageShell = () => {
  const { user, loading } = useEchoAuth();
  const [statsProps, setStatsProps] = useState<EvaluateeStatsDashboardProps | null>(null);
  const [submittedEvalCount, setSubmittedEvalCount] = useState(0);
  const [fetchError, setFetchError] = useState(false);
  const [fetchFinished, setFetchFinished] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    const email = user?.email?.trim() ?? "";
    if (email.length === 0) {
      setStatsProps(null);
      setSubmittedEvalCount(0);
      setFetchError(false);
      setFetchFinished(true);
      return;
    }

    let cancelled = false;
    setFetchFinished(false);

    const currentUser = user;

    void (async () => {
      try {
        const drafts = await readSubmittedEchoEvaluationDraftsForEvaluateeEmail(email);
        if (cancelled) {
          return;
        }
        const trimmedDisplayName = currentUser?.displayName?.trim();
        const displayName =
          trimmedDisplayName && trimmedDisplayName.length > 0
            ? trimmedDisplayName
            : email.split("@")[0] ?? "Evaluatee";
        const { dashboardProps, matchingSubmittedCount } = readGrowthAnalyticsFromEvaluationDrafts(
          displayName,
          drafts,
        );
        setStatsProps(dashboardProps);
        setSubmittedEvalCount(matchingSubmittedCount);
        setFetchError(false);
      } catch (error) {
        console.error("ECHO Growth analytics could not load Firestore evaluations.", error);
        if (cancelled) {
          return;
        }
        setFetchError(true);
        setStatsProps(null);
        setSubmittedEvalCount(0);
      } finally {
        if (!cancelled) {
          setFetchFinished(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  const readEvaluateeFirstName = (): string | undefined => {
    const raw = user?.displayName?.trim();
    if (!raw) {
      return undefined;
    }
    const firstToken = raw.split(/\s+/)[0];
    return firstToken && firstToken.length > 0 ? firstToken : undefined;
  };

  if (loading || !fetchFinished) {
    return (
      <div className="px-4 py-6 text-on-surface-variant sm:px-6">Loading Growth analytics…</div>
    );
  }

  const authEmail = user?.email?.trim() ?? "";
  const isSignedOut = authEmail.length === 0;

  if (isSignedOut) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <EvaluateeGrowthAnalyticsEmptyState variant="signedOut" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <p className="mb-6 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
          Growth analytics could not load evaluations. Check the console and Firestore rules for
          list access on `echoEvaluationDrafts`, then refresh this page.
        </p>
        <EvaluateeGrowthAnalyticsEmptyState
          variant="signedInNoSubmissions"
          evaluateeFirstName={readEvaluateeFirstName()}
        />
      </div>
    );
  }

  if (statsProps === null) {
    const emptyVariant =
      submittedEvalCount === 0 ? "signedInNoSubmissions" : "signedInEvaluationsIncomplete";
    return (
      <div className="px-4 py-6 sm:px-6">
        <EvaluateeGrowthAnalyticsEmptyState
          variant={emptyVariant}
          evaluateeFirstName={readEvaluateeFirstName()}
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6">
      <EvaluateeStatsDashboard {...statsProps} />
    </div>
  );
};
