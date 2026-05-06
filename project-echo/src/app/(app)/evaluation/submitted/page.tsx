"use client";

import Link from "next/link";

export default function EvaluationSubmittedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <div
        className="w-full max-w-md rounded-2xl border border-surface-container-high bg-echo-elevated-card p-8 text-center shadow-[var(--shadow-echo-card)] sm:p-10"
      >
        <p className="text-5xl text-primary" aria-hidden>
          ✓
        </p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
          Evaluation Submitted!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Thank you. Your feedback has been recorded.
        </p>
        <Link
          href="/dashboard"
          className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#4A634A] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#D1DCD1] hover:text-slate-900 sm:w-auto"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
