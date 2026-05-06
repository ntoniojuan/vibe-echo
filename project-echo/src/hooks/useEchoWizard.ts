"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { withTimeout } from "@/lib/async/withTimeout";
import { createInitialEchoWizardFormState } from "@/lib/echo/createInitialEchoWizardFormState";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { echoWizardDraftStorageKey } from "@/lib/echo/echoWizardDraftStorageKey";
import { readEchoEvaluationDraft } from "@/lib/firebase/readEchoEvaluationDraft";
import { updateEchoEvaluationDraft } from "@/lib/firebase/updateEchoEvaluationDraft";
import { readEchoObservationForPlainDisplay } from "@/lib/echo/readEchoObservationForPlainDisplay";
import { readEchoAceStepKeyFromWizardStepIndex } from "@/lib/echo/readEchoAceStepKeyFromWizardStepIndex";
import { readEchoAreAceStepGainsComplete } from "@/lib/echo/readEchoAreAceStepGainsComplete";
import { readEchoAreAllGainsRatingsComplete } from "@/lib/echo/readEchoAreAllGainsRatingsComplete";
import { readEchoIsEvaluateeGeneralInfoComplete } from "@/lib/echo/readEchoIsEvaluateeGeneralInfoComplete";
import { useToast } from "@/hooks/useToast";

const lastStepIndex = 4;
const remoteDraftLoadTimeoutMs = 20_000;

