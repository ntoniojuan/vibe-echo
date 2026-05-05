export const readCollapsedEvaluationReasonSnippet = (reason: string, maxLength: number): string => {
  const collapsed = reason.replace(/\s+/g, " ").trim();
  if (collapsed.length === 0) {
    return "No evaluation reason captured.";
  }
  if (collapsed.length <= maxLength) {
    return collapsed;
  }
  return `${collapsed.slice(0, maxLength - 1)}…`;
};
