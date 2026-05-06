type EchoBottomPinnedNavigationBarProps = {
  stepIndex: number;
  lastStepIndex: number;
  isSaving: boolean;
  submitDisabled?: boolean;
  /** Shown above the buttons (e.g. ACE GAINS validation) so main content does not shift. */
  stepValidationMessage?: string | null;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export const EchoBottomPinnedNavigationBar = ({
  stepIndex,
  lastStepIndex,
  isSaving,
  submitDisabled = false,
  stepValidationMessage = null,
  onBack,
  onNext,
  onSubmit,
}: EchoBottomPinnedNavigationBarProps) => {
  const isSummaryStep = stepIndex === lastStepIndex;
  const isFirstStep = stepIndex === 0;
  const submitBlocked = isSaving || submitDisabled;
  const trimmedValidation = stepValidationMessage?.trim() ?? "";
  const showValidationRow = trimmedValidation.length > 0;

  return (
    <footer
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] left-0 z-50 flex w-full flex-col gap-2 border-t border-outline-variant/40 bg-echo-card/95 px-4 py-3 shadow-[var(--shadow-echo-nav)] backdrop-blur-md sm:px-8 md:bottom-0 md:left-60 md:right-0 md:w-auto"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      {showValidationRow ? (
        <p
          role="alert"
          className="max-h-[30vh] overflow-y-auto rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-center text-xs font-medium leading-snug text-on-surface sm:text-left sm:text-sm"
        >
          {trimmedValidation}
        </p>
      ) : null}
      <div className="flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstStep || isSaving}
          className="inline-flex items-center justify-center rounded-full border border-outline px-5 py-2.5 text-sm font-semibold text-on-surface transition hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        {isSummaryStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitBlocked}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[#4A634A] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#D1DCD1] hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {isSaving ? "Submitting…" : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={isSaving}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-inverse-surface px-6 py-2.5 text-sm font-bold text-inverse-on-surface shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {isSaving ? "Saving…" : "Next"}
          </button>
        )}
      </div>
    </footer>
  );
};
