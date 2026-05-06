"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EchoEvaluationEvaluateeReadOnlyContent } from "@/components/evaluation/EchoEvaluationEvaluateeReadOnlyContent";
import { EchoEvaluationDialogueThread } from "@/components/evaluation/EchoEvaluationDialogueThread";
import { useEchoAuth } from "@/hooks/useEchoAuth";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoObservationForPlainDisplay } from "@/lib/echo/readEchoObservationForPlainDisplay";
import { readEchoUserCanAccessEvaluationPayload } from "@/lib/evaluation/readEchoUserCanAccessEvaluationPayload";
import { readEchoEvaluationDraft } from "@/lib/firebase/readEchoEvaluationDraft";
import type { EchoEvaluationDraftFirestorePayload } from "@/lib/firebase/readEchoEvaluationDraft";
import { updateEchoEvaluateeEvaluationRead } from "@/lib/firebase/updateEchoEvaluateeEvaluationRead";

type EchoEvaluationDetailShellProps = {
  evaluationId: string;
};

const evaluationDashboardBackClassName =
  "inline-flex shrink-0 items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest/80 px-4 py-2 text-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-echo-main-canvas";

export const EchoEvaluationDetailShell = ({ evaluationId }: EchoEvaluationDetailShellProps) => {
  const { user, loading: authLoading } = useEchoAuth();
  const [payload, setPayload] = useState<EchoEvaluationDraftFirestorePayload | null | undefined>(
    undefined,
  );
  const [loadError, setLoadError] = useState(false);

  const userEmail = user?.email?.trim() ?? "";

  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    setPayload(undefined);

    void (async () => {
      try {
        const record = await readEchoEvaluationDraft(evaluationId);
        if (!cancelled) {
          setPayload(record);
        }
      } catch (error) {
        console.error("ECHO evaluation detail failed to load.", error);
        if (!cancelled) {
          setLoadError(true);
          setPayload(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [evaluationId]);

  const normalizedViewerEmail = userEmail.trim().toLowerCase();
  const payloadEvaluateeLower =
    payload !== undefined && payload !== null
      ? payload.evaluateeEmail.trim().toLowerCase()
      : "";
  const isEvaluateeViewingSubmitted =
    payload !== undefined &&
    payload !== null &&
    payload.status === "submitted" &&
    payloadEvaluateeLower.length > 0 &&
    normalizedViewerEmail === payloadEvaluateeLower;

  const shouldMarkEvaluateeRead =
    userEmail.trim().length > 0 &&
    isEvaluateeViewingSubmitted &&
    payload !== undefined &&
    payload !== null &&
    payload.isRead !== true;

  useEffect(() => {
    if (!shouldMarkEvaluateeRead) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        await updateEchoEvaluateeEvaluationRead(evaluationId);
        if (!cancelled) {
          setPayload((previous) =>
            previous !== undefined && previous !== null
              ? { ...previous, isRead: true }
              : previous,
          );
        }
      } catch (error) {
        console.error("ECHO evaluatee failed to mark evaluation read.", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [evaluationId, shouldMarkEvaluateeRead]);

  if (authLoading || payload === undefined) {
    return (
      <div className="py-10 text-center text-on-surface-variant">
        Loading evaluation…
      </div>
    );
  }

  if (loadError || payload === null) {
    return (
      <div className="py-10">
        <p className="font-semibold text-on-surface">Evaluation not found</p>
        <Link href="/dashboard" className={`${evaluationDashboardBackClassName} mt-4`}>
          <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Back to dashboard
        </Link>
      </div>
    );
  }

  const canView = readEchoUserCanAccessEvaluationPayload(userEmail, payload);

  if (!canView) {
    return (
      <div className="py-10">
        <p className="font-semibold text-on-surface">You do not have access to this evaluation.</p>
        <Link href="/dashboard" className={`${evaluationDashboardBackClassName} mt-4`}>
          <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Back to dashboard
        </Link>
      </div>
    );
  }

  const evaluateeName = payload.evaluateeName.trim();
  const title = evaluateeName.length > 0 ? evaluateeName : "Evaluatee";

  const readOnlyFormState: EchoWizardFormState = {
    evaluateeName: payload.evaluateeName,
    evaluateeEmail: payload.evaluateeEmail,
    isAnonymous: payload.isAnonymous,
    relationshipType: payload.relationshipType,
    evaluationReason: payload.evaluationReason,
    aptitudeObservations: readEchoObservationForPlainDisplay(payload.aptitudeObservations),
    characterObservations: readEchoObservationForPlainDisplay(payload.characterObservations),
    effectivenessObservations: readEchoObservationForPlainDisplay(
      payload.effectivenessObservations,
    ),
    gainsRatings: payload.gainsRatings,
  };

  return (
    <div className="py-8">
      <div className="flex items-start justify-between gap-4 border-b border-outline-variant/40 pb-6">
        <header className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Evaluation</p>
          <h1 className="mt-2 text-2xl font-bold text-on-surface">{title}</h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Status: <span className="font-semibold text-on-surface">{payload.status}</span> · Type:{" "}
            <span className="font-semibold text-on-surface">
              {payload.relationshipType === "" ? "—" : payload.relationshipType}
            </span>
          </p>
          {payload.isAnonymous ? (
            <p className="mt-2 text-sm text-on-surface-variant">
              Peer anonymity is on — evaluatee-facing surfaces show{" "}
              <span className="font-medium text-on-surface">Anonymous Teammate</span> for the
              evaluator.
            </p>
          ) : null}
        </header>
        <Link
          href="/dashboard"
          className={evaluationDashboardBackClassName}
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Dashboard
        </Link>
      </div>

      <section className="mt-8 rounded-2xl border border-outline-variant/35 bg-echo-card p-5 shadow-[var(--shadow-echo-card)]">
        <h2 className="text-lg font-semibold text-on-surface">Reason</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-on-surface-variant">
          {payload.evaluationReason.trim().length > 0 ? payload.evaluationReason : "—"}
        </p>
      </section>

      {isEvaluateeViewingSubmitted ? (
        <div className="mt-8">
          <EchoEvaluationEvaluateeReadOnlyContent formState={readOnlyFormState} />
        </div>
      ) : null}

      <div className="mt-8">
        <EchoEvaluationDialogueThread
          evaluationId={evaluationId}
          evaluation={payload}
          currentUserUid={user?.uid ?? null}
          currentUserDisplayName={user?.displayName ?? null}
          currentUserEmail={userEmail.length > 0 ? userEmail : "—"}
          isComposerDisabled={userEmail.length === 0}
        />
      </div>
    </div>
  );
};
