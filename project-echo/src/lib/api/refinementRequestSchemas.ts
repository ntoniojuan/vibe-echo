import { z } from "zod";
import type { GainsSubcompetencyCode } from "@/lib/echo/gainsSubcompetencyCodeType";
import {
  normalizeEchoAceCategory,
  type EchoAceCategoryNormalized,
} from "@/lib/refinement/echoAceCategoryNormalized";
import { refinementMcqItemArraySchema } from "@/lib/refinement/refinementMcqZod";

const refinementGainsCodesByAceCategory: Record<
  EchoAceCategoryNormalized,
  readonly GainsSubcompetencyCode[]
> = {
  aptitude: ["A1", "A2", "A3", "A4"],
  character: ["C1", "C2", "C3", "C4"],
  effectiveness: ["E1", "E2", "E3", "E4"],
};

const refinementGainsRatingsForPillarValueSchema = z
  .number()
  .int("GAINS score must be an integer.")
  .min(1, "GAINS score must be between 1 and 5.")
  .max(5, "GAINS score must be between 1 and 5.");

const refinementGainsRatingsForPillarFieldSchema = z.record(
  z.string(),
  refinementGainsRatingsForPillarValueSchema,
);

const addRefinementGainsRatingsIssues = (
  aceCategoryRaw: string,
  gainsRatingsForPillar: Record<string, number>,
  ctx: z.RefinementCtx,
): void => {
  const category = normalizeEchoAceCategory(aceCategoryRaw);
  if (!category) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "aceCategory must be Aptitude, Character, or Effectiveness.",
      path: ["aceCategory"],
    });
    return;
  }

  const expectedCodes = refinementGainsCodesByAceCategory[category];

  for (const code of expectedCodes) {
    const value = gainsRatingsForPillar[code];
    if (value === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `gainsRatingsForPillar must include ${code}.`,
        path: ["gainsRatingsForPillar", code],
      });
    }
  }

  for (const key of Object.keys(gainsRatingsForPillar)) {
    if (!expectedCodes.includes(key as GainsSubcompetencyCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unexpected GAINS code for this pillar: ${key}.`,
        path: ["gainsRatingsForPillar", key],
      });
    }
  }
};

export const refinementMcqsRequestSchema = z
  .object({
    rawNotes: z.string().min(3),
    aceCategory: z.string().min(1),
    gainsRatingsForPillar: refinementGainsRatingsForPillarFieldSchema,
  })
  .superRefine((data, ctx) => {
    addRefinementGainsRatingsIssues(data.aceCategory, data.gainsRatingsForPillar, ctx);
  });

export const refinementApplyRequestSchema = z
  .object({
    draftId: z.string().min(1),
    rawNotes: z.string().min(3),
    aceCategory: z.string().min(1),
    gainsRatingsForPillar: refinementGainsRatingsForPillarFieldSchema,
    mcqs: refinementMcqItemArraySchema,
    answers: z.array(z.string().min(1)).length(5),
  })
  .superRefine((data, ctx) => {
    addRefinementGainsRatingsIssues(data.aceCategory, data.gainsRatingsForPillar, ctx);
  });
