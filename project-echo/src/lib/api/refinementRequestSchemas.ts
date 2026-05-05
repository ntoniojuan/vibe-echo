import { z } from "zod";
import { refinementMcqItemArraySchema } from "@/lib/refinement/refinementMcqZod";

export const refinementMcqsRequestSchema = z.object({
  rawNotes: z.string().min(3),
  aceCategory: z.string().min(1),
});

export const refinementApplyRequestSchema = z.object({
  draftId: z.string().min(1),
  rawNotes: z.string().min(3),
  aceCategory: z.string().min(1),
  mcqs: refinementMcqItemArraySchema,
  answers: z.array(z.string().min(1)).length(5),
});
