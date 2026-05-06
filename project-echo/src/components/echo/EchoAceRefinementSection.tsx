"use client";

import { useEffect, useRef, useState } from "react";
import type { RefinementMcqItem } from "@/lib/refinement/refinementMcqZod";
import { readRefinementFetchJsonBody } from "@/lib/api/readRefinementFetchJsonBody";
import { useToast } from "@/hooks/useToast";
import { EchoRefinementMinimalLoader } from "@/components/echo/EchoRefinementMinimalLoader";
import { readPlainTextFromEchoObservationHtml } from "@/lib/echo/readPlainTextFromEchoObservationHtml";

const refinementClientMcqCooldownMs = 2_500;
const refinementClientApplyCooldownMs = 2_500;

const readRefinementClientHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const key = process.env.NEXT_PUBLIC_ECHO_REFINEMENT_KEY?.trim();
  if (key) {
    headers["x-echo-refinement-key"] = key;
  }
  return headers;
};

type EchoAceRefinementSectionProps = {
  draftId: string;
  aceCategory: string;
  rawNotes: string;
  /** Server returns the full observation field after Firestore append; local state is replaced with that authoritative string. */
  onSyncObservationsFromRefinement: (nextValue: string) => void;
  onRefinementBusyChange?: (busy: boolean) => void;
  containerClassName?: string;
};

