import { readPlainTextFromEchoObservationHtml } from "@/lib/echo/readPlainTextFromEchoObservationHtml";
import { callGeminiJsonGeneration } from "@/lib/gemini/callGeminiJsonGeneration";
import { readIsGeminiQuotaLimitedError } from "@/lib/gemini/readIsGeminiQuotaLimitedError";
import { normalizeEchoAceCategory } from "@/lib/refinement/echoAceCategoryNormalized";
import { readDevelopmentMockRefinementMcqItems } from "@/lib/refinement/readDevelopmentMockRefinementMcqItems";
import { readShouldUseRefinementDevelopmentMock } from "@/lib/refinement/readShouldUseRefinementDevelopmentMock";
import {
  refinementMcqItemsWrapperSchema,
  type RefinementMcqItem,
} from "@/lib/refinement/refinementMcqZod";

const mcqSystemPrompt = `You are assisting with healthcare capability evaluations (MedGrocer Project ECHO), following Evaluation Prompt v260430.
Generate clarification multiple-choice questions for a supervisor completing an ACE observation.
The answers you elicit will feed a structured refinement with four sections: Observations, Areas to improve (evaluatee development priorities), Timing or trigger, and Support.
Rules:
- Output ONLY valid JSON: {"items":[{ "question": string, "options": string[] }, ...]} with exactly 5 items.
- Each options array MUST have 4 clear, mutually distinct choices unless the question truly only needs 2—prefer 4.
- Questions should clarify vague notes (e.g. one-time vs pattern, scope, stakeholder impact, frequency, evidence)—grounded ONLY in what appears in rawNotes; do not invent incidents.
- Tailor all questions to the ACE category provided: Aptitude (Head), Character (Heart), or Effectiveness (Hands).
- Prefer questions that disambiguate details needed for observations, concrete next steps, when behaviors should appear, and what support the team will provide.
- Professional, neutral tone.`;

const repairUserPrompt = `The previous model output was not valid JSON or did not match the schema (exactly 5 items, each with question and options array of at least 2 strings).
Return ONLY corrected JSON: {"items":[...]} with exactly 5 items. No markdown, no prose.`;

type GenerateRefinementMcqsInput = {
  rawNotes: string;
  aceCategory: string;
};

const parseAndValidateMcqs = (jsonText: string) => {
  const parsed: unknown = JSON.parse(jsonText);
  return refinementMcqItemsWrapperSchema.safeParse(parsed);
};

export const generateRefinementMCQs = async (
  input: GenerateRefinementMcqsInput,
): Promise<RefinementMcqItem[]> => {
  const trimmedPlainNotes = readPlainTextFromEchoObservationHtml(input.rawNotes).trim();
  if (trimmedPlainNotes.length < 3) {
    throw new Error("rawNotes must contain at least a few characters.");
  }

  const normalizedCategory = normalizeEchoAceCategory(input.aceCategory);
  if (!normalizedCategory) {
    throw new Error("aceCategory must be Aptitude, Character, or Effectiveness.");
  }

  let categoryLabel: string;
  if (normalizedCategory === "aptitude") {
    categoryLabel = "Aptitude (Head)";
  } else if (normalizedCategory === "character") {
    categoryLabel = "Character (Heart)";
  } else {
    categoryLabel = "Effectiveness (Hands)";
  }

  const userPayload = JSON.stringify({
    rawNotes: trimmedPlainNotes,
    aceCategory: categoryLabel,
  });

  if (readShouldUseRefinementDevelopmentMock()) {
    console.info(
      "Echo refinement MCQs: using development mock (Gemini skipped). Set ECHO_REFINEMENT_USE_REAL_GEMINI_IN_DEV=true to call Gemini in dev.",
    );
    return readDevelopmentMockRefinementMcqItems();
  }

  const generateWithGemini = async (): Promise<RefinementMcqItem[]> => {
    let content = await callGeminiJsonGeneration({
      systemInstruction: mcqSystemPrompt,
      userText: userPayload,
    });

    let validated = parseAndValidateMcqs(content);
    if (!validated.success) {
      content = await callGeminiJsonGeneration({
        systemInstruction: mcqSystemPrompt,
        userText: `${userPayload}\n\nPrevious invalid output was:\n${content}\n\n${repairUserPrompt}`,
      });
      validated = parseAndValidateMcqs(content);
    }

    if (!validated.success) {
      console.error("MCQ JSON validation failed.", validated.error.flatten());
      throw new Error("Model returned invalid MCQ JSON after repair attempt.");
    }

    return validated.data.items;
  };

  try {
    return await generateWithGemini();
  } catch (error) {
    if (readIsGeminiQuotaLimitedError(error)) {
      console.warn("Echo refinement MCQs: quota/rate limit; using mock MCQs.");
      return readDevelopmentMockRefinementMcqItems();
    }
    throw error;
  }
};
