export const readEchoHistoryTimelineCycleLabel = (evaluatedAt: Date): string => {
  const monthIndex = evaluatedAt.getMonth();
  const quarterIndex = Math.floor(monthIndex / 3) + 1;
  const yearSuffix = String(evaluatedAt.getFullYear()).slice(-2);
  return `Q${String(quarterIndex)} '${yearSuffix}`;
};
