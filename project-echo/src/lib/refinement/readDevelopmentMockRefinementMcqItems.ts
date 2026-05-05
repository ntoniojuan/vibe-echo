import type { RefinementMcqItem } from "@/lib/refinement/refinementMcqZod";

/**
 * Fixed MCQs for local development and quota (429) fallback so the ACE refinement UI can be exercised without Gemini.
 */
export const readDevelopmentMockRefinementMcqItems = (): RefinementMcqItem[] => [
  {
    question: "Was this behavior observed in a high-pressure situation?",
    options: [
      "Yes, during peak workload or tight deadlines",
      "No, under routine conditions",
      "Unclear or not specified in the notes",
      "Only indirectly related to pressure",
    ],
  },
  {
    question: "Is this a consistent pattern or a one-time event?",
    options: [
      "A recurring pattern",
      "A one-time occurrence",
      "Mixed or situational",
      "Not enough information to tell",
    ],
  },
  {
    question: "Does this impact the wider team's productivity?",
    options: [
      "Yes, meaningfully",
      "Limited or indirect impact",
      "No clear wider impact",
      "Unknown at this time",
    ],
  },
  {
    question: "Have you provided verbal feedback on this before?",
    options: [
      "Yes, more than once",
      "Yes, once",
      "Not yet",
      "Not applicable or unclear",
    ],
  },
  {
    question: "Is there a specific GAINS level they are currently hovering at?",
    options: [
      "GAINS 1–2",
      "GAINS 3–4",
      "GAINS 5+ or at target",
      "Not specified or not using GAINS for this role",
    ],
  },
];
