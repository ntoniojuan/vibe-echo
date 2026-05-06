import { useState } from "react";
import { EchoAceRefinementSection } from "@/components/echo/EchoAceRefinementSection";
import { EchoAceStepPillarIcon } from "@/components/echo/EchoAceStepPillarIcon";
import { aceStepContent } from "@/lib/echo/aceStepContent";
import type { EchoAceStepKey } from "@/lib/echo/echoAceStepKeyType";
import { readEchoGainsLevelRadioOptions } from "@/lib/echo/readEchoGainsLevelRadioOptions";
import { readEchoGainsSubcompetencyRowsForAceStep } from "@/lib/echo/readEchoGainsSubcompetencyRowsForAceStep";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import type { GainsLevel } from "@/lib/echo/gainsLevelType";

const echoGainsLevelRadioOptions = readEchoGainsLevelRadioOptions();

const echoAceGlassCardClass =
  "relative overflow-hidden rounded-xl border border-slate-200 bg-echo-elevated-card p-6 shadow-sm dark:border-slate-800";

type EchoAceStepProps = {
  aceKey: EchoAceStepKey;
  draftId: string;
  stepNumber: number;
  totalSteps: number;
  observations: string;
  onObservationsChange: (value: string) => void;
  gainsRatings: Partial<Record<GainsSubcompetencyCode, GainsLevel>>;
  onGainsRatingChange: (code: GainsSubcompetencyCode, level: GainsLevel) => void;
  aceRatingsStepError: string | null;
};

export const EchoAceStep = ({
  aceKey,
  draftId,
  stepNumber,
  totalSteps,
  observations,
  onObservationsChange,
  gainsRatings,
  onGainsRatingChange,
  aceRatingsStepError,
}: EchoAceStepProps) => {
  const content = aceStepContent[aceKey];
  const rows = readEchoGainsSubcompetencyRowsForAceStep(aceKey);
  const [isRefinementBusy, setIsRefinementBusy] = useState(false);

  return (
    <div className="flex w-full min-w-0 flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container shadow-sm">
          <EchoAceStepPillarIcon aceKey={aceKey} />
        </div>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
            Step {String(stepNumber)} of {String(totalSteps)}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-on-surface">
            {content.title}{" "}
            <span className="text-2xl font-normal text-on-surface-variant">{content.subtitle}</span>
          </h1>
        </div>
      </div>

      <p className="text-lg leading-relaxed text-on-surface-variant">{content.definition}</p>

      {aceRatingsStepError ? (
        <p
          role="alert"
          className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface"
        >
          {aceRatingsStepError}
        </p>
      ) : null}

      <p className="text-sm text-on-surface-variant">
        Select the appropriate rating on the GAINS scale for each sub-competency (G = Greatly
        exceeds … S = Severely underdelivers). Full labels appear on hover or focus.
      </p>

      <div className="grid grid-cols-1 gap-6">
        {rows.map((row, rowIndex) => {
          const accentClass =
            rowIndex === 0 ? "bg-primary-container" : "bg-outline-variant";
          return (
            <div key={row.code} className={`${echoAceGlassCardClass} group`}>
              <div className={`absolute top-0 left-0 h-full w-1 ${accentClass}`} aria-hidden />
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div className="min-w-0 flex-1 pl-2">
                  <h3 className="mb-2 text-[22px] font-semibold leading-snug text-on-surface">
                    {row.code}: {row.title}
                  </h3>
                  <p className="text-base leading-relaxed text-on-surface-variant">
                    {row.description}
                  </p>
                </div>
                <fieldset
                  id={`gains-field-${row.code}`}
                  className="w-full shrink-0 rounded-lg bg-surface-container-low p-2 shadow-inner md:w-auto"
                >
                  <legend className="sr-only">
                    GAINS rating for {row.code} {row.title}
                  </legend>
                  <div className="flex items-center justify-between gap-2 md:justify-start">
                    {echoGainsLevelRadioOptions.map((option) => {
                      const inputId = `gains-${row.code}-${String(option.value)}`;
                      const isChecked = gainsRatings[row.code] === option.value;
                      return (
                        <label
                          key={option.value}
                          htmlFor={inputId}
                          title={option.label}
                          className={
                            isChecked
                              ? "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-xs font-bold uppercase tracking-wide text-on-primary shadow-sm"
                              : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-outline-variant text-xs font-bold uppercase tracking-wide text-on-surface-variant transition-colors hover:bg-surface-variant"
                          }
                        >
                          <input
                            id={inputId}
                            className="sr-only"
                            type="radio"
                            name={`gains-${row.code}`}
                            value={String(option.value)}
                            checked={isChecked}
                            onChange={() => {
                              onGainsRatingChange(row.code, option.value);
                            }}
                          />
                          {option.letter}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${echoAceGlassCardClass} relative mt-0`}>
        {isRefinementBusy ? (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-surface-container-lowest/85 backdrop-blur-sm"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div
              className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
              aria-hidden
            />
            <p className="px-4 text-center text-sm font-medium text-on-surface">
              Refining with AI…
            </p>
          </div>
        ) : null}
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h3 className="flex items-center gap-2 text-[22px] font-semibold leading-snug text-on-surface">
            <svg
              className="h-6 w-6 shrink-0 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            Raw observations
          </h3>
        </div>
        <label className="sr-only" htmlFor={`echo-ace-observations-${aceKey}`}>
          {content.observationsLabel}
        </label>
        <textarea
          id={`echo-ace-observations-${aceKey}`}
          value={observations}
          disabled={isRefinementBusy}
          onChange={(event) => {
            onObservationsChange(event.target.value);
          }}
          rows={6}
          className="h-32 w-full resize-none rounded-lg border border-outline-variant bg-surface-container-lowest p-4 text-base leading-relaxed text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder={content.observationsPlaceholder}
        />
        <EchoAceRefinementSection
          draftId={draftId}
          aceCategory={aceKey}
          rawNotes={observations}
          onSyncObservationsFromRefinement={onObservationsChange}
          onRefinementBusyChange={setIsRefinementBusy}
          containerClassName="mt-5 border-t border-outline-variant/30 pt-5"
        />
      </div>
    </div>
  );
};
