"use client";

import Link from "next/link";

type EchoDashboardCycleProgressCardProps = {
  receivedCount: number;
  receivedGoal: number;
  sentCount: number;
  sentGoal: number;
};

export const EchoDashboardCycleProgressCard = ({
  receivedCount,
  receivedGoal,
  sentCount,
  sentGoal,
}: EchoDashboardCycleProgressCardProps) => {
  const receivedRatio =
    receivedGoal > 0 ? Math.min(100, Math.round((receivedCount / receivedGoal) * 100)) : 0;
  const sentRatio = sentGoal > 0 ? Math.min(100, Math.round((sentCount / sentGoal) * 100)) : 0;

  return (
    <aside className="rounded-2xl border border-outline-variant/35 bg-echo-card p-6 shadow-[var(--shadow-echo-card)]">
      <h2 className="text-lg font-semibold text-on-surface">Cycle progress</h2>
      <div className="mt-6 space-y-5">
        <div>
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium text-on-surface">Received evaluations</span>
            <span className="tabular-nums text-on-surface-variant">
              {receivedCount}/{receivedGoal}
            </span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-container-low"
            role="presentation"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${String(receivedRatio)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium text-on-surface">Evaluations sent</span>
            <span className="tabular-nums text-on-surface-variant">
              {sentCount}/{sentGoal}
            </span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-container-low"
            role="presentation"
          >
            <div
              className="h-full rounded-full bg-inverse-surface transition-[width]"
              style={{ width: `${String(sentRatio)}%` }}
            />
          </div>
        </div>
      </div>
      <Link
        href="/evaluatee/stats"
        className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
      >
        View full stats →
      </Link>
    </aside>
  );
};
