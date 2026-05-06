"use client";

import { EchoAceStep } from "@/components/echo/EchoAceStep";
import { EchoAceTeammateHistorySidebar } from "@/components/echo/EchoAceTeammateHistorySidebar";
import { EchoBottomPinnedNavigationBar } from "@/components/echo/EchoBottomPinnedNavigationBar";
import { EchoGeneralInfoStep } from "@/components/echo/EchoGeneralInfoStep";
import { EchoSummaryStep } from "@/components/echo/EchoSummaryStep";
import { EchoAppPageHeader } from "@/components/shell/EchoAppPageHeader";
import { useEchoWizard } from "@/hooks/useEchoWizard";

const lastStepIndex = 4;

const stepDescriptors = [
  { title: "General information", description: "Identify the evaluatee and why you are evaluating." },
  { title: "Aptitude (Head)", description: "Capture observations about cognitive and technical strengths." },
  { title: "Character (Heart)", description: "Capture observations about culture, behavior, and teamwork." },
  { title: "Effectiveness (Hands)", description: "Capture observations about execution, outcomes, and process." },
  { title: "Summary", description: "Review everything before you submit." },
] as const;

export const EchoWizard = () => {
  const {
    stepIndex,
    formState,
    updateFormState,
    draftId,
    isSaving,
    aceRatingsStepError,
    dismissAceRatingsError,
    goBack,
    goNext,
    goToStep,
    submitEchoEvaluation,
    summaryAccuracyAcknowledged,
    setSummaryAccuracyAcknowledged,
  } = useEchoWizard();

  const activeStep = stepDescriptors[stepIndex];
  const stepDisplayNumber = stepIndex + 1;
  const isAceStep = stepIndex >= 1 && stepIndex <= 3;

  if (draftId === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-on-surface-variant">
        Preparing evaluation…
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-44 pt-6 text-on-background sm:pt-10 md:pb-24">
      <div
        className={`mx-auto w-full px-4 sm:px-6 md:px-8 ${isAceStep ? "max-w-[1440px]" : "max-w-3xl"}`}
      >
        {stepIndex === 0 || stepIndex === 4 ? (
          <EchoAppPageHeader
            eyebrow={`Step ${stepDisplayNumber} of ${stepDescriptors.length}`}
            title={activeStep.title}
            description={activeStep.description}
            withBottomBorder
          />
        ) : null}

        {stepIndex === 0 ? (
          <EchoGeneralInfoStep formState={formState} onChange={updateFormState} />
        ) : null}

        {stepIndex === 1 ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            <div className="min-w-0 flex-1 lg:max-w-[800px]">
              <EchoAceStep
                draftId={draftId}
                aceKey="aptitude"
                stepNumber={stepDisplayNumber}
                totalSteps={stepDescriptors.length}
                observations={formState.aptitudeObservations}
                gainsRatings={formState.gainsRatings}
                aceRatingsStepError={aceRatingsStepError}
                onObservationsChange={(value) => {
                  updateFormState({ aptitudeObservations: value });
                }}
                onGainsRatingChange={(code, level) => {
                  dismissAceRatingsError();
                  updateFormState({
                    gainsRatings: { ...formState.gainsRatings, [code]: level },
                  });
                }}
              />
            </div>
            <div className="lg:sticky lg:top-0 lg:max-h-[min(100vh-5.5rem,56rem)] lg:self-start lg:overflow-y-auto">
              <EchoAceTeammateHistorySidebar
                aceKey="aptitude"
                evaluateeEmail={formState.evaluateeEmail}
              />
            </div>
          </div>
        ) : null}

        {stepIndex === 2 ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            <div className="min-w-0 flex-1 lg:max-w-[800px]">
              <EchoAceStep
                draftId={draftId}
                aceKey="character"
                stepNumber={stepDisplayNumber}
                totalSteps={stepDescriptors.length}
                observations={formState.characterObservations}
                gainsRatings={formState.gainsRatings}
                aceRatingsStepError={aceRatingsStepError}
                onObservationsChange={(value) => {
                  updateFormState({ characterObservations: value });
                }}
                onGainsRatingChange={(code, level) => {
                  dismissAceRatingsError();
                  updateFormState({
                    gainsRatings: { ...formState.gainsRatings, [code]: level },
                  });
                }}
              />
            </div>
            <div className="lg:sticky lg:top-0 lg:max-h-[min(100vh-5.5rem,56rem)] lg:self-start lg:overflow-y-auto">
              <EchoAceTeammateHistorySidebar
                aceKey="character"
                evaluateeEmail={formState.evaluateeEmail}
              />
            </div>
          </div>
        ) : null}

        {stepIndex === 3 ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            <div className="min-w-0 flex-1 lg:max-w-[800px]">
              <EchoAceStep
                draftId={draftId}
                aceKey="effectiveness"
                stepNumber={stepDisplayNumber}
                totalSteps={stepDescriptors.length}
                observations={formState.effectivenessObservations}
                gainsRatings={formState.gainsRatings}
                aceRatingsStepError={aceRatingsStepError}
                onObservationsChange={(value) => {
                  updateFormState({ effectivenessObservations: value });
                }}
                onGainsRatingChange={(code, level) => {
                  dismissAceRatingsError();
                  updateFormState({
                    gainsRatings: { ...formState.gainsRatings, [code]: level },
                  });
                }}
              />
            </div>
            <div className="lg:sticky lg:top-0 lg:max-h-[min(100vh-5.5rem,56rem)] lg:self-start lg:overflow-y-auto">
              <EchoAceTeammateHistorySidebar
                aceKey="effectiveness"
                evaluateeEmail={formState.evaluateeEmail}
              />
            </div>
          </div>
        ) : null}

        {stepIndex === 4 ? (
          <EchoSummaryStep
            formState={formState}
            onEditSection={goToStep}
            accuracyAcknowledged={summaryAccuracyAcknowledged}
            onAccuracyAcknowledgedChange={setSummaryAccuracyAcknowledged}
          />
        ) : null}
      </div>

      <EchoBottomPinnedNavigationBar
        stepIndex={stepIndex}
        lastStepIndex={lastStepIndex}
        isSaving={isSaving}
        submitDisabled={stepIndex === lastStepIndex && !summaryAccuracyAcknowledged}
        onBack={goBack}
        onNext={() => {
          void goNext();
        }}
        onSubmit={() => {
          void submitEchoEvaluation();
        }}
      />
    </div>
  );
};
