import { readEchoRefinementObservationMarkdownFromSections } from "@/lib/refinement/readEchoRefinementObservationMarkdownFromSections";

/**
 * Builds non-Gemini structured refinement for dev / quota fallback so Firestore append matches v260430 layout.
 */
export const buildDevelopmentMockRefinedParagraph = (
  rawNotes: string,
  qaSummary: string,
): string => {
  const notesExcerpt =
    rawNotes.length > 1200 ? `${rawNotes.slice(0, 1200)}…` : rawNotes;
  const firstLine = rawNotes.replace(/\s+/g, " ").trim().slice(0, 200);
  const observationBody =
    firstLine.length > 0
      ? `• [Refinement mock — Gemini skipped or quota limited]\n• Context: ${firstLine}\n\nNotes excerpt:\n${notesExcerpt}\n\nMCQ answers:\n${qaSummary}`
      : `• [Refinement mock — Gemini skipped or quota limited]\n\nNotes excerpt:\n${notesExcerpt}\n\nMCQ answers:\n${qaSummary}`;

  return readEchoRefinementObservationMarkdownFromSections({
    observations: observationBody,
    areasToImprove: [
      "• Review MCQ selections and convert them into sharper, behavior-based next steps before submit.",
      "• Add any missing specificity (who, what, when) that the live model would normally supply.",
    ].join("\n"),
    timingOrTrigger: [
      "• Revisit expectations in the next 1:1 and after the next comparable case or escalation.",
    ].join("\n"),
    support: [
      "• Mock mode only: set ECHO_REFINEMENT_USE_REAL_GEMINI_IN_DEV=true for full Evaluation Prompt v260430 output.",
      "• Ask a peer or HR partner to sense-check the four sections before finalizing.",
    ].join("\n"),
  });
};
