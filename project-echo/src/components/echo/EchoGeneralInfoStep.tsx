import { echoWizardRelationshipOptions } from "@/lib/echo/echoWizardRelationshipOptions";
import type { EchoWizardFormState } from "@/lib/echo/echoWizardFormState";

type EchoGeneralInfoStepProps = {
  formState: EchoWizardFormState;
  onChange: (partial: Partial<EchoWizardFormState>) => void;
};

export const EchoGeneralInfoStep = ({ formState, onChange }: EchoGeneralInfoStepProps) => {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-[var(--shadow-echo-card)]">
        <h2 className="text-lg font-semibold text-on-surface">Evaluatee details</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Provide identifying information for the person you are evaluating.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Evaluatee name
            <input
              value={formState.evaluateeName}
              onChange={(event) => {
                onChange({ evaluateeName: event.target.value });
              }}
              className="mt-2 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface outline-none ring-primary focus:ring-2"
              placeholder="Full name"
              autoComplete="name"
              type="text"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Email
            <input
              value={formState.evaluateeEmail}
              onChange={(event) => {
                onChange({ evaluateeEmail: event.target.value });
              }}
              className="mt-2 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface outline-none ring-primary focus:ring-2"
              placeholder="name@example.com"
              autoComplete="email"
              type="email"
            />
          </label>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Type
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {echoWizardRelationshipOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    formState.relationshipType === option.value
                      ? "border-primary bg-primary-container/25 text-on-surface"
                      : "border-outline-variant bg-surface-container-low text-on-surface hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="relationshipType"
                    value={option.value}
                    checked={formState.relationshipType === option.value}
                    onChange={() => {
                      const nextRelationship = option.value;
                      onChange({
                        relationshipType: nextRelationship,
                        isAnonymous:
                          nextRelationship === "colleague" ? formState.isAnonymous : false,
                      });
                    }}
                    className="h-4 w-4 accent-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          {formState.relationshipType === "colleague" ? (
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
                checked={formState.isAnonymous}
                onChange={(event) => {
                  onChange({ isAnonymous: event.target.checked });
                }}
              />
              <span>
                <span className="font-semibold">Peer anonymity</span>
                <span className="mt-1 block text-on-surface-variant">
                  Hide my name from the evaluatee in feedback and discussion. They will see{" "}
                  <span className="font-medium text-on-surface">Anonymous Teammate</span> instead.
                </span>
              </span>
            </label>
          ) : null}
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Reason
            <textarea
              value={formState.evaluationReason}
              onChange={(event) => {
                onChange({ evaluationReason: event.target.value });
              }}
              rows={4}
              className="mt-2 min-h-28 w-full resize-y rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface outline-none ring-primary focus:ring-2"
              placeholder="Briefly describe why you are completing this evaluation."
            />
          </label>
        </div>
      </section>
    </div>
  );
};
