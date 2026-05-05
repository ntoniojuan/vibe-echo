export const readEvaluateeHeatMapPresentation = (strengthScore: number) => {
  const clamped = Math.min(5, Math.max(1, strengthScore));
  if (clamped >= 4.5) {
    return {
      bandLabel: "Greatly exceeds",
      containerClass:
        "border border-[color:var(--echo-heatmap-great-border)] bg-[color:var(--echo-heatmap-great-bg)]",
      accentClass: "text-[color:var(--echo-heatmap-great-accent)]",
    };
  }
  if (clamped >= 3.5) {
    return {
      bandLabel: "Ahead",
      containerClass:
        "border border-[color:var(--echo-heatmap-ahead-border)] bg-[color:var(--echo-heatmap-ahead-bg)]",
      accentClass: "text-[color:var(--echo-heatmap-ahead-accent)]",
    };
  }
  if (clamped >= 2.5) {
    return {
      bandLabel: "In line",
      containerClass:
        "border border-[color:var(--echo-heatmap-inline-border)] bg-[color:var(--echo-heatmap-inline-bg)]",
      accentClass: "text-on-surface-variant",
    };
  }
  if (clamped >= 1.5) {
    return {
      bandLabel: "Needs improvement",
      containerClass:
        "border border-[color:var(--echo-heatmap-needs-border)] bg-[color:var(--echo-heatmap-needs-bg)]",
      accentClass: "text-[color:var(--echo-heatmap-needs-accent)]",
    };
  }
  return {
    bandLabel: "Severely underdelivers",
    containerClass:
      "border border-[color:var(--echo-heatmap-severe-border)] bg-[color:var(--echo-heatmap-severe-bg)]",
    accentClass: "text-[color:var(--echo-heatmap-severe-accent)]",
  };
};
