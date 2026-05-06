export const echoCollapsedEmptyEvaluationReasonLabel =
  "No evaluation reason captured." as const;

export const readCollapsedEvaluationReasonSnippet = (reason: string, maxLength: number): string => {
  const collapsed = reason.replace(/\s+/g, " ").trim();
  if (collapsed.length === 0) {
    return echoCollapsedEmptyEvaluationReasonLabel;
  }
  if (collapsed.length <= maxLength) {
    return collapsed;
  }
  return `${collapsed.slice(0, maxLength - 1)}…`;
};
