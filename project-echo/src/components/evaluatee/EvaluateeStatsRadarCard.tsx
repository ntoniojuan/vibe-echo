"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type EvaluateeStatsRadarCardProps = {
  aptitude: number;
  character: number;
  effectiveness: number;
};

export const EvaluateeStatsRadarCard = ({
  aptitude,
  character,
  effectiveness,
}: EvaluateeStatsRadarCardProps) => {
  const chartData = [
    { subject: "Aptitude (Head)", score: aptitude },
    { subject: "Character (Heart)", score: character },
    { subject: "Effectiveness (Hands)", score: effectiveness },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)] p-6 shadow-[var(--shadow-echo-card)]">
      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-[22px] font-semibold leading-snug text-on-surface">ACE balance</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            Average GAINS (1–5) per ACE pillar across all completed evaluations
          </p>
        </div>
      </div>
      <div className="h-[280px] w-full min-w-0 md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--color-chart-grid)" strokeOpacity={0.95} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "var(--color-on-surface)", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tickCount={6}
              tick={{ fill: "var(--color-on-surface-variant)", fontSize: 10 }}
              axisLine={{ stroke: "var(--color-chart-grid)" }}
            />
            <Radar
              name="Avg GAINS"
              dataKey="score"
              stroke="var(--color-primary-container)"
              fill="var(--color-primary-container)"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
