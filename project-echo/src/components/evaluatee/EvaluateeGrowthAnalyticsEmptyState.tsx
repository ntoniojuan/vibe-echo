"use client";

import Link from "next/link";

type EvaluateeGrowthAnalyticsEmptyStateProps = {
  variant: "signedOut" | "signedInNoSubmissions" | "signedInEvaluationsIncomplete";
  evaluateeFirstName?: string;
};

export const EvaluateeGrowthAnalyticsEmptyState = ({
  variant,
  evaluateeFirstName,
}: EvaluateeGrowthAnalyticsEmptyStateProps) => {
  const greeting =
    evaluateeFirstName && evaluateeFirstName.length > 0
      ? `, ${evaluateeFirstName}`
      : "";

  const title =
    variant === "signedOut" ? "Sign in to see Growth analytics" : `Welcome${greeting}`;

  let body: string;
  if (variant === "signedOut") {
    body =
      "Connect with Google to load your ECHO evaluations and track competency trends.";
  } else if (variant === "signedInNoSubmissions") {
    body =
      "You do not have any submitted ECHO evaluations yet. Start your first evaluation to unlock ACE balance, growth trend, and your competency heat map.";
  } else {
    body =
      "You have submitted evaluations, but none include a full GAINS grid yet. Growth analytics needs all twelve sub-competency scores (A1–E4) from at least one completed evaluation.";
  }

  return (
    <div className="flex min-h-[60vh] w-full flex-col justify-center py-12">
      <h2 className="text-3xl font-bold leading-tight text-on-surface">{title}</h2>
      <p className="mt-4 text-lg text-on-surface-variant">{body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {variant === "signedInEvaluationsIncomplete" ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-[#4A634A] px-8 py-3.5 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-[#D1DCD1] hover:text-slate-900"
          >
            Go to dashboard
          </Link>
        ) : (
          <Link
            href="/evaluation"
            className="inline-flex items-center justify-center rounded-full bg-[#4A634A] px-8 py-3.5 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-[#D1DCD1] hover:text-slate-900"
          >
            Start your first ECHO
          </Link>
        )}
        {variant === "signedOut" ? (
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-outline-variant px-8 py-3.5 text-center text-sm font-semibold text-primary hover:bg-surface-container-low"
          >
            Back to home
          </Link>
        ) : null}
      </div>
    </div>
  );
};
