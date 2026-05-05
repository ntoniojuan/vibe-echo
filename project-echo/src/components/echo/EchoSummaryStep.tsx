import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";
import { readEchoGainsSummaryRowsForAceStep } from "@/lib/echo/readEchoGainsSummaryRowsForAceStep";

type EchoSummaryStepProps = {
  formState: EchoWizardFormState;
  onEditSection: (stepIndex: number) => void;
  accuracyAcknowledged: boolean;
  onAccuracyAcknowledgedChange: (acknowledged: boolean) => void;
};

const echoSummaryAccuracyAcknowledgementLabel =
  "I agree that everything I added here is true and accurate to the best of my knowledge.";

const labelClass =
  "text-xs font-bold uppercase tracking-wider text-on-surface-variant";
const cardClass =
  "rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-[var(--shadow-echo-card)]";

export const EchoSummaryStep = ({
  formState,
  onEditSection,
  accuracyAcknowledged,
  onAccuracyAcknowledgedChange,
}: EchoSummaryStepProps) => {
  const relationshipLabel =
    formState.relationshipType === ""
      ? "—"
      : formState.relationshipType.charAt(0).toUpperCase() +
        formState.relationshipType.slice(1);

  let peerAnonymitySummary =
    "Off — evaluatee can see evaluator email in applicable views";
  if (formState.isAnonymous) {
    peerAnonymitySummary = "Evaluatee sees Anonymous Teammate for your identity";
  }

  const aptitudeRatings = readEchoGainsSummaryRowsForAceStep(formState, "aptitude");
  const characterRatings = readEchoGainsSummaryRowsForAceStep(formState, "character");
  const effectivenessRatings = readEchoGainsSummaryRowsForAceStep(
    formState,
    "effectiveness",
  );

  return (
    <div className="space-y-6">
      <section className={cardClass}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-on-surface">General information</h2>
          <button
            type="button"
            onClick={() => {
              onEditSection(0);
            }}
            className="shrink-0 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low"
          >
            Edit
          </button>
        </div>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className={labelClass}>Evaluatee name</dt>
            <dd className="mt-1 text-on-surface">{formState.evaluateeName || "—"}</dd>
          </div>
          <div>
            <dt className={labelClass}>Email</dt>
            <dd className="mt-1 text-on-surface">{formState.evaluateeEmail || "—"}</dd>
          </div>
          <div>
            <dt className={labelClass}>Type</dt>
            <dd className="mt-1 text-on-surface">{relationshipLabel}</dd>
          </div>
          {formState.relationshipType === "colleague" ? (
            <div className="sm:col-span-2">
              <dt className={labelClass}>Peer anonymity</dt>
              <dd className="mt-1 text-on-surface">{peerAnonymitySummary}</dd>
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <dt className={labelClass}>Reason</dt>
            <dd className="mt-2 whitespace-pre-wrap rounded-xl bg-surface-container-low p-4 text-on-surface-variant">
              {formState.evaluationReason || "—"}
            </dd>
          </div>
        </dl>
      </section>

      <section className={cardClass}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-on-surface">Aptitude (Head)</h2>
          <button
            type="button"
            onClick={() => {
              onEditSection(1);
            }}
            className="shrink-0 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low"
          >
            Edit
          </button>
        </div>
        <ul className="mb-4 space-y-2 border-b border-outline-variant/40 pb-4">
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
        <p className="whitespace-pre-wrap text-on-surface-variant">
          {formState.aptitudeObservations || "—"}
        </p>
      </section>

      <section className={cardClass}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-on-surface">Character (Heart)</h2>
          <button
            type="button"
            onClick={() => {
              onEditSection(2);
            }}
            className="shrink-0 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low"
          >
            Edit
          </button>
        </div>
        <ul className="mb-4 space-y-2 border-b border-outline-variant/40 pb-4">
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
        <p className="whitespace-pre-wrap text-on-surface-variant">
          {formState.characterObservations || "—"}
        </p>
      </section>

      <section className={cardClass}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-on-surface">Effectiveness (Hands)</h2>
          <button
            type="button"
            onClick={() => {
              onEditSection(3);
            }}
            className="shrink-0 rounded-full border border-outline-variant px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container-low"
          >
            Edit
          </button>
        </div>
        <ul className="mb-4 space-y-2 border-b border-outline-variant/40 pb-4">
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
        <p className="whitespace-pre-wrap text-on-surface-variant">
          {formState.effectivenessObservations || "—"}
        </p>
      </section>

      <section className={cardClass}>
        <h2 className="text-lg font-semibold text-on-surface">Ready to submit</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Confirm the information above before sending this evaluation.
        </p>
        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-4 text-sm text-on-surface">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
            checked={accuracyAcknowledged}
            onChange={(event) => {
              onAccuracyAcknowledgedChange(event.target.checked);
            }}
          />
          <span>{echoSummaryAccuracyAcknowledgementLabel}</span>
        </label>
      </section>
    </div>
  );
};
