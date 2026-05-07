import { FieldValue } from "firebase-admin/firestore";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import { readPlainTextFromEchoObservationHtml } from "@/lib/echo/readPlainTextFromEchoObservationHtml";
import { callGeminiJsonGeneration } from "@/lib/gemini/callGeminiJsonGeneration";
import { readIsGeminiQuotaLimitedError } from "@/lib/gemini/readIsGeminiQuotaLimitedError";
import { echoEvaluationDraftCollectionId } from "@/lib/firebase/echoEvaluationDraftCollectionId";
import { readFirebaseAdminFirestore } from "@/lib/firebase/readFirebaseAdminFirestore";
import { normalizeEchoAceCategory } from "@/lib/refinement/echoAceCategoryNormalized";
import { readEchoObservationFieldNameForAceCategory } from "@/lib/refinement/readEchoObservationFieldNameForAceCategory";
import { buildDevelopmentMockRefinedParagraph } from "@/lib/refinement/buildDevelopmentMockRefinedParagraph";
import { readShouldUseRefinementDevelopmentMock } from "@/lib/refinement/readShouldUseRefinementDevelopmentMock";
import { readEchoRefinementObservationMarkdownFromSections } from "@/lib/refinement/readEchoRefinementObservationMarkdownFromSections";
import { readRefinementGainsPromptSummaryForPillar } from "@/lib/refinement/readRefinementGainsPromptSummaryForPillar";
import {
  refinedStructuredWrapperSchema,
  type RefinementMcqItem,
} from "@/lib/refinement/refinementMcqZod";

const refinementSystemPrompt = `SYSTEM: HR Performance Evaluation Assistant (Evaluation Prompt v260430 — MedGrocer Project ECHO).

ROLE & OBJECTIVE
You process supervisor raw notes, their multiple-choice clarification answers, and GAINS scores for ONE ACE domain at a time (given in the JSON user payload as aceCategory). Output structured, actionable evaluation content — not a single blob paragraph.

INITIAL CONTENT RULES
• Ground ONLY in rawNotes, clarificationAnswers, and the GAINS scores for this pillar (gainsRatingsByCode and gainsSummary in the user JSON). Do not invent incidents, stakeholders, or outcomes.
• Anonymization: never use the evaluatee's real name; refer to them as "Evaluatee". Use they/them/their.

TONE
• Conversational, supportive, plain language. Avoid stiff corporate jargon and heavy HR-speak.

GAINS ALIGNMENT
• Ensure the structured JSON (especially observations and areasToImprove) justifies and aligns with the GAINS scores provided. Use scores as the evaluator’s calibration; use rawNotes and clarificationAnswers as the only behavioral evidence.
• For any sub-competency scored 1–2: emphasize honest, specific areas for growth tied to the notes in the appropriate sections.
• For any sub-competency scored 4–5: celebrate specific strengths tied to the notes in the appropriate sections.
• For scores of 3: balanced tone unless the notes clearly lean one way.
• If the notes are too thin to justify a score, say so briefly in observations instead of fabricating examples.

ACE (single domain per request)
• Aptitude (Head): skills, comprehension, clarity, data-literacy, decision-making.
• Character (Heart): resilience, teamwork, coachability, coaching, interpersonal.
• Effectiveness (Hands): planning, process, resourcefulness, execution, outcomes.

PROCESSING
• 1–3 bullet-style lines per output field when evidence supports them; fewer is fine if the transcript is thin.
• Align tone with GAINS: do not sound uniformly critical when scores are mostly 4–5, or uniformly celebratory when scores include 1–2, unless clarification answers justify an exception.
• If a section truly has no basis in the input, write one honest line such as: "No specific additional detail in the notes for this section."

OUTPUT — JSON ONLY with EXACT keys (camelCase):
{
  "observations": "string — specific behaviors/highlights/lowlights from the input; use leading • and newlines between bullets where helpful",
  "areasToImprove": "string — maps to official template 'Evaluatee to start working on or continue'; actionable next steps starting with a verb; • bullets",
  "timingOrTrigger": "string — when/where those behaviors should show up (e.g. huddles, consults, escalations); • bullets",
  "support": "string — concrete support the evaluator/team will provide (coaching, check-ins, etc.); • bullets"
}

Do NOT include the mandatory footer line in your JSON; the system appends it when saving.

No markdown fences. No prose outside the JSON object.`;

type ApplyRefinementInput = {
  draftId: string;
  rawNotes: string;
  aceCategory: string;
  gainsRatingsForPillar: Record<GainsSubcompetencyCode, number>;
  mcqs: RefinementMcqItem[];
  answers: string[];
};

const buildQaSummary = (mcqs: RefinementMcqItem[], answers: string[]): string => {
  const lines = mcqs.map((item, index) => {
    const answer = answers[index] ?? "";
    return `Q${index + 1}: ${item.question}\nSelected: ${answer}`;
  });
  return lines.join("\n\n");
};

