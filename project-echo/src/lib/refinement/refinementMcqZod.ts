import { z } from "zod";

const refinementMcqItemSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2),
});

export const refinementMcqItemArraySchema = z.array(refinementMcqItemSchema).length(5);

export const refinementMcqItemsWrapperSchema = z.object({
  items: z.array(refinementMcqItemSchema).length(5),
});

export const refinedStructuredWrapperSchema = z.object({
  observations: z.string(),
  areasToImprove: z.string(),
  timingOrTrigger: z.string(),
  support: z.string(),
});

export type RefinementMcqItem = z.infer<typeof refinementMcqItemSchema>;
