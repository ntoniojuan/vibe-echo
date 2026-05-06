"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { readGainsAxisTickLabel } from "@/lib/evaluatee/readGainsAxisTickLabel";

type TrendPoint = {
  cycleLabel: string;
  rating: number;
};

type EvaluateeStatsTrendCardProps = {
  overallRatingByCycle: ReadonlyArray<TrendPoint>;
};

const growthTrendExplainerId = "growth-trend-explainer";

export const EvaluateeStatsTrendCard = ({ overallRatingByCycle }: EvaluateeStatsTrendCardProps) => {
  const chartData = overallRatingByCycle.map((point) => ({
    cycle: point.cycleLabel,
    rating: point.rating,
  }));

  return (
    <div className="flex flex-col rounded-xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-6 shadow-[var(--shadow-echo-card)]">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[22px] font-semibold leading-snug text-on-surface">Growth trend</h3>
          <p id={growthTrendExplainerId} className="mt-1 text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">Growth trend:</span> Your average ACE
            scores over the last four evaluation cycles.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-surface-container-low)] px-2 py-1 text-xs font-bold text-on-surface">
          <span
            className="h-2 w-2 rounded-full bg-[var(--color-primary)]"
            aria-hidden
          />
          Score
        </span>
      </div>
      <div
        className="h-[260px] w-full min-w-0 md:h-[300px]"
        role="figure"
        aria-describedby={growthTrendExplainerId}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--color-chart-grid)"
              opacity={0.88}
            />
            <XAxis
              dataKey="cycle"
              tick={{ fill: "var(--color-on-surface-variant)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-chart-grid)" }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={readGainsAxisTickLabel}
              tick={{ fill: "var(--color-on-surface-variant)", fontSize: 11 }}
              axisLine={{ stroke: "var(--color-chart-grid)" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid var(--color-outline-variant)",
                background: "var(--color-surface-container-lowest)",
                color: "var(--color-on-surface)",
              }}
              labelFormatter={(cycleLabel) => `${cycleLabel} · Avg ACE, last 4 cycles`}
              formatter={(value) => {
                const numeric = typeof value === "number" ? value : Number(value);
                const label = Number.isFinite(numeric) ? numeric.toFixed(2) : String(value);
                return [label, "Average ACE score"];
              }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="var(--color-chart-line)"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "var(--color-chart-line-dot-fill)",
                stroke: "var(--color-chart-line-dot-stroke)",
                strokeWidth: 2,
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