export const useEchoWizard = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftFromQuery = searchParams.get("draft")?.trim() ?? "";

  const [stepIndex, setStepIndex] = useState(0);
  const [formState, setFormState] = useState(createInitialEchoWizardFormState);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [aceRatingsStepError, setAceRatingsStepError] = useState<string | null>(null);
  const [summaryAccuracyAcknowledged, setSummaryAccuracyAcknowledged] = useState(false);
  const shouldSetCreatedAtRef = useRef(true);
  const isDirtyRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    const nextDraftId =
      draftFromQuery.length > 0
        ? draftFromQuery
        : (window.localStorage.getItem(echoWizardDraftStorageKey) ?? crypto.randomUUID());
    if (draftFromQuery.length > 0) {
      window.localStorage.setItem(echoWizardDraftStorageKey, draftFromQuery);
    } else if (!window.localStorage.getItem(echoWizardDraftStorageKey)) {
      window.localStorage.setItem(echoWizardDraftStorageKey, nextDraftId);
    }
    setDraftId(nextDraftId);

    const mergeRemoteDraftWhenReady = async () => {
      try {
        const existingDraft = await withTimeout(
          readEchoEvaluationDraft(nextDraftId),
          remoteDraftLoadTimeoutMs,
          "Remote draft load timed out.",
        );

        if (isCancelled || isDirtyRef.current) {
          return;
        }

        const storedIdNow = window.localStorage.getItem(echoWizardDraftStorageKey);
        if (storedIdNow !== nextDraftId) {
          return;
        }

        if (!existingDraft) {
          return;
        }

        setFormState({
          evaluateeName: existingDraft.evaluateeName,
          evaluateeEmail: existingDraft.evaluateeEmail,
          isAnonymous: existingDraft.isAnonymous,
          relationshipType: existingDraft.relationshipType,
          evaluationReason: existingDraft.evaluationReason,
          aptitudeObservations: readEchoObservationForPlainDisplay(
            existingDraft.aptitudeObservations,
          ),
          characterObservations: readEchoObservationForPlainDisplay(
            existingDraft.characterObservations,
          ),
          effectivenessObservations: readEchoObservationForPlainDisplay(
            existingDraft.effectivenessObservations,
          ),
          gainsRatings: existingDraft.gainsRatings,
        });
        const safeStepIndex = Math.min(
          Math.max(existingDraft.currentStepIndex, 0),
          lastStepIndex,
        );
        setStepIndex(safeStepIndex);
        shouldSetCreatedAtRef.current = false;
      } catch (error) {
        console.error("ECHO wizard could not load draft from Firestore (background).", error);
      }
    };

    void mergeRemoteDraftWhenReady();

    return () => {
      isCancelled = true;
    };
  }, [draftFromQuery]);

  useEffect(() => {
    if (stepIndex !== lastStepIndex) {
      setSummaryAccuracyAcknowledged(false);
    }
  }, [stepIndex]);

  const updateFormState = useCallback((partial: Partial<EchoWizardFormState>) => {
    isDirtyRef.current = true;
    setFormState((previous) => ({ ...previous, ...partial }));
  }, []);

  const persistDraft = useCallback(
    async (nextStepIndex: number, snapshot: EchoWizardFormState) => {
      if (!draftId) {
        return;
      }
      await updateEchoEvaluationDraft({
        evaluationDraftId: draftId,
        currentStepIndex: nextStepIndex,
        status: "draft",
        shouldSetCreatedAt: shouldSetCreatedAtRef.current,
        ...snapshot,
      });
      shouldSetCreatedAtRef.current = false;
    },
    [draftId],
  );

  const goToStep = useCallback((nextStepIndex: number) => {
    const safeIndex = Math.min(Math.max(nextStepIndex, 0), lastStepIndex);
    setAceRatingsStepError(null);
    setStepIndex(safeIndex);
  }, []);

  const goBack = useCallback(() => {
    setAceRatingsStepError(null);
    setStepIndex((current) => Math.max(current - 1, 0));
  }, []);

  const dismissAceRatingsError = useCallback(() => {
    setAceRatingsStepError(null);
  }, []);

  const goNext = useCallback(async () => {
    if (draftId === null || isSaving) {
      return;
    }
    if (stepIndex >= lastStepIndex) {
      return;
    }

    if (stepIndex === 0 && !readEchoIsEvaluateeGeneralInfoComplete(formState)) {
      setAceRatingsStepError(null);
      showToast("Complete all general information fields before continuing.", "error");
      return;
    }

    const aceStepKey = readEchoAceStepKeyFromWizardStepIndex(stepIndex);
    if (aceStepKey !== null && !readEchoAreAceStepGainsComplete(aceStepKey, formState)) {
      setAceRatingsStepError("Rate every sub-competency on this page before continuing.");
      showToast("Select a GAINS rating for each sub-competency.", "error");
      return;
    }

    setAceRatingsStepError(null);
    setIsSaving(true);
    const nextStepIndex = Math.min(stepIndex + 1, lastStepIndex);
    try {
      await persistDraft(nextStepIndex, formState);
      showToast("Draft saved.", "success");
      setStepIndex(nextStepIndex);
    } catch (error) {
      console.error("ECHO wizard failed to save draft.", error);
      showToast("Draft could not be saved. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  }, [draftId, formState, isSaving, persistDraft, showToast, stepIndex]);

  const submitEchoEvaluation = useCallback(async () => {
    if (draftId === null || isSaving) {
      return;
    }
    if (!readEchoIsEvaluateeGeneralInfoComplete(formState)) {
      showToast("General information is incomplete. Edit the first step.", "error");
      return;
    }
    if (!readEchoAreAllGainsRatingsComplete(formState)) {
      showToast("All twelve GAINS ratings are required before submit.", "error");
      return;
    }
    if (!summaryAccuracyAcknowledged) {
      showToast(
        "Please confirm that your responses are true and accurate before submitting.",
        "error",
      );
      return;
    }
    setIsSaving(true);
    try {
      await updateEchoEvaluationDraft({
        evaluationDraftId: draftId,
        currentStepIndex: lastStepIndex,
        status: "submitted",
        shouldSetCreatedAt: false,
        ...formState,
      });
      const nextDraftId = crypto.randomUUID();
      window.localStorage.setItem(echoWizardDraftStorageKey, nextDraftId);
      shouldSetCreatedAtRef.current = true;
      isDirtyRef.current = false;
      router.replace("/evaluation/submitted");
    } catch (error) {
      console.error("ECHO wizard failed to submit evaluation.", error);
      showToast("Submission failed. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  }, [
    draftId,
    formState,
    isSaving,
    showToast,
    summaryAccuracyAcknowledged,
    router,
  ]);

  return {
    stepIndex,
    formState,
    updateFormState,
    isSaving,
    draftId,
    aceRatingsStepError,
    dismissAceRatingsError,
    goBack,
    goNext,
    goToStep,
    submitEchoEvaluation,
    summaryAccuracyAcknowledged,
    setSummaryAccuracyAcknowledged,
  };
};