export const EchoAceRefinementSection = ({
  draftId,
  aceCategory,
  rawNotes,
  onSyncObservationsFromRefinement,
  onRefinementBusyChange,
  containerClassName,
}: EchoAceRefinementSectionProps) => {
  const { showToast } = useToast();
  const [phase, setPhase] = useState<"idle" | "generating" | "quiz" | "applying">("idle");
  const [mcqs, setMcqs] = useState<RefinementMcqItem[]>([]);
  const [selectedByIndex, setSelectedByIndex] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const lastMcqRequestAtRef = useRef(0);
  const lastApplyRequestAtRef = useRef(0);

  const isRefinementBusy = phase === "generating" || phase === "applying";
  const showApplyingProgressBar = phase === "applying";

  useEffect(() => {
    onRefinementBusyChange?.(isRefinementBusy);
  }, [isRefinementBusy, onRefinementBusyChange]);

  const requestMcqs = async () => {
    const plainForGate = readPlainTextFromEchoObservationHtml(rawNotes).trim();
    if (plainForGate.length < 3) {
      showToast("Add a few words in observations before refining.", "error");
      return;
    }
    const mcqNow = Date.now();
    if (mcqNow - lastMcqRequestAtRef.current < refinementClientMcqCooldownMs) {
      showToast("Please wait a couple seconds between refine requests.", "error");
      return;
    }
    lastMcqRequestAtRef.current = mcqNow;
    setPhase("generating");
    try {
      const response = await fetch("/api/echo/refinement/mcqs", {
        method: "POST",
        headers: readRefinementClientHeaders(),
        body: JSON.stringify({ rawNotes: rawNotes.trim(), aceCategory }),
      });
      const parsed = await readRefinementFetchJsonBody(response);
      if (!parsed.success) {
        showToast(parsed.message, "error");
        setPhase("idle");
        return;
      }
      const payload = parsed.payload;
      if (!response.ok) {
        const message =
          typeof payload === "object" &&
          payload &&
          "error" in payload &&
          typeof (payload as { error: unknown }).error === "string"
            ? (payload as { error: string }).error
            : "Could not generate questions.";
        showToast(message, "error");
        setPhase("idle");
        return;
      }
      const items =
        typeof payload === "object" &&
        payload &&
        "items" in payload &&
        Array.isArray((payload as { items: unknown }).items)
          ? (payload as { items: RefinementMcqItem[] }).items
          : [];
      if (items.length !== 5) {
        showToast("Unexpected response from refinement API.", "error");
        setPhase("idle");
        return;
      }
      setMcqs(items);
      setSelectedByIndex(["", "", "", "", ""]);
      setPhase("quiz");
    } catch (error) {
      console.error("Refinement MCQ request failed.", error);
      showToast("Network error while contacting refinement API.", "error");
      setPhase("idle");
    }
  };

  const applyRefinement = async () => {
    const missingIndex = selectedByIndex.findIndex((value) => value.length === 0);
    if (missingIndex >= 0) {
      showToast("Please answer every question.", "error");
      return;
    }
    const applyNow = Date.now();
    if (applyNow - lastApplyRequestAtRef.current < refinementClientApplyCooldownMs) {
      showToast("Please wait a couple seconds before applying again.", "error");
      return;
    }
    lastApplyRequestAtRef.current = applyNow;
    setPhase("applying");
    try {
      const response = await fetch("/api/echo/refinement/apply", {
        method: "POST",
        headers: readRefinementClientHeaders(),
        body: JSON.stringify({
          draftId,
          rawNotes: rawNotes.trim(),
          aceCategory,
          mcqs,
          answers: selectedByIndex,
        }),
      });
      const parsedApply = await readRefinementFetchJsonBody(response);
      if (!parsedApply.success) {
        showToast(parsedApply.message, "error");
        setPhase("quiz");
        return;
      }
      const payload = parsedApply.payload;
      if (!response.ok) {
        const message =
          typeof payload === "object" &&
          payload &&
          "error" in payload &&
          typeof (payload as { error: unknown }).error === "string"
            ? (payload as { error: string }).error
            : "Could not apply refinement.";
        showToast(message, "error");
        setPhase("quiz");
        return;
      }
      const fullObservationValue =
        typeof payload === "object" &&
        payload &&
        "fullObservationValue" in payload &&
        typeof (payload as { fullObservationValue: unknown }).fullObservationValue === "string"
          ? (payload as { fullObservationValue: string }).fullObservationValue
          : null;
      if (!fullObservationValue) {
        showToast("Refinement did not return updated text.", "error");
        setPhase("quiz");
        return;
      }
      onSyncObservationsFromRefinement(fullObservationValue);
      setMcqs([]);
      setSelectedByIndex(["", "", "", "", ""]);
      setPhase("idle");
      showToast("Structured refinement added to your observations.", "success");
    } catch (error) {
      console.error("Refinement apply failed.", error);
      showToast("Network error while applying refinement.", "error");
      setPhase("quiz");
    }
  };

  const showPrimaryButton = phase === "idle" || phase === "generating";

  const surfaceClasses =
    containerClassName ??
    "rounded-2xl border border-outline-variant/40 bg-surface-container-low/60 p-4";

  return (
    <div className={surfaceClasses}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-on-surface">AI refinement</h3>
          <p className="text-xs text-on-surface-variant">
            Answer 5 questions to refine your feedback. Original notes will be preserved.
          </p>
        </div>
        {showPrimaryButton ? (
          <button
            type="button"
            disabled={phase === "generating"}
            onClick={() => {
              void requestMcqs();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary-strong px-4 py-2 text-xs font-bold uppercase tracking-wide text-on-primary-strong shadow-sm transition-colors hover:bg-[#1f2f1f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {phase === "generating" ? "Generating…" : "Refine with AI"}
          </button>
        ) : null}
      </div>

      <EchoRefinementMinimalLoader isVisible={phase === "generating"} />

      {showApplyingProgressBar ? (
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-outline-variant/35"
          aria-hidden
        >
          <div className="h-full w-full animate-pulse bg-primary/75" />
        </div>
      ) : null}

      {phase === "quiz" || phase === "applying" ? (
        <div className="mt-4 space-y-4 border-t border-outline-variant/30 pt-4">
          {mcqs.map((item, questionIndex) => (
            <div key={`${questionIndex}-${item.question.slice(0, 12)}`}>
              <p className="text-sm font-medium text-on-surface">{item.question}</p>
              <div className="mt-2 space-y-2">
                {item.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-outline-variant/40 px-3 py-2 text-sm text-on-surface hover:bg-surface-container-lowest"
                  >
                    <input
                      type="radio"
                      name={`refine-q-${questionIndex}`}
                      value={option}
                      checked={selectedByIndex[questionIndex] === option}
                      disabled={phase === "applying"}
                      onChange={() => {
                        setSelectedByIndex((previous) => {
                          const next = [...previous];
                          next[questionIndex] = option;
                          return next;
                        });
                      }}
                      className="accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              disabled={phase === "applying"}
              onClick={() => {
                setPhase("idle");
                setMcqs([]);
              }}
              className="rounded-full border border-outline px-4 py-2 text-sm font-medium text-on-surface disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                void applyRefinement();
              }}
              disabled={phase === "applying"}
              className="rounded-full bg-[#4A634A] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#D1DCD1] hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {phase === "applying" ? "Applying…" : "Apply refinement"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
