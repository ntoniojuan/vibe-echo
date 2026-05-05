"use client";

import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoGainsSummaryRowsForAceStep } from "@/lib/echo/readEchoGainsSummaryRowsForAceStep";

const cardClass =
  "rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-[var(--shadow-echo-card)]";

type EchoEvaluationEvaluateeReadOnlyContentProps = {
  formState: EchoWizardFormState;
};

export const EchoEvaluationEvaluateeReadOnlyContent = ({
  formState,
}: EchoEvaluationEvaluateeReadOnlyContentProps) => {
  const aptitudeRatings = readEchoGainsSummaryRowsForAceStep(formState, "aptitude");
  const characterRatings = readEchoGainsSummaryRowsForAceStep(formState, "character");
  const effectivenessRatings = readEchoGainsSummaryRowsForAceStep(
    formState,
    "effectiveness",
  );

  return (
    <div className="space-y-6">
      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-on-surface">Aptitude (Head)</h2>
        <ul className="mb-4 mt-4 space-y-2 border-b border-outline-variant/40 pb-4">
          {aptitudeRatings.map((row) => (
            <li
              key={row.code}
              className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
            >
              <span className="font-semibold text-on-surface">
                <span className="text-primary">{row.code}</span> {row.title}
              </span>
              <span className="shrink-0 text-on-surface-variant">{row.ratingLabel}</span>
            </li>
          ))}
        </ul>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface-variant">
          {formState.aptitudeObservations.trim().length > 0
            ? formState.aptitudeObservations
            : "—"}
        </p>
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-on-surface">Character (Heart)</h2>
        <ul className="mb-4 mt-4 space-y-2 border-b border-outline-variant/40 pb-4">
          {characterRatings.map((row) => (
            <li
              key={row.code}
              className="flex flex-col items-baseline justify-between gap-2 text-sm sm:flex-row sm:items-center"
            >
              <span className="font-semibold text-on-surface">
                <span className="text-primary">{row.code}</span> {row.title}
              </span>
              <span className="shrink-0 text-on-surface-variant">{row.ratingLabel}</span>
            </li>
          ))}
        </ul>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface-variant">
          {formState.characterObservations.trim().length > 0
            ? formState.characterObservations
            : "—"}
        </p>
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-on-surface">Effectiveness (Hands)</h2>
        <ul className="mb-4 mt-4 space-y-2 border-b border-outline-variant/40 pb-4">
          {effectivenessRatings.map((row) => (
            <li
              key={row.code}
              className="flex flex-col items-baseline justify-between gap-2 text-sm sm:flex-row sm:items-center"
            >
              <span className="font-semibold text-on-surface">
                <span className="text-primary">{row.code}</span> {row.title}
              </span>
              <span className="shrink-0 text-on-surface-variant">{row.ratingLabel}</span>
            </li>
          ))}
        </ul>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface-variant">
          {formState.effectivenessObservations.trim().length > 0
            ? formState.effectivenessObservations
            : "—"}
        </p>
      </section>
    </div>
  );
};
