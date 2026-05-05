"use client";

import Link from "next/link";

export default function EvaluationSubmittedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-5xl" aria-hidden>
        ✓
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
        Evaluation Submitted!
      </h1>
      <p className="mt-3 max-w-md text-sm text-on-surface-variant">
        Thank you. Your feedback has been recorded.
      </p>
      <Link
        href="/dashboard"
        className="mt-10 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-on-primary shadow-sm hover:opacity-90"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
