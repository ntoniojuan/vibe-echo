type EchoBottomPinnedNavigationBarProps = {
  stepIndex: number;
  lastStepIndex: number;
  isSaving: boolean;
  submitDisabled?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export const EchoBottomPinnedNavigationBar = ({
  stepIndex,
  lastStepIndex,
  isSaving,
  submitDisabled = false,
  onBack,
  onNext,
  onSubmit,
}: EchoBottomPinnedNavigationBarProps) => {
  const isSummaryStep = stepIndex === lastStepIndex;
  const isFirstStep = stepIndex === 0;
  const submitBlocked = isSaving || submitDisabled;
  return (
    <footer
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] left-0 z-50 flex w-full items-center justify-between gap-3 border-t border-outline-variant/40 bg-echo-card/95 px-4 py-3 shadow-[var(--shadow-echo-nav)] backdrop-blur-md sm:px-8 md:bottom-0 md:left-60 md:right-0 md:w-auto"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
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
          className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-on-primary shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
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
    </footer>
  );
};
