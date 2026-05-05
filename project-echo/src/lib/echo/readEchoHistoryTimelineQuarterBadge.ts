export const readEchoHistoryTimelineQuarterBadge = (evaluatedAt: Date): string => {
  const monthIndex = evaluatedAt.getMonth();
  const quarterIndex = Math.floor(monthIndex / 3) + 1;
  return `Q${String(quarterIndex)}`;
};
