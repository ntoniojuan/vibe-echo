/**
 * Renders Evaluation Prompt v260430-style sections for one ACE pillar (stored inside observation text).
 */
export const readEchoRefinementObservationMarkdownFromSections = (input: {
  observations: string;
  areasToImprove: string;
  timingOrTrigger: string;
  support: string;
}): string => {
  const trim = (value: string) => value.trim();
  const mandatoryFooter =
    "IMPORTANT: Please check the evaluations generated and edit as applicable.";
  return [
    "**Observations:**",
    trim(input.observations),
    "",
    "**Areas to improve:**",
    trim(input.areasToImprove),
    "",
    "**Timing or trigger:**",
    trim(input.timingOrTrigger),
    "",
    "**Support:**",
    trim(input.support),
    "",
    mandatoryFooter,
  ].join("\n");
};