export const applyRefinementFromMcqAnswers = async (
  input: ApplyRefinementInput,
): Promise<{ appendedParagraph: string; fullObservationValue: string }> => {
  const trimmedNotes = input.rawNotes.trim();
  const trimmedPlainNotes = readPlainTextFromEchoObservationHtml(input.rawNotes).trim();
  if (trimmedPlainNotes.length < 3) {
    throw new Error("rawNotes must contain at least a few characters.");
  }

  const normalizedCategory = normalizeEchoAceCategory(input.aceCategory);
  if (!normalizedCategory) {
    throw new Error("aceCategory must be Aptitude, Character, or Effectiveness.");
  }

  if (input.mcqs.length !== 5 || input.answers.length !== 5) {
    throw new Error("mcqs and answers must each contain exactly 5 entries.");
  }

  for (let index = 0; index < 5; index += 1) {
    const item = input.mcqs[index];
    const answer = input.answers[index];
    if (!item || !answer) {
      throw new Error("Each MCQ must have a matching answer.");
    }
    const optionSet = new Set(item.options);
    if (!optionSet.has(answer)) {
      throw new Error(`Answer for question ${index + 1} must be one of the listed options.`);
    }
  }

  const qaSummary = buildQaSummary(input.mcqs, input.answers);
  const gainsSummary = readRefinementGainsPromptSummaryForPillar(
    normalizedCategory,
    input.gainsRatingsForPillar,
  );
  const userPayload = JSON.stringify({
    rawNotes: trimmedPlainNotes,
    aceCategory: normalizedCategory,
    clarificationAnswers: qaSummary,
    gainsRatingsByCode: input.gainsRatingsForPillar,
    gainsSummary,
  });

  const readMarkdownFromGemini = async (): Promise<string> => {
    const content = await callGeminiJsonGeneration({
      systemInstruction: refinementSystemPrompt,
      userText: userPayload,
    });

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("Refinement model returned non-JSON.");
      throw new Error("Model returned invalid JSON for refinement.");
    }

    const validated = refinedStructuredWrapperSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("Refinement JSON validation failed.", validated.error.flatten());
      throw new Error("Model returned an invalid refinement payload.");
    }

    const markdown = readEchoRefinementObservationMarkdownFromSections({
      observations: validated.data.observations,
      areasToImprove: validated.data.areasToImprove,
      timingOrTrigger: validated.data.timingOrTrigger,
      support: validated.data.support,
    });
    if (markdown.trim().length < 40) {
      throw new Error("Refined structured output was too short.");
    }
    return markdown;
  };

  let markdownBody: string;
  if (readShouldUseRefinementDevelopmentMock()) {
    console.info(
      "Echo refinement apply: using development mock paragraph (Gemini skipped). Set ECHO_REFINEMENT_USE_REAL_GEMINI_IN_DEV=true to call Gemini in dev.",
    );
    markdownBody = buildDevelopmentMockRefinedParagraph(trimmedPlainNotes, qaSummary);
  } else {
    try {
      markdownBody = await readMarkdownFromGemini();
    } catch (error) {
      if (readIsGeminiQuotaLimitedError(error)) {
        console.warn("Echo refinement apply: quota/rate limit; using mock paragraph.");
        markdownBody = buildDevelopmentMockRefinedParagraph(trimmedPlainNotes, qaSummary);
      } else {
        throw error;
      }
    }
  }

  const database = readFirebaseAdminFirestore();
  const fieldName = readEchoObservationFieldNameForAceCategory(normalizedCategory);
  const documentReference = database
    .collection(echoEvaluationDraftCollectionId)
    .doc(input.draftId);

  const refinementSuffix = `\n\n--- Refined Feedback ---\n${markdownBody}\n`;
  const nextObservationValue = `${trimmedNotes}${refinementSuffix}`;

  const { fullObservationValue, didPersistChange } = await database.runTransaction(
    async (transaction) => {
      const snapshot = await transaction.get(documentReference);
      if (!snapshot.exists) {
        throw new Error("Draft document was not found.");
      }
      const data = snapshot.data();
      const existingValue = data?.[fieldName];
      const existingString = typeof existingValue === "string" ? existingValue : "";

      if (existingString === nextObservationValue) {
        return { fullObservationValue: nextObservationValue, didPersistChange: false };
      }

      transaction.update(documentReference, {
        [fieldName]: nextObservationValue,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return { fullObservationValue: nextObservationValue, didPersistChange: true };
    },
  );

  if (didPersistChange) {
    await database.collection("system_logs").add({
      eventType: "edit",
      domain: "echo_evaluation_draft",
      evaluationId: input.draftId,
      timestamp: FieldValue.serverTimestamp(),
      actorUid: null,
      actorSource: "echo_refinement_apply_route",
      snapshotAfter: {
        refinementField: fieldName,
        appendedCharacters: markdownBody.length,
      },
    });
  }

  return { appendedParagraph: markdownBody, fullObservationValue };
};
